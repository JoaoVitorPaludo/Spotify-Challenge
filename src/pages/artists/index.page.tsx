import { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { getArtistsList } from '../../controller/artistsController/artistsController'
import * as S from './styles'
export function ArtistsPage() {
  const [cookies] = useCookies(['token'])

  async function testEndpoint() {
    try {
      await getArtistsList(cookies.token)
    } catch (error) {}
  }

  useEffect(() => {
    testEndpoint()
  }, [])

  return (
    <S.ArtistsPageComponent>
      <h1>Top Artistas</h1>
      <p>Aqui você encontra seus artistas preferidos</p>

      <S.ArtistsPageList>
        <S.ArtistsPageListItem>
          <img
            src="https://avatars.githubusercontent.com/u/83378081?v=4"
            alt=""
          />
          <span>Black Alien</span>
        </S.ArtistsPageListItem>
        <S.ArtistsPageListItem>
          <img
            src="https://avatars.githubusercontent.com/u/83378081?v=4"
            alt=""
          />
          <span>Black Alien</span>
        </S.ArtistsPageListItem>
        <S.ArtistsPageListItem>
          <img
            src="https://avatars.githubusercontent.com/u/83378081?v=4"
            alt=""
          />
          <span>Black Alien</span>
        </S.ArtistsPageListItem>
      </S.ArtistsPageList>
    </S.ArtistsPageComponent>
  )
}
