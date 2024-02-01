import React, { FC } from 'react'
import { Button, Space, Tooltip } from 'antd'
import {
  DeleteOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  CopyOutlined,
  BlockOutlined
} from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import {
  deleteSelectedComponent,
  changeComponentHidden,
  changeComponentLockd,
  copySelectedComponent,
  pasteCopiedComponent
} from '../../../store/compontentsReducer'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'

const EditToolbar: FC = () => {
  const { selectedId, selectedComponent, copiedComponent } = useGetComponentInfo()
  const dispatch = useDispatch()
  const isLocked = selectedComponent?.isLocked

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
    </Space>
  )
}

export default EditToolbar
