import InternalRadio from './radio'
import Group from './group'
import Button from './radio-button'
import { IRadioProps } from './interface'

export {
  SizeType,
  RadioType,
  RadioValueType,
  RadioGroupOptionType,
  IRadioProps,
  IRadioOptionType,
  IRadioGroupProps,
  IRadioGroupContextProps,
} from './interface'

interface CompoundedComponent extends React.ForwardRefExoticComponent<IRadioProps & React.RefAttributes<HTMLElement>> {
  Group: typeof Group
  Button: typeof Button
}

const Radio = InternalRadio as CompoundedComponent
Radio.Group = Group
Radio.Group.displayName = 'RadioGroup'
Radio.Button = Button
export { Group, Button }
export default Radio
