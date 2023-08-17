const apiUrlEnv = process.env.API_URL
const tempToken = process.env.TEMP_USER_TOKEN
const localStorageTokenName = process.env.LOCAL_STORAGE_TOKEN_VAR

const config = {
  apiUrl: apiUrlEnv ?? 'http://192.168.0.5:8285',
  token:
    tempToken ??
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJmaXQtYXBwIiwic3ViIjoicGF1bG8uYW1hZG9yOThAZ21haWwuY29tIiwiZXhwIjozNzY5MTU4NzY4Mn0.jCQ8wihU1fHHYt32mBCpRpxW_DHYZTsLUl1GTsTehKs',
  localStorageTokenName: localStorageTokenName ?? '@fit-app-local-token',
  pathApi: 'fit-app'
}

export default config
