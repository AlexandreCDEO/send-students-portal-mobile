import { api } from '../api'

type Assessment = {
  discipline: string | null
  assessment: string | null
  note: number | null
  weight: number | null
}

export type GetStudentAssessmentsResponse = {
  assessments: Assessment[]
}

export async function getStudentAssessments() {
  const { data } = await api.get<GetStudentAssessmentsResponse>(
    '/student-assessments'
  )
  return data
}
