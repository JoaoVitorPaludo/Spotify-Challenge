import * as S from './styles'
import { useHome } from './useHome'
export function HomePage() {
  const { recentPlayedTracks } = useHome()
  return (
    <S.HomePageContainer>
      <S.HomePageHeader>
        <h1>Histórico de musicas</h1>
        <p>Suas ultimas musicas ouvidas</p>
      </S.HomePageHeader>
      {recentPlayedTracks.length > 0 ? (
        <S.HomePageTracksList>
          {recentPlayedTracks.map((track) => (
            <S.HomePageTracksListItem key={track.track.id}>
              <img src={track?.track?.album?.images[0].url} alt="" />
              <aside>
                <p>{track.track.name}</p>
                <span>{track.track.album.name}</span>
              </aside>
            </S.HomePageTracksListItem>
          ))}
        </S.HomePageTracksList>
      ) : (
        <S.HomePageTracksList>
          <S.HomePageTracksListItem>
            <S.SkeletonComponent width={4.5} height={4.5} borderSize="0" />
            <aside>
              <S.SkeletonComponent width={7} height={1.5} borderSize="2" />
              <S.SkeletonComponent width={7} height={1.5} borderSize="2" />
            </aside>
          </S.HomePageTracksListItem>
        </S.HomePageTracksList>
      )}
    </S.HomePageContainer>
  )
}
