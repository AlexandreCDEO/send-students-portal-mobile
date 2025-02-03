import React from 'react'
import { View } from 'react-native'
import QRCode from 'react-native-qrcode-svg'
interface QRCodeGeneratorProps {
  value: string
  size: number
}

export function QRCodeGenerator({ value, size }: QRCodeGeneratorProps) {
  return (
    <View>
      <QRCode value={value} size={size} />
    </View>
  )
}
