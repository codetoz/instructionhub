import * as Keycloak from 'keycloak-connect'

export class KeycloakConfig implements Keycloak.KeycloakConfig {
  realm: string
  clientId: string
  clientSecret: string
  secret: string
  resource: string
  publicClient: boolean

  confidentialPort: number
  authServerUrl: string
  sslRequired: string
  bearerOnly: boolean
  'confidential-port': string | number
  'auth-server-url': string
  'ssl-required': string
  'bearer-only'?: boolean | undefined

  publicKey: string

  constructor() {
    this.realm = process.env.KEYCLOAK_REALM || '' // Your Keycloak realm
    this.clientId = process.env.KEYCLOAK_CLIENT_ID || '' // Your Keycloak client ID
    this.secret = this.clientSecret = process.env.KEYCLOAK_CLIENT_SECRET || '' // Your Keycloak client secret (for confidential clients)
    this.resource = process.env.KEYCLOAK_RESOURCE || ''
    this.publicClient = process.env.KEYCLOAK_PUBLIC_CLIENT === 'true' // Whether it's a public client or not
    this.authServerUrl = this['auth-server-url'] =
      process.env.KEYCLOAK_AUTH_SERVER_URL || '' // URL of your Keycloak server
    this.bearerOnly = this['bearer-only'] =
      process.env.KEYCLOAK_BEARER_ONLY === 'true' // Whether the service should only accept bearer tokens
    this.sslRequired = this['ssl-required'] =
      process.env.KEYCLOAK_SSL_REQUIRED || '' // The SSL requirement
    this.confidentialPort = this['confidential-port'] = parseInt(
      process.env.KEYCLOAK_CONFIDENTIAL_PORT || '0',
      10,
    )

    this.publicKey = process.env.KEYCLOAK_CLIENT_PUBLIC_KEY || ''
  }

  static get() {
    return new KeycloakConfig()
  }
}
