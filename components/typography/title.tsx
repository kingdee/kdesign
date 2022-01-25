import React from 'react'
import { tupleNum } from '../_utils/type'
import Base, { BlockProps } from './base'
import devWarning from '../_utils/devwarning'

export const TitleLevels = tupleNum(1, 2, 3)
export type TitleLevel = typeof TitleLevels[number]

export type TitleProps = Omit<
  BlockProps & {
    level?: TitleLevel
    onClick?: (e?: React.MouseEvent<HTMLDivElement>) => void
  },
  'strong'
>

const Title: React.FC<TitleProps> = (props) => {
  const { level = 1, ...restProps } = props
  let component: string
  if (TitleLevels.indexOf(level) !== -1) {
    component = `h${level}`
  } else {
    devWarning(true, 'typography', `cannot found level '${level}'`)
    component = 'h1'
  }
  return <Base {...restProps} component={component} />
}

export default Title
