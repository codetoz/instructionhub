import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { EnvConfig } from './config/env'
import { HelloworldModule } from './app/helloworld/helloworld.module'
import { KeycloakAuthGuard } from './keycloak/keycloak.auth.guard'
import { PassportModule } from '@nestjs/passport'
import { KeycloakStrategy } from './keycloak/keycloak.strategy'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.default'],
      load: [EnvConfig.get],
      expandVariables: true,
      isGlobal: true,
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    HelloworldModule,
  ],
  controllers: [],
  providers: [KeycloakStrategy, KeycloakAuthGuard],
})
export class MainModule {}
