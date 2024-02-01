import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { changeComponentProps } from '../../../store/compontentsReducer'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { getComponentConfByType, ComponentPropsType } from '../../../components/QuestionComponents'

const NoProps: FC = () => {
  return <div style={{ textAlign: 'center' }}>未选中组件</div>
}

const ComponentProps: FC = () => {
  const { selectedComponent } = useGetComponentInfo()
  const dispatch = useDispatch()
  if (selectedComponent == null) return <NoProps />

  const { type, props, isLocked } = selectedComponent
  const componentConf = getComponentConfByType(type)
  if (componentConf == null) return <NoProps />

  const { PropComponent } = componentConf

  function changeProps(newProps: ComponentPropsType) {
    if (selectedComponent == null) return
    const { fe_id } = selectedComponent
    dispatch(changeComponentProps({ fe_id, newProps }))
  }

  return <PropComponent {...props} onChange={changeProps} disabled={isLocked} />
}

export default ComponentProps
