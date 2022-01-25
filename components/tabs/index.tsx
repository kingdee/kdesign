import ITabs, { ITabsProps } from './tabs'
import TabPane from './tab-pane'

interface CompoundedComponent extends React.ForwardRefExoticComponent<ITabsProps & React.RefAttributes<HTMLElement>> {
  TabPane: typeof TabPane
}

const Tabs = ITabs as CompoundedComponent
Tabs.TabPane = TabPane
// export { TabPane };
export default Tabs
