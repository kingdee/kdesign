/* eslint-disable */
import React, { useContext, FC, useRef, useEffect, useState } from 'react'
import { Input, Select, Switch } from '../index'
import classNames from 'classnames'
import { ConfigContext } from '../config-provider'
import { systemPresetColor } from './constant/systemPresetColor'
import { ColorTypes, IColorPickerPanelProps, IColorTypesObj, IInnerFormat } from './interface'
import {
  colorFormat,
  valOfCorrespondingType,
  strFixed,
  getColorObj,
  presetColorToHEX,
  colorToStr,
} from './utils/colorFormat'
import { defaultSystemColor } from './constant/defaultColor'
import { validateColor } from './utils/validateColor'
import { toUpCase } from './utils/convertLetters'
import Color from 'color'
import { ChromePicker, ColorResult } from 'react-color'
import devWarning from '../_utils/devwarning'
import { useOnClickOutside } from '../_utils/hooks'
import { isIE } from '../_utils/ieUtil'
import { ICurrentColorType, removeTransparency } from './utils/removeTransparency'
import debounce from 'lodash/debounce'

const ColorPickerPanel: FC<IColorPickerPanelProps> = (props) => {
  const {
    setCorrectColorValue,
    setInputCorrectColorValue,
    setInputColorValue,
    setAlpha,
    setAlphaNoVerifyVal,
    setIsFollow,
    setClickedPresetColorIndex,
    setClickedHistoricalColorIndex,
    setClickColorIndex,
    setShowPanel,
    setColTypeArr,
    setCurrentColorType,
    onChange,
    onVisibleChange,
    alpha,
    alphaNoVerifyVal,
    clickedPresetColorIndex,
    clickedHistoricalColorIndex,
    colTypeArr,
    correctColorValue,
    inputCorrectColorValue,
    currentColorType,
    functionalColor,
    functionalColorName,
    switchName,
    inputRef,
    isFollow,
    panelFormatConfig,
    format,
    presetColor,
    historicalColor,
    showClear,
    showSwitch,
    showColorTransfer,
    showPresetColor,
    showColorPickerBox,
    showColorPickerPanel,
    showAlphaInput,
    scrollHidden,
    value,
    visible,
    showPanel,
  } = props
  const panelSelectRef = useRef<HTMLInputElement>(null)
  const panelClsRef = useRef<HTMLInputElement>(null)

  const [innerFormatConfig, setInnerFormatConfig] = useState<IInnerFormat>(panelFormatConfig)
  const [activeGroupInptItem, setActiveGroupInptItem] = useState<number>()

  const baseFormat = ['HEX', 'HSB', 'RGB', 'HSL'] as Exclude<typeof ColorTypes[number], 'themeColor'>[]

  const { Option } = Select

  const { getPrefixCls, prefixCls, locale, direction } = useContext(ConfigContext)
  const colorPickerLangMsg = locale.getCompLangMsg({ componentName: 'ColorPicker' })
  const colorPickerPrefixCls = getPrefixCls!(prefixCls, 'color-picker')
  const panelCls = classNames(`${colorPickerPrefixCls}-panel`)
  const panelChromePickerCls = classNames(`${colorPickerPrefixCls}-panel-chrome`, {
    [`${colorPickerPrefixCls}-panel-chrome-no-box`]: !showColorPickerBox?.showBox,
    [`${colorPickerPrefixCls}-panel-chrome-no-hue`]: !showColorPickerBox?.showHue,
    [`${colorPickerPrefixCls}-panel-chrome-no-opacity`]: !showColorPickerBox?.showOpacity,
  })
  const panelClearColor = classNames(`${colorPickerPrefixCls}-panel-clear`)
  const panelClearColorBox = classNames(`${colorPickerPrefixCls}-panel-clear-box`)
  const panelClearColorText = classNames(`${colorPickerPrefixCls}-panel-clear-text`)
  const panelFollowThemeCls = classNames(`${colorPickerPrefixCls}-panel-switch`)
  const panelContainerCls = classNames(`${colorPickerPrefixCls}-panel-container`)
  const panelselectCls = classNames(`${colorPickerPrefixCls}-panel-container-select`)
  const panelInputCls = classNames(`${colorPickerPrefixCls}-panel-container-input`)
  const panelInputGroupCls = classNames(`${colorPickerPrefixCls}-panel-container-input-group`)
  const gePanelInputGroupItemCls = (order: number) =>
    classNames(`${colorPickerPrefixCls}-panel-container-input-group-item`, {
      active: activeGroupInptItem === order && order === 1,
    })
  const transparentCls = classNames(`${colorPickerPrefixCls}-panel-container-transparent`)
  const colorBoxCls = classNames(`${colorPickerPrefixCls}-panel-color-box`, {
    [`${colorPickerPrefixCls}-panel-color-box-container-ie11`]: isIE,
  })
  const colorBoxTitleCls = classNames(`${colorPickerPrefixCls}-panel-color-box-title`)
  const colorBoxContainerCls = classNames(`${colorPickerPrefixCls}-panel-color-box-container`)
  const historicalColorBoxCls = classNames(`${colorPickerPrefixCls}-panel-historical-color-box`, {
    [`${colorPickerPrefixCls}-panel-historical-color-box-container-ie11`]: isIE,
  })
  const historicalColorBoxTitleCls = classNames(`${colorPickerPrefixCls}-panel-historical-color-box-title`)
  const historicalColorBoxContainerCls = classNames(`${colorPickerPrefixCls}-panel-historical-color-box-container`)

  const setPanelState = (
    formatArr: Array<IColorTypesObj>,
    correctColorValue: string,
    inputColorValue: string,
    alpha?: number,
    alphaStr?: string,
  ) => {
    setColTypeArr(formatArr)
    setCorrectColorValue(correctColorValue)
    setInputCorrectColorValue(inputColorValue)
    setInputColorValue(inputColorValue)
    alpha && setAlpha(alpha)
    alphaStr && setAlphaNoVerifyVal(alphaStr)
  }

  const handleClearClick = () => {
    const formatArr = colorFormat(defaultSystemColor, 0) as IColorTypesObj[]
    const defaultColor = colorFormat(
      defaultSystemColor,
      1,
      currentColorType as Exclude<typeof ColorTypes[number], 'themeColor'>,
      true,
    ) as string
    setPanelState(formatArr, defaultColor, '', 0, '0%')
    setClickColorIndex(-1)
    onChange?.('', formatArr)
  }

  const presetColorClick = (index: number, colorValue: string) => {
    const colorLiAlpha = strFixed(Color(getColorObj(colorValue)).alpha(), 2)
    const formatArr = colorFormat(colorValue, colorLiAlpha) as IColorTypesObj[]
    const formatCorrectValue = removeTransparency(colorValue, currentColorType as ICurrentColorType)
    const formatInputValue = toUpCase(formatArr[valOfCorrespondingType(format) as number].value)
    setIsFollow(false)
    setAlpha(isFollow ? 1 : colorLiAlpha)
    setAlphaNoVerifyVal(isFollow ? 100 + '%' : colorLiAlpha * 100 + '%')
    if (value === undefined) {
      setInputColorValue(formatInputValue)
      setCorrectColorValue(formatCorrectValue)
      setColTypeArr(formatArr)
      setClickedPresetColorIndex(index)
    }
    onChange?.(formatInputValue, formatArr)
  }
  const historicalColorClick = (index: number, colorValue: string) => {
    const colorLiAlpha = strFixed(Color(getColorObj(colorValue)).alpha(), 2)
    const formatArr = colorFormat(colorValue, colorLiAlpha) as IColorTypesObj[]
    const formatCorrectValue = removeTransparency(colorValue, currentColorType as ICurrentColorType)
    const formatInputValue = toUpCase(formatArr[valOfCorrespondingType(format) as number].value)
    setIsFollow(false)
    setAlpha(isFollow ? 1 : colorLiAlpha)
    setAlphaNoVerifyVal(isFollow ? 100 + '%' : colorLiAlpha * 100 + '%')
    if (value === undefined) {
      setInputColorValue(formatInputValue)
      setCorrectColorValue(formatCorrectValue)
      setColTypeArr(formatArr)
      setClickedHistoricalColorIndex(index)
    }
    onChange?.(formatInputValue, formatArr)
  }

  const handleTypeChange = (selectValue: IColorTypesObj['type']) => {
    setCurrentColorType(selectValue)
    const colorStr = colTypeArr.find((item) => item.type === selectValue)?.value!
    setCorrectColorValue(
      colorFormat(colorStr, 1, selectValue as Exclude<typeof ColorTypes[number], 'themeColor'>, true) as string,
    )
    if (inputCorrectColorValue) {
      setInputColorValue(colTypeArr.find((item) => item.type === format)?.value!)
      onChange?.(colTypeArr.find((item) => item.type === format)?.value!, colTypeArr)
    }
  }

  const handleAlphaBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regPercentage = /^(0|[1-9][0-9]?|100)%$/
    const regDot = /^(0(\.\d+)?|1(\.0+)?)$/
    const val = e.target.value
    const rtlRegPercentage = /^%(0|[1-9][0-9]?|100)$/
    const getColorFormat = (alpha: number) => {
      const formatArr = colorFormat(correctColorValue, alpha, 'all', true) as IColorTypesObj[]
      const outValue = formatArr[valOfCorrespondingType(format) as number].value
      const innerInput = removeTransparency(outValue, currentColorType as ICurrentColorType)
      return { formatArr, outValue, innerInput }
    }

    let alphaValue: number
    if (direction !== 'rtl') {
      if (regPercentage.test(val)) {
        alphaValue = +val.replace('%', '') / 100
      } else if (regDot.test(val)) {
        alphaValue = +val
      } else {
        alphaValue = 1
      }
    } else {
      if (rtlRegPercentage.test(val)) {
        alphaValue = +val.replace('%', '') / 100
      } else if (regDot.test(val)) {
        alphaValue = +val
      } else {
        alphaValue = 1
      }
    }

    const { formatArr, outValue, innerInput } = getColorFormat(alphaValue)
    if (direction != 'rtl') {
      if (regPercentage.test(val)) {
        setAlphaNoVerifyVal(val)
      } else if (regDot.test(val)) {
        setAlphaNoVerifyVal(strFixed(+val * 100) + '%')
      } else {
        setAlphaNoVerifyVal('100%')
      }
    } else {
      if (rtlRegPercentage.test(val)) {
        setAlphaNoVerifyVal(val)
      } else if (regDot.test(val)) {
        setAlphaNoVerifyVal(strFixed(+val * 100) + '%')
      } else {
        setAlphaNoVerifyVal('%100')
      }
    }
    if (value === undefined) {
      setPanelState(formatArr, innerInput as string, outValue, alphaValue)
      setClickColorIndex(formatArr[0].value)
    }

    onChange?.(outValue as string, formatArr as IColorTypesObj[])
  }

  const handleAlphaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (value !== undefined && onChange === undefined) {
      return
    }
    setAlphaNoVerifyVal(e.target.value)
  }

  const handleHEXInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCorrectColorValue(e.target.value)
  }

  const handleHEXInputBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    const correctColor = colTypeArr.find((item) => item.type === format)?.value as string
    if (validateColor(val)) {
      const formatArr = colorFormat(val, inputCorrectColorValue ? alpha : 1, 'all', true) as IColorTypesObj[]
      const outValue = formatArr[valOfCorrespondingType(format) as number].value
      if (value === undefined) {
        const innerInput = removeTransparency(val, currentColorType as ICurrentColorType)
        if (!inputCorrectColorValue) {
          setPanelState(formatArr, innerInput as string, outValue, 1, '100%')
        } else {
          setPanelState(formatArr, innerInput as string, outValue)
        }
      } else if (onChange === undefined) {
        setPanelState(colTypeArr, removeTransparency(correctColor, currentColorType as ICurrentColorType), correctColor)
      }
      onChange?.(outValue, formatArr)
    } else {
      if (!inputCorrectColorValue) {
        const formatArr = colorFormat(correctColor, 1, 'all', true) as IColorTypesObj[]
        setPanelState(
          formatArr,
          removeTransparency(correctColor, currentColorType as ICurrentColorType),
          removeTransparency(correctColor, format as ICurrentColorType),
          1,
          '100%',
        )
        onChange?.(formatArr.find((item) => item.type === format)?.value!, formatArr)
      } else {
        setPanelState(colTypeArr, removeTransparency(correctColor, currentColorType as ICurrentColorType), correctColor)
        onChange?.(colTypeArr.find((item) => item.type === format)?.value!, colTypeArr)
      }
    }
  }

  const handleInputGroupItemFocus = (order: number) => {
    setActiveGroupInptItem(order)
  }

  const handleInputGroupItemBlur = () => {
    const formatArr = colorFormat(
      correctColorValue,
      inputCorrectColorValue ? alpha : 1,
      'all',
      true,
    ) as IColorTypesObj[]
    const outValue = formatArr[valOfCorrespondingType(format) as number].value
    if (value === undefined) {
      if (inputCorrectColorValue) {
        setPanelState(formatArr, correctColorValue as string, outValue)
      } else {
        setPanelState(formatArr, correctColorValue as string, outValue, 1, '100%')
      }
    } else if (onChange === undefined) {
      const correctColor = colTypeArr.find((item) => item.type === format)?.value as string
      setPanelState(colTypeArr, removeTransparency(correctColor, currentColorType as ICurrentColorType), correctColor)
    }
    onChange?.(outValue, formatArr)
  }

  const handleInputGroupItemChange = (e: React.ChangeEvent<HTMLInputElement>, color: string, i: number) => {
    let number = e.target.value
    if (!/^\d*$/.test(number)) return
    const colorArr = (Color(getColorObj(color)) as any).color
    const colorComponents = {
      HSB: ['h', 's', 'v'],
      HSL: ['h', 's', 'l'],
      RGB: ['r', 'g', 'b'],
    }
    const methodName = colorComponents[currentColorType as 'HSB' | 'HSL' | 'RGB'].join('')
    const getColorAttr = () => {
      const selectedComponents = colorComponents[currentColorType as 'HSB' | 'HSL' | 'RGB']
      if (!selectedComponents) {
        return
      }
      return selectedComponents.reduce((acc: { [key: string]: number | string }, component: string, index: number) => {
        acc[component] = i === index ? number : colorArr[index]
        return acc
      }, {})
    }
    const getColorValue = () => {
      const colorObj = (Color(getColorAttr()) as any)[methodName]()
      if (currentColorType === 'RGB') {
        return colorObj.toString()
      }
      return colorToStr(colorObj)
    }
    setCorrectColorValue(getColorValue())
  }

  const getColorNumberVal = (color: string, i: number) => {
    const colorArr = (Color(getColorObj(color)) as any).color
    return colorArr[i]
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
              removeTransparency(
                formatArr[valOfCorrespondingType(currentColorType) as number].value,
                currentColorType as ICurrentColorType,
              ),
              functionalColorName,
              strFixed(Color(getColorObj(functionalColor)).alpha(), 2),
              strFixed(Color(getColorObj(functionalColor)).alpha(), 2) * 100 + '%',
            )
            setClickColorIndex(formatArr[0].value)
          } else {
            // formatArr = colorFormat(correctColorValue, alpha, 'all', true) as IColorTypesObj[]
            // setPanelState(
            //   formatArr,
            //   correctColorValue,
            //   formatArr[valOfCorrespondingType(format) as number].value,
            //   alpha,
            //   alpha * 100 + '%',
            // )
            formatArr = colorFormat(defaultSystemColor, 1, 'all', true) as IColorTypesObj[]
            setPanelState(formatArr, defaultSystemColor, '', 1, 100 + '%')
            setClickColorIndex(formatArr[0].value)
          }
        }
      }
      devWarning(!inputValType, 'color-picker', "'themeColor' must be hexadecimal, RGB, HSB, HSL or English color name")
    }
    if (switchValue) {
      onChange?.(functionalColorName, formatArr as IColorTypesObj[])
    } else {
      onChange?.(defaultSystemColor, formatArr as IColorTypesObj[])
    }
  }

  const handleChromeChange = (color: ColorResult) => {
    const formatArr = colorFormat(color.hex, inputCorrectColorValue ? color.rgb.a : 1) as IColorTypesObj[]
    const colorObj = formatArr[valOfCorrespondingType(format) as number]
    if (value === undefined) {
      setIsFollow(false)
      setPanelState(
        formatArr,
        removeTransparency(colorObj.value, currentColorType as ICurrentColorType),
        colorObj.value,
        inputCorrectColorValue ? color.rgb.a : 1,
        inputCorrectColorValue ? (color.rgb.a! * 100).toFixed() + '%' : '100%',
      )
      setClickColorIndex(formatArr[0].value)
    }
    onChange?.(colorObj.value, formatArr)
  }

  const checkUserPresetColor = (colorArr: string[] | undefined): boolean => {
    if (!colorArr) return false
    const isTrueFormat = colorArr.every((hexColor) => {
      return (
        ['HEX', 'HEXA', 'HSB', 'HSBA', 'RGB', 'RGBA', 'HSL', 'HSLA', 'colorName'].indexOf(validateColor(hexColor)) !==
        -1
      )
    })
    devWarning(
      !isTrueFormat,
      'color-picker',
      "'presetColor' must be an array of hexadecimal, HEXA, RGB, RGBA, HSB, HSBA, HSL, HSLA or English color name string type",
    )
    return isTrueFormat
  }

  useOnClickOutside([panelClsRef, inputRef], () => {
    if (typeof visible === 'undefined') {
      setShowPanel(false)
    }
  })
  useEffect(() => {
    if (onVisibleChange) {
      onVisibleChange(visible)
    }
  }, [visible])
  useEffect(() => {
    if (showPanel) {
      const scrollAlign = debounce((e: Event) => {
        const isPopperScroll = e.target === panelClsRef.current || panelClsRef?.current?.contains(e.target as Node)
        if (scrollHidden && !isPopperScroll) {
          visible === undefined && setShowPanel(!showPanel)
          onVisibleChange && onVisibleChange(false)
        }
      }, 10)
      document.addEventListener('scroll', scrollAlign, true)

      return () => {
        document.removeEventListener('scroll', scrollAlign, true)
      }
    }
  }, [showPanel])

  useEffect(() => {
    if (!panelFormatConfig) return
    if (!Array.isArray(panelFormatConfig.show) || panelFormatConfig.show.length === 0) {
      devWarning(
        true,
        'color-picker',
        "'show' property of 'panelFormatConfig' must be one or more of HEX, RGB, HSB, or HSL",
      )
    }
    if (baseFormat.indexOf(panelFormatConfig?.default) === -1) {
      setInnerFormatConfig({ ...panelFormatConfig, default: 'HEX' })
      devWarning(true, 'color-picker', "'default' property of 'panelFormatConfig' must be one of HEX, RGB, HSB, or HSL")
    }
    if (panelFormatConfig.show.every((item) => baseFormat.indexOf(item) !== -1)) {
      const newShow = baseFormat.filter((ele) => panelFormatConfig.show.indexOf(ele) !== -1)
      if (newShow.indexOf(panelFormatConfig.default) === -1) {
        devWarning(true, 'color-picker', "'default' property of 'panelFormatConfig' must be one of 'show'")
      }
    } else {
      devWarning(
        true,
        'color-picker',
        "'show' property of 'panelFormatConfig' must be one or more of HEX, RGB, HSB, or HSL",
      )
    }
  }, [panelFormatConfig])

  return (
    <>
      {showColorPickerPanel && (
        <div className={panelCls} ref={panelClsRef}>
          {showClear && (
            <div className={panelClearColor}>
              <span className={panelClearColorBox} onClick={handleClearClick} />
              <span className={panelClearColorText}>{colorPickerLangMsg?.noColor}</span>
            </div>
          )}
          {functionalColor && showSwitch && (
            <div className={panelFollowThemeCls}>
              <span>
                {(switchName?.internationalName && locale.getLangMsg('ColorPicker', switchName.internationalName)) ||
                  switchName.name}
              </span>
              <Switch checked={isFollow} onChange={handleSwitchChange} />
            </div>
          )}
          <ChromePicker className={panelChromePickerCls} color={colTypeArr[2].value} onChange={handleChromeChange} />
          {showColorTransfer && (
            <div className={panelContainerCls}>
              <div className={panelselectCls} ref={panelSelectRef}>
                <Select
                  disabled={isFollow}
                  borderType="bordered"
                  value={currentColorType}
                  onChange={handleTypeChange}
                  optionLabelProp="value"
                  getPopupContainer={() => panelSelectRef.current as HTMLInputElement}
                >
                  {innerFormatConfig.show.map((name, i) => {
                    return (
                      <Option
                        title={name}
                        value={name}
                        className={classNames({
                          'active-option': name === currentColorType,
                        })}
                        key={i}
                      >
                        {name}
                      </Option>
                    )
                  })}
                </Select>
              </div>
              {currentColorType === 'HEX' ? (
                <Input
                  className={panelInputCls}
                  value={correctColorValue}
                  onChange={handleHEXInputChange}
                  onBlur={handleHEXInputBlur}
                  borderType="bordered"
                  disabled={isFollow}
                />
              ) : (
                <div className={panelInputGroupCls}>
                  {new Array(3).fill(undefined).map((_: undefined, i: number) => (
                    <Input
                      key={i}
                      className={gePanelInputGroupItemCls(i)}
                      onFocus={() => {
                        handleInputGroupItemFocus(i)
                      }}
                      onBlur={handleInputGroupItemBlur}
                      value={getColorNumberVal(correctColorValue, i)}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleInputGroupItemChange(e, correctColorValue, i)
                      }}
                      borderType="bordered"
                      disabled={isFollow}
                    />
                  ))}
                </div>
              )}
              {showAlphaInput && (
                <Input
                  className={transparentCls}
                  onChange={handleAlphaChange}
                  onBlur={handleAlphaBlur}
                  borderType="bordered"
                  value={direction === 'rtl' ? alphaNoVerifyVal.replace(/(\d+)%/, '%$1') : alphaNoVerifyVal}
                  disabled={isFollow}
                />
              )}
            </div>
          )}
          {historicalColor && historicalColor?.length > 0 && (
            <div className={historicalColorBoxCls}>
              <div className={historicalColorBoxTitleCls}>{colorPickerLangMsg?.recentColor}</div>
              <div className={historicalColorBoxContainerCls}>
                {checkUserPresetColor(historicalColor) &&
                  presetColorToHEX(historicalColor).map((colorValue: string, i) => {
                    return (
                      <li
                        key={i}
                        style={{ backgroundColor: `${colorValue}` }}
                        onClick={() => {
                          historicalColorClick(i, colorValue)
                        }}
                      >
                        <div
                          className={classNames('square', { 'square-click': clickedHistoricalColorIndex === i })}
                        ></div>
                      </li>
                    )
                  })}
              </div>
            </div>
          )}
          {showPresetColor &&
            ((presetColor && presetColor?.length > 0) || (!presetColor && systemPresetColor.length > 0)) && (
              <div className={colorBoxCls}>
                {historicalColor && historicalColor?.length > 0 && (
                  <div className={colorBoxTitleCls}>{colorPickerLangMsg?.recommendColor}</div>
                )}
                <div className={colorBoxContainerCls}>
                  {((checkUserPresetColor(presetColor) && presetColorToHEX(presetColor)) || systemPresetColor).map(
                    (colorValue: string, i) => {
                      return (
                        <li
                          key={i}
                          style={{ backgroundColor: `${colorValue}` }}
                          onClick={() => {
                            presetColorClick(i, colorValue)
                          }}
                        >
                          <div
                            className={classNames('square', { 'square-click': clickedPresetColorIndex === i })}
                          ></div>
                        </li>
                      )
                    },
                  )}
                </div>
              </div>
            )}
        </div>
      )}
    </>
  )
}

ColorPickerPanel.displayName = 'ColorPickerPanel'

export default ColorPickerPanel
