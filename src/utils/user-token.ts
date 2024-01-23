const key = 'USER_TOKEN'

export function setToken(token: string) {
  localStorage.setItem(key, token)
}

export function getToken() {
  return localStorage.getItem(key)
}

export function removeToken() {
  return localStorage.removeItem(key)
}
