import { useSearchParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { getQuestionListService } from '../services/question'

interface IOpt {
  isStar: boolean
  isDetected: boolean
}

function useLoadQuestionListData(opt: Partial<IOpt> = {}) {
  const [searchParams] = useSearchParams()

  async function load() {
    const keyword = searchParams.get('keyword') || ''
    const data = await getQuestionListService({ keyword, ...opt })
    return data
  }

  const { data, loading, error } = useRequest(load, { refreshDeps: [searchParams] })

  return { data, loading, error }
}

export default useLoadQuestionListData
