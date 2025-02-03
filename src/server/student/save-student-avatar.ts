import { Platform } from 'react-native'
import { api } from '../api'

type SaveStudentAvatarProps = {
  uri: string
  name?: string | null
  type?: string
}

export async function saveStudentAvatar({
  name,
  type,
  uri,
}: SaveStudentAvatarProps) {
  const formData = new FormData()
  formData.append('file', {
    uri: Platform.OS === 'android' ? uri : uri.replace('file://', ''),
    name: name || 'avatar.jpg',
    type: type || 'image/jpeg',
  } as unknown as Blob)

  await api.postForm('/student/avatar', formData)
}
