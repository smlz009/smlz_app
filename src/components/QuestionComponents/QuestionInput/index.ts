import { QuestionInputPropsTypeDefaultProps } from './interface'
import Component from './Component'
import PropComponent from './PropComponent'

export * from './interface'

//Input 组件的配置
export default {
  title: '请输入标题',
  type: 'questionInput',
  Component, //画布显示
  defaultProps: QuestionInputPropsTypeDefaultProps,
  PropComponent //修改属性
}
