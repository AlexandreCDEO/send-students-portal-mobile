import type { StudentProfile } from '@/contexts/student-profile-context'
import { api } from '../api'

export async function getStudentProfile() {
  const { data } = await api.get<StudentProfile>('/me')
  return data
}
