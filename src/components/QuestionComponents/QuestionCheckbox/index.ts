import { QuestionCheckboxDefaultProps } from './interface'
import Component from './Component'
import PropComponent from './PropComponent'

export * from './interface'

//Input 组件的配置
export default {
  title: '多选',
  type: 'questionCheckbox',
  Component, //画布显示
  defaultProps: QuestionCheckboxDefaultProps,
  PropComponent //修改属性
}
