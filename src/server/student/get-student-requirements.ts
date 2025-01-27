import { api } from '../api'

type Requirement = {
  id: number
  numberOfUnreadMessages: number
  date: Date | null
  status: string | null
}

export type GetStudentRequirementsResponse = {
  requirements: Requirement[]
}

export async function getStudentRequirements() {
  const { data } = await api.get<GetStudentRequirementsResponse>(
    '/student-requirements'
  )
  return data
}
