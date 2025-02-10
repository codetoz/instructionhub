import {
  Injectable,
  NotFoundException,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'
import { Instruction } from './instruction.entity'
import { CreateInstructionDto } from './dto/create-instruction.dto'
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
    userId: string,
    dto: CreateInstructionDto,
  ): Promise<Instruction> {
    // 2. Check for existing instruction slug in the same group
    const existing = await this.instructionRepository.findOne({
      where: {
        slug: dto.slug,
        createdBy: userId,
      },
    })
    if (existing) {
      throw new ConflictException(
        `Instruction slug '${dto.slug}' already exists for user '${userId}'`,
      )
    }

    // 3. Create + save
    const instructionId = uuidv4()

    const instruction = this.instructionRepository.create({
      ...dto,
      createdBy: userId,
      id: instructionId,
    })
    return this.instructionRepository.save(instruction)
  }

  async findInstruction(
    requestUserId: string,
    userId: string,
    instructionSlug: string,
  ): Promise<Instruction> {
    const instruction = await this.instructionRepository.findOne({
      where: {
        createdBy: userId,
        slug: instructionSlug,
      },
    })

    if (!instruction) {
      throw new NotFoundException(
        `Instruction '${instructionSlug}' not found for user '${userId}'`,
      )
    }

    const isOwner = requestUserId === instruction.createdBy

    // If private, block access if not the owner
    if (instruction.type === InstructionType.PRIVATE && !isOwner) {
      // Either throw a NotFound or a Forbidden exception — up to you
      throw new NotFoundException(
        `Instruction '${instructionSlug}' not found for user '${userId}'`,
      )
    }

    return instruction
  }

  async findInstructions(
    requestUserId: string,
    userId: string,
  ): Promise<Instruction[]> {
    const instructions = await this.instructionRepository.find({
      where: {
        createdBy: userId,
      },
    })

    if (instructions.length < 0) return []

    const isOwner = requestUserId === instructions[0].createdBy
    if (!isOwner) return []
    return instructions
  }

  async deleteInstructionById(
    requestUserId: string,
    instructionId: string,
  ): Promise<void> {
    const instruction = await this.instructionRepository.findOne({
      where: { id: instructionId },
    })
    if (!instruction) {
      throw new NotFoundException(`Instruction '${instructionId}' not found`)
    }
    if (instruction.createdBy !== requestUserId) {
      throw new ForbiddenException('You do not own this instruction')
    }
    await this.instructionRepository.remove(instruction)
  }
}
