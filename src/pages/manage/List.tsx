import React, { FC, useState } from 'react'
import QuestionCard from '../../components/QuestionCard'
import styles from './List.module.scss'

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
      isPublished: false,
      isStar: false,
      answerCount: 4,
      createdAt: '3月20日 13:23'
    }
  ])

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <h3>我的问卷</h3>
        </div>
        <div className={styles.right}>搜索</div>
      </div>
      <div className={styles.content}>
        {questionList.map((q) => {
          const { _id } = q
          return <QuestionCard key={_id} {...q} />
        })}
      </div>
      <div className={styles.footer}>分页</div>
    </>
  )
}

export default List
