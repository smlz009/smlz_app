import React, { FC, MouseEvent } from 'react'
import { Spin } from 'antd'
import { useDispatch } from 'react-redux'
import classNames from 'classnames'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import useBindCanvasKeyPress from '../../../hooks/useBindCanvasKeyPress'
import { getComponentConfByType } from '../../../components/QuestionComponents'
import {
  ComponentInfoType,
  changeSelectedId,
  moveComponent
} from '../../../store/compontentsReducer'
import SortableContainer from '../../../components/DragSortable/SortableContainer'
import SortableItem from '../../../components/DragSortable/SortableItem'
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
  const { componentList, selectedId } = useGetComponentInfo() //获取store redux数据
  const dispatch = useDispatch() //获取dispatch
  useBindCanvasKeyPress() //绑定快捷键

  function handleClick(e: MouseEvent, id: string) {
    e.stopPropagation()
    dispatch(changeSelectedId(id))
  }

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '24px' }}>
        <Spin />
      </div>
    )
  }

  //SortableContainer  需要id
  const componentListWithID = componentList.map((c) => ({ ...c, id: c.fe_id }))

  //拖拽排序回掉
  function handleDragEnd(oldIndex: number, newIndex: number) {
    dispatch(moveComponent({ oldIndex, newIndex }))
  }

  return (
    <SortableContainer items={componentListWithID} onDragEnd={handleDragEnd}>
      <div className={styles.canvas}>
        {componentList
          .filter((c) => !c.isHidden)
          .map((c) => {
            const { fe_id, isLocked } = c
            const warpperClass = classNames({
              [styles['component-wrapper']]: true,
              [styles.selected]: fe_id === selectedId,
              [styles.locked]: isLocked
            })
            return (
              <SortableItem key={fe_id} id={fe_id}>
                <div className={warpperClass} onClick={(e) => handleClick(e, fe_id)}>
                  <div className={styles.component}>{genComponent(c)}</div>
                </div>
              </SortableItem>
            )
          })}
      </div>
    </SortableContainer>
  )
}

export default EditCanvas
