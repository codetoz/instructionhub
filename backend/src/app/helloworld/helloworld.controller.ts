import { Controller, Get, UseGuards } from '@nestjs/common'
import { HelloworldService } from './helloworld.service'
import { KeycloakAuthGuard } from 'src/keycloak/keycloak.auth.guard'
import { ApiBearerAuth } from '@nestjs/swagger'

@Controller('helloworld')
export class HelloworldController {
  constructor(private readonly helloworldService: HelloworldService) {}

  @Get()
  @UseGuards(KeycloakAuthGuard)
  @ApiBearerAuth()
  getHello(): string {
    return this.helloworldService.getHello()
  }
}
