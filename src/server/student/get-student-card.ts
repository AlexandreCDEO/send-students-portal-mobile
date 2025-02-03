import { Buffer } from 'buffer'
import { api } from '../api'

type GetStudentCardApiResponse = {
  name: string
  course: string
  registration: string
  FinalDatePeriod: Date
  avatar: {
    file: Buffer | null
    type: string | null
    name: string | null
  } | null
}

type GetStudentCardResponse = {
  name: string
  course: string
  registration: string
  FinalDatePeriod: Date
  avatar: string | null
}

export async function getStudentCard(): Promise<GetStudentCardResponse> {
  const response = await api.get('/student/card')
  const data = response.data as GetStudentCardApiResponse

  let base64Avatar = null
  if (data.avatar?.file) {
    base64Avatar = `data:${data.avatar.type};base64,${Buffer.from(data.avatar.file).toString('base64')}`
  }

  return {
    name: data.name,
    course: data.course,
    registration: data.registration,
    FinalDatePeriod: data.FinalDatePeriod,
    avatar: base64Avatar,
  }
}
