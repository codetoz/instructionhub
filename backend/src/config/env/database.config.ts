enum DatabaseTypes {
  POSTGRES = 'postgres',
}

export class DatabaseConfig {
  type: DatabaseTypes
  host: string
  port: number
  dbName: string
  username: string
  password: string
  synchronize: boolean

  constructor() {
    this.type = process.env.DB_TYPE as DatabaseTypes
    this.host = process.env.DB_HOST || '0.0.0.0'
    this.port = parseInt(process.env.DB_PORT || '3000', 10)
    this.dbName = process.env.DB_NAME || 'ihub'
    this.username = process.env.DB_USER || 'user'
    this.password = process.env.DB_PASS || 'pass'
    this.synchronize = Boolean(process.env.DB_SYNC)
  }

  static get() {
    return new DatabaseConfig()
  }
}
