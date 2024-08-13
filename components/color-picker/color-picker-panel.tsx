/* eslint-disable */
import React, { useContext, FC, useRef } from 'react'
import { Input, Select, Switch } from '../index'
import classNames from 'classnames'
import { ConfigContext } from '../config-provider'
import { systemPresetColor } from './constant/systemPresetColor'
import { IColorPickerPanelProps, IColorTypesObj } from './interface'
import {
  colorFormat,
  valOfCorrespondingType,
  strFixed,
  getColorObj,
  highlightPresetColorIndex,
  presetColorToHEX,
} from './utils/colorFormat'
import { defaultSystemColor } from './constant/defaultColor'
import { validateColor } from './utils/validateColor'
import { toLowerCase } from './utils/convertLetters'
import Color from 'color'
import { ChromePicker } from 'react-color'
import devWarning from '../_utils/devwarning'
import { useOnClickOutside } from '../_utils/hooks'
import { isIE } from '../_utils/ieUtil'

const ColorPickerPanel: FC<IColorPickerPanelProps> = (props) => {
  const {
    setCorrectColorValue,
    setInputColorValue,
    setAlpha,
    setAlphaNoVerifyVal,
    setIsFollow,
    setClickedColorIndex,
    setShowPanel,
    setColTypeArr,
    setCurrentColorType,
    onChange,
    onVisibleChange,
    alpha,
    alphaNoVerifyVal,
    clickedColorIndex,
    colTypeArr,
    correctColorValue,
    currentColorType,
    functionalColor,
    functionalColorName,
    switchName,
    inputRef,
    isFollow,
    presetColor,
    showSwitch,
    showColorTransfer,
    showPresetColor,
    showColorPickerBox,
    showColorPickerPanel,
    value,
    visible,
    showPanel,
  } = props
  const panelInputRef = useRef<HTMLInputElement>(null)
  const panelClsRef = useRef<HTMLInputElement>(null)

  const { Option } = Select

  const { getPrefixCls, prefixCls, locale } = useContext(ConfigContext)
  const colorPickerPrefixCls = getPrefixCls!(prefixCls, 'color-picker')
  const panelCls = classNames(`${colorPickerPrefixCls}-panel`)
  const panelChromePickerCls = classNames(`${colorPickerPrefixCls}-panel-chrome`, {
    [`${colorPickerPrefixCls}-panel-chrome-no-box`]: !showColorPickerBox?.showBox,
    [`${colorPickerPrefixCls}-panel-chrome-no-hue`]: !showColorPickerBox?.showHue,
    [`${colorPickerPrefixCls}-panel-chrome-no-opacity`]: !showColorPickerBox?.showOpacity,
  })
  const panelFollowThemeCls = classNames(`${colorPickerPrefixCls}-panel-switch`)
  const panelContainerCls = classNames(`${colorPickerPrefixCls}-panel-container`)
  const panelInputCls = classNames(`${colorPickerPrefixCls}-panel-container-input`)
  const transparentCls = classNames(`${colorPickerPrefixCls}-panel-container-transparent`)
  const colorDivContainerCls = classNames(`${colorPickerPrefixCls}-panel-colorDivContainer`, {
    [`${colorPickerPrefixCls}-panel-colorDivContainer-unset-color`]: presetColor?.length === 0,
    [`${colorPickerPrefixCls}-panel-colorDivContainer-ie11`]: isIE,
  })

  const colorLiClick = (index: number, colorValue: string) => {
    const formatArr = colorFormat(colorValue, alpha) as IColorTypesObj[]
    const formatValue = toLowerCase(formatArr[valOfCorrespondingType(currentColorType) as number].value)
    setIsFollow(false)
    if (isFollow) {
      setAlpha(1)
      setAlphaNoVerifyVal(100 + '%')
    }
    if (value === undefined) {
      setInputColorValue(formatValue)
      setCorrectColorValue(formatValue)
      setColTypeArr(formatArr)
    }
    setClickedColorIndex(index)
    onChange && onChange(formatValue, formatArr)
  }

  const handleTypeChange = (selectValue: string, option: any) => {
    setCurrentColorType(option.label)
    if (value === undefined) {
      setCorrectColorValue(selectValue)
      setInputColorValue(selectValue)
    }
    onChange && onChange(selectValue, colTypeArr)
  }

  const setPanelState = (
    formatArr: Array<IColorTypesObj>,
    correctColorValue: string,
    inputColorValue: string,
    alpha?: number,
    alphaStr?: string,
  ) => {
    setColTypeArr(formatArr)
    setCorrectColorValue(correctColorValue)
    setInputColorValue(inputColorValue)
    alpha && setAlpha(alpha)
    alphaStr && setAlphaNoVerifyVal(alphaStr)
  }

  const handleAlphaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regPercentage = /^(0|[1-9][0-9]?|100)%$/
    const regDot = /^(0(\.\d+)?|1(\.0+)?)$/
    const val = e.target.value
    let formatArr, outValue
    if (value === undefined) {
      setAlphaNoVerifyVal(e.target.value)
      if (regPercentage.test(val)) {
        formatArr = colorFormat(correctColorValue, +val.replace('%', '') / 100, 'all', true) as IColorTypesObj[]
        outValue = formatArr[valOfCorrespondingType(currentColorType) as number].value
        setPanelState(formatArr, outValue, outValue, +val.replace('%', '') / 100)
        setClickedColorIndex(
          highlightPresetColorIndex(formatArr[0].value, presetColorToHEX(presetColor || systemPresetColor)),
        )
      } else if (regDot.test(val)) {
        formatArr = colorFormat(correctColorValue, +val, 'all', true) as IColorTypesObj[]
        outValue = formatArr[valOfCorrespondingType(currentColorType) as number].value
        setPanelState(formatArr, outValue, outValue, strFixed(val, 2))
        setClickedColorIndex(
          highlightPresetColorIndex(formatArr[0].value, presetColorToHEX(presetColor || systemPresetColor)),
        )
      } else {
        formatArr = colorFormat(correctColorValue, 1, 'all', true) as IColorTypesObj[]
        outValue = formatArr[valOfCorrespondingType(currentColorType) as number].value
        setPanelState(formatArr, outValue, outValue, 1)
      }
      onChange && onChange(outValue as string, formatArr as IColorTypesObj[])
    }
  }

  const handleAlphaBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regPercentage = /^(0|[1-9][0-9]?|100)%$/
    const regDot = /^(0(\.\d+)?|1(\.0+)?)$/
    const val = e.target.value
    if (regPercentage.test(val)) {
      setAlphaNoVerifyVal(val)
    } else if (regDot.test(val)) {
      setAlphaNoVerifyVal(strFixed(+val * 100) + '%')
    } else {
      setAlphaNoVerifyVal('100%')
    }
  }

  const handleSwitchChange = (switchValue: boolean) => {
    let formatArr
    if (functionalColor) {
      const inputValType = validateColor(functionalColor)
      if (inputValType) {
        if (value === undefined) {
          setIsFollow(switchValue)
          if (switchValue) {
            formatArr = colorFormat(functionalColor, alpha) as IColorTypesObj[]
            setPanelState(
              formatArr,
              formatArr[valOfCorrespondingType(currentColorType) as number].value,
              functionalColorName,
              strFixed(Color(getColorObj(functionalColor)).alpha(), 2),
              strFixed(Color(getColorObj(functionalColor)).alpha(), 2) * 100 + '%',
            )
            setClickedColorIndex(
              highlightPresetColorIndex(formatArr[0].value, presetColorToHEX(presetColor || systemPresetColor)),
            )
          } else {
            formatArr = colorFormat(defaultSystemColor, 1, 'all', true) as IColorTypesObj[]
            setPanelState(formatArr, defaultSystemColor, '', 1, 100 + '%')
            setClickedColorIndex(-1)
          }
        }
      }
      devWarning(!inputValType, 'color-picker', "'themeColor' must be hexadecimal, RGB, HSB, HSL or English color name")
    }
    if (switchValue) {
      onChange && onChange(functionalColorName, formatArr as IColorTypesObj[])
    } else {
      onChange && onChange(defaultSystemColor, formatArr as IColorTypesObj[])
    }
  }

  const handleChromeChange = (color: any) => {
    const formatArr = colorFormat(color.hex, color.rgb.a) as IColorTypesObj[]
    const colorObj = formatArr[valOfCorrespondingType(currentColorType) as number]
    if (value === undefined) {
      setIsFollow(false)
      setPanelState(formatArr, colorObj.value, colorObj.value, color.rgb.a, (color.rgb.a * 100).toFixed() + '%')
      setClickedColorIndex(
        highlightPresetColorIndex(formatArr[0].value, presetColorToHEX(presetColor || systemPresetColor)),
      )
    }
    onChange && onChange(colorObj.value, formatArr)
  }

  const checkUserPresetColor = (colorArr: string[] | undefined): boolean => {
    if (!colorArr) return false
    const isTrueFormat = colorArr.every((hexColor) => {
      return ['HEX', 'HSB', 'RGB', 'HSL', 'colorName'].indexOf(validateColor(hexColor)) !== -1
    })
    devWarning(
      !isTrueFormat,
      'color-picker',
      "'presetColor' must be an array of hexadecimal, RGB, HSB, HSL or English color name string type",
    )
    return isTrueFormat
  }

  useOnClickOutside([panelClsRef, inputRef], () => {
    if (typeof visible === 'undefined') {
      setShowPanel(false)
    }
    showPanel && onVisibleChange && onVisibleChange(false)
  })

  return (
    <>
      {showColorPickerPanel && (
        <div className={panelCls} ref={panelClsRef}>
          <ChromePicker
            className={panelChromePickerCls}
            color={colTypeArr[2].value}
            onChange={handleChromeChange}
          ></ChromePicker>
          {functionalColor && showSwitch && (
            <div className={panelFollowThemeCls}>
              <span>
                {(switchName?.internationalName && locale.getLangMsg('ColorPicker', switchName.internationalName)) ||
                  switchName.name}
              </span>
              <Switch checked={isFollow} onChange={handleSwitchChange} />
            </div>
          )}
          {showColorTransfer && (
            <div className={panelContainerCls}>
              <div className={panelInputCls} ref={panelInputRef}>
                <Select
                  disabled={isFollow}
                  borderType="bordered"
                  value={correctColorValue}
                  placeholder="#"
                  onChange={handleTypeChange}
                  optionLabelProp="value"
                  getPopupContainer={() => panelInputRef.current as HTMLInputElement}
                >
                  {colTypeArr.map((obj, i) => {
                    return (
                      <Option
                        title={obj.value}
                        value={obj.value}
                        className={classNames({
                          'active-option': obj.type === currentColorType && obj.value === correctColorValue,
                        })}
                        key={i}
                      >
                        {obj.type}
                      </Option>
                    )
                  })}
                </Select>
              </div>
              <Input
                className={transparentCls}
                onChange={handleAlphaChange}
                onBlur={handleAlphaBlur}
                borderType="bordered"
                value={alphaNoVerifyVal}
                disabled={isFollow}
              ></Input>
            </div>
          )}
          {showPresetColor && (
            <div className={colorDivContainerCls}>
              {((checkUserPresetColor(presetColor) && presetColorToHEX(presetColor)) || systemPresetColor).map(
                (colorValue: string, i) => {
                  return (
                    <li
                      key={i}
                      style={{ backgroundColor: `${colorValue}` }}
                      onClick={() => {
                        colorLiClick(i, colorValue)
                      }}
                    >
                      <div className={classNames('square', { 'square-click': clickedColorIndex === i })}></div>
                    </li>
                  )
                },
              )}
            </div>
          )}
        </div>
      )}
    </>
  )
}

ColorPickerPanel.displayName = 'ColorPickerPanel'

export default ColorPickerPanel
