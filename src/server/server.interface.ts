export namespace App {
  export interface IAppServer {
    start(): void
  }
  export enum PORT {
    DEFAULT = '8001'
  }
  export enum SERVER_STATUS {
    UP = 'Server is up and running'
  }
}
