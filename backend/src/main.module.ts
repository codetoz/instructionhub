import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { EnvConfig } from './config/env'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.default'],
      load: [EnvConfig.get],
      expandVariables: true,
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class MainModule {}
