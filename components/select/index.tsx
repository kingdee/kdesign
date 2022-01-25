import InternalSelect from './select'
import { ISelectProps } from './interface'
import Option from './option'

interface CompoundedComponent extends React.ForwardRefExoticComponent<ISelectProps & React.RefAttributes<HTMLElement>> {
  Option: typeof Option
}

const Select = InternalSelect as CompoundedComponent
Select.Option = Option

export default Select
