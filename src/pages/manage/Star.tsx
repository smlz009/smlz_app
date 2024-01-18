import React, { FC, useState } from 'react'
import QuestionCard from '../../components/QuestionCard'
import ListSearch from '../../components/ListSearch'
import styles from './common.module.scss'
import { Typography, Empty } from 'antd'

const { Title } = Typography

const Star: FC = () => {
  const [questionList] = useState([
    // {
    //   _id: '1',
    //   title: '问卷1',
    //   isPublished: false,
    //   answerCount: 5,
    //   isStar: false,
    //   createdAt: '3月10日 13:23'
    // }
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
          <Title level={3}>星标问券</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {questionList.length === 0 ? (
          <Empty />
        ) : (
          questionList.map((q) => {
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
