import { Link } from 'expo-router'
import { Badge } from './ui/badge'
import { View, Text } from 'react-native'

type RequirementItemProps = {
  id: number
  title: string
  date: Date
  status: string
}

export function RequirementItem({
  title,
  date,
  status,
  id,
}: RequirementItemProps) {
  return (
    <Link href="/(drawer)/academic-calendar" className="block">
      <View className="flex-row justify-between items-center bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200">
        <View>
          <Text className="font-semibold text-gray-800">{title}</Text>
          <Text className="text-xs text-gray-500">
            {date.toLocaleDateString('pt-BR')}
          </Text>
        </View>
        <Badge variant={status === 'Concluído' ? 'default' : 'secondary'}>
          {status}
        </Badge>
      </View>
    </Link>
  )
}
