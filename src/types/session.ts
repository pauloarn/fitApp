export interface CreateSessionRequest {
  userEmail: string
  userPassword: string
}

export interface CreateSessionResponse {
  authToken: string
}
