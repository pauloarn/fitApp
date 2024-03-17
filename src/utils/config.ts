const apiUrlEnv = process.env.EXPO_PUBLIC_API_URL
const localStorageTokenName = process.env.EXPO_PUBLIC_LOCAL_STORAGE_TOKEN_VAR

const config = {
  apiUrl: apiUrlEnv,
  localStorageTokenName: localStorageTokenName ?? '@fit-app-local-token',
  pathApi: 'fit-app'
}

export default config
