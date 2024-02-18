export namespace Connect {
  export interface DBConnectionConfig {
    connect(): Promise<void>
  }
  export enum DB_URL {
    DEFAULT = ''
  }
  export enum DB_STATUS {
    UP = 'Connected to MongoDB',
    DOWN = 'Failed to connect to MongoDB'
  }
}
