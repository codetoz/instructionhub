import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common'
import { GroupService } from './group.service'
import {
  AuthenticatedRequest,
  KeycloakAuthGuard,
} from 'src/keycloak/keycloak.auth.guard'
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger'
import { RequestUser } from 'src/shared/request-user.class'
import { CreateGroupDto } from './dto/create-group.dto'
import { Group } from './group.entity'

@Controller('groups')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  @UseGuards(KeycloakAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'Group created successfully.' })
  async createGroup(
    @Req() req: { user: RequestUser },
    @Body() createGroupDto: CreateGroupDto,
  ): Promise<Group> {
    return await this.groupService.createGroup(req.user, createGroupDto)
  }

  @Get()
  @UseGuards(KeycloakAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'List of groups.' })
  async getGroups(
    @Req() { user }: AuthenticatedRequest,
    @Query('creator') creator: string,
  ): Promise<Group[]> {
    return await this.groupService.getGroups(creator, user?.id)
  }
}
