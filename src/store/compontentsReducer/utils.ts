import { ComponentInfoType, ComponentsStateType } from './index'

export function getSelectedNextId(selectedId: string, componentList: ComponentInfoType[]): string {
  const visibleComponentList = componentList.filter((c) => !c.isHidden)
  const index = visibleComponentList.findIndex((c) => c.fe_id === selectedId)
  if (index < 0) return ''
  const length = visibleComponentList.length
  let nextSelectId = ''
  if (length <= 1) {
    nextSelectId = ''
  } else {
    if (index + 1 === length) {
      nextSelectId = visibleComponentList[index - 1].fe_id
    } else {
      nextSelectId = visibleComponentList[index + 1].fe_id
    }
  }

  return nextSelectId
}

export function inserNewComponent(state: ComponentsStateType, newComponent: ComponentInfoType) {
  const { selectedId, componentList } = state
  const index = componentList.findIndex((item) => item.fe_id === selectedId)
  if (index < 0) {
    componentList.push(newComponent)
  } else {
    componentList.splice(index + 1, 0, newComponent)
  }
  state.selectedId = newComponent.fe_id
}
