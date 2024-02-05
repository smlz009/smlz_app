import type { FC } from 'react'
import QuestionInputConf, { QuestionInputPropsType } from './QuestionInput'
import QuestionTitleConf, { QuestionTitlePropsType } from './QuestionTitle'
import QuestionParagraphConf, { QuestionParagraphPropsType } from './QuestionParagraph'
import QuestionQuestionInfoConf, { QuestionInfoPropsType } from './QuestionInfo'
import QuestionTextareaConf, { QuestionTextareaPropsType } from './QuestionTextarea'
import QuestionRadioConf, { QuestionRadioPropsType } from './QuestionRadio'
import QuestionCheckboxConf, { QuestionCheckboxType } from './QuestionCheckbox'
//各个组件的属性
export type ComponentPropsType = QuestionInputPropsType &
  QuestionTitlePropsType &
  QuestionParagraphPropsType &
  QuestionInfoPropsType &
  QuestionTextareaPropsType &
  QuestionRadioPropsType &
  QuestionCheckboxType

//组件的配置
export type ComponentConfigType = {
  title: string
  type: string
  Component: FC<ComponentPropsType>
  PropComponent: FC<ComponentPropsType>
  defaultProps: ComponentPropsType
}

//所有组件
const componentConfList: ComponentConfigType[] = [
  QuestionInputConf,
  QuestionTitleConf,
  QuestionParagraphConf,
  QuestionQuestionInfoConf,
  QuestionTextareaConf,
  QuestionRadioConf,
  QuestionCheckboxConf
]

//组件分组
export const componentConfGroup = [
  {
    groupId: 'text',
    groupName: '文本显示',
    components: [QuestionQuestionInfoConf, QuestionTitleConf, QuestionParagraphConf]
  },
  {
    groupId: 'input',
    groupName: '用户输入',
    components: [QuestionInputConf, QuestionTextareaConf]
  },
  {
    groupId: 'chooseGroup',
    groupName: '用户选择',
    components: [QuestionRadioConf, QuestionCheckboxConf]
  }
]

//获取组件
export function getComponentConfByType(type: string): ComponentConfigType {
  return componentConfList.find((c) => c.type === type) as ComponentConfigType
}
