import { Text, View } from 'react-native'
import {
  Book,
  CheckCircle,
  Clock,
  UserX,
  XCircle,
  BarChart,
} from 'lucide-react-native'
import type { Subject } from '@/app/(drawer)/student-bulletin'
import { colors } from '@/styles/colors'

type SubjectCardProps = {
  subject: Subject
}

export function SubjectCard({ subject }: SubjectCardProps) {
  return (
    <View className="bg-white rounded-lg shadow-md p-4 mb-4">
      <View className="mb-2 flex-row items-center gap-2">
        <Book size={20} color={colors.blue.app} />
        <Text className="text-lg font-semibold text-primary">
          {subject.name}
        </Text>
      </View>
      <View className="flex-row gap-8">
        <View className="gap-2">
          <View className="flex-row gap-2 items-center">
            <Clock size={16} color="#6b7280" />
            <Text>Carga horária: {subject.workload}h</Text>
          </View>
          <View className="flex-row gap-2  items-center">
            <BarChart size={16} color="#6b7280" />
            <Text>Média Parcial: {subject.partialAverage.toFixed(1)}</Text>
          </View>
          <View className="flex-row gap-2  items-center">
            <BarChart size={16} color="#6b7280" />
            <Text>Média Final: {subject.finalAverage.toFixed(1)}</Text>
          </View>
        </View>
        <View>
          <View className="flex-row gap-2  items-center">
            <UserX size={16} color="#6b7280" />
            <Text>Faltas: {subject.absences}</Text>
          </View>
          <View className="col-span-2 flex-row gap-2  items-center">
            {subject.status === 'Aprovado' ? (
              <CheckCircle size={16} color="#22c55e" />
            ) : (
              <XCircle size={16} color="#ef4444" />
            )}
            <Text>Status: {subject.status}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}
