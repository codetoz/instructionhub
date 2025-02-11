// import { ConfigService } from '@nestjs/config'
// import { Injectable, Logger } from '@nestjs/common'
// import { PassportStrategy } from '@nestjs/passport'
// import * as Keycloak from 'keycloak-connect'
// import { Strategy } from 'passport-http-bearer'
// import { ConfigParts } from 'src/config/env'
// import { KeycloakConfig } from 'src/config/env/keycloak.config'

// @Injectable()
// export class KeycloakStrategy extends PassportStrategy(Strategy) {
//   private keycloak: Keycloak.Keycloak

//   constructor(private readonly configService: ConfigService) {
//     super()
//     const kcConfig = configService.get<KeycloakConfig>(
//       ConfigParts.KEYCLOAK,
//     ) as KeycloakConfig
//     this.keycloak = new Keycloak({}, kcConfig)
//   }

//   async validate(token: string) {
//     Logger.debug('token: ' + token, 'KeycloakStrategy')

//     const res = await this.keycloak.grantManager
//       .validateAccessToken(token)
//       .catch(err => Logger.error(err))

//     return res
//   }
// }
