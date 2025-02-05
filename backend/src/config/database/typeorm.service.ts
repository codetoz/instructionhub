import { Injectable, Inject } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { DatabaseConfig } from '../env/database.config'
import { ConfigParts } from '../env'

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  @Inject(ConfigService)
  private readonly configService: ConfigService

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    const dbConf = this.configService.get<DatabaseConfig>(ConfigParts.DATABASE)
    if (!dbConf) {
      throw new Error('Database configuration not found')
    }
    const { type, host, port, dbName, username, password, synchronize } = dbConf

    return {
      type: type,
      host: host,
      port: port,
      database: dbName,
      username: username,
      password: password,
      entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
      logger: 'file',
      synchronize: synchronize,
    }
  }
}
