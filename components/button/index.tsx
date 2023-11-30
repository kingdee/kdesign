import InternalButton from './button'
import Dropdown from './group'

const Button = InternalButton as typeof InternalButton & {
  Dropdown: typeof Dropdown
}
Button.Dropdown = Dropdown

export { ButtonType, IButtonProps, ButtonSize, ButtonShape, ButtonIconPlace, ButtonHTMLType } from './button'
export { OverlayType, ButtonGroupType } from './group'
export default Button
