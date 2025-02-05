import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Instruction } from './instruction.entity'
import { CreateInstructionDto } from './dto/create-instruction.dto'
import { RequestUser } from 'src/shared/request-user.class'
import { Group } from '../group/group.entity'
import { InstructionType } from './enum/instruction-type.enum'

@Injectable()
export class InstructionService {
  constructor(
    @InjectRepository(Instruction)
    private readonly instructionRepository: Repository<Instruction>,

    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
  ) {}

  async createInstruction(
    user: RequestUser,
    groupSlug: string,
    dto: CreateInstructionDto,
  ): Promise<Instruction> {
    // 1. Find group by slug
    const group = await this.groupRepository.findOne({
      where: { slug: groupSlug },
    })
    if (!group) {
      throw new NotFoundException(`Group not found for slug: ${groupSlug}`)
    }

    // 2. Check for existing instruction slug in the same group
    const existing = await this.instructionRepository.findOne({
      where: {
        slug: dto.slug,
        group: { id: group.id },
      },
    })
    if (existing) {
      throw new ConflictException(
        `Instruction slug '${dto.slug}' already exists in group '${groupSlug}'`,
      )
    }

    // 3. Create + save
    const instruction = this.instructionRepository.create({
      ...dto,
      createdBy: user.id,
      group,
    })
    return this.instructionRepository.save(instruction)
  }

  /**
   * Return instructions for a group.
   * - If `user` is group owner => return all instructions
   * - Else => return only public instructions
   */
  async listInstructionsInGroup(
    requestUserId: string,
    groupSlug: string,
  ): Promise<Instruction[]> {
    // Find the group (to compare `createdBy`)
    const group = await this.groupRepository.findOne({
      where: { slug: groupSlug },
    })
    if (!group) {
      throw new NotFoundException(`Group not found for slug: ${groupSlug}`)
    }

    const isOwner = requestUserId === group.createdBy

    // If not the owner (or user is undefined), only fetch public instructions
    if (!isOwner) {
      return this.instructionRepository.find({
        where: {
          group: { id: group.id },
          type: InstructionType.PUBLIC,
        },
        order: { createdAt: 'DESC' },
      })
    }

    // Group owner => fetch all instructions
    return this.instructionRepository.find({
      where: {
        group: { id: group.id },
      },
      order: { createdAt: 'DESC' },
    })
  }

  /**
   * Return a single instruction by groupSlug & instructionSlug
   * - If instruction is PRIVATE, only the group owner can see it
   * - If instruction is PUBLIC, everyone can see it
   */
  async findInstructionBySlug(
    requestUserId: string,
    groupSlug: string,
    instructionSlug: string,
  ): Promise<Instruction> {
    // Also load the group's createdBy so we can compare
    const instruction = await this.instructionRepository.findOne({
      where: {
        slug: instructionSlug,
        group: { slug: groupSlug },
      },
      relations: ['group'],
    })

    if (!instruction) {
      throw new NotFoundException(
        `Instruction '${instructionSlug}' not found in group '${groupSlug}'`,
      )
    }

    const isOwner = requestUserId === instruction.group.createdBy

    // If private, block access if not the owner
    if (instruction.type === InstructionType.PRIVATE && !isOwner) {
      // Either throw a NotFound or a Forbidden exception — up to you
      throw new NotFoundException(
        `Instruction '${instructionSlug}' not found in group '${groupSlug}'`,
      )
    }

    return instruction
  }
}
