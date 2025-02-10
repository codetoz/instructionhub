import { IsEnum, IsOptional, IsString } from 'class-validator'
import { InstructionType } from '../enum/instruction-type.enum'

export class UpdateInstructionDto {
  @IsString()
  @IsOptional()
  slug?: string

  @IsString()
  @IsOptional()
  title?: string

  @IsString()
  @IsOptional()
  description?: string

  @IsString()
  @IsOptional()
  content?: string

  @IsEnum(InstructionType)
  @IsOptional()
  type?: InstructionType

  @IsString()
  @IsOptional()
  groupId?: string
}
