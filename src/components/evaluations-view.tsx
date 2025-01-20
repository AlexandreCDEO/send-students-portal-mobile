import { BookOpen } from 'lucide-react-native'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { colors } from '@/styles/colors'
import { EvaluationItem } from './evaluation-item'
import { View, Text } from 'react-native'

export function EvaluationsView() {
  return (
    <Card>
      <CardHeader>
        <View className="flex-row items-center">
          <BookOpen
            style={{ marginRight: 8 }}
            color={colors.blue.app}
            size={20}
          />{' '}
          <Text className="text-lg font-semibold">Últimas Avaliações</Text>
        </View>
      </CardHeader>
      <CardContent className="p-4">
        <View className="space-y-4">
          <EvaluationItem
            discipline="Matemática"
            evaluation="Prova 1"
            grade={8.5}
            weight={2}
          />
          <EvaluationItem
            discipline="Física"
            evaluation="Trabalho"
            grade={9.0}
            weight={9.0}
          />
        </View>
      </CardContent>
    </Card>
  )
}
