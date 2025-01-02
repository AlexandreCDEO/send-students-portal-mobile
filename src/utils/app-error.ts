export class AppError {
  messages: string[]

  constructor(messages: string[]) {
    this.messages = messages
  }
}
