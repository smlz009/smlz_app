import React, { FC, useState, ChangeEvent } from 'react'
import { Button, Typography, Space, Input, message } from 'antd'
import { LeftOutlined, EditOutlined, LoadingOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useRequest, useKeyPress, useDebounceEffect } from 'ahooks'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { changePageTitle } from '../../../store/pageInfoReduce'
import EditToolbar from './EditToolbar'
import { updateQuestionService } from '../../../services/question'
import styles from './EditHeader.module.scss'

const { Title } = Typography

const TitleElem: FC = () => {
  const { title } = useGetPageInfo()
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
  const { id } = useParams()
  const pageInfo = useGetPageInfo()
  const { componentList = [] } = useGetComponentInfo()

  const { loading, run: save } = useRequest(
    async () => {
      if (!id) return
      await updateQuestionService(parseInt(id), { ...pageInfo, componentList })
    },
    {
      manual: true
    }
  )

  useKeyPress(['ctrl.s', 'meta.s'], (e: KeyboardEvent) => {
    e.preventDefault() // 阻止默认事件
    if (!loading) save()
  })

  //自动保存
  useDebounceEffect(
    () => {
      save()
    },
    [componentList, pageInfo],
    {
      wait: 1000
    }
  )

  return (
    <Button onClick={save} disabled={loading} icon={loading ? <LoadingOutlined /> : null}>
      保存
    </Button>
  )
}

const PublishButton: FC = () => {
  const { id } = useParams()
  const pageInfo = useGetPageInfo()
  const { componentList = [] } = useGetComponentInfo()
  const nav = useNavigate()

  const { loading, run: pub } = useRequest(
    async () => {
      if (!id) return
      await updateQuestionService(parseInt(id), { ...pageInfo, componentList, isPublished: true })
    },
    {
      manual: true,
      onSuccess() {
        message.success('发布成功')
        nav('/question/stat/' + id)
      }
    }
  )

  return (
    <Button type="primary" onClick={pub} disabled={loading}>
      发布
    </Button>
  )
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
            <PublishButton />
          </Space>
        </div>
      </div>
    </div>
  )
}

export default EditHeader
