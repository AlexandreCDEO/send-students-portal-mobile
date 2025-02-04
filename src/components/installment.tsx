import { View, Text } from 'react-native'
import { AlertCircle, Calendar, CheckCircle, Clock } from 'lucide-react-native'

export type InstallmentData = {
  id: string
  description: string
  numberOfInstallment: number
  due: string
  situation: 'Pago' | 'Pendente' | 'Atrasado'
  fullValue: number
  discount: number
  amountTo: number
  interest: number
  amountPaid: number
  valueWithInterest: number
}

type InstallmentProps = {
  installment: InstallmentData
}

export function Installment({ installment }: InstallmentProps) {
  const situationConfig = {
    Pago: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
    Pendente: { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
    Atrasado: { color: 'bg-red-100 text-red-800', icon: AlertCircle },
  }

  const { color, icon: SituacaoIcon } = situationConfig[installment.situation]

  return (
    <View className="bg-white rounded-lg shadow-md p-4">
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-lg font-semibold text-gray-800 mb-2">
          {installment.description}
        </Text>
        <View
          className={`px-2 py-1 rounded-full flex-row items-center gap-2 ${color}`}
        >
          <SituacaoIcon size={16} color="#6b7280" />
          <Text className="text-xs font-semibold">{installment.situation}</Text>
        </View>
      </View>
      <View className="flex-row gap-2 text-sm justify-between">
        <View className="flex-row gap-2 items-center">
          <Calendar size={16} color="#6b7280" />
          <Text className="text-gray-600">
            Parcela: {installment.numberOfInstallment}
          </Text>
        </View>
        <View className="flex-row items-center gap-2">
          <Clock size={16} color="#6b7280" />
          <Text className="text-gray-600">Vencimento: {installment.due}</Text>
        </View>
      </View>
      <View className="mt-3 gap-2">
        <View className="flex-row justify-between">
          <Text className="text-gray-600">Valor Integral:</Text>
          <Text className="font-semibold">
            R$ {installment.fullValue.toFixed(2)}
          </Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-gray-600">Desconto:</Text>
          <Text className="font-semibold text-green-600">
            R$ {installment.discount.toFixed(2)}
          </Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-gray-600">A Pagar:</Text>
          <Text className="font-semibold">
            R$ {installment.amountTo.toFixed(2)}
          </Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-gray-600">Juros:</Text>
          <Text className="font-semibold text-red-600">
            R$ {installment.interest.toFixed(2)}
          </Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-gray-600">Pago:</Text>
          <Text className="font-semibold">
            R$ {installment.amountPaid.toFixed(2)}
          </Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-gray-600">Valor com Juros:</Text>
          <Text className="font-semibold">
            R$ {installment.valueWithInterest.toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  )
}
