import InternalCollapse, { CollapseProps, IconPositionType } from './collapse'
import Panel from './panel'
export { PanelProps } from './panel'
interface CompoundedComponent
  extends React.ForwardRefExoticComponent<CollapseProps & React.RefAttributes<HTMLElement>> {
  Panel: typeof Panel
}
const Collapse = InternalCollapse as CompoundedComponent
Collapse.Panel = Panel
export { Panel, IconPositionType }
export default Collapse
