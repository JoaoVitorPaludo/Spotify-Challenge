import { PiX } from 'react-icons/pi'
import { ButtonComponent } from '../../../../components/Button/button'

import * as S from './styles'
import { useNewPlaylist } from './useNewPlaylist'

interface ModalNewPlaylistProps {
  handleCloseModal: () => void
  getPlaylist: (offset?: number) => void
}

export function ModalNewPlaylist({
  handleCloseModal,
  getPlaylist,
}: ModalNewPlaylistProps) {
  const { handleSubmitForm, methods } = useNewPlaylist({
    handleCloseModal,
    getPlaylist,
  })

  return (
    <S.ModalNewPlaylistContainer
      onSubmit={methods.handleSubmit(handleSubmitForm)}
    >
      <S.ModalNewPlaylistHeader>
        <PiX size={25} onClick={handleCloseModal} />
      </S.ModalNewPlaylistHeader>
      <S.ModalNewPlaylistMain
        $hasError={!!methods.formState.errors?.name?.message}
      >
        <span>Dê um nome a sua playlist</span>
        <input type="text" {...methods.register('name')} autoComplete="off" />
      </S.ModalNewPlaylistMain>
      <S.ModalNewPlaylistFooter>
        <ButtonComponent
          text="Criar"
          type="submit"
          disabled={!methods.formState.isValid}
        />
      </S.ModalNewPlaylistFooter>
    </S.ModalNewPlaylistContainer>
  )
}
