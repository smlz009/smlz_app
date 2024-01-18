import React, { FC, useState } from 'react'
import QuestionCard from '../../components/QuestionCard'
import ListSearch from '../../components/ListSearch'
import styles from './common.module.scss'
import { Typography } from 'antd'

const { Title } = Typography

const List: FC = () => {
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
        {questionList.length &&
          questionList.map((q) => {
            const { _id } = q
            return <QuestionCard key={_id} {...q} />
          })}
      </div>
      <div className={styles.footer}>上拉加载</div>
    </>
  )
}

export default List
