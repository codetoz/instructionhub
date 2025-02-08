import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { InstructionType } from '../enum/instruction-type.enum'

export class CreateInstructionDto {
  @IsString()
  @IsNotEmpty()
  slug: string

  @IsString()
  @IsNotEmpty()
  content: string

  @IsString()
  description: string

  @IsEnum(InstructionType)
  type: InstructionType

  @IsString()
  @IsOptional()
  group?: string
}
