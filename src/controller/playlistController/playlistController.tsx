import { CreateNewPlaylistSchemaData } from '../../pages/playlist/components/modalNewPlaylist/index.page'
import { api } from '../../service/api'

export const getPlaylistList = async (
  token: string,
  limit: number,
  offset: number,
) => {
  const response = await api.get(
    `https://api.spotify.com/v1/me/playlists?limit=${limit}&offset=${offset}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
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
      ...name,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
  return response
}

export const getUserId = async () => {}
