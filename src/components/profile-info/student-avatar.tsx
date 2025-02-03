import { Pressable, View, Text } from 'react-native'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Camera } from 'lucide-react-native'
import { colors } from '@/styles/colors'
import { useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getStudentAvatar } from '@/server/student/get-student-avatar'
import { saveStudentAvatar } from '@/server/student/save-student-avatar'

type StudentAvatarProps = {
  name: string | null
  document: string | null | undefined
}

export function StudentAvatar({ name, document }: StudentAvatarProps) {
  const [image, setImage] = useState<string | null>(null)

  const { data: studentAvatar, isSuccess } = useQuery({
    queryKey: ['student-avatar'],
    queryFn: getStudentAvatar,
  })

  const saveStudentAvatarMutation = useMutation({
    mutationFn: saveStudentAvatar,
  })

  if (isSuccess && !image) {
    setImage(studentAvatar)
  }

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    })

    if (!result.canceled) {
      setImage(result.assets[0].uri)
      saveStudentAvatarMutation.mutate({
        uri: result.assets[0].uri,
        name: result.assets[0].fileName,
        type: result.assets[0].mimeType,
      })
    }
  }

  return (
    <View className="flex-row items-center gap-4">
      <View className="relative">
        <Avatar
          className="w-24 h-24 border-2 border-primary"
          alt="Avatar do Estudante"
        >
          {image ? <AvatarImage source={{ uri: image }} /> : null}

          <AvatarFallback>
            <Text>{name?.charAt(0)}</Text>
          </AvatarFallback>
        </Avatar>

        <Pressable
          onPress={pickImage}
          className="absolute bottom-0 right-0 bg-gray-100 rounded-full p-2 cursor-pointer border-2 border-primary"
        >
          <Camera size={12} color={colors.blue.app} />
        </Pressable>
      </View>
      <View className="w-[65%]">
        <Text className="text-base font-bold text-primary">{name}</Text>
        <Text className="text-primary">{document}</Text>
      </View>
    </View>
  )
}
