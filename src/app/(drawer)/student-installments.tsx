import type React from 'react'
import { ScrollView, Text, View } from 'react-native'
import { Installment, type InstallmentData } from '@/components/installment'

export default function StudentInstallments() {
  const installments: InstallmentData[] = [
    {
      id: '1',
      description: 'Mensalidade',
      numberOfInstallment: 1,
      due: '10/12/2024',
      situation: 'Pago',
      fullValue: 500.0,
      discount: 50.0,
      amountTo: 450.0,
      interest: 0,
      amountPaid: 450.0,
      valueWithInterest: 450.0,
    },
    {
      id: '2',
      description: 'Mensalidade',
      numberOfInstallment: 2,
      due: '10/01/2025',
      situation: 'Atrasado',
      fullValue: 500.0,
      discount: 50.0,
      amountTo: 450.0,
      interest: 20.0,
      amountPaid: 0,
      valueWithInterest: 470.0,
    },
    {
      id: '3',
      description: 'Mensalidade',
      numberOfInstallment: 3,
      due: '10/02/2025',
      situation: 'Pendente',
      fullValue: 500.0,
      discount: 50.0,
      amountTo: 450.0,
      interest: 0,
      amountPaid: 0,
      valueWithInterest: 450.0,
    },
  ]

  return (
    <ScrollView className="flex-1">
      <View className="bg-gray-100 p-4">
        <Text className="text-2xl font-bold text-primary mb-4">Parcelas</Text>
        <View className="gap-4">
          {installments.map(installment => (
            <Installment key={installment.id} installment={installment} />
          ))}
        </View>
      </View>
    </ScrollView>
  )
}
