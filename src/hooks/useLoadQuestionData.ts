import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { useDispatch } from 'react-redux'
import { getQuestionService } from '../services/question'
import { resetComponents } from '../store/compontentsReducer'

function useLoadQuestionData() {
  const { id = '' } = useParams()
  const dispatch = useDispatch()

  const { loading, data, error, run } = useRequest(
    async (id) => {
      if (!id) throw new Error('没有问卷')
      const data = await getQuestionService(id)
      return data
    },
    {
      manual: true
    }
  )
  useEffect(() => {
    if (!data) return
    const { title = '', componentList = [] } = data

    //获取默认的selectedId
    let selectedId = ''
    if (componentList.length) {
      selectedId = componentList[0].fe_id
    }

    //把画布数据存在 redux中
    dispatch(resetComponents({ componentList, selectedId }))
  }, [data])

  //获取数据
  useEffect(() => {
    run(id)
  }, [id])

  return { loading, error }
}

export default useLoadQuestionData
