import axios from './ajax'
import type { ResDataType } from './ajax'

//获取用户信息
export async function getUserInfoService(id: string): Promise<ResDataType> {
  const data = (await axios.get(`/api/user/${id}`)) as ResDataType
  return data
}

//注册用户
export async function registerService(name: string, password: string): Promise<ResDataType> {
  const data = (await axios.post(`/api/user/create`, { name, password })) as ResDataType
  return data
}

//用户登录
export async function loginService(name: string, password: string): Promise<ResDataType> {
  const data = (await axios.post(`/api/login`, { name, password })) as ResDataType
  return data
}
