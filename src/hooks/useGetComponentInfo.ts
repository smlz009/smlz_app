import { useSelector } from 'react-redux'
import type { ComponentsStateType } from '../store/compontentsReducer'
import type { StateType } from '../store/index'

function useGetComponentInfo() {
  const {
    componentList = [],
    selectedId = '',
    copiedComponent
  } = useSelector<StateType>((state) => state.components.present) as ComponentsStateType

  const selectedComponent = componentList.find((c) => c.fe_id === selectedId)

  return { componentList, selectedId, selectedComponent, copiedComponent }
}

export default useGetComponentInfo
