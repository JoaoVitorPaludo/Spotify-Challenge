import { CreateNewPlaylistSchemaData } from '../../pages/playlist/components/modalNewPlaylist/index.page'
import { api } from '../../service/api'

export const getPlaylistList = async (token: string) => {
  const response = await api.get('https://api.spotify.com/v1/me/playlists', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response
}

export const postNewPlaylist = async (
  name: CreateNewPlaylistSchemaData,
  token: string,
  userId?: string,
) => {
  const response = await api.post(
    `https://api.spotify.com/v1/users/${userId}/playlists`,
    {
      name,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
  return response
}
