import { ReactNode } from 'react'
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
export interface IInnerFormat {
  show: Exclude<typeof ColorTypes[number], 'themeColor'>[]
  default: Exclude<typeof ColorTypes[number], 'themeColor'>
}
export interface IColorPickerProps extends PopperProps {
  // 输入框类型
  borderType: BorderType
  // 选择器输入框类名
  className: string
  // 设置颜色选择器的默认值，可以是十六进制颜色值，RGB颜色值，HSL颜色值，或者颜色名称
  defaultValue: string
  // 颜色选择面板显隐配置
  defaultOpen: boolean
  // 功能色名称
  functionalColorName: string
  // 功能色色值
  functionalColor: string
  // 外部输入框的颜色格式配置
  format: Exclude<typeof ColorTypes[number], 'themeColor'>
  // 历史颜色
  historicalColor: string[]
  // 颜色面板的颜色格式配置
  panelFormatConfig: IInnerFormat
  // 占位字符
  placeholder: string
  // 用户自定义的预设颜色
  presetColor: string[]
  // 纯色块模式
  pure: boolean
  // 选择输入框样式
  style: React.CSSProperties
  // 功能色开关的名称
  switchName: { name: string; internationalName?: string }
  // 是否显示透明度输入框
  showAlphaInput: boolean
  // 是否显示无颜色填充按钮
  showClear: boolean
  // 是否跟随功能色,定义了功能色才能控制显示跟随主题色开关
  showSwitch: boolean
  // 是否展示色彩格式转换框
  showColorTransfer: boolean
  // 是否展示系统预设颜色
  showPresetColor: boolean
  // 是否显示外层输入框色块的箭头
  showArrow: boolean
  // 是否展示拾色容器
  showColorPickerBox: { showBox: boolean; showHue: boolean; showOpacity: boolean }
  // 面板显隐受控配置
  visible: boolean
  // 设置颜色选择器的值，可以是十六进制颜色值，RGB颜色值，HSL颜色值，或者颜色名称
  value: string
  // 输入框右侧的图标
  suffixIcon: (rgbColor: string, dom: ReactNode) => React.ReactNode
  // 输入框左侧的图标
  prefixIcon: (rgbColor: string, dom: ReactNode) => React.ReactNode
  // 当颜色选择器的值发生变化时触发的回调函数
  onChange: (inputValue: string, formatColorArr: Array<IColorTypesObj>) => void
  // 面板显隐回调
  onVisibleChange: (visible: boolean) => void
}

export interface IColorPickerPanelProps {
  alpha: number
  alphaNoVerifyVal: string
  clickedPresetColorIndex?: number
  clickedHistoricalColorIndex?: number
  colTypeArr: Array<IColorTypesObj>
  correctColorValue: string
  currentColorType: IColorTypesObj['type']
  inputCorrectColorValue: string
  functionalColor?: string
  functionalColorName: string
  switchName: { name: string; internationalName?: string }
  inputRef: any
  isFollow: boolean
  panelFormatConfig: IInnerFormat
  format: Exclude<typeof ColorTypes[number], 'themeColor'>
  presetColor?: string[]
  historicalColor?: string[]
  showAlphaInput?: boolean
  showSwitch?: boolean
  showClear?: boolean
  showColorTransfer?: boolean
  showPresetColor?: boolean
  showColorPickerBox?: { showBox?: boolean; showHue?: boolean; showOpacity?: boolean }
  showColorPickerPanel: boolean
  value: string
  visible: boolean
  showPanel: boolean
  setCurrentColorType: (currentColorType: IColorTypesObj['type']) => void
  setColTypeArr: (colTypeArr: Array<IColorTypesObj>) => void
  setClickedPresetColorIndex: (clickedColorIndex: number) => void
  setClickedHistoricalColorIndex: (clickedColorIndex: number) => void
  setClickColorIndex: (value: number | string) => void
  setIsFollow: (isFollow: boolean) => void
  setAlphaNoVerifyVal: (NoVerifyVal: string) => void
  setAlpha: (alpha: number) => void
  setCorrectColorValue: (colorValue: string) => void
  setInputCorrectColorValue: (colorValue: string) => void
  setInputColorValue: (colorValue: string) => void
  setShowPanel: (showPanel: boolean) => void
  onChange?: (inputValue: string, formatColorArr: Array<IColorTypesObj>) => void
  onVisibleChange?: (visible: boolean) => void
}
