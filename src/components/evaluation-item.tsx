import { View, Text } from 'react-native'

type EvaluationItemProps = {
  discipline: string
  evaluation: string
  grade: number
  weight: number
}

export function EvaluationItem({
  discipline,
  evaluation,
  grade,
  weight,
}: EvaluationItemProps) {
  return (
    <View className="flex-row justify-between items-center p-2 bg-gray-50 rounded-lg">
      <View>
        <Text className="font-semibold text-gray-800">{discipline}</Text>
        <Text className="text-sm text-gray-600">{evaluation}</Text>
      </View>
      <View className="text-right">
        <Text className="font-semibold text-blue-600">{grade}</Text>
        <Text className="text-xs text-gray-500">Peso: {weight}</Text>
      </View>
    </View>
  )
}
