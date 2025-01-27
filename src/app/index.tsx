import { storageAuthTokenGet } from '@/storage/storageAuthToken'
import { useRouter } from 'expo-router'
import { useEffect } from 'react'
import { View, ActivityIndicator } from 'react-native'

export default function Index() {
  const router = useRouter()

  useEffect(() => {
    const isLoggedUser = async () => {
      try {
        const { access_token } = await storageAuthTokenGet()
        if (!access_token) {
          router.replace('/(auth)/authenticate')
        } else {
          router.replace('/(drawer)/home/dashboard')
        }
      } catch (error) {
        console.error('Erro ao verificar token do usuário: ', error)
        router.replace('/(auth)/authenticate')
      }
    }

    isLoggedUser()
  }, [router])

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#4978B0" />
    </View>
  )
}
