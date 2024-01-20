import React, { FC, useState } from 'react'
import QuestionCard from '../../components/QuestionCard'
import ListSearch from '../../components/ListSearch'
import styles from './common.module.scss'
import { Typography, Empty, Spin } from 'antd'
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData'

const { Title } = Typography

const Star: FC = () => {
  const { data = {}, loading } = useLoadQuestionListData({ isStar: true })
  const { list = [], total = 0 } = data

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>星标问券</Title>
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

        {!loading && list.length === 0 ? (
          <Empty />
        ) : (
          list.map((q: any) => {
            const { _id } = q
            return <QuestionCard key={_id} {...q} />
          })
        )}
      </div>
      <div className={styles.footer}>分页</div>
    </>
  )
}

export default Star
