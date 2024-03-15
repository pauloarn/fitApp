import { makeService } from '../abstractHookService'
import { UserData } from '../../types/uset'

export const userService = makeService('user', ({ get }) => {
  const getLoggedUserToken = () => {
    const { response } = get<{ body: UserData }>('/me')

    return response.then((res) => res)
  }
  return { getLoggedUserToken }
})
