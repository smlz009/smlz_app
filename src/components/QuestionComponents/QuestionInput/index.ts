import { QuestionInputPropsTypeDefaultProps } from './interface'
import Component from './Component'

export * from './interface'

//Input 组件的配置
export default {
  title: '请输入标题',
  type: 'questionInput',
  Component,
  defaultProps: QuestionInputPropsTypeDefaultProps
}
