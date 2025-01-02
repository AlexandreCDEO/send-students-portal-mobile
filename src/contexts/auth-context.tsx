import {
  storageAuthTokenRemove,
  storageAuthTokenSave,
} from '@/storage/storageAuthToken'
import { createContext, useCallback, useContext, useState } from 'react'
import { useRouter } from 'expo-router'
import type { Registration } from '@/types/registration'
import { api } from '@/server/api'
import { useStudentProfile } from './student-profile-context'

interface AuthWithRegistrationsProps {
  registrations: Registration[]
  access_token: string
  refresh_token: string
}

interface AuthContextProps {
  userIdToChangePassword: number | null | undefined
  handleSetUserIdToChangePassword: (userId: number) => Promise<void>
  signOut: () => Promise<void>
  handleSetAuthWithRegistrations: ({
    registrations,
    access_token,
    refresh_token,
  }: AuthWithRegistrationsProps) => void
  authWithRegistrations: AuthWithRegistrationsProps
  saveTokenInStorage: (
    access_token: string,
    refresh_token: string
  ) => Promise<void>
}

interface AuthContextProviderProps {
  children: React.ReactNode
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const router = useRouter()

  const [userIdToChangePassword, setuserIdToChangePassword] = useState<
    number | null
  >()

  const [authWithRegistrations, setAuthWithRegistrations] =
    useState<AuthWithRegistrationsProps>({
      registrations: [],
      access_token: '',
      refresh_token: '',
    })

  const handleSetUserIdToChangePassword = async (userId: number) => {
    setuserIdToChangePassword(userId)
  }

  async function handleSetAuthWithRegistrations({
    registrations,
    access_token,
    refresh_token,
  }: AuthWithRegistrationsProps) {
    setAuthWithRegistrations({ registrations, access_token, refresh_token })
    if (access_token && refresh_token) {
      await saveTokenInStorage(access_token, refresh_token)
    }
  }

  const signOut = useCallback(async () => {
    await storageAuthTokenRemove()
    router.replace('/authenticate')
  }, [router])

  async function saveTokenInStorage(
    access_token: string,
    refresh_token: string
  ) {
    api.defaults.headers.common.Authorization = `Bearer ${access_token}`
    await storageAuthTokenSave({ access_token, refresh_token })
  }

  return (
    <AuthContext.Provider
      value={{
        signOut,
        userIdToChangePassword,
        handleSetUserIdToChangePassword,
        handleSetAuthWithRegistrations,
        authWithRegistrations,
        saveTokenInStorage,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  return context
}
