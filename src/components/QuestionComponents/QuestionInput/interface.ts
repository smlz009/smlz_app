export type QuestionInputPropsType = {
  title?: string
  placeholder?: string
  onChange?: (newProps: QuestionInputPropsType) => void
}

export const QuestionInputPropsTypeDefaultProps: QuestionInputPropsType = {
  title: '输入框标题',
  placeholder: '请输入...'
}
