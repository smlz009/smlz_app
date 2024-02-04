import { QuestionRadioDefaultProps } from './interface'
import Component from './Component'
import PropComponent from './PropComponent'

export * from './interface'

//Input 组件的配置
export default {
  title: '单选',
  type: 'questionRadio',
  Component, //画布显示
  defaultProps: QuestionRadioDefaultProps,
  PropComponent //修改属性
}
