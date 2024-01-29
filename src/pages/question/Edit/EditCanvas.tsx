import React, { FC } from 'react'
import { Spin } from 'antd'
import { useDispatch } from 'react-redux'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { getComponentConfByType } from '../../../components/QuestionComponents'
import { ComponentInfoType, changeSelectedId } from '../../../store/compontentsReducer'
import styles from './EditCanvas.module.scss'

type PropsType = {
  loading: boolean
}

function genComponent(componentInfo: ComponentInfoType) {
  const { type, props } = componentInfo
  const componentConf = getComponentConfByType(type)
  const { Component } = componentConf
  return <Component {...props} />
}

const EditCanvas: FC<PropsType> = ({ loading }) => {
  const { componentList } = useGetComponentInfo() //获取store redux数据
  const dispatch = useDispatch() //获取dispatch

  function handleClick(id: string) {
    dispatch(changeSelectedId(id))
  }

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '24px' }}>
        <Spin />
      </div>
    )
  }

  return (
    <div className={styles.canvas}>
      {componentList.map((c) => {
        const { fe_id } = c
        return (
          <div
            key={fe_id}
            className={styles['component-wrapper']}
            onClick={() => handleClick(fe_id)}
          >
            <div className={styles.component}>{genComponent(c)}</div>
          </div>
        )
      })}
    </div>
  )
}

export default EditCanvas
