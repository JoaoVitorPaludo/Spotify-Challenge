import { api } from '../../service/api'

export const getArtistsList = async (
  token: string,
  limit: number,
  offset: number,
) => {
  const response = await api.get(
    `https://api.spotify.com/v1/me/top/artists?limit=${limit}&offset=${offset}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  return response
}

export const getAlbums = async (token: string, spotifyId: string) => {
  const response = await api.get(
    `https://api.spotify.com/v1/artists/${spotifyId}/albums `,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
  return response
}
