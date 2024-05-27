import { create } from 'zustand'
import { getUserId } from '../../controller/playlistController/playlistController'

type Store = {
  userId: string | null
  fetchUserId: (token: string) => Promise<void>
}

export const useUserId = create<Store>((set) => ({
  userId: null,
  fetchUserId: async (token) => {
    try {
      const { data } = await getUserId(token)
      set({ userId: data.id })
    } catch (err) {
      console.error(err)
    }
  },
}))
