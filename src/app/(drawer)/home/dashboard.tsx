import { CourseMetrics } from '@/components/course-metrics'
import { EvaluationsView } from '@/components/evaluations-view'
import { PendingCard } from '@/components/pending-card'
import { RequirementsView } from '@/components/requirements-view'
import { SemesterMetrics } from '@/components/semester-metrics'
import { ScrollView, View } from 'react-native'

export default function Dashboard() {
  return (
    <ScrollView className="flex-1">
      <View className="p-4 gap-4">
        <View className="flex-row gap-4">
          <SemesterMetrics />
          <CourseMetrics />
        </View>
        <PendingCard />
        <EvaluationsView />
        <RequirementsView />
      </View>
    </ScrollView>
  )
}
