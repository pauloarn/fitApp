const apiUrlEnv = process.env.API_URL
const localStorageTokenName = process.env.LOCAL_STORAGE_TOKEN_VAR

const config = {
  apiUrl: apiUrlEnv ?? 'http://192.168.0.26:8285',
  localStorageTokenName: localStorageTokenName ?? '@fit-app-local-token',
  pathApi: 'fit-app'
}

export default config
