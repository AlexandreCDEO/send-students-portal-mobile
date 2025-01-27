import type React from 'react'
import { ScrollView, View, Text } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import {
  getStudentMessages,
  type GetStudentMessagesResponse,
} from '@/server/student/get-student-messages'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MessageItem } from '@/components/message-item'

const Messages: React.FC = () => {
  const { data } = useQuery<GetStudentMessagesResponse>({
    queryFn: getStudentMessages,
    queryKey: ['student-messages'],
  })

  return (
    <ScrollView className="flex-1">
      <View className="p-4 gap-4">
        <Text className="text-lg font-bold text-primary">Recados</Text>
        <View className="gap-2">
          {data?.messages?.map(message => (
            <MessageItem
              key={message.id}
              title={message.title}
              date={message.date}
              message={message.message}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  )
}

export default Messages
