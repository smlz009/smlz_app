import { useSelector } from 'react-redux'
import type { ComponentsStateType } from '../store/compontentsReducer'
import type { StateType } from '../store/index'

function useGetComponentInfo() {
  const { componentList = [] } = useSelector<StateType>(
    (state) => state.components
  ) as ComponentsStateType

  return { componentList }
}

export default useGetComponentInfo
