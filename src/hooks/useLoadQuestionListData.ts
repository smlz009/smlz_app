import { useSearchParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { getQuestionListService } from '../services/question'
import { LIST_SEARCH_PARAM_KYE, LIST_PAGE_PARAM_KYE, LIST_PAGE_SIZE_PARAM_KYE } from '../constant'

interface IOpt {
  isStar: boolean
  isDetected: boolean
  page: number
  pageSize: number
}

function useLoadQuestionListData(opt: Partial<IOpt> = {}) {
  const [searchParams] = useSearchParams()

  async function load() {
    //获取关键字
    const keyword = searchParams.get(LIST_SEARCH_PARAM_KYE) || ''
    //获取页数
    const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KYE) || '') || 1
    //获取条数
    const pageSize = parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KYE) || '') || 10

    const data = await getQuestionListService({ keyword, ...opt, page, pageSize })
    return data
  }

  const { data, loading, error, refresh } = useRequest(load, { refreshDeps: [searchParams] })

  return { data, loading, error, refresh }
}

export default useLoadQuestionListData
