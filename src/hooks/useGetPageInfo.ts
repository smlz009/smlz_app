import { useSelector } from 'react-redux'
import { StateType } from '../store'
import { PageInfoType } from '../store/pageInfoReduce'

function useGetPageInfo() {
  const pageInfo = useSelector<StateType>((state) => state.pageInfo)

  return pageInfo as PageInfoType
}

export default useGetPageInfo
