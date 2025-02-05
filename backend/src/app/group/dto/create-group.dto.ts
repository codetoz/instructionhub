import { IsString, IsEnum } from 'class-validator'
import { GroupType } from '../enum/group-type.enum'

export class CreateGroupDto {
  @IsString()
  name: string

  @IsString()
  description: string

  @IsEnum(GroupType)
  type: GroupType
}
