import type React from 'react'
import { View } from 'react-native'
import Svg, { Circle, Text } from 'react-native-svg'

interface CircularProgressProps {
  value: number
  size?: number
  strokeWidth?: number
  color?: string
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  size = 80,
  strokeWidth = 8,
  color = '#3B82F6', // Tailwind blue-500
}) => {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (value / 100) * circumference

  return (
    <View className="items-center justify-center">
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <Circle
          stroke="#E5E7EB" // Tailwind gray-200
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <Circle
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          rotation={-90}
          originX={size / 2}
          originY={size / 2}
        />
        <Text
          x={size / 2}
          y={size / 2}
          dy=".3em"
          textAnchor="middle"
          fontSize={16}
          fontWeight="bold"
          fill={color}
        >
          {`${Math.round(value)}%`}
        </Text>
      </Svg>
    </View>
  )
}
