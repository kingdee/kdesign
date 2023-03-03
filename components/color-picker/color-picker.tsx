/* eslint-disable */
import React, { FC, useContext, useState, useRef, useEffect } from 'react'
import classNames from 'classnames'
import { ConfigContext } from '../config-provider'
import { Input, Icon } from '../index'
import { validateColor } from './utils/validateColor'
import { colorTypes, IColorTypes } from './constant/colorTypes'
import ColorPickerPanel from './color-picker-panel'
import {
  colorFormat,
  strFixed,
  getColorObj,
  valOfCorrespondingType,
  highlightPresetColorIndex,
  presetColorToHEX,
} from './utils/colorFormat'
import { toLowerCase } from './utils/convertLetters'
import { defaultSystemColor } from './constant/defaultColor'
import Color from 'color'
import { getCompProps } from '../_utils'
import usePopper from '../_utils/usePopper'
import { systemPresetColor } from './constant/systemPresetColor'

export interface IColorPickerProps {
  // 设置颜色选择器的值，可以是十六进制颜色值，RGB颜色值，HSL颜色值，或者颜色名称
  value: string
  // 设置颜色选择器的默认值，可以是十六进制颜色值，RGB颜色值，HSL颜色值，或者颜色名称
  defaultValue: string
  // 选择器输入框类名
  className: string
  // 选择输入框样式
  style: React.CSSProperties
  // 输入框类型
  borderType: 'underline' | 'bordered'
  // 输入框右侧的图标
  suffixIcon: (formatColorArr: Array<IColorTypes>) => React.ReactNode
  // 主题色
  themeColor: string
  // 是否跟随主题,定义了主题色才能控制显示跟随主题色开关
  showFollowThemeSwitch: boolean
  // 是否展示色彩格式转换框
  showChangeColorTypeInput: boolean
  // 是否展示系统预设颜色
  showPresetColor: boolean
  // 用户自定义的预设颜色
  presetColor: string[]
  // 是否展示拾色容器
  showColorPickerBox: boolean
  // 面板显隐配置
  defaultOpen: boolean
  // 当颜色选择器的值发生变化时触发的回调函数
  onChange: (inputValue: string, formatColorArr: Array<IColorTypes>) => void
}

const ColorPicker: FC<Partial<IColorPickerProps>> = (props) => {
  const { getPrefixCls, prefixCls, compDefaultProps: userDefaultProps } = useContext(ConfigContext)
  const colorPickerProps = getCompProps('ColorPicker', userDefaultProps, props)
  const {
    value,
    className,
    style,
    themeColor,
    showFollowThemeSwitch,
    showChangeColorTypeInput,
    showPresetColor,
    showColorPickerBox,
    borderType,
    presetColor,
    defaultValue,
    defaultOpen,
    suffixIcon,
    onChange,
  } = colorPickerProps
  const [inputColorValue, setInputColorValue] = useState<string>(defaultValue || '')
  const [correctColorValue, setCorrectColorValue] = useState<string>(defaultValue || defaultSystemColor)
  const [currentColorType, setCurrentColorType] = useState<IColorTypes['type']>('HEX')
  const [colTypeArr, setColTypeArr] = useState<Array<IColorTypes>>(colorTypes as IColorTypes[])
  const [showPanel, setShowPanel] = useState<boolean>(defaultOpen || false)
  const [alpha, setAlpha] = useState<number>(1)
  const [alphaNoVerifyVal, setAlphaNoVerifyVal] = useState<string>(alpha * 100 + '%')
  const [isFollow, setIsFollow] = useState<boolean>(false)
  const [clickedColorIndex, setClickedColorIndex] = useState<number>()

  const colorPickerPrefixCls = getPrefixCls!(prefixCls, 'color-picker')
  const popUpLayer = getPrefixCls!(prefixCls, 'color-picker-pop')
  const containerCls = classNames(`${colorPickerPrefixCls}-container`)
  const inputCls = classNames(`${colorPickerPrefixCls}-input`, className)
  const inputRef = useRef<HTMLInputElement>(null)

  const setIconColor = (inpValue: string) => {
    const inputValType = validateColor(inpValue)
    if (inputValType) {
      const formatArr = colorFormat(inpValue, strFixed(Color(getColorObj(inpValue)).alpha(), 2)) as IColorTypes[]
      setColTypeArr(formatArr)
      setCorrectColorValue(formatArr[valOfCorrespondingType(currentColorType) as number].value)
      setClickedColorIndex(
        highlightPresetColorIndex(formatArr[0].value, presetColorToHEX(presetColor || systemPresetColor)),
      )
      setAlpha(strFixed(Color(getColorObj(inpValue)).alpha(), 2))
      setAlphaNoVerifyVal((+Color(getColorObj(inpValue)).alpha().toFixed(2) * 100).toFixed() + '%')
    } else {
      const formatArr = colorFormat(defaultSystemColor) as IColorTypes[]
      setColTypeArr(formatArr)
      setCorrectColorValue(defaultSystemColor)
      setAlpha(1)
      setAlphaNoVerifyVal('100%')
    }
  }
  console.log(Color('hsla(1,2%,3%,0.5)'))

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClickedColorIndex(-1)
    const inpValue = toLowerCase(e.target.value)
    if (value === undefined) {
      setIconColor(inpValue)
      setInputColorValue(inpValue)
    }
    if (validateColor(inpValue)) {
      const formatArr = colorFormat(inpValue, alpha) as IColorTypes[]
      onChange && onChange(inpValue, formatArr)
    } else {
      const formatArr = colorFormat(defaultSystemColor, alpha) as IColorTypes[]
      onChange && onChange(inpValue, formatArr)
    }
    themeColor && showFollowThemeSwitch && setIsFollow(false)
  }

  useEffect(() => {
    if (value) {
      setIconColor(value)
    } else {
      if (defaultValue) {
        setIconColor(defaultValue)
      }
    }
  }, [value, defaultValue])

  const handleClick = () => {
    setShowPanel(!showPanel)
  }

  const afterIcon = () => {
    const afterIconContainerCls = classNames(`${colorPickerPrefixCls}-icon`, {
      [`${colorPickerPrefixCls}-icon-underline`]: borderType === 'underline',
      [`${colorPickerPrefixCls}-icon-bordered`]: borderType === 'bordered',
      [`${colorPickerPrefixCls}-icon-up`]: showPanel,
      [`${colorPickerPrefixCls}-icon-down`]: !showPanel,
    })

    return (
      <div
        className={afterIconContainerCls}
        style={{ backgroundColor: `${colTypeArr[2].value || defaultSystemColor}` }}
      >
        <Icon type="arrow-down"></Icon>
      </div>
    )
  }

  const colorInputEle = (
    <div className={containerCls} ref={inputRef}>
      <Input
        borderType={borderType}
        placeholder="#"
        value={value ?? inputColorValue}
        className={inputCls}
        onChange={handleChange}
        style={style}
        onClick={handleClick}
      ></Input>
      <div onClick={handleClick} className={`${colorPickerPrefixCls}-icon-container`}>
        {(suffixIcon && suffixIcon(colTypeArr)) || afterIcon()}
      </div>
    </div>
  )

  const panel = (
    <ColorPickerPanel
      // API
      showFollowThemeSwitch={showFollowThemeSwitch}
      showChangeColorTypeInput={showChangeColorTypeInput}
      showPresetColor={showPresetColor}
      showColorPickerBox={showColorPickerBox}
      themeColor={themeColor}
      presetColor={presetColor}
      value={value}
      // private
      setInputColorValue={setInputColorValue}
      setCorrectColorValue={setCorrectColorValue}
      correctColorValue={correctColorValue}
      clickedColorIndex={clickedColorIndex}
      setClickedColorIndex={setClickedColorIndex}
      onChange={onChange}
      alpha={alpha}
      setAlpha={setAlpha}
      alphaNoVerifyVal={alphaNoVerifyVal}
      setAlphaNoVerifyVal={setAlphaNoVerifyVal}
      isFollow={isFollow}
      setIsFollow={setIsFollow}
      setShowPanel={setShowPanel}
      inputRef={inputRef}
      colTypeArr={colTypeArr}
      setColTypeArr={setColTypeArr}
      currentColorType={currentColorType}
      setCurrentColorType={setCurrentColorType}
    />
  )

  const popperProps = {
    ...colorPickerProps,
    popperClassName: popUpLayer,
    placement: 'bottomLeft',
    defaultVisible: showPanel,
    visible: showPanel,
    clickToClose: false,
  }

  return usePopper(colorInputEle, panel, popperProps)
}

ColorPicker.displayName = 'ColorPicker'

export default ColorPicker
