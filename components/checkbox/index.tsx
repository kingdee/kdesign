import InternalCheckbox, { CheckboxProps } from './checkbox'
import Group from './group'
export { CheckboxSizes, CheckboxTypes, CheckboxSize, CheckboxType, CheckboxValueType } from './group'
export { CheckboxGroupProps } from './group'
export { CheckboxProps } from './checkbox'
interface CompoundedComponent
  extends React.ForwardRefExoticComponent<CheckboxProps & React.RefAttributes<HTMLElement>> {
  Group: typeof Group
}

const Checkbox = InternalCheckbox as CompoundedComponent
Checkbox.Group = Group
export { Group }
export default Checkbox
