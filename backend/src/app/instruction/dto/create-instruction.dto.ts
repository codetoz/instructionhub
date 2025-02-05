import { IsEnum, IsNotEmpty, IsString } from 'class-validator'
import { InstructionType } from '../enum/instruction-type.enum'

export class CreateInstructionDto {
  @IsString()
  @IsNotEmpty()
  slug: string // Instruction slug, must be unique within the same group

  @IsString()
  @IsNotEmpty()
  content: string

  @IsString()
  description: string

  @IsEnum(InstructionType)
  type: InstructionType
}
