import * as React from 'react'
import { AnchorProps } from './anchor'
export interface AnchorContextProps {
  registerLink?: (str: string) => void
  activeLink?: string | null
  scrollTo?: (str: string) => void
  onClick?: AnchorProps['onClick']
  type?: AnchorProps['type']
}
const AnchorContext = React.createContext<AnchorContextProps>({})

export default AnchorContext
