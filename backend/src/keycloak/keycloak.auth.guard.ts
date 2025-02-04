/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ExecutionContext } from '@nestjs/common'
import * as jwt from 'jsonwebtoken'
import { ExtractJwt } from 'passport-jwt'
import { RequestUser } from 'src/shared/request-user.class'

@Injectable()
export class KeycloakAuthGuard extends AuthGuard('bearer') {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest()
    await super.canActivate(context)

    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(request)
    if (token) {
      const decodedToken = jwt.decode(token) as RequestUser
      request.user = {
        scope: decodedToken.scope,
        email_verified: decodedToken.email_verified,
        name: decodedToken.name,
        preferred_username: decodedToken.preferred_username,
        given_name: decodedToken.given_name,
        family_name: decodedToken.family_name,
        email: decodedToken.email,
      }
    }

    return request.user
  }
}
