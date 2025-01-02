import type { Registration } from '@/types/registration'
import { api } from '../api'

type CreateSessionRequest = {
  username: string
  password: string
}

export type CreateSessionResponse = {
  access_token: string | null
  refresh_token: string | null
  registrations: Registration[]
  userIdToChangePassword: number | null
}

export async function createSession({
  username,
  password,
}: CreateSessionRequest) {
  const { data } = await api.post<CreateSessionResponse>('/sessions/password', {
    username,
    password,
  })

  return data
}
