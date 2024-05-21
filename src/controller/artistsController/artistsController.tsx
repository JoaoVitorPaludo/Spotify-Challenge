import { api } from '../../service/api'

export const getArtistsList = async (token: string) => {
  const response = await api.get('https://api.spotify.com/v1/me/top/artists', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response
}
