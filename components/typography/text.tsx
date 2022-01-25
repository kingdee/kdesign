import React from 'react'
import Base, { BlockProps } from './base'

export interface TextProps extends BlockProps {
  onClick?: (e?: React.MouseEvent<HTMLDivElement>) => void
}

const Text: React.FC<TextProps> = (props) => <Base {...props} component="span" />

export default Text
