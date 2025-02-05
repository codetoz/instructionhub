/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ExecutionContext } from '@nestjs/common'
import * as jwt from 'jsonwebtoken'
import { ExtractJwt } from 'passport-jwt'
import { KeycloakJwtPayload } from './keycloak.jwt-payload.class'
import { RequestUser } from 'src/shared/request-user.class'

export type AuthenticatedRequest = Request & {
  user: RequestUser
}

@Injectable()
export class KeycloakAuthGuard extends AuthGuard('bearer') {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest()
    await super.canActivate(context)

    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(request)
    if (token) {
      const decodedToken = jwt.decode(token) as KeycloakJwtPayload
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
