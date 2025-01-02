import { GraduationCap } from 'lucide-react-native'
import { View } from 'react-native'
import { Text } from '@/components/ui/text'

export function StudentPortalLogo() {
  return (
    <View className="flex items-center gap-2">
      <GraduationCap color={'#4978B0'} size={60} />
      <Text className="text-2xl font-bold text-primary">Portal do Aluno</Text>
    </View>
  )
}
