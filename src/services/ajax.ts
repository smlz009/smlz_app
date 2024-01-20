import axios from 'axios'
import { message } from 'antd'

const instance = axios.create({
  timeout: 5000
})

instance.interceptors.response.use((res) => {
  const resData = (res.data || {}) as ResType
  const { code, data, msg } = resData

  if (code !== 0) {
    // 处理错误信息，例如提示用户或记录日志等操作。
    if (msg) {
      message.error(msg)
    }
    throw new Error(msg)
  }

  return data as any
})

export default instance

export type ResType = {
  code: number
  data?: ResDataType
  msg?: string
}

export type ResDataType = {
  [key: string]: any
}
