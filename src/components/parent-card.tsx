import { colors } from '@/styles/colors'
import { CreditCard, User, Users } from 'lucide-react-native'
import { View, Text } from 'react-native'

export interface Parent {
  name: string | null
  CPF: string | null
  relation: string | null
  status: string | null
}

interface ParentCardProps {
  parent: Parent
}

export function ParentCard({ parent }: ParentCardProps) {
  return (
    <View className="bg-white rounded-lg shadow-md p-6 mb-4 border-l-4 border-primary">
      <View className="gap-3">
        <View className="flex flex-row items-center justify-between">
          <View className="flex flex-row items-center gap-2">
            <User color={colors.blue.app} size={20} />
            <Text className="text-lg font-semibold text-primary">
              {parent.name || 'Nome não informado'}
            </Text>
          </View>
          <Text
            className={`text-sm font-medium px-2 py-1 rounded-full ${
              parent.status === 'Ativo'
                ? 'bg-green-100 text-green-600'
                : parent.status === 'Inativo'
                  ? 'bg-red-100 text-red-600'
                  : 'bg-yellow-100 text-yellow-600'
            }`}
          >
            {parent.status}
          </Text>
        </View>
        <View className="flex flex-row items-center gap-2">
          <CreditCard color={colors.blue.app} size={20} />
          <Text className="text-zinc-600 text-base">
            {parent.CPF
              ? parent.CPF.replace(
                  /(\d{3})(\d{3})(\d{3})(\d{2})/,
                  '$1.$2.$3-$4'
                )
              : 'CPF não informado'}
          </Text>
        </View>
        <View className="flex flex-row items-center gap-2">
          <Users color={colors.blue.app} size={20} />
          <Text className="text-zinc-600 text-base">
            {parent.relation?.toUpperCase()}
          </Text>
        </View>
      </View>
    </View>
  )
}
