import { useSelector } from 'react-redux'
import type { ComponentsStateType } from '../store/compontentsReducer'
import type { StateType } from '../store/index'

function useGetComponentInfo() {
  const { componentList = [], selectedId = '' } = useSelector<StateType>(
    (state) => state.components
  ) as ComponentsStateType

  return { componentList, selectedId }
}

export default useGetComponentInfo
