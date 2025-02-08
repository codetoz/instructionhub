import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Req,
  UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger'
import { InstructionService } from './instruction.service'
import { CreateInstructionDto } from './dto/create-instruction.dto'
import {
  KeycloakAuthGuard,
  AuthenticatedRequest,
} from 'src/keycloak/keycloak.auth.guard'
import { Instruction } from './instruction.entity'

@Controller('')
export class InstructionController {
  constructor(private readonly instructionService: InstructionService) {}

  @Post('instructions')
  @UseGuards(KeycloakAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'Instruction created successfully.',
  })
  async createInstruction(
    @Req() { user }: AuthenticatedRequest,
    @Body() dto: CreateInstructionDto,
  ): Promise<Instruction> {
    return this.instructionService.createInstruction(user.id, dto)
  }

  @Get('users/:userId/instructions/:instructionSlug')
  @UseGuards(KeycloakAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Single instruction by user id and instruction slug.',
  })
  async getInstruction(
    @Req() { user }: AuthenticatedRequest,
    @Param('userId') userId: string,
    @Param('instructionSlug') instructionSlug: string,
  ): Promise<Instruction> {
    return this.instructionService.findInstruction(
      user.id,
      userId,
      instructionSlug,
    )
  }

  @Get('users/:userId/instructions')
  @UseGuards(KeycloakAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Multi instruction by user id.',
  })
  async getInstructions(
    @Req() { user }: AuthenticatedRequest,
    @Param('userId') userId: string,
  ): Promise<Instruction[]> {
    return this.instructionService.findInstructions(user.id, userId)
  }
}
