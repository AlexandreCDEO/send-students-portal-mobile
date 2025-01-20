import { FileText } from 'lucide-react-native'
import { RequirementItem } from './requirement-item'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Text, View } from 'react-native'
import { colors } from '@/styles/colors'

export function RequirementsView() {
  return (
    <Card>
      <CardHeader>
        <View className="flex-row items-center">
          <FileText
            size={20}
            color={colors.blue.app}
            style={{ marginRight: 8 }}
          />
          <Text className="text-lg font-semibold">Meus Requerimentos</Text>
        </View>
      </CardHeader>
      <CardContent className="p-4">
        <View className="space-y-4">
          <RequirementItem
            id={1}
            title="Revisão de Nota"
            date={new Date()}
            status="Em análise"
          />
          <RequirementItem
            id={2}
            title="Matrícula"
            date={new Date()}
            status="Concluído"
          />
        </View>
      </CardContent>
    </Card>
  )
}
