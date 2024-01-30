import type { FC } from 'react'
import QuestionInputConf, { QuestionInputPropsType } from './QuestionInput'
import QuestionTitleConf, { QuestionTitlePropsType } from './QuestionTitle'
//各个组件的属性
export type ComponentPropsType = QuestionInputPropsType & QuestionTitlePropsType

//组件的配置
export type ComponentConfigType = {
  title: string
  type: string
  Component: FC<ComponentPropsType>
  defaultProps: ComponentPropsType
}

//所有组件
const componentConfList: ComponentConfigType[] = [QuestionInputConf, QuestionTitleConf]

//组件分组
export const componentConfGroup = [
  {
    groupId: 'text',
    groupName: '文本显示',
    components: [QuestionTitleConf]
  },
  {
    groupId: 'input',
    groupName: '用户输入',
    components: [QuestionInputConf]
  }
]

export function getComponentConfByType(type: string): ComponentConfigType {
  return componentConfList.find((c) => c.type === type) as ComponentConfigType
}
