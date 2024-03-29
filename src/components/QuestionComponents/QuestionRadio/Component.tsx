import React, { FC } from 'react'
import { Typography, Radio, Space } from 'antd'
import { QuestionRadioDefaultProps, QuestionRadioPropsType } from './interface'

const { Paragraph } = Typography

const QuestionRadio: FC<QuestionRadioPropsType> = (props: QuestionRadioPropsType) => {
  const {
    title = '',
    isVertical = false,
    options = [],
    value = ''
  } = { ...QuestionRadioDefaultProps, ...props }

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <Radio.Group value={value}>
        <Space direction={isVertical ? 'vertical' : 'horizontal'}>
          {options.map((opt) => {
            const { value, text } = opt
            return (
              <Radio value={value} key={value}>
                {text}
              </Radio>
            )
          })}
        </Space>
      </Radio.Group>
    </div>
  )
}

export default QuestionRadio
