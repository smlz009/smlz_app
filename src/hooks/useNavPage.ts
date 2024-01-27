import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import useGetUserInfo from './useGetUserInfo'
import { isLoginOrRegister, HOME_PATH, LOGIN_PATH } from '../router/index'

function useNavPage(waitingUserData: boolean) {
  const { username } = useGetUserInfo()
  const { pathname } = useLocation()
  const nav = useNavigate()

  useEffect(() => {
    if (waitingUserData) return

    //已经登录
    if (username) {
      if (isLoginOrRegister(pathname)) {
        nav(HOME_PATH)
      }
      return
    }

    // 未登录
    if (!isLoginOrRegister(pathname)) {
      nav(LOGIN_PATH)
    }
  }, [username, pathname, waitingUserData])
}

export default useNavPage
