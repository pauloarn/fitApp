import { makeService } from '../abstractHookService'
import { CategoriesResponse } from '../../types/categories'

const equipmentTypeService = makeService('equipment-type', ({ get }) => {
  const getEquipmentTypes = () => {
    const { response } = get<{ body: CategoriesResponse[] }>('')

    return response.then((res) => res)
  }

  return {
    getEquipmentTypes
  }
})

export default equipmentTypeService
