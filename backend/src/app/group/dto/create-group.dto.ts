import { IsString, IsEnum, IsNotEmpty } from 'class-validator'
import { GroupType } from '../enum/group-type.enum'

export class CreateGroupDto {
  @IsString()
  @IsNotEmpty()
  slug: string

  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  description: string

  @IsEnum(GroupType)
  type: GroupType
}
