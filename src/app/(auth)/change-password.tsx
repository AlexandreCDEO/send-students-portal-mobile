import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { View, ScrollView } from 'react-native'
import { Text } from '@/components/ui/text'
import { Button } from '@/components/ui/button'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import React, { useState } from 'react'
import { StudentPortalLogo } from '@/components/student-portal-logo'
import { useAuth } from '@/contexts/auth-context'
import { useMutation } from '@tanstack/react-query'
import { changePassword } from '@/server/auth/change-password'
import { getErrorMessage } from '@/utils/get-error-message'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { useRouter } from 'expo-router'

const changePasswordSchema = z.object({
  password: z.string().min(1, 'A Senha Atual é obrigatória'),
  newPassword: z.string().min(1, 'A Nova Senha é obrigatória'),
  confirmPassword: z.string().min(1, 'A Confirmação da Senha é obrigatória'),
})

type ChangePasswordSchema = z.infer<typeof changePasswordSchema>

export default function ChangePassword() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
  })

  const router = useRouter()

  const [message, setMessage] = useState<string | null>(null)

  const { userIdToChangePassword } = useAuth()

  const changePasswordMutation = useMutation({
    mutationFn: changePassword,
    onSuccess: data => {
      setMessage(null)
      router.navigate('/(auth)/authenticate')
    },
    onError: error => {
      const errorMessage = getErrorMessage(error)
      setMessage(errorMessage)
    },
  })

  function handleChangePassword(data: ChangePasswordSchema) {
    changePasswordMutation.mutate({
      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      userId: userIdToChangePassword!,
      password: data.password,
      newPassword: data.newPassword,
      confirmPassword: data.confirmPassword,
    })
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View className="flex-1 items-center justify-center bg-gray-50">
        <Card className="w-[80%] gap-3">
          <CardHeader className="items-center">
            <CardHeader>
              <StudentPortalLogo />
            </CardHeader>
          </CardHeader>
          <CardContent className="gap-4">
            {message && (
              <Alert variant="destructive">
                <AlertTitle>Ocorreu um erro</AlertTitle>
                <AlertDescription>{message}</AlertDescription>
              </Alert>
            )}
            <View className="w-full gap-1">
              <Label>Senha Atual</Label>
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <Input
                      secureTextEntry={true}
                      placeholder="Digite sua senha atual"
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

            <View className="w-full gap-1">
              <Label>Nova Senha</Label>
              <Controller
                control={control}
                name="newPassword"
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <Input
                      secureTextEntry={true}
                      placeholder="Digite sua nova senha"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                    {errors.newPassword && (
                      <Text className="text-red-400">
                        {errors.newPassword.message}
                      </Text>
                    )}
                  </>
                )}
              />
            </View>

            <View className="w-full gap-1">
              <Label>Confirmação da Senha</Label>
              <Controller
                control={control}
                name="confirmPassword"
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <Input
                      secureTextEntry={true}
                      placeholder="Confirme sua nova senha"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                    {errors.confirmPassword && (
                      <Text className="text-red-400">
                        {errors.confirmPassword.message}
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
              onPress={handleSubmit(handleChangePassword)}
            >
              <Text>CONFIRMAR</Text>
            </Button>
          </CardFooter>
        </Card>
      </View>
    </ScrollView>
  )
}
