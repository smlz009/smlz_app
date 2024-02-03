import React, { FC } from 'react'
import { Typography } from 'antd'
import { QuestionInfoPropsType, QuestionInfoDefaultProps } from './interface'

const { Title, Paragraph } = Typography

const Component: FC<QuestionInfoPropsType> = (props: QuestionInfoPropsType) => {
  const { title = '', desc = '' } = { ...QuestionInfoDefaultProps, ...props }

  const descList = desc.split('\n')

  return (
    <div>
      <Title style={{ fontSize: '24px', textAlign: 'center' }}>{title}</Title>
      <Paragraph style={{ textAlign: 'center' }}>
        {descList.map((desc, index) => (
          <span key={index}>
            {index > 0 && <br />} {desc}
          </span>
        ))}
      </Paragraph>
    </div>
  )
}

export default Component
