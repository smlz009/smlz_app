import axios from './ajax'
import type { ResDataType } from './ajax'

interface ISearchType {
  keyword: string
  isStar: boolean
  isDetected: boolean
  page: number
  pageSize: number
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

//更新问卷
export async function updateQuestionService(
  id: number,
  opt: { [key: string]: any }
): Promise<ResDataType> {
  const data = (await axios.patch(`/api/question/${id}`, opt)) as ResDataType
  return data
}

//复制问卷
export async function duplicateQuestionService(id: number): Promise<ResDataType> {
  const data = (await axios.post(`/api/question/duplicate/${id}`)) as ResDataType
  return data
}

//删除问卷
export async function deleteQuestionService(ids: string[]): Promise<ResDataType> {
  const data = (await axios.delete(`/api/question`), { ids }) as ResDataType
  return data
}

//答卷列表
export async function getQuestionStatListService(
  id: string,
  opt: { page: number; pageSize: number }
): Promise<ResDataType> {
  const data = (await axios.get(`/api/question/stat/${id}`, { params: opt })) as ResDataType
  return data
}

//答卷统计数据
export async function getQuestionStatService(
  questionId: string,
  componentId: string
): Promise<ResDataType> {
  const data = (await axios.get(`/api/question/stat/${questionId}/${componentId}`)) as ResDataType
  return data
}
