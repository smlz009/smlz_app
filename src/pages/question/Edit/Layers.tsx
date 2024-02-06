import React, { FC, useState, ChangeEvent, MouseEvent } from 'react'
import classNames from 'classnames'
import { message, Input, Button, Space } from 'antd'
import { EyeInvisibleOutlined, LockOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import {
  changeSelectedId,
  changeComponentTitle,
  changeComponentHidden,
  changeComponentLockd
} from '../../../store/compontentsReducer'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import styles from './Layers.module.scss'

const Layers: FC = () => {
  const { componentList, selectedId } = useGetComponentInfo()
  const dispatch = useDispatch()

  const [changeingTitleId, setChangeTitleId] = useState('')

  function handleTitleClick(fe_id: string) {
    const curCom = componentList.find((c) => c.fe_id === fe_id)
    if (curCom && curCom.isHidden) {
      message.info('不能选中隐藏的组件')
      return
    }
    if (fe_id !== selectedId) {
      dispatch(changeSelectedId(fe_id))
      setChangeTitleId('')
      return
    }

    setChangeTitleId(fe_id)
  }
  //修改标题
  function changTitle(event: ChangeEvent<HTMLInputElement>) {
    const newTitle = event.target.value
    if (!newTitle) return
    if (!selectedId) return
    dispatch(changeComponentTitle({ title: newTitle }))
  }

  function changeHidden(e: MouseEvent, fe_id: string, isHidden: boolean) {
    e.stopPropagation()
    dispatch(changeComponentHidden({ fe_id, isHidden }))
  }

  function changesLocked(e: MouseEvent, fe_id: string) {
    e.stopPropagation()
    dispatch(changeComponentLockd({ fe_id }))
  }

  return (
    <>
      {componentList.map((c) => {
        const { fe_id, title, isHidden, isLocked } = c
        return (
          <div key={fe_id} className={styles.wrapper} onClick={() => handleTitleClick(fe_id)}>
            <div
              className={classNames({
                [styles.title]: true,
                [styles.selected]: fe_id === selectedId
              })}
            >
              {fe_id === changeingTitleId && (
                <Input
                  value={title}
                  onChange={changTitle}
                  onPressEnter={() => setChangeTitleId('')}
                  onBlur={() => setChangeTitleId('')}
                />
              )}
              {fe_id !== changeingTitleId && title}
            </div>
            <div className={styles.handler}>
              <Space>
                <Button
                  size="small"
                  shape="circle"
                  className={!isHidden ? styles.btn : ''}
                  icon={<EyeInvisibleOutlined />}
                  type={isHidden ? 'primary' : 'text'}
                  onClick={(e) => changeHidden(e, fe_id, !isHidden)}
                />
                <Button
                  size="small"
                  shape="circle"
                  className={!isLocked ? styles.btn : ''}
                  icon={<LockOutlined />}
                  type={isLocked ? 'primary' : 'text'}
                  onClick={(e) => changesLocked(e, fe_id)}
                />
              </Space>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default Layers
