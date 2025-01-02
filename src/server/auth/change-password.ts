import { api } from '../api'

type ChangePasswordProps = {
  userId: number | null
  password: string
  newPassword: string
  confirmPassword: string
}

type ChangePasswordResponse = {
  message: string
}

export async function changePassword({
  userId,
  password,
  newPassword,
  confirmPassword,
}: ChangePasswordProps) {
  const { data } = await api.post<ChangePasswordResponse>('password/change', {
    userId,
    password,
    newPassword,
    confirmPassword,
  })

  return data
}
