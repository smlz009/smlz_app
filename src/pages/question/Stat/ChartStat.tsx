import React, { FC } from 'react'
import { Typography } from 'antd'

const { Title } = Typography

type PropsType = {
  selectedComponentId: string
  selectedComponentType: string
}

const ChartStat: FC<PropsType> = (props: PropsType) => {
  const { selectedComponentId, selectedComponentType } = props
  return (
    <>
      <Title level={3}>图标统计</Title>
      <div>图标</div>
    </>
  )
}

export default ChartStat
