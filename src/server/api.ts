import {
  storageAuthTokenGet,
  storageAuthTokenSave,
} from '@/storage/storageAuthToken'
import { AppError } from '@/utils/app-error'
import axios, { type AxiosInstance, type AxiosError } from 'axios'

type SignOut = () => void

type PromiseType = {
  onSuccess: (token: string) => void
  onFailure: (error: AxiosError) => void
}

type APIInstanceProps = AxiosInstance & {
  registerInterceptTokenManager: (signOut: SignOut) => () => void
}

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  withCredentials: true,
}) as APIInstanceProps

let failedQueue: Array<PromiseType> = []
let isRefreshing = false

api.registerInterceptTokenManager = signOut => {
  const interceptTokenManager = api.interceptors.response.use(
    response => response,
    async requestError => {
      if (requestError?.response?.status === 401) {
        if (
          requestError.response.data.messages[0] ===
          'Token de autenticação inválido ou ausente.'
        ) {
          const { refresh_token } = await storageAuthTokenGet()
          if (!refresh_token) {
            signOut()
            return requestError.response?.data
              ? Promise.reject(
                  new AppError(requestError.response.data.messages)
                )
              : Promise.reject(requestError)
          }

          const originalRequestConfig = requestError.config

          if (isRefreshing) {
            return new Promise((resolve, reject) => {
              failedQueue.push({
                onSuccess: (token: string) => {
                  originalRequestConfig.headers = {
                    Authorization: `Bearer ${token}`,
                  }
                  resolve(api(originalRequestConfig))
                },
                onFailure: (error: AxiosError) => {
                  reject(error)
                },
              })
            })
          }

          isRefreshing = true

          // biome-ignore lint/suspicious/noAsyncPromiseExecutor: <explanation>
          return new Promise(async (resolve, reject) => {
            try {
              const { data } = await api.patch<{
                access_token: string
                refresh_token: string
              }>('/token/refresh', { refresh_token })

              storageAuthTokenSave(data)

              if (originalRequestConfig.data) {
                originalRequestConfig.data = JSON.parse(
                  originalRequestConfig.data
                )
              }
              ;('new access token')
              originalRequestConfig.headers = {
                Authorization: `Bearer ${data.access_token}`,
              }

              api.defaults.headers.common.Authorization = `Bearer ${data.access_token}`

              // biome-ignore lint/complexity/noForEach: <explanation>
              failedQueue.forEach(request => {
                request.onSuccess(data.access_token)
              })

              resolve(api(originalRequestConfig))

              // biome-ignore lint/suspicious/noExplicitAny: <explanation>
            } catch (error: any) {
              // biome-ignore lint/complexity/noForEach: <explanation>
              failedQueue.forEach(request => {
                request.onFailure(error)
              })
              signOut()
              reject(error)
            } finally {
              isRefreshing = false
              failedQueue = []
            }
          })
        }

        signOut()
      }

      if (requestError.response?.data) {
        return Promise.reject(new AppError(requestError.response.data.messages))
      }

      return Promise.reject(requestError)
    }
  )

  return () => {
    api.interceptors.response.eject(interceptTokenManager)
  }
}

// Register the interceptor for testing purposes
api.registerInterceptTokenManager(() => {
  console.log('Sign out function called')
})

export { api }
