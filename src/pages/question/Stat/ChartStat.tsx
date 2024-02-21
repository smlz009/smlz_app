import React, { FC, useEffect, useState } from 'react'
import { Typography } from 'antd'
import { useRequest } from 'ahooks'
import { useParams } from 'react-router-dom'
import { getQuestionStatService } from '../../../services/question'
import { getComponentConfByType } from '../../../components/QuestionComponents'

const { Title } = Typography

type PropsType = {
  selectedComponentId: string
  selectedComponentType: string
}

const ChartStat: FC<PropsType> = (props: PropsType) => {
  const { selectedComponentId, selectedComponentType } = props
  const { id = '' } = useParams()
  const [stat, setStat] = useState([])

  const { run } = useRequest(
    async (questionId, componentId) => {
      const res = await getQuestionStatService(questionId, componentId)
      return res
    },
    {
      manual: true, // 手动触发
      onSuccess(res) {
        setStat(res.stat)
      }
    }
  )

  useEffect(() => {
    if (selectedComponentId) {
      run(id, selectedComponentId)
    }
  }, [id, selectedComponentId])

  function genStatElem() {
    if (!selectedComponentId) return <div>未选中组件</div>

    const { StatComponent } = getComponentConfByType(selectedComponentType)
    if (!StatComponent) return <div>该组件无统计图标</div>

    return (
      <div>
        <StatComponent stat={stat} />
      </div>
    )
  }

  return (
    <>
      <Title level={3}>图标统计</Title>
      <div>{genStatElem()}</div>
    </>
  )
}

export default ChartStat
