import { BackButton } from '@/components/back-button'
import React from 'react'
import { Text, View } from 'react-native'

export default function Negotiation() {
  return (
    <>
      <BackButton />
      <View className="flex-1 items-center justify-center">
        <Text className="text-primary font-heading text-2xl">Negociação</Text>
      </View>
    </>
  )
}