import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { View, ScrollView } from 'react-native'
import { Text } from '@/components/ui/text'
import { Button } from '@/components/ui/button'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import React, { useState } from 'react'
import { StudentPortalLogo } from '@/components/student-portal-logo'
import { useMutation } from '@tanstack/react-query'
import {
  createSession,
  type CreateSessionResponse,
} from '@/server/auth/create-session'
import { getErrorMessage } from '@/utils/get-error-message'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { useAuth } from '@/contexts/auth-context'
import { useRouter } from 'expo-router'

const authenticateSchema = z.object({
  registration: z.string().min(1, 'A matrícula é obrigatória'),
  password: z.string().min(1, 'A senha é obrigatória'),
})

type AuthenticateSchema = z.infer<typeof authenticateSchema>

export default function Authenticate() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthenticateSchema>({
    resolver: zodResolver(authenticateSchema),
  })

  const router = useRouter()

  const {
    handleSetUserIdToChangePassword,
    handleSetAuthWithRegistrations,
    saveTokenInStorage,
  } = useAuth()

  const [message, setMessage] = useState<string | null>(null)

  const handleSuccess = (data: CreateSessionResponse) => {
    if (data.userIdToChangePassword) {
      setMessage(null)
      handleSetUserIdToChangePassword(data.userIdToChangePassword)
      router.navigate('/(auth)/change-password')
    }

    if (
      data.registrations.length > 0 &&
      data.access_token &&
      data.refresh_token
    ) {
      handleSetAuthWithRegistrations({
        registrations: data.registrations.map(registration => ({
          code: registration.code,
          course: registration.course,
        })),
        access_token: data.access_token,
        refresh_token: data.refresh_token,
      })
      router.navigate('/(auth)/registrations-selector')
    }

    if (
      data.access_token &&
      data.refresh_token &&
      data.registrations.length === 0
    ) {
      saveTokenInStorage(data.access_token, data.refresh_token)
      router.replace('/(drawer)/home')
    }

    setMessage(
      'Não foi possível realizar o acesso. Tente novamente mais tarde!'
    )
  }

  const authenticateMutation = useMutation({
    mutationFn: createSession,
    onSuccess: handleSuccess,
    onError: error => {
      const errorMessage = getErrorMessage(error)
      setMessage(errorMessage)
    },
  })

  function handleAuthenticate(data: AuthenticateSchema) {
    authenticateMutation.mutate({
      username: data.registration,
      password: data.password,
    })
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View className="flex-1 items-center justify-center bg-gray-50">
        <Card className="w-[80%] gap-3">
          <CardHeader>
            <StudentPortalLogo />
          </CardHeader>
          <CardContent className="gap-4">
            <View className="w-full gap-1">
              {message && (
                <Alert className="mb-5" variant="destructive">
                  <AlertTitle>Ocorreu um erro</AlertTitle>
                  <AlertDescription>{message}</AlertDescription>
                </Alert>
              )}
              <Label>Matrícula/CPF</Label>
              <Controller
                control={control}
                name="registration"
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <Input
                      placeholder="Digite seu nº da Matrícula ou CPF"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                    {errors.registration && (
                      <Text className="text-red-400">
                        {errors.registration.message}
                      </Text>
                    )}
                  </>
                )}
              />
            </View>

            <View className="w-full gap-1">
              <Label>Senha</Label>
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <Input
                      secureTextEntry={true}
                      placeholder="Digite sua senha"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                    {errors.password && (
                      <Text className="text-red-400">
                        {errors.password.message}
                      </Text>
                    )}
                  </>
                )}
              />
            </View>
          </CardContent>
          <CardFooter className="mb-5">
            <Button
              className="w-full"
              onPress={handleSubmit(handleAuthenticate)}
              disabled={authenticateMutation.isPending}
            >
              <Text>INICIAR SESSÃO</Text>
            </Button>
          </CardFooter>
        </Card>
      </View>
    </ScrollView>
  )
}
