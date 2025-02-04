import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { Logger, ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ConfigParts } from './config/env'
import { MainModule } from './main.module'
import { ServerConfig } from './config/env/server.config'
import * as KeycloakConnect from 'keycloak-connect'
import { KeycloakConfig } from './config/env/keycloak.config'

const appName = 'InstrucionHUB'

async function bootstrap() {
  const app = await NestFactory.create(MainModule)

  const configService = app.get(ConfigService)

  const serverConfig = configService.get<ServerConfig>(ConfigParts.SERVER)
  if (!serverConfig) {
    throw new Error('Server configuration not found')
  }
  const { host, port } = serverConfig

  const keycloakConfig = configService.get<KeycloakConfig>(ConfigParts.KEYCLOAK)
  const keycloak = new KeycloakConnect({}, keycloakConfig)
  app.use(keycloak.middleware())

  app.enableCors({ origin: '*' })
  app.useGlobalPipes(new ValidationPipe({ transform: true }))

  const swaggerConfig = new DocumentBuilder()
    .setTitle(appName)
    .setDescription(`${appName} API`)
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('/', app, document)

  await app.listen(port, host, () => {
    void app.getUrl().then(url => {
      Logger.log(`✅ ${appName} is listening on ${url}`, 'Bootstrap')
    })
  })
}
bootstrap().catch(error => {
  Logger.error(`❌ Error starting ${appName}`, error, 'Bootstrap')
})
