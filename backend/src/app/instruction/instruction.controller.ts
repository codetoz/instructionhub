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

@Controller('instructions')
export class InstructionController {
  constructor(private readonly instructionService: InstructionService) {}

  /**
   * Create an instruction (owner or authorized user)
   */
  @Post(':groupSlug')
  @UseGuards(KeycloakAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'Instruction created successfully.',
  })
  async createInstruction(
    @Req() { user }: AuthenticatedRequest,
    @Param('groupSlug') groupSlug: string,
    @Body() dto: CreateInstructionDto,
  ): Promise<Instruction> {
    return this.instructionService.createInstruction(user, groupSlug, dto)
  }

  /**
   * List instructions in a group
   * - If no user or user is not the group owner => only public instructions
   * - If user is the group owner => see all (public + private)
   */
  @Get(':groupSlug')
  // NO GUARD => public can call it
  @ApiResponse({ status: 200, description: 'List instructions in a group.' })
  async listInstructions(
    @Req() req: any, // "any" so we don't block an unauthenticated request
    @Param('groupSlug') groupSlug: string,
  ): Promise<Instruction[]> {
    // `req.user` might be undefined if no token is provided
    return this.instructionService.listInstructionsInGroup(
      req?.user?.id,
      groupSlug,
    )
  }

  /**
   * Get one instruction by slug
   * - If instruction is public => everyone can see it
   * - If instruction is private => only group owner can see it
   */
  @Get(':groupSlug/:instructionSlug')
  // NO GUARD => public can call it
  @ApiResponse({
    status: 200,
    description: 'Single instruction by group slug and instruction slug.',
  })
  async getInstructionBySlug(
    @Req() req: any,
    @Param('groupSlug') groupSlug: string,
    @Param('instructionSlug') instructionSlug: string,
  ): Promise<Instruction> {
    return this.instructionService.findInstructionBySlug(
      req?.user?.id,
      groupSlug,
      instructionSlug,
    )
  }
}
