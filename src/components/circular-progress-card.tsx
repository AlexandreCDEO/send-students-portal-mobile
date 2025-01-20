import { View, Text } from 'react-native'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { CircularProgress } from './circular-progress'

type CircularProgressCardProps = {
  title: string
  percentage: number
  value: number
  max: number
  color: string
}

export function CircularProgressCard({
  max,
  percentage,
  title,
  value,
  color,
}: CircularProgressCardProps) {
  return (
    <View className="flex-1">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
        </CardHeader>
        <CardContent className="items-center">
          <CircularProgress value={percentage} color={color} />
          <Text className="mt-2 text-sm font-medium">
            {value}/{max}
          </Text>
        </CardContent>
      </Card>
    </View>
  )
}
