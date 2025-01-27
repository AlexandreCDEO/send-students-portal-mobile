import { Link } from 'expo-router'
import { Badge } from './ui/badge'
import { View, Text } from 'react-native'

type RequirementItemProps = {
  requirement: number
  date: Date | null
  status: string | null
}

export function RequirementItem({
  requirement,
  date,
  status,
}: RequirementItemProps) {
  return (
    <Link href="/(drawer)/academic-calendar">
      <View className="flex-row w-full justify-between items-center bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200">
        <View>
          <Text className="font-semibold text-gray-800">{requirement}</Text>
          <Text className="text-xs text-gray-500">
            {/* biome-ignore lint/suspicious/noGlobalIsNan: <explanation> */}
            {date && !isNaN(new Date(date).getTime())
              ? new Date(date).toLocaleDateString('pt-BR')
              : null}
          </Text>
        </View>
        <Badge variant={status === 'FINALIZADA' ? 'default' : 'secondary'}>
          {status}
        </Badge>
      </View>
    </Link>
  )
}
