import InternalButton from './button'
import Dropdown from './group'

const Button = InternalButton as typeof InternalButton & {
  Dropdown: typeof Dropdown
}
Button.Dropdown = Dropdown

export type { ButtonType, IButtonProps, ButtonSize, ButtonShape, ButtonIconPlace, ButtonHTMLType } from './button'
export type { OverlayType, ButtonGroupType, GroupButtonType, ButtonGroupProps } from './group'
export default Button
