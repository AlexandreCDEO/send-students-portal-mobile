import { colors } from '@/styles/colors'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ChevronDown, ChevronUp, MessageSquare } from 'lucide-react-native'
import { useState } from 'react'
import { Pressable, View, Text } from 'react-native'
import { MessageContent } from './message-content'

type MessageItemProps = {
  title: string
  date: Date
  message: string
}

export function MessageItem({ title, date, message }: MessageItemProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <View className="bg-white rounded-lg shadow-md overflow-hidden">
      <Pressable className="p-4" onPress={() => setIsExpanded(!isExpanded)}>
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-3 flex-1">
            <MessageSquare
              size={20}
              color={colors.blue.app}
              style={{ flexShrink: 0 }}
            />
            <Text className="w-[85%] text-lg font-semibold text-gray-800 line-clamp-2">
              {title}
            </Text>
          </View>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
          )}
        </View>
        <Text className="text-xs text-gray-500">
          {format(date, "d MMM yyyy 'às' HH:mm", { locale: ptBR })}
        </Text>
      </Pressable>
      {isExpanded && (
        <View className="px-4 pb-4 pt-2 text-sm text-gray-700 border-t border-gray-100">
          <MessageContent message={message} />
        </View>
      )}
    </View>
  )
}
