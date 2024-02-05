import React, { FC } from 'react'
import { Typography, Space, Checkbox } from 'antd'
import { QuestionCheckboxType, QuestionCheckboxDefaultProps } from './interface'

const { Paragraph } = Typography

const QuestionCheckbox: FC<QuestionCheckboxType> = (props: QuestionCheckboxType) => {
  const { title, list, isVertical } = { ...QuestionCheckboxDefaultProps, ...props }
  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <Space direction={isVertical ? 'vertical' : 'horizontal'}>
        {list?.map((item) => {
          const { text, value, checked } = item
          return (
            <Checkbox key={value} checked={checked} value={value}>
              {text}
            </Checkbox>
          )
        })}
      </Space>
    </div>
  )
}

export default QuestionCheckbox
