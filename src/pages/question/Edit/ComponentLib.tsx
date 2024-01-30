import React, { FC } from 'react'
import { Typography } from 'antd'
import { useDispatch } from 'react-redux'
import { componentConfGroup, ComponentConfigType } from '../../../components/QuestionComponents'
import { addComponent } from '../../../store/compontentsReducer'
import styles from './ComponentLib.module.scss'

const { Title } = Typography

function getComponent(c: ComponentConfigType) {
  const dispatch = useDispatch()
  const { Component, title, type, defaultProps } = c
  function handleClick() {
    dispatch(
      addComponent({
        fe_id: new Date() + '',
        type,
        title,
        props: defaultProps
      })
    )
  }
  return (
    <div key={type} className={styles.wrapper} onClick={() => handleClick()}>
      <div className={styles.component}>
        <Component />
      </div>
    </div>
  )
}

const ComponentLib: FC = () => {
  return (
    <>
      {componentConfGroup.map((group, index) => {
        const { groupId, groupName, components } = group
        return (
          <div key={groupId}>
            <Title level={3} style={{ fontSize: '16px', marginTop: index > 0 ? '20px' : '0' }}>
              {groupName}
            </Title>
            <div>{components.map((c) => getComponent(c))}</div>
          </div>
        )
      })}
    </>
  )
}

export default ComponentLib
