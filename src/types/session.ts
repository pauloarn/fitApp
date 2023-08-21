export interface CreateSessionRequest {
  userEmail: string
  userPassword: string
}

export interface CreateSessionResponse {
  body: {
    authToken: string
  }
}
