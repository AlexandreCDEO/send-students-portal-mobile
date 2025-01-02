import { api } from '../api'

type UpdateStudentProfileProps = {
  gender: number | null | undefined
  mail: string
  phone: {
    ddd: number
    number: number
  }
  race: number
}

type UpdateStudentResponse = {
  message: string
}

export async function updateStudentProfile({
  gender,
  mail,
  phone,
  race,
}: UpdateStudentProfileProps) {
  const { data } = await api.post<UpdateStudentResponse>('/profile', {
    gender,
    mail,
    phone,
    race,
  })

  return data
}
