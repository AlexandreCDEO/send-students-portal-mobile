import { TouchableOpacity, View } from 'react-native'
import { Text } from '@/components/ui/text'
import { useMutation } from '@tanstack/react-query'
import { createSessionWithToken } from '@/server/auth/create-session-with-token'
import { getErrorMessage } from '@/utils/get-error-message'
import { useRouter } from 'expo-router'

interface RegistrationCardProps {
  registration: {
    code: string
    course: string
  }
  handleSetMessage: (message: string | null) => void
}

export default function RegistrationCard({
  registration,
  handleSetMessage,
}: RegistrationCardProps) {
  const router = useRouter()

  const authenticateMutation = useMutation({
    mutationFn: createSessionWithToken,
    onSuccess: data => {
      if (data.access_token && data.refresh_token) {
        handleSetMessage(null)
        router.replace('/(drawer)/home/dashboard')
      }

      handleSetMessage(
        'Não foi possível realizar o acesso. Tente novamente mais tarde!'
      )
    },
    onError: error => {
      const errorMessage = getErrorMessage(error)
      handleSetMessage(errorMessage)
    },
  })

  function handleAuthenticate(registration: string) {
    authenticateMutation.mutate({ registration })
  }

  return (
    <View>
      <TouchableOpacity
        className="bg-white rounded-lg p-4 mb-4 border border-gray-200"
        onPress={() => handleAuthenticate(registration.code)}
        activeOpacity={0.7}
      >
        <Text className="text-lg font-bold text-primary mb-2">
          {'Análise e Desenvolvimento de Sistemas'}
        </Text>
      </TouchableOpacity>
    </View>
  )
}
