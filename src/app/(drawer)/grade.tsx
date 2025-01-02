import { BackButton } from '@/components/back-button'
import React from 'react'
import { Text, View } from 'react-native'

export default function Grade() {
  return (
    <>
      <BackButton />
      <View className="flex-1 items-center justify-center">
        <Text className="text-primary font-heading text-2xl">
          Notas e Faltas
        </Text>
      </View>
    </>
  )
}
