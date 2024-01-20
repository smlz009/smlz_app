import React, { FC } from 'react'
import QuestionCard from '../../components/QuestionCard'
import ListSearch from '../../components/ListSearch'
import { Typography, Spin } from 'antd'
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData'
import styles from './common.module.scss'

const { Title } = Typography

const List: FC = () => {
  const { data = {}, loading } = useLoadQuestionListData()
  const { list = [], tota = 0 } = data

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {loading && (
          <div style={{ textAlign: 'center' }}>
            <Spin />
          </div>
        )}

        {!loading &&
          list.length &&
          list.map((q: any) => {
            const { _id } = q
            return <QuestionCard key={_id} {...q} />
          })}
      </div>
      <div className={styles.footer}>上拉加载</div>
    </>
  )
}

export default List
