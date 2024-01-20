import axios from './ajax'
import type { ResDataType } from './ajax'

interface ISearchType {
  keyword: string
  isStar: boolean
  isDetected: boolean
}

//获取单个问卷信息
export async function getQuestionService(id: string): Promise<ResDataType> {
  const data = (await axios.get(`/api/question/${id}`)) as ResDataType
  return data
}

//创建问卷
export async function createQuestionService(): Promise<ResDataType> {
  const data = (await axios.post(`/api/question`)) as ResDataType
  return data
}

//获取问卷列表
export async function getQuestionListService(opt: Partial<ISearchType> = {}): Promise<ResDataType> {
  const data = (await axios.get(`/api/question`, { params: opt })) as ResDataType
  return data
}
