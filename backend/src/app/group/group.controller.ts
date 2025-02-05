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
import { ApiBearerAuth, ApiQuery, ApiResponse } from '@nestjs/swagger'
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
    @Req() { user }: AuthenticatedRequest,
    @Body() createGroupDto: CreateGroupDto,
  ): Promise<Group> {
    return await this.groupService.createGroup(user?.id, createGroupDto)
  }

  @Get()
  @ApiQuery({ name: 'creator', required: false })
  @ApiResponse({ status: 200, description: 'List of groups.' })
  async getGroups(
    @Req() req: any,
    @Query('creator') creator: string,
  ): Promise<Group[]> {
    return await this.groupService.getGroups(creator, req?.user?.id)
  }
}
