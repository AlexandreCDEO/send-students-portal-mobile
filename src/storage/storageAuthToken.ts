import AsyncStorage from '@react-native-async-storage/async-storage'

import { AUTH_STORAGE } from './storageConfig'

type StorageAuthTokenProps = {
  access_token: string
  refresh_token: string
}

export async function storageAuthTokenSave({
  access_token,
  refresh_token,
}: StorageAuthTokenProps) {
  await AsyncStorage.setItem(
    AUTH_STORAGE,
    JSON.stringify({ access_token, refresh_token })
  )
}

export async function storageAuthTokenGet() {
  const response = await AsyncStorage.getItem(AUTH_STORAGE)

  const { access_token, refresh_token }: StorageAuthTokenProps = response
    ? JSON.parse(response)
    : {}

  return { access_token, refresh_token }
}

export async function storageAuthTokenRemove() {
  await AsyncStorage.removeItem(AUTH_STORAGE)
}
