import React, { FC, useState, useEffect, useRef, useMemo } from 'react'
import { Typography, Spin, Empty } from 'antd'
import { useSearchParams } from 'react-router-dom'
import { useDebounceFn, useRequest } from 'ahooks'
import QuestionCard from '../../components/QuestionCard'
import ListSearch from '../../components/ListSearch'
import { getQuestionListService } from '../../services/question'
import styles from './common.module.scss'

const { Title } = Typography

const List: FC = () => {
  const [searchParams] = useSearchParams()

  const [list, setList] = useState([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [stared, setStared] = useState(false) //是否开启加载 防抖太慢
  const haveMoreData = total > list.length //是否还要更多数据
  const keyword = searchParams.get('keyword') || ''

  //获取底部ref
  const footerRef = useRef<HTMLDivElement>(null)

  //获取列表数据
  const { run: loadList, loading } = useRequest(
    async () => {
      const data = getQuestionListService({ page, keyword, pageSize: 10 })

      return data
    },
    {
      manual: true,
      onSuccess: (res) => {
        const { list: l = [], total = 0 } = res
        setList(list.concat(l))
        setTotal(total)
        setPage(page + 1)
      }
    }
  )

  //触发加载更多（防抖）
  const { run: handleLoadMore } = useDebounceFn(
    () => {
      const elm = footerRef.current
      if (!elm) return
      const domRect = elm.getBoundingClientRect()
      if (!domRect) return
      if (domRect.bottom <= document.body.clientHeight) {
        loadList()
        setStared(true)
      }
    },
    {
      wait: 1000
    }
  )

  //页面加载完成，url变化 触发加载
  useEffect(() => {
    handleLoadMore()
  }, [searchParams])

  //搜索变化
  useEffect(() => {
    setList([])
    setPage(1)
    setTotal(0)
    setStared(false)
  }, [keyword])

  //页面滚动时，加载页面
  useEffect(() => {
    if (haveMoreData) {
      window.addEventListener('scroll', handleLoadMore)
    }

    return () => {
      //解绑事件
      window.removeEventListener('scroll', handleLoadMore)
    }
  }, [haveMoreData])

  const loadFooterElem = useMemo(() => {
    if (!stared || loading) return <Spin />
    if (!list.length) return <Empty />
    if (!haveMoreData) return <div>到底啦。。。</div>
    return <span>加载中。。。</span>
  }, [stared, loading, haveMoreData])

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
        {!!list.length &&
          list.map((q: any) => {
            const { _id } = q
            return <QuestionCard key={_id} {...q} />
          })}
      </div>
      <div className={styles.footer} ref={footerRef}>
        {loadFooterElem}
      </div>
    </>
  )
}

export default List
