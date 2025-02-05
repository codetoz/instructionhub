export class ServerConfig {
  host: string
  port: number

  constructor() {
    this.host = process.env.HTTP_HOST || '0.0.0.0'
    this.port = Number(process.env.HTTP_PORT) || 3000
  }

  static get() {
    return new ServerConfig()
  }
}
