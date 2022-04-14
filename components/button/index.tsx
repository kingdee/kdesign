import InternalButton from './button'
import Dropdown from './group'

const Button = InternalButton as typeof InternalButton & {
  Dropdown: typeof Dropdown
}
Button.Dropdown = Dropdown

export { ButtonType, IButtonProps } from './button'
export default Button
