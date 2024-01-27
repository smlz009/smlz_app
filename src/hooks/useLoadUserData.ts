import { useEffect, useState } from 'react'
import useGetUserInfo from './useGetUserInfo'
import { useRequest } from 'ahooks'
import { useDispatch } from 'react-redux'
import { getUserInfoService } from '../services/user'
import { loginReduce } from '../store/userReducer'

function useLoadUserData() {
  const [waitingUserData, setWaitingUserData] = useState(true)

  const { username } = useGetUserInfo()

  const dispatch = useDispatch()

  //加载用户信息
  const { run } = useRequest(async () => getUserInfoService('7'), {
    manual: true,
    onSuccess(result) {
      const { name: username } = result
      dispatch(loginReduce({ username })) //存在到redux
    },
    onFinally() {
      setWaitingUserData(false)
    }
  })

  useEffect(() => {
    if (username) {
      setWaitingUserData(false)
      return
    }
    run()
  }, [username])

  return { waitingUserData }
}

export default useLoadUserData
