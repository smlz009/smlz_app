import React, { FC, useState } from 'react'
import { Typography, Table, Tag, Button, Space, Modal, Spin, message } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { useRequest } from 'ahooks'
import ListSearch from '../../components/ListSearch'
import ListPage from '../../components/ListPage'
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData'
import { updateQuestionService, deleteQuestionService } from '../../services/question'
import styles from './common.module.scss'

const { Title } = Typography
const { confirm } = Modal

const Trash: FC = () => {
  const columns = [
    {
      title: '问卷名称',
      dataIndex: 'title'
    },
    {
      title: '是否发布',
      dataIndex: 'isPublished',
      render: (isPublished: boolean) => {
        return isPublished ? <Tag color="processing">是 </Tag> : <Tag>否</Tag>
      }
    },
    {
      title: '答卷数量',
      dataIndex: 'answerCount'
    },
    {
      title: '创建时间',
      dataIndex: 'createTime'
    }
  ]

  const { data = {}, loading, refresh } = useLoadQuestionListData({ isDetected: true })
  const { list = [], total = 0 } = data

  //记录选中的Ids
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  //恢复
  const { run: handleRestore } = useRequest(
    async () => {
      for (const id of selectedIds) {
        await updateQuestionService(parseInt(id), { isDeleted: false })
      }
    },
    {
      manual: true,
      debounceMaxWait: 500,
      onSuccess() {
        message.success('恢复成功')
        refresh() //手动刷新
        setSelectedIds([])
      }
    }
  )

  //删除
  const { run: handleDelIds } = useRequest(async () => await deleteQuestionService(selectedIds), {
    manual: true,
    debounceMaxWait: 500,
    onSuccess() {
      message.success('删除成功')
      refresh() //手动刷新
      setSelectedIds([])
    }
  })

  function handleDel() {
    confirm({
      title: '确认彻底删除问卷',
      icon: <ExclamationCircleOutlined />,
      content: '删除后无法恢复，请谨慎操作',
      onOk() {
        handleDelIds()
      }
    })
  }

  const TableElem = (
    <>
      <div style={{ marginBottom: '12px' }}>
        <Space>
          <Button type="primary" disabled={!selectedIds.length} onClick={handleRestore}>
            恢复
          </Button>
          <Button danger disabled={!selectedIds.length} onClick={handleDel}>
            彻底删除
          </Button>
        </Space>
      </div>
      <Table
        dataSource={list}
        columns={columns}
        pagination={false}
        rowKey={(q) => q._id}
        rowSelection={{
          type: 'checkbox',
          onChange: (selectedRowKeys) => {
            setSelectedIds(selectedRowKeys as string[])
          }
        }}
      />
    </>
  )

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>回收站</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      {loading ? (
        <div style={{ textAlign: 'center' }}>
          <Spin />
        </div>
      ) : (
        <div className={styles.content}>{TableElem}</div>
      )}
      <div className={styles.footer}>
        <ListPage total={total} />
      </div>
    </>
  )
}

export default Trash
