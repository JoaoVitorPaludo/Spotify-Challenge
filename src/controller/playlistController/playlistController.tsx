import { api } from '../../service/api'

export const getPlaylistList = async (token: string) => {
  const response = await api.get('https://api.spotify.com/v1/me/playlists', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response
}
