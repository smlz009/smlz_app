import React, { FC } from 'react'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'

const Edit: FC = () => {
  const { loading, data } = useLoadQuestionData()

  return (
    <div>
      <h1>{loading ? 'loading' : JSON.stringify(data)}</h1>
    </div>
  )
}

export default Edit
