import { makeService } from '../abstractHookService'
import {
  CreateSessionRequest,
  CreateSessionResponse
} from '../../types/session'

export const sessionService = makeService('session', ({ post }) => {
  const createSession = (request: CreateSessionRequest) => {
    const { response } = post<CreateSessionResponse>('', request)

    return response.then((res) => res)
  }

  return { createSession }
})
