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
  highlightPresetColorIndex,
  presetColorToHEX,
  colorToStr,
} from './utils/colorFormat'
import { defaultSystemColor } from './constant/defaultColor'
import { validateColor } from './utils/validateColor'
import { toUpCase } from './utils/convertLetters'
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

  const { getPrefixCls, prefixCls, locale } = useContext(ConfigContext)

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

  const handleClearClick = () => {
    const formatArr = colorFormat(defaultSystemColor) as IColorTypesObj[]
    setPanelState(formatArr, defaultSystemColor, '', 0, '0%')
  }

  const colorLiClick = (index: number, colorValue: string) => {
    const formatArr = colorFormat(colorValue, alpha) as IColorTypesObj[]
    const formatCorrectValue = removeTransparency(colorValue)
    const formatInputValue = toUpCase(formatArr[valOfCorrespondingType(format) as number].value)
    setIsFollow(false)
    if (isFollow) {
      setAlpha(1)
      setAlphaNoVerifyVal(100 + '%')
    }
    if (value === undefined) {
      setInputColorValue(formatInputValue)
      setCorrectColorValue(formatCorrectValue)
      setColTypeArr(formatArr)
    }
    setClickedColorIndex(index)
    onChange && onChange(formatInputValue, formatArr)
  }

  const handleTypeChange = (selectValue: IColorTypesObj['type']) => {
    setCurrentColorType(selectValue)
    if (value === undefined) {
      const colorStr = colTypeArr.find((item) => item.type === selectValue)?.value!
      setCorrectColorValue(
        colorFormat(colorStr, 1, selectValue as Exclude<typeof ColorTypes[number], 'themeColor'>, true) as string,
      )
      setInputColorValue(colTypeArr.find((item) => item.type === format)?.value!)
    }
    onChange && onChange(colTypeArr.find((item) => item.type === format)?.value!, colTypeArr)
  }

  const removeTransparency = (color: string) => {
    return colorFormat(color, 1, currentColorType as Exclude<typeof ColorTypes[number], 'themeColor'>, true) as string
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

    if (value !== undefined) return

    setAlphaNoVerifyVal(val)

    const getColorFormat = (alpha: number) => {
      const formatArr = colorFormat(correctColorValue, alpha, 'all', true) as IColorTypesObj[]
      const outValue = formatArr[valOfCorrespondingType(format) as number].value
      const innerInput = removeTransparency(outValue)
      return { formatArr, outValue, innerInput }
    }
    let alphaValue: number
    if (regPercentage.test(val)) {
      alphaValue = +val.replace('%', '') / 100
    } else if (regDot.test(val)) {
      alphaValue = +val
    } else {
      alphaValue = 1
    }
    const { formatArr, outValue, innerInput } = getColorFormat(alphaValue)
    setPanelState(formatArr, innerInput as string, outValue, alphaValue)
    setClickedColorIndex(
      highlightPresetColorIndex(formatArr[0].value, presetColorToHEX(presetColor || systemPresetColor)),
    )
    onChange && onChange(outValue as string, formatArr as IColorTypesObj[])
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

  const handleHEXInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCorrectColorValue(e.target.value)
  }

  const handleHEXInputBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    if (validateColor(val)) {
      const formatArr = colorFormat(val, alpha, 'all', true) as IColorTypesObj[]
      const outValue = formatArr[valOfCorrespondingType(format) as number].value
      if (value === undefined) {
        const innerInput = removeTransparency(val)
        setPanelState(formatArr, innerInput as string, outValue)
      }
      onChange && onChange(outValue, formatArr)
    } else {
      if (value === undefined) {
        const correctColor = colTypeArr.find((item) => item.type === format)?.value as string
        setPanelState(colTypeArr, removeTransparency(correctColor), correctColor)
      }
      onChange && onChange(colTypeArr.find((item) => item.type === format)?.value!, colTypeArr)
    }
  }

  const handleInputGroupItemFocus = (order: number) => {
    setActiveGroupInptItem(order)
  }

  const handleInputGroupItemBlur = () => {
    const formatArr = colorFormat(correctColorValue, alpha, 'all', true) as IColorTypesObj[]
    const outValue = formatArr[valOfCorrespondingType(format) as number].value
    if (value === undefined) {
      setPanelState(formatArr, correctColorValue as string, outValue)
    }
    onChange && onChange(outValue, formatArr)
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
    const methodName = (colorComponents as any)[currentColorType].join('')
    const getColorAttr = () => {
      const selectedComponents = (colorComponents as any)[currentColorType]
      if (!selectedComponents) {
        return // 如果 currentColorType 不是预期的类型，返回 undefined 或处理错误
      }
      return selectedComponents.reduce((acc: any, component: string, index: number) => {
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

  useEffect(() => {
    if (!Array.isArray(panelFormatConfig.show) || panelFormatConfig.show.length === 0) {
      setInnerFormatConfig({ ...panelFormatConfig, show: baseFormat })
      if (baseFormat.indexOf(panelFormatConfig.default) === -1) {
        setInnerFormatConfig({ ...panelFormatConfig, default: 'HEX' })
        devWarning(
          true,
          'color-picker',
          "'default' property of 'panelFormatConfig' must be one of HEX, RGB, HSB, or HSL",
        )
      }
    } else if (panelFormatConfig.show.every((item) => baseFormat.indexOf(item) !== -1)) {
      const newShow = baseFormat.filter((ele) => panelFormatConfig.show.indexOf(ele) !== -1)
      setInnerFormatConfig({
        ...panelFormatConfig,
        show: newShow,
      })
      if (newShow.indexOf(panelFormatConfig.default) === -1) {
        setInnerFormatConfig({ ...panelFormatConfig, default: newShow[0] })
        devWarning(true, 'color-picker', "'default' property of 'panelFormatConfig' must be one of 'show'")
      }
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
              <span className={panelClearColorText}>无颜色填充</span>
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
          <ChromePicker
            className={panelChromePickerCls}
            color={colTypeArr[2].value}
            onChange={handleChromeChange}
          ></ChromePicker>
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
                />
              ) : (
                <div className={panelInputGroupCls}>
                  {new Array(3).fill(undefined).map((_: any, i: number) => (
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
                    />
                  ))}
                </div>
              )}
              <Input
                className={transparentCls}
                onChange={handleAlphaChange}
                onBlur={handleAlphaBlur}
                borderType="bordered"
                value={alphaNoVerifyVal}
                disabled={isFollow}
              />
            </div>
          )}
          {historicalColor && historicalColor?.length > 0 && (
            <div className={historicalColorBoxCls}>
              <div className={historicalColorBoxTitleCls}>最近使用颜色</div>
              <div className={historicalColorBoxContainerCls}>
                {checkUserPresetColor(historicalColor) &&
                  presetColorToHEX(historicalColor).map((colorValue: string, i) => {
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
                  })}
              </div>
            </div>
          )}
          {showPresetColor && ((presetColor && presetColor?.length > 0) || systemPresetColor.length > 0) && (
            <div className={colorBoxCls}>
              {historicalColor && historicalColor?.length > 0 && <div className={colorBoxTitleCls}>推荐色</div>}
              <div className={colorBoxContainerCls}>
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
            </div>
          )}
        </div>
      )}
    </>
  )
}

ColorPickerPanel.displayName = 'ColorPickerPanel'

export default ColorPickerPanel
