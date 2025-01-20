import { CircularProgressCard } from './circular-progress-card'

export function CourseMetrics() {
  return (
    <CircularProgressCard
      title="Horas do Curso"
      value={1500}
      max={3000}
      percentage={50}
      color="#FF5722"
    />
  )
}
