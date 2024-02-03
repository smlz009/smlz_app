import { QuestionTextareaDefaultProps } from './interface'
import Component from './Component'
import PropComponent from './PropComponent'

export * from './interface'

//Input 组件的配置
export default {
  title: '多行输入',
  type: 'questionTextarea',
  Component, //画布显示
  defaultProps: QuestionTextareaDefaultProps,
  PropComponent //修改属性
}
