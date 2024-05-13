import { useForm } from 'react-hook-form'
import { PiX } from 'react-icons/pi'
import { z } from 'zod'
import { ButtonComponent } from '../../../../components/Button/button'

import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { useCookies } from 'react-cookie'
import { postNewPlaylist } from '../../../../controller/playlistController/playlistController'
import { useTokenValidator } from '../../../../libs/zustand/globalStore'
import * as S from './styles'

interface ModalNewPlaylistProps {
  handleCloseModal: () => void
}

const CreateNewPlaylistSchema = z.object({
  name: z.string().min(1),
})
export type CreateNewPlaylistSchemaData = z.infer<
  typeof CreateNewPlaylistSchema
>
export function ModalNewPlaylist({ handleCloseModal }: ModalNewPlaylistProps) {
  const methods = useForm<CreateNewPlaylistSchemaData>({
    resolver: zodResolver(CreateNewPlaylistSchema),
  })
  const { validateStatus } = useTokenValidator()
  const [cookies, , removeCookie] = useCookies(['token'])

  async function handleSubmitForm(dataForm: CreateNewPlaylistSchemaData) {
    try {
      await postNewPlaylist(dataForm, cookies.token)
      handleCloseModal()
      methods.reset()
    } catch (error) {
      if (error instanceof AxiosError) {
        validateStatus(error.response!.status, removeCookie('token'))
      }
    }
  }

  console.log(methods.formState.isValid)
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
