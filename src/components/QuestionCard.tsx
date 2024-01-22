import React, { FC, useState } from 'react'
import { useRequest } from 'ahooks'
import { Button, Space, Divider, Tag, Popconfirm, Modal, message } from 'antd'
import {
  EditOutlined,
  LineChartOutlined,
  StarOutlined,
  CopyOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons'
import { useNavigate, Link } from 'react-router-dom'
import { updateQuestionService, duplicateQuestionService } from '../services/question'
import styles from './QuestionCard.module.scss'

type PropsType = {
  _id: string
  title: string
  isPublished: boolean
  answerCount: number
  isStar: boolean
  createTime: string
  isDetected: boolean
}

const { confirm } = Modal

const QuestionCard: FC<PropsType> = (props) => {
  const { _id, title, isPublished, answerCount, createTime, isStar, isDetected } = props
  const nav = useNavigate()

  //修改标星
  const [isStartState, setIsStartState] = useState(isStar)
  //修改删除
  const [isDetectedState, setIsDetectedState] = useState(isDetected)

  //修改标星
  const { run: handleIsStart, loading } = useRequest(
    async () => {
      await updateQuestionService(parseInt(_id), { isStar: !isStartState })
    },
    {
      manual: true,
      onSuccess: () => {
        setIsStartState(!isStartState)
        message.success('修改成功')
      }
    }
  )

  //复制
  const { run: handleDuplicate, loading: duplicateLoading } = useRequest(
    async () => {
      const data = await duplicateQuestionService(parseInt(_id))
      return data
    },
    {
      manual: true,
      onSuccess(result: any) {
        message.success('复制成功')
        console.log(result)

        nav(`/question/edit/${result.id}`)
      }
    }
  )

  //删除
  const { run: handlIsDetected, loading: detectedLoading } = useRequest(
    async () => {
      await updateQuestionService(parseInt(_id), { isDetected: !isStartState })
    },
    {
      manual: true,
      onSuccess: () => {
        setIsDetectedState(!isDetectedState)
        message.success('删除成功')
      }
    }
  )

  function del() {
    confirm({
      title: '确定删除该问券吗?',
      icon: <ExclamationCircleOutlined />,
      onOk: () => {
        handlIsDetected()
      }
    })
  }

  if (isDetectedState) return null

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.left}>
          <Link to={isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`}>
            <Space>
              {isStartState && <StarOutlined style={{ color: 'red' }} />}
              {title}
            </Space>
          </Link>
        </div>
        <div className={styles.right}>
          <Space>
            {isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>}
            <span>答卷:{answerCount}</span>
            <span>{createTime}</span>
          </Space>
        </div>
      </div>
      <Divider style={{ margin: '12px' }} />
      <div className={styles['button-container']}>
        <div className={styles.left}>
          <Space>
            <Button
              icon={<EditOutlined />}
              type="text"
              size="small"
              onClick={() => nav(`/question/edit/${_id}`)}
            >
              编辑问卷
            </Button>
            <Button
              icon={<LineChartOutlined />}
              type="text"
              size="small"
              onClick={() => nav(`/question/stat/${_id}`)}
              disabled={!isPublished}
            >
              数据统计
            </Button>
          </Space>
        </div>
        <div className={styles.right}>
          <Space>
            <Button
              icon={<StarOutlined />}
              size="small"
              type="text"
              disabled={loading}
              onClick={handleIsStart}
            >
              {isStartState ? '取消标星' : '标星'}
            </Button>
            <Popconfirm
              title="确定复制该问券吗?"
              okText="确定"
              cancelText="取消"
              onConfirm={handleDuplicate}
            >
              <Button icon={<CopyOutlined />} size="small" type="text" disabled={duplicateLoading}>
                复制
              </Button>
            </Popconfirm>
            <Button
              icon={<DeleteOutlined />}
              size="small"
              type="text"
              onClick={del}
              disabled={detectedLoading}
            >
              删除
            </Button>
          </Space>
        </div>
      </div>
    </div>
  )
}

export default QuestionCard
