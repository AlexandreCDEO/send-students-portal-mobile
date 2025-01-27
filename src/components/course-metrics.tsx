import { useQuery } from '@tanstack/react-query'
import { CircularProgressCard } from './circular-progress-card'
import {
  getStudentCourseMetrics,
  type StudentCourseMetricsResponse,
} from '@/server/student/get-student-course-metrics'

export function CourseMetrics() {
  const { data } = useQuery<StudentCourseMetricsResponse>({
    queryFn: getStudentCourseMetrics,
    queryKey: ['student-course-hours'],
  })

  return (
    <CircularProgressCard
      title="Horas do Curso"
      value={data?.totalHoursCompleted ?? 0}
      max={data?.totalMatrixHours ?? 0}
      percentage={data?.completionPercentage ?? 0}
      color="orange"
    />
  )
}
