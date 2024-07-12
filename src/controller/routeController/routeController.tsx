import { api } from '../../service/api'

export const getAccessToken = async (code: string) => {
  const response = await api.post(
    'https://accounts.spotify.com/api/token',
    {
      grant_type: 'authorization_code',
      code,
      redirect_uri: `${import.meta.env.VITE_REDIRECT_URL}`,
      scope: 'user-top-read playlist-modify-public playlist-modify-private',
    },
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${btoa(
          `${import.meta.env.VITE_CLIENT_ID}:${import.meta.env.VITE_CLIENT_SECRET}`,
        )}`,
      },
    },
  )
  return response
}
