import { Error } from 'mongoose'
export namespace AppLogger {
  export interface Logger {
    log(message: string): void
    error(message: string, error: Error): void
    warn(message: string): void
  }
}
