import { ServerConfig } from './server.config'

export enum NodeEnvs {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
}

export enum ConfigParts {
  NODE_ENV = 'nodeEnv',
  SERVER = 'server',
}

export class EnvConfig {
  nodeEnv: string
  server: ServerConfig

  constructor() {
    this.nodeEnv = process.env.NODE_ENV || NodeEnvs.DEVELOPMENT
    this.server = ServerConfig.get()
  }

  static get = () => {
    return new EnvConfig()
  }
}
