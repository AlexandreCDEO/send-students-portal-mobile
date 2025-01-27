import { api } from '../api'

export type StudentCourseMetricsResponse = {
  totalMatrixHours: number
  completionPercentage: number
  totalHoursCompleted: number
}

export async function getStudentCourseMetrics() {
  const { data } = await api.get<StudentCourseMetricsResponse>(
    '/student-course-hours'
  )
  return data
}
