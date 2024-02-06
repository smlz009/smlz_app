import React, { FC, useState, ChangeEvent } from 'react'
import { Button, Typography, Space, Input } from 'antd'
import { LeftOutlined, EditOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import { PageInfoType, changePageTitle } from '../../../store/pageInfoReduce'
import EditToolbar from './EditToolbar'
import styles from './EditHeader.module.scss'

const { Title } = Typography

const TitleElem: FC = () => {
  const { title } = useGetPageInfo() as PageInfoType
  const dispatch = useDispatch()
  const [editState, setEditState] = useState(false)

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const newTitle = e.target.value
    if (newTitle) {
      dispatch(changePageTitle(newTitle))
    }
  }

  if (editState) {
    return (
      <Input
        value={title}
        onPressEnter={() => setEditState(false)}
        onBlur={() => setEditState(false)}
        onChange={(e) => handleChange(e)}
      />
    )
  }

  return (
    <Space>
      <Title>{title}</Title>
      <Button
        type="text"
        icon={<EditOutlined />}
        shape="circle"
        size="small"
        onClick={() => setEditState(true)}
      />
    </Space>
  )
}

const SaveButton: FC = () => {
  return <Button>保存</Button>
}

const EditHeader: FC = () => {
  const nav = useNavigate()

  return (
    <div className={styles['header-wrapper']}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
              返回
            </Button>
            <TitleElem />
          </Space>
        </div>
        <div className={styles.main}>
          <EditToolbar />
        </div>
        <div className={styles.right}>
          <Space>
            <SaveButton />
            <Button type="primary">发布</Button>
          </Space>
        </div>
      </div>
    </div>
  )
}

export default EditHeader
