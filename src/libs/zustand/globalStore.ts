import { create } from 'zustand'

type Store = {
  validateStatus: (
    status: number,
    removeCookie: (name: 'token') => void,
  ) => void
}

export const useTokenValidator = create<Store>(() => ({
  validateStatus: (status: number, removeCookie) => {
    if (status === 401) {
      removeCookie('token')
    }
  },
}))
