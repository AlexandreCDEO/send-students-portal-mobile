import axios from 'axios'
import { AppError } from './app-error'

export function getErrorMessage(error: unknown): string {
  if (error instanceof AppError) {
    const messages = error.messages
    if (messages && Array.isArray(messages)) {
      return messages.join('\n')
    }
  }

  return 'Não foi possível realizar o acesso. Tente novamente mais tarde!'
}
