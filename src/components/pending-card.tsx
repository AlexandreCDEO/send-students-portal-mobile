import { AlertCircle } from 'lucide-react-native'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { View, Text } from 'react-native'
import { colors } from '@/styles/colors'

export function PendingCard() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Pendências</CardTitle>
        <AlertCircle color="#ef4444" size={20} />
      </CardHeader>
      <CardContent>
        <Text className="text-2xl font-bold">2</Text>
        <Text className="text-xs text-muted-foreground">
          Pressione para ver detalhes
        </Text>
      </CardContent>
    </Card>
  )
}
