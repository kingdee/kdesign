import InternalSelect from './select'
import { ISelectProps, SelectValue } from './interface'
import Option from './option'

interface CompoundedComponent
  extends React.ForwardRefExoticComponent<ISelectProps<SelectValue> & React.RefAttributes<HTMLElement>> {
  Option: typeof Option
}

const Select = InternalSelect as CompoundedComponent
Select.Option = Option
export * from './interface'
export default Select
