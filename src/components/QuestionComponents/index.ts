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

const componentConfList: ComponentConfigType[] = [QuestionInputConf, QuestionTitleConf]

export function getComponentConfByType(type: string): ComponentConfigType {
  return componentConfList.find((c) => c.type === type) as ComponentConfigType
}
