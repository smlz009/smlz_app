import React, { FC, useState } from 'react'
import styles from './common.module.scss'
import { Typography, Table, Tag, Button, Space, Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import ListSearch from '../../components/ListSearch'

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
    // {
    //   title: '是否标星',
    //   dataIndex: 'isStar',
    //   key: 'isStar'
    // },
    {
      title: '创建时间',
      dataIndex: 'createdAt'
    }
  ]

  const [questionList] = useState([
    {
      _id: '1',
      title: '问卷1',
      isPublished: false,
      answerCount: 5,
      isStar: false,
      createdAt: '3月10日 13:23'
    },
    {
      _id: '2',
      title: '问卷2',
      isPublished: true,
      isStar: true,
      answerCount: 4,
      createdAt: '3月20日 13:23'
    }
  ])

  //记录选中的Ids
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  function handleDel() {
    confirm({
      title: '确认彻底删除问卷',
      icon: <ExclamationCircleOutlined />,
      content: '删除后无法恢复，请谨慎操作',
      onOk() {
        console.log(selectedIds)
      }
    })
  }

  const TableElem = (
    <>
      <div style={{ marginBottom: '12px' }}>
        <Space>
          <Button type="primary" disabled={!selectedIds.length}>
            恢复
          </Button>
          <Button danger disabled={!selectedIds.length} onClick={handleDel}>
            彻底删除
          </Button>
        </Space>
      </div>
      <Table
        dataSource={questionList}
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
      <div className={styles.content}>{TableElem}</div>
    </>
  )
}

export default Trash
