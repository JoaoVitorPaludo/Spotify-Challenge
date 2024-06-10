import { api } from '../../service/api'

export const getRecentPlayedTracks = async (token: string) => {
  const response = await api.get(
    'https://api.spotify.com/v1/me/player/recently-played?limit=5',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  return response
}
