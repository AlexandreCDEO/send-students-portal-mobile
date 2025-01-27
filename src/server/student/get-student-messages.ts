import { api } from '../api'

type Message = {
  id: number
  title: string
  date: Date
  message: string
}

export type GetStudentMessagesResponse = {
  messages: Message[]
}

export async function getStudentMessages() {
  const { data } =
    await api.get<GetStudentMessagesResponse>('/student-messages')
  return data
}
