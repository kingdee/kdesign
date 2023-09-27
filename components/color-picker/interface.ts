import { tuple } from '../_utils/type'
import { PopperProps } from '../_utils/usePopper'

export const ColorTypes = tuple('HEX', 'HSB', 'RGB', 'HSL', 'themeColor')
export type ColorType = typeof ColorTypes[number]
export interface IColorTypesObj {
  type: ColorType
  value: string
}

export const BorderTypes = tuple('underline', 'bordered')
export type BorderType = typeof BorderTypes[number]
export interface IColorPickerProps extends PopperProps {
  // 设置颜色选择器的值，可以是十六进制颜色值，RGB颜色值，HSL颜色值，或者颜色名称
  value: string
  // 设置颜色选择器的默认值，可以是十六进制颜色值，RGB颜色值，HSL颜色值，或者颜色名称
  defaultValue: string
  // 选择器输入框类名
  className: string
  // 选择输入框样式
  style: React.CSSProperties
  // 输入框类型
  borderType: BorderType
  // 输入框右侧的图标
  suffixIcon: (rgbColor: string) => React.ReactNode
  // 功能色名称
  functionalColorName: string
  // 功能色色值
  functionalColor: string
  // 功能色开关的名称
  switchName: { name: string; internationalName?: string }
  // 是否跟随功能色,定义了功能色才能控制显示跟随主题色开关
  showSwitch: boolean
  // 是否展示色彩格式转换框
  showColorTransfer: boolean
  // 是否展示系统预设颜色
  showPresetColor: boolean
  // 占位字符
  placeholder: string
  // 用户自定义的预设颜色
  presetColor: string[]
  // 是否展示拾色容器
  showColorPickerBox: { showBox: boolean; showHue: boolean; showOpacity: boolean }
  // 颜色选择面板显隐配置
  defaultOpen: boolean
  // 面板显隐受控配置
  visible: boolean
  // 当颜色选择器的值发生变化时触发的回调函数
  onChange: (inputValue: string, formatColorArr: Array<IColorTypesObj>) => void
  // 面板显隐回调
  onVisibleChange: (visible: boolean) => void
}

export interface IColorPickerPanelProps {
  alpha: number
  alphaNoVerifyVal: string
  clickedColorIndex?: number
  colTypeArr: Array<IColorTypesObj>
  correctColorValue: string
  currentColorType: IColorTypesObj['type']
  functionalColor?: string
  functionalColorName: string
  switchName: { name: string; internationalName?: string }
  inputRef: any
  isFollow: boolean
  presetColor?: string[]
  showSwitch?: boolean
  showColorTransfer?: boolean
  showPresetColor?: boolean
  showColorPickerBox?: { showBox?: boolean; showHue?: boolean; showOpacity?: boolean }
  showColorPickerPanel: boolean
  value: string
  visible: boolean
  showPanel: boolean
  setCurrentColorType: (currentColorType: IColorTypesObj['type']) => void
  setColTypeArr: (colTypeArr: Array<IColorTypesObj>) => void
  setClickedColorIndex: (clickedColorIndex: number) => void
  setIsFollow: (isFollow: boolean) => void
  setAlphaNoVerifyVal: (NoVerifyVal: string) => void
  setAlpha: (alpha: number) => void
  setCorrectColorValue: (colorValue: string) => void
  setInputColorValue: (colorValue: string) => void
  setShowPanel: (showPanel: boolean) => void
  onChange?: (inputValue: string, formatColorArr: Array<IColorTypesObj>) => void
  onVisibleChange?: (visible: boolean) => void
}
