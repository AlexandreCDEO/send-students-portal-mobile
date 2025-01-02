import { api } from '../api'

type ChangePasswordWithoutUserIdProps = {
  password: string
  newPassword: string
  confirmPassword: string
}

type ChangePasswordResponse = {
  message: string
}

export async function changePasswordWithoutUserId({
  password,
  newPassword,
  confirmPassword,
}: ChangePasswordWithoutUserIdProps) {
  const { data } = await api.post<ChangePasswordResponse>(
    'password/change/token',
    {
      password,
      newPassword,
      confirmPassword,
    }
  )
  return data
}
