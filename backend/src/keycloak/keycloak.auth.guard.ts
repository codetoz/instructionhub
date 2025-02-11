/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, Logger } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ExecutionContext } from '@nestjs/common'
import * as jwt from 'jsonwebtoken'
// import { ExtractJwt } from 'passport-jwt'
import { KeycloakJwtPayload } from './keycloak.jwt-payload.class'
import { RequestUser } from 'src/shared/request-user.class'
import { ConfigService } from '@nestjs/config'
import { KeycloakConfig } from 'src/config/env/keycloak.config'
import { ConfigParts } from 'src/config/env'

export type AuthenticatedRequest = Request & {
  user: RequestUser
}

@Injectable()
export class KeycloakAuthGuard extends AuthGuard('bearer') {
  private kcPublicKey: string

  constructor(configService: ConfigService) {
    super()
    const kcConfig = configService.get<KeycloakConfig>(
      ConfigParts.KEYCLOAK,
    ) as KeycloakConfig
    this.kcPublicKey = kcConfig.publicKey

    // Logger.debug('kcPublicKey: ' + this.kcPublicKey, 'KeycloakAuthGuard')
  }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest()
    // await super.canActivate(context)

    // const token = ExtractJwt.fromAuthHeaderAsBearerToken()(request)
    const token = request.headers.authorization?.split(' ')[1]

    if (token) {
      const decodedToken = jwt.verify(token, this.kcPublicKey, {
        algorithms: ['RS256'],
      }) as KeycloakJwtPayload
      // const decodedToken = jwt.decode(token) as KeycloakJwtPayload
      request.user = {
        id: decodedToken.sub,
        username: decodedToken.preferred_username,
        email: decodedToken.email,
        fullname: decodedToken.name,
        firstname: decodedToken.given_name,
        lastname: decodedToken.family_name,
      } as RequestUser
    }

    return request.user
  }
}
