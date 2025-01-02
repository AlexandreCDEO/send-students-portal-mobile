import { api } from '../api'

type CreateSessionsProps = {
  registration: string
}

type CreateSessionsResponse = {
  access_token: string
  refresh_token: string
}

export async function createSessionWithToken({
  registration,
}: CreateSessionsProps) {
  const { data } = await api.post<CreateSessionsResponse>('/sessions/token', {
    registration,
  })
  return data
}
