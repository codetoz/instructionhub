import { KeycloakConfig } from './keycloak.config'
import { ServerConfig } from './server.config'

export enum NodeEnvs {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
}

export enum ConfigParts {
  NODE_ENV = 'nodeEnv',
  SERVER = 'server',
  KEYCLOAK = 'keycloak',
}

export class EnvConfig {
  nodeEnv: string
  server: ServerConfig
  keycloak: KeycloakConfig

  constructor() {
    this.nodeEnv = process.env.NODE_ENV || NodeEnvs.DEVELOPMENT
    this.server = ServerConfig.get()
    this.keycloak = KeycloakConfig.get()
  }

  static get = () => {
    return new EnvConfig()
  }
}
