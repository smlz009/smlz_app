const key = 'USER_INFO'

export function setUserInfo(info: any) {
  const val = JSON.stringify(info)
  localStorage.setItem(key, val)
}

export function getToken() {
  return JSON.parse(localStorage.getItem(key) || '{}')
}

export function removeToken() {
  return localStorage.removeItem(key)
}
