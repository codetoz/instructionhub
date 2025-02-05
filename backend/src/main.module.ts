import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { EnvConfig } from './config/env'
import { KeycloakAuthGuard } from './keycloak/keycloak.auth.guard'
import { PassportModule } from '@nestjs/passport'
import { KeycloakStrategy } from './keycloak/keycloak.strategy'
import { HelloworldModule } from './app/helloworld/helloworld.module'
import { GroupModule } from './app/group/group.module'
import { TypeOrmConfigService } from './config/database/typeorm.service'
import { InstructionModule } from './app/instruction/instruction.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.default'],
      load: [EnvConfig.get],
      expandVariables: true,
      isGlobal: true,
    }),

    PassportModule.register({ defaultStrategy: 'jwt' }),

    TypeOrmModule.forRootAsync({
      imports: [],
      useClass: TypeOrmConfigService,
    }),

    HelloworldModule,
    GroupModule,
    InstructionModule,
  ],
  controllers: [],
  providers: [KeycloakStrategy, KeycloakAuthGuard],
})
export class MainModule {}
