import { ComponentInfoType } from './index'

export function getSelectedNextId(selectedId: string, componentList: ComponentInfoType[]): string {
  const index = componentList.findIndex((c) => c.fe_id === selectedId)
  if (index < 0) return ''
  const length = componentList.length
  let nextSelectId = ''
  if (length <= 1) {
    nextSelectId = ''
  } else {
    if (index + 1 === length) {
      nextSelectId = componentList[index - 1].fe_id
    } else {
      nextSelectId = componentList[index + 1].fe_id
    }
  }

  return nextSelectId
}
