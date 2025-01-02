import { api } from '../api'

export interface Genre {
  id: number
  name: string
}

export async function getGenres() {
  const { data } = await api.get<Genre[]>('/genres')
  return data
}
