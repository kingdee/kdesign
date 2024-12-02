import { ForwardRefExoticComponent, RefAttributes } from 'react'

import InternalCollapse, { CollapseProps, IconPositionType } from './collapse'
import Panel from './panel'

interface CompoundedComponent extends ForwardRefExoticComponent<CollapseProps & RefAttributes<HTMLElement>> {
  Panel: typeof Panel
}
const Collapse = InternalCollapse as CompoundedComponent
Collapse.Panel = Panel

export type { CollapseProps } from './collapse'
export type { CollapsePanelProps } from './panel'
export { Panel, IconPositionType }
export default Collapse
