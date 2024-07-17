import { api } from '../../service/api'

export const getProfileInfos = async (token: string) => {
  const response = await api.get('https://api.spotify.com/v1/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response
}
