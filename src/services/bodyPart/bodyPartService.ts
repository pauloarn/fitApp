import { makeService } from '../abstractHookService'
import { CategoriesResponse } from '../../types/categories'

const bodyPartService = makeService('body-part', ({ get }) => {
  const getBodyParts = async () => {
    const { response } = get<CategoriesResponse[]>('')

    return response
  }

  return { getBodyParts }
})

export default bodyPartService
