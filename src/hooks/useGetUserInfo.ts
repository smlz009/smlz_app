import { useSelector } from 'react-redux'
import type { UserStateType } from '../store/userReducer'
import type { StateType } from '../store/index'

function useGetUserInfo() {
  const { username } = useSelector<StateType>((state) => state.user) as UserStateType

  return { username }
}

export default useGetUserInfo
