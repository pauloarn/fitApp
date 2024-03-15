// import config from "@utils/configUtil";
import { CancelToken, create } from 'apisauce'
import config from '../utils/config'
import AsyncStorage from '@react-native-async-storage/async-storage'

const cancelTokenSource = CancelToken.source

const apiSauceInstance = (url?: string) => {
  const instance = create({
    baseURL: url || config.apiUrl,
    headers: {
      'Content-Type': 'application/json'
    }
  })

  instance.axiosInstance.interceptors.request.use(async (request) => {
    const tempToken = await AsyncStorage.getItem(config.localStorageTokenName)
    if (tempToken) {
      request.headers.Authorization = `Bearer ${tempToken}`
    }
    return request
  })

  instance.axiosInstance.interceptors.response.use((response) => {
    return response
  })

  return instance
}

export { apiSauceInstance, cancelTokenSource }
