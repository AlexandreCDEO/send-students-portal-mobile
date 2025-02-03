import { Buffer } from 'buffer'
import { api } from '../api'

export async function getStudentAvatar() {
  const response = await api.get('/student/avatar', {
    responseType: 'arraybuffer', // Garante que os dados vêm como um ArrayBuffer
  })

  // Converter o ArrayBuffer para Base64
  const base64 = `data:${response.headers['content-type']};base64,${Buffer.from(response.data).toString('base64')}`

  return base64
}
