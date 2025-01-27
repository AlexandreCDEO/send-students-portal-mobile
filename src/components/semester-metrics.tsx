import { useQuery } from '@tanstack/react-query'
import { CircularProgressCard } from './circular-progress-card'
import {
  getStudentSemesterMetrics,
  type StudentSemesterMetricsResponse,
} from '@/server/student/get-student-semester-metrics'
import { colors } from '@/styles/colors'

export function SemesterMetrics() {
  const { data } = useQuery<StudentSemesterMetricsResponse>({
    queryFn: getStudentSemesterMetrics,
    queryKey: ['student-semester-hours'],
  })

  return (
    <CircularProgressCard
      title="Horas do Semestre"
      value={data?.totalHoursCompleted ?? 0}
      max={data?.totalCourseHours ?? 0}
      percentage={data?.completionPercentage ?? 0}
      color={colors.blue.app}
    />
  )
}
