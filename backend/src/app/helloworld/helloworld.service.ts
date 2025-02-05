import { Injectable } from '@nestjs/common'
import { RequestUser } from 'src/shared/request-user.class'

@Injectable()
export class HelloworldService {
  getHello(userInfo: RequestUser): string {
    return `Hello, ${userInfo.fullname}!`
  }
}
