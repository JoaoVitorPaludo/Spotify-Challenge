import { PiX } from 'react-icons/pi'
import { ButtonComponent } from '../../../../components/Button/button'
import * as S from './styles'

interface ModalNewPlaylistProps {
  handleCloseModal: () => void
}
export function ModalNewPlaylist({ handleCloseModal }: ModalNewPlaylistProps) {
  return (
    <S.ModalNewPlaylistContainer>
      <S.ModalNewPlaylistHeader>
        <PiX size={25} onClick={handleCloseModal} />
      </S.ModalNewPlaylistHeader>
      <S.ModalNewPlaylistMain>
        <span>Dê um nome a sua playlist</span>
        <input type="text" />
      </S.ModalNewPlaylistMain>
      <S.ModalNewPlaylistFooter>
        <ButtonComponent text="Criar" />
      </S.ModalNewPlaylistFooter>
    </S.ModalNewPlaylistContainer>
  )
}
