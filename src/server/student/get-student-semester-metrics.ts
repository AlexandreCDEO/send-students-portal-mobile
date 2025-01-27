import { api } from '../api'

export type StudentSemesterMetricsResponse = {
  totalCourseHours: number
  completionPercentage: number
  totalHoursCompleted: number
}

export async function getStudentSemesterMetrics() {
  const { data } = await api.get<StudentSemesterMetricsResponse>(
    '/student-semester-hours'
  )
  return data
}
