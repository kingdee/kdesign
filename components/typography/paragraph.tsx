import * as React from 'react'
import Base, { BlockProps } from './base'

export interface ParagraphProps extends BlockProps {
  onClick?: (e?: React.MouseEvent<HTMLDivElement>) => void
}

const Paragraph: React.FC<ParagraphProps> = (props) => <Base {...props} component="div" />

export default Paragraph
