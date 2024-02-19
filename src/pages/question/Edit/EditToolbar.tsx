import React, { FC } from 'react'
import { Button, Space, Tooltip } from 'antd'
import {
  DeleteOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  CopyOutlined,
  BlockOutlined,
  UpOutlined,
  DownOutlined,
  UndoOutlined,
  RedoOutlined
} from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { ActionCreators } from 'redux-undo'
import {
  deleteSelectedComponent,
  changeComponentHidden,
  changeComponentLockd,
  copySelectedComponent,
  pasteCopiedComponent,
  moveComponent
} from '../../../store/compontentsReducer'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'

const EditToolbar: FC = () => {
  const { selectedId, selectedComponent, copiedComponent, componentList } = useGetComponentInfo()
  const dispatch = useDispatch()
  const isLocked = selectedComponent?.isLocked
  const length = componentList.length
  const selectedIndex = componentList.findIndex((c) => c.fe_id === selectedId)
  const isFirst = selectedIndex === 0
  const isLast = selectedIndex === length - 1

  //删除
  function handleDelete() {
    dispatch(deleteSelectedComponent())
  }

  //隐藏
  function handleHidden() {
    dispatch(changeComponentHidden({ fe_id: selectedId, isHidden: true }))
  }

  //锁定
  function handleLock() {
    dispatch(changeComponentLockd({ fe_id: selectedId }))
  }

  //复制
  function handleCopy() {
    dispatch(copySelectedComponent())
  }

  //粘贴
  function handlePaste() {
    dispatch(pasteCopiedComponent())
  }

  //上移
  function handleUp() {
    dispatch(moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex - 1 }))
  }

  //下移
  function handleDown() {
    dispatch(moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex + 1 }))
  }

  //撤销
  function handleUndo() {
    dispatch(ActionCreators.undo())
  }

  //下移
  function handleRedo() {
    dispatch(ActionCreators.redo())
  }

  return (
    <Space>
      <Tooltip title="删除">
        <Button shape="circle" icon={<DeleteOutlined />} onClick={handleDelete}></Button>
      </Tooltip>
      <Tooltip title="隐藏">
        <Button shape="circle" icon={<EyeInvisibleOutlined />} onClick={handleHidden}></Button>
      </Tooltip>
      <Tooltip title="锁定">
        <Button
          shape="circle"
          type={isLocked ? 'primary' : 'default'}
          icon={<LockOutlined />}
          onClick={handleLock}
        ></Button>
      </Tooltip>
      <Tooltip title="复制">
        <Button shape="circle" icon={<CopyOutlined />} onClick={handleCopy}></Button>
      </Tooltip>
      <Tooltip title="粘贴">
        <Button
          shape="circle"
          icon={<BlockOutlined />}
          onClick={handlePaste}
          disabled={copiedComponent === null}
        ></Button>
      </Tooltip>
      <Tooltip title="上移">
        <Button shape="circle" icon={<UpOutlined />} onClick={handleUp} disabled={isFirst}></Button>
      </Tooltip>
      <Tooltip title="下移">
        <Button
          shape="circle"
          icon={<DownOutlined />}
          onClick={handleDown}
          disabled={isLast}
        ></Button>
      </Tooltip>
      <Tooltip title="撤销">
        <Button shape="circle" icon={<UndoOutlined />} onClick={handleUndo}></Button>
      </Tooltip>
      <Tooltip title="重做">
        <Button shape="circle" icon={<RedoOutlined />} onClick={handleRedo}></Button>
      </Tooltip>
    </Space>
  )
}

export default EditToolbar
