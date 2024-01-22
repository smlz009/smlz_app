import React, { FC, useState, useEffect } from 'react'
import { Pagination, PaginationProps } from 'antd'
import { useSearchParams, useLocation, useNavigate } from 'react-router-dom'
import { LIST_PAGE_PARAM_KYE, LIST_PAGE_SIZE_PARAM_KYE } from '../constant'

type PropsType = {
  total: number
}

const ListPage: FC<PropsType> = (props: PropsType) => {
  const { total } = props
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [searchParams] = useSearchParams()
  const nav = useNavigate()
  //获取当前路径
  const { pathname } = useLocation()

  //分页改变，跳转页面
  const onChange: PaginationProps['onChange'] = (page: number, pageSize: number) => {
    searchParams.set(LIST_PAGE_PARAM_KYE, page.toString())
    searchParams.set(LIST_PAGE_SIZE_PARAM_KYE, pageSize.toString())
    nav({
      pathname,
      search: searchParams.toString()
    })
  }

  //获取url参数
  useEffect(() => {
    //获取页数
    const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KYE) || '') || 1
    setCurrent(page)
    //获取条数
    const pageSize = parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KYE) || '') || 10
    setPageSize(pageSize)
  }, [searchParams])

  return (
    <>
      <Pagination current={current} total={total} pageSize={pageSize} onChange={onChange} />
    </>
  )
}

export default ListPage
