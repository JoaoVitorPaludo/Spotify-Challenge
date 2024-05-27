import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { postNewPlaylist } from '../../../../controller/playlistController/playlistController'
import { useTokenValidator } from '../../../../libs/zustand/globalStore'
import { useUserId } from '../../../../libs/zustand/userId'
const CreateNewPlaylistSchema = z.object({
  name: z.string().min(1),
})
export type CreateNewPlaylistSchemaData = z.infer<
  typeof CreateNewPlaylistSchema
>

interface UseNewPlaylistProps {
  handleCloseModal: () => void
  getPlaylist: (offset?: number) => void
}
export const useNewPlaylist = ({
  getPlaylist,
  handleCloseModal,
}: UseNewPlaylistProps) => {
  const { validateStatus } = useTokenValidator()
  const [cookies, , removeCookie] = useCookies(['token'])
  const { userId, fetchUserId } = useUserId()

  useEffect(() => {
    fetchUserId(cookies.token)
  }, [])

  const methods = useForm<CreateNewPlaylistSchemaData>({
    resolver: zodResolver(CreateNewPlaylistSchema),
  })

  async function handleSubmitForm(dataForm: CreateNewPlaylistSchemaData) {
    try {
      await postNewPlaylist(dataForm, cookies.token, userId!)
      handleCloseModal()
      getPlaylist()
      methods.reset()
    } catch (error) {
      if (error instanceof AxiosError) {
        validateStatus(error.response!.status, removeCookie)
      }
    }
  }
  return {
    handleSubmitForm,
    methods,
  }
}
