import { QuestionInfoDefaultProps } from './interface'
import Component from './Component'
import PropComponent from './PropComponent'

export * from './interface'

//Paragraph 组件的配置
export default {
  title: '问卷信息',
  type: 'questionInfo', // 要和后端统一好
  Component,
  PropComponent,
  defaultProps: QuestionInfoDefaultProps
}
