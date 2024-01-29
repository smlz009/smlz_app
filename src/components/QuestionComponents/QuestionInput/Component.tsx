import React, { FC } from 'react'
import { Typography, Input } from 'antd'
import { QuestionInputPropsType, QuestionInputPropsTypeDefaultProps } from './interface'

const { Paragraph } = Typography

const QuestionInput: FC<QuestionInputPropsType> = (props: QuestionInputPropsType) => {
  const { title = '', placeholder = '' } = { ...QuestionInputPropsTypeDefaultProps, ...props }

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <div>
        <Input placeholder={placeholder} />
      </div>
    </div>
  )
}

export default QuestionInput
