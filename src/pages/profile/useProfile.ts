import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { getProfileInfos } from '../../controller/profileController/profileController'
import { useTokenValidator } from '../../libs/zustand/globalStore'
interface ProfileListProps {
  display_name: string
  external_urls: {
    spotify: string
  }
  href: string
  id: string
  images: {
    height: number
    url: string
    width: number
  }[]
  type: string
  uri: string
  followers: {
    href: string
    total: number
  }
}
export const useProfile = () => {
  const [profileList, setProfilList] = useState<ProfileListProps>(
    {} as ProfileListProps,
  )
  const [cookies, , removeCookie] = useCookies(['token'])
  const { validateStatus } = useTokenValidator()

  async function getProfile() {
    try {
      const { data } = await getProfileInfos(cookies.token)
      setProfilList(data)
    } catch (error) {
      if (error instanceof AxiosError) {
        validateStatus(error.response!.status, removeCookie('token'))
      }
    }
  }

  useEffect(() => {
    getProfile()
  }, [])

  return {
    profileList,
    removeCookie,
  }
}
