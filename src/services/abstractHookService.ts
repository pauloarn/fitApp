import { apiSauceInstance, cancelTokenSource } from './api'
import { ApiResponse, ApisauceInstance } from 'apisauce'
import { AxiosRequestConfig, Canceler } from 'axios'
import config from '../utils/config'
import { parseResponseData } from '../utils/parseResponseData.util'

interface ReturnMethods<S> {
  cancel: Canceler
  response: Promise<ApiResponse<S, S>>
}

interface Methods {
  get: <S>(url: string, axiosConfig?: AxiosRequestConfig) => ReturnMethods<S>
  post: <S>(
    url: string,
    data?: any,
    axiosConfig?: AxiosRequestConfig
  ) => ReturnMethods<S>
  put: <S>(
    url: string,
    data?: any,
    axiosConfig?: AxiosRequestConfig
  ) => ReturnMethods<S>
  del: <S>(url: string, axiosConfig?: AxiosRequestConfig) => ReturnMethods<S>
  setPath: (path: string) => void
  api: (url?: string) => ApisauceInstance
  setParam: (key: string, value: string | number) => void
}

const makeService = <T>(path: string, func: (method: Methods) => T) => {
  let defaultContext = config.pathApi
  const defaultPath = path
  const mapParam = new Map<string, string>()
  let tempPath = path

  const setPath = (path: string) => {
    tempPath = path
  }

  const getUrl = (path: string): string => {
    let url = buildUrl(config.apiUrl, config.pathApi, tempPath, path)

    mapParam.forEach((value, key) => {
      url = url.replace(key, value)
    })

    return url
  }

  const addParam = (key: string, value: string | number) => {
    mapParam.set(paramKey(key), String(value))
  }

  const paramKey = (key: string) => {
    return `{${key}}`
  }

  const buildUrl = (...paths: string[]) => {
    const ignoreWith = /http(s?)/
    paths.forEach((p, index) => {
      if (ignoreWith.test(p) || !p) return
      if (!p.startsWith('/') && !p.startsWith('?')) {
        paths[index] = '/' + p
      }
    })

    return paths.join('')
  }

  const api = apiSauceInstance()

  const get: Methods['get'] = <T>(path: string, axiosConfig: any) => {
    const source = cancelTokenSource()
    const response = api.get<T>('', undefined, {
      ...axiosConfig,
      cancelToken: source.token,
      baseURL: getUrl(path)
    })

    return {
      response,
      cancel: source.cancel
    }
  }

  const post: Methods['post'] = <T>(
    path: string,
    data?: any,
    axiosConfig?: AxiosRequestConfig
  ) => {
    const source = cancelTokenSource()
    const response = api.post<T>('', data, {
      ...axiosConfig,
      cancelToken: source.token,
      baseURL: getUrl(path)
    })

    return {
      response,
      cancel: source.cancel
    }
  }

  const put: Methods['put'] = <T>(
    path: string,
    data?: any,
    axiosConfig?: AxiosRequestConfig
  ) => {
    const source = cancelTokenSource()
    const response = api.put<T>('', data, {
      ...axiosConfig,
      cancelToken: source.token,
      baseURL: getUrl(path)
    })

    return {
      response,
      cancel: source.cancel
    }
  }

  const del: Methods['del'] = <T>(
    path: string,
    data?: any,
    axiosConfig?: AxiosRequestConfig
  ) => {
    const source = cancelTokenSource()
    const response = api.delete<T>(
      '',
      {},
      {
        ...axiosConfig,
        cancelToken: source.token,
        baseURL: getUrl(path)
      }
    )

    return {
      response,
      cancel: source.cancel
    }
  }

  return () =>
    func({
      get,
      post,
      put,
      del,
      setPath,
      api: apiSauceInstance,
      setParam: addParam
    })
}

export { makeService, parseResponseData }
