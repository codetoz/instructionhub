import { Controller, Get, Req, UseGuards } from '@nestjs/common'
import { HelloworldService } from './helloworld.service'
import { KeycloakAuthGuard } from 'src/keycloak/keycloak.auth.guard'
import { ApiBearerAuth } from '@nestjs/swagger'
import { RequestUser } from 'src/shared/request-user.class'

@Controller('helloworld')
export class HelloworldController {
  constructor(private readonly helloworldService: HelloworldService) {}

  @Get()
  @UseGuards(KeycloakAuthGuard)
  @ApiBearerAuth()
  getHello(@Req() req: { user: RequestUser }): string {
    return this.helloworldService.getHello(req?.user)
  }
}
