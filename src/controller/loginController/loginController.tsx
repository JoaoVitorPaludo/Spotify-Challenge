import { api } from '../../service/api'

export const getAuthPage = async () => {
  const response = await api.get('/authorize', {
    params: {
      client_id: import.meta.env.VITE_CLIENT_ID,
      redirect_uri: 'http://localhost:5174/callback',
      response_type: 'code',
      show_dialog: true,
    },
  })
  return response
}
