import { api } from '../../service/api'

export const getAcessToken = async (code: string) => {
  const response = await api.post(
    'https://accounts.spotify.com/api/token',
    {
      grant_type: 'authorization_code',
      code,
      redirect_uri: 'http://localhost:5174/callback',
      // scope: 'user-top-read playlist-modify-public playlist-modify-private',
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
