import React, { FC, useState, useEffect } from 'react'
import type { ChangeEvent } from 'react'
import { Input } from 'antd'
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { LIST_SEARCH_PARAM_KYE } from '../constant'

const { Search } = Input

const ListSearch: FC = () => {
  const nav = useNavigate()
  const { pathname } = useLocation()

  const [value, setValue] = useState<string>('')

  const [searchParams] = useSearchParams()

  useEffect(() => {
    const curVal = searchParams.get(LIST_SEARCH_PARAM_KYE) || ''
    setValue(curVal)
  }, [searchParams])

  function hanldeChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value)
  }

  function handleSearch(value: string) {
    nav({
      pathname,
      search: `?${LIST_SEARCH_PARAM_KYE}=${value}`
    })
  }

  return (
    <>
      <Search
        placeholder="输入关键字"
        allowClear
        onSearch={handleSearch}
        onChange={hanldeChange}
        enterButton
        style={{ width: '250px' }}
        value={value}
      />
    </>
  )
}

export default ListSearch
