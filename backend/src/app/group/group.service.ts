import { ConflictException, Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Group } from './group.entity'
import { CreateGroupDto } from './dto/create-group.dto'
import { RequestUser } from 'src/shared/request-user.class'
import { GroupType } from './enum/group-type.enum'

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
  ) {}

  // Create a new group
  async createGroup(
    user: RequestUser,
    createGroupDto: CreateGroupDto,
  ): Promise<Group> {
    const group = this.groupRepository.create({
      name: createGroupDto.name,
      description: createGroupDto.description,
      type: createGroupDto.type,
      createdBy: user.id,
    })
    try {
      return await this.groupRepository.save(group)
    } catch (err) {
      Logger.error(typeof err, 'GroupService')
      throw new ConflictException('Group already exists')
    }
  }

  // Get all groups
  async getGroups(creatorId: string, requestUserId: string): Promise<Group[]> {
    if (creatorId) {
      if (creatorId === requestUserId) {
        return await this.groupRepository.find({
          where: { createdBy: creatorId },
        })
      }
      return await this.groupRepository.find({
        where: { createdBy: creatorId, type: GroupType.PUBLIC },
      })
    }
    return await this.groupRepository.find()
  }
}
