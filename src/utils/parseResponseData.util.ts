import { ApiResponse } from 'apisauce'
import config from './config'
import { ServerData } from '../types/genericTypes'

export const parseResponseData = <T>(
  response: ApiResponse<ServerData<T>>
): ServerData<T> => {
  const authRoute = config.apiUrl

  const getPreviousPage = () => {
    const previousPage = encodeURIComponent(window.location.hash.slice(1))
    return previousPage !== '%2F' ? `?prev=${previousPage}` : ''
  }
  const data = response.data

  if (response.status === 403 && !window.location.hash.includes(authRoute)) {
    const location = window.location
    location.replace(`/#${authRoute}` + getPreviousPage())
  }
  if (data) {
    return {
      success: response.ok,
      body: data.body,
      message: data.message,
      messageCode: data.messageCode,
      statusCode: data.statusCode
    }
  }
  switch (response.problem) {
    case 'CANCEL_ERROR': {
      break
    }
  }
  return {
    success: false,
    message: response.problem || '',
    messageCode: 'UNKNOWN_ERROR',
    statusCode: response.status || 500,
    body: null
  }
}
