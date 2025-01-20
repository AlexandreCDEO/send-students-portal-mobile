import { CircularProgressCard } from './circular-progress-card'

export function SemesterMetrics() {
  return (
    <CircularProgressCard
      title="Horas do Semestre"
      value={120}
      max={180}
      percentage={67}
      color="#FFC107"
    />
  )
}
