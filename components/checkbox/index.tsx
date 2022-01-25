import InternalCheckbox, { CheckboxProps } from './checkbox'
import Group from './group'
export { CheckboxProps, CheckboxSizes, CheckboxTypes } from './checkbox'
export { CheckboxGroupProps } from './group'
interface CompoundedComponent
  extends React.ForwardRefExoticComponent<CheckboxProps & React.RefAttributes<HTMLElement>> {
  Group: typeof Group
}

const Checkbox = InternalCheckbox as CompoundedComponent
Checkbox.Group = Group
export { Group }
export default Checkbox
