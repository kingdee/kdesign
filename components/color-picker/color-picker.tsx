import React, { FC, useContext, useState, useRef, useEffect } from 'react'
import classNames from 'classnames'
import { ConfigContext } from '../config-provider'
import { Input, Icon } from '../index'
import { validateColor } from './utils/validateColor'
import { colorTypes } from './constant/colorTypes'
import { IColorTypesObj, IColorPickerProps } from './interface'
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

const ColorPicker: FC<Partial<IColorPickerProps>> = (props) => {
  const { getPrefixCls, prefixCls, compDefaultProps: userDefaultProps } = useContext(ConfigContext)
  const colorPickerProps = getCompProps('ColorPicker', userDefaultProps, props)
  const {
    value,
    className,
    style,
    functionalColor,
    functionalColorName,
    switchName,
    showSwitch,
    showColorTransfer,
    showPresetColor,
    showColorPickerBox,
    borderType,
    presetColor,
    placeholder,
    defaultValue,
    defaultOpen,
    visible,
    suffixIcon,
    onChange,
    onVisibleChange,
  } = colorPickerProps
  const [inputColorValue, setInputColorValue] = useState<string>(defaultValue || '')
  const [correctColorValue, setCorrectColorValue] = useState<string>(defaultValue || defaultSystemColor)
  const [currentColorType, setCurrentColorType] = useState<IColorTypesObj['type']>('HEX')
  const [colTypeArr, setColTypeArr] = useState<Array<IColorTypesObj>>(colorTypes as IColorTypesObj[])
  const [showPanel, setShowPanel] = useState<boolean>(typeof visible === 'undefined' ? !!defaultOpen : !!visible)
  const [alpha, setAlpha] = useState<number>(1)
  const [alphaNoVerifyVal, setAlphaNoVerifyVal] = useState<string>(alpha * 100 + '%')
  const [isFollow, setIsFollow] = useState<boolean>(false)
  const [clickedColorIndex, setClickedColorIndex] = useState<number>()

  const colorPickerPrefixCls = getPrefixCls!(prefixCls, 'color-picker')
  const popUpLayer = getPrefixCls!(prefixCls, 'color-picker-pop')
  const containerCls = classNames(`${colorPickerPrefixCls}-container`)
  const inputCls = classNames(`${colorPickerPrefixCls}-input`, className)
  const inputRef = useRef<HTMLInputElement>(null)
  const showColorPickerPanel =
    showColorTransfer ||
    (typeof showPresetColor === 'boolean' && showPresetColor && presetColor?.length) ||
    typeof showPresetColor === 'undefined' ||
    (functionalColor?.length && showSwitch) ||
    showColorPickerBox?.showBox ||
    showColorPickerBox?.showHue ||
    showColorPickerBox?.showOpacity

  const setIconColor = (value: string) => {
    value === functionalColorName ? setIsFollow(true) : setIsFollow(false)
    const inpValue = value === functionalColorName ? functionalColor : value
    const inputValType = validateColor(inpValue)
    const setState = (formatArr: Array<IColorTypesObj>, correctColorValue: string, alpha: number, alphaStr: string) => {
      setColTypeArr(formatArr)
      setCorrectColorValue(correctColorValue)
      setAlpha(alpha)
      setAlphaNoVerifyVal(alphaStr)
    }
    if (inputValType) {
      const formatArr = colorFormat(inpValue, strFixed(Color(getColorObj(inpValue)).alpha(), 2)) as IColorTypesObj[]
      setState(
        formatArr,
        formatArr[valOfCorrespondingType(currentColorType) as number].value,
        Color(getColorObj(inpValue)).alpha(),
        (strFixed(Color(getColorObj(inpValue)).alpha(), 2) * 100).toFixed() + '%',
      )
      setClickedColorIndex(
        highlightPresetColorIndex(formatArr[0].value, presetColorToHEX(presetColor || systemPresetColor)),
      )
    } else {
      const formatArr = colorFormat(defaultSystemColor) as IColorTypesObj[]
      setState(formatArr, defaultSystemColor, 1, '100%')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClickedColorIndex(-1)
    const inpValue = toLowerCase(e.target.value)
    if (value === undefined) {
      setIconColor(inpValue)
      setInputColorValue(inpValue)
    }
    const callback = (val: string, alpha: number) => {
      const formatArr = colorFormat(val, alpha) as IColorTypesObj[]
      onChange && onChange(inpValue, formatArr)
    }
    if (validateColor(inpValue)) {
      callback(inpValue, alpha)
    } else {
      callback(defaultSystemColor, alpha)
    }
    functionalColor && showSwitch && setIsFollow(false)
  }

  const handleClick = () => {
    if (typeof visible === 'undefined') {
      setShowPanel(!showPanel)
    }
    onVisibleChange && onVisibleChange(!showPanel)
  }

  useEffect(() => {
    if (typeof visible !== 'undefined') {
      setShowPanel(visible)
    }
  }, [visible])

  useEffect(() => {
    if (value) {
      setIconColor(value)
    } else {
      if (defaultValue) {
        setIconColor(defaultValue)
      }
    }
  }, [value, defaultValue])

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
        {showColorPickerPanel && <Icon type="arrow-down"></Icon>}
      </div>
    )
  }

  const colorInputEle = (
    <div className={containerCls} ref={inputRef}>
      <Input
        borderType={borderType}
        placeholder={placeholder}
        value={value ?? inputColorValue}
        className={inputCls}
        onChange={handleChange}
        style={style}
        onClick={handleClick}
      ></Input>
      <div onClick={handleClick} className={`${colorPickerPrefixCls}-icon-container`}>
        {(suffixIcon && suffixIcon(colTypeArr[2].value)) || afterIcon()}
      </div>
    </div>
  )

  const panel = (
    <ColorPickerPanel
      // API
      showSwitch={showSwitch}
      showColorTransfer={showColorTransfer}
      showPresetColor={showPresetColor}
      showColorPickerBox={showColorPickerBox}
      functionalColor={functionalColor}
      functionalColorName={functionalColorName}
      switchName={switchName}
      presetColor={presetColor}
      value={value}
      visible={visible}
      showPanel={showPanel}
      onVisibleChange={onVisibleChange}
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
      showColorPickerPanel={showColorPickerPanel}
    />
  )

  const popperProps = {
    ...colorPickerProps,
    popperClassName: popUpLayer,
    placement: 'bottomLeft',
    defaultVisible: showPanel,
    visible: showPanel,
    onVisibleChange: null,
    clickToClose: false,
  }

  return usePopper(colorInputEle, panel, popperProps)
}

ColorPicker.displayName = 'ColorPicker'

export default ColorPicker
