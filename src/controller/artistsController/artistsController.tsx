import { api } from '../../service/api'

export const getArtistsList = async () => {
  const response = await api.get('/browse/new-releases')
  return response.data.albums.items
}
