import { useSelector } from 'react-redux'
import { StateType } from '../store'

function useGetPageInfo() {
  const pageInfo = useSelector<StateType>((state) => state.pageInfo)

  return pageInfo
}

export default useGetPageInfo
