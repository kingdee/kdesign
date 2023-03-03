/* eslint-disable */
import React, { useContext, FC, useRef } from 'react'
import { Input, Select, Switch } from '../index'
import classNames from 'classnames'
import { ConfigContext } from '../config-provider'
import { systemPresetColor } from './constant/systemPresetColor'
import { IColorTypes } from './constant/colorTypes'
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
import useOnClickOutside from './utils/hooks/useOnClickOutside'

interface IColorPickerPanelProps {
  showFollowThemeSwitch?: boolean
  showChangeColorTypeInput?: boolean
  showPresetColor?: boolean
  showColorPickerBox?: boolean
  correctColorValue: string
  alpha: number
  themeColor?: string
  alphaNoVerifyVal: string
  isFollow: boolean
  presetColor?: string[]
  clickedColorIndex?: number
  inputRef: any
  value: string
  colTypeArr: Array<IColorTypes>
  currentColorType: IColorTypes['type']
  setCurrentColorType: (currentColorType: IColorTypes['type']) => void
  setColTypeArr: (colTypeArr: Array<IColorTypes>) => void
  setClickedColorIndex: (clickedColorIndex: number) => void
  setIsFollow: (isFollow: boolean) => void
  setAlphaNoVerifyVal: (NoVerifyVal: string) => void
  setAlpha: (alpha: number) => void
  setCorrectColorValue: (colorValue: string) => void
  setInputColorValue: (colorValue: string) => void
  setShowPanel: (showPanel: boolean) => void
  onChange?: (inputValue: string, formatColorArr: Array<IColorTypes>) => void
}

const ColorPickerPanel: FC<IColorPickerPanelProps> = (props) => {
  const {
    setCorrectColorValue,
    setInputColorValue,
    onChange,
    setAlpha,
    setAlphaNoVerifyVal,
    setIsFollow,
    setClickedColorIndex,
    setShowPanel,
    setColTypeArr,
    setCurrentColorType,
    currentColorType,
    value,
    colTypeArr,
    correctColorValue,
    alpha,
    alphaNoVerifyVal,
    showFollowThemeSwitch,
    showChangeColorTypeInput,
    showPresetColor,
    showColorPickerBox,
    themeColor,
    isFollow,
    presetColor,
    clickedColorIndex,
    inputRef,
  } = props
  const panelInputRef = useRef<HTMLInputElement>(null)
  const panelClsRef = useRef<HTMLInputElement>(null)

  const { Option } = Select

  const { getPrefixCls, prefixCls } = useContext(ConfigContext)
  const colorPickerPrefixCls = getPrefixCls!(prefixCls, 'color-picker')
  const panelCls = classNames(`${colorPickerPrefixCls}-panel`)
  const panelChromePickerCls = classNames(`${colorPickerPrefixCls}-panel-chrome`)
  const panelFollowThemeCls = classNames(`${colorPickerPrefixCls}-panel-switch`)
  const panelInputCls = classNames(`${colorPickerPrefixCls}-panel-input`, {
    [`${colorPickerPrefixCls}-panel-input-no-recommend`]: !showPresetColor,
  })
  const transparentCls = classNames(`${colorPickerPrefixCls}-panel-transparent`)
  const colorDivContainerCls = classNames(`${colorPickerPrefixCls}-panel-colorDivContainer`)

  const colorLiClick = (index: number, colorValue: string) => {
    const formatArr = colorFormat(colorValue, alpha) as IColorTypes[]
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
    onChange && onChange(formatValue, colTypeArr)
  }

  const handleTypeChange = (selectValue: string, option: any) => {
    setCurrentColorType(option.label)
    if (value === undefined) {
      setCorrectColorValue(selectValue)
      //! 更换颜色类型时，外部输入框是否同步
      setInputColorValue(selectValue)
    }
    onChange && onChange(selectValue, colTypeArr)
  }
  const handleAlphaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAlphaNoVerifyVal(e.target.value)
  }
  const handleAlphaBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reg = /^(0|[1-9][0-9]?|100)%?$/
    const val = e.target.value
    if (reg.test(val)) {
      setAlpha(+val.replace('%', '') / 100)
      setAlphaNoVerifyVal(val.indexOf('%') !== -1 ? val : val + '%')
      const arr = colorFormat(correctColorValue, +val.replace('%', '') / 100, 'all', true) as IColorTypes[]
      setColTypeArr(arr)
      setInputColorValue(arr[valOfCorrespondingType(currentColorType) as number].value)
      setCorrectColorValue(arr[valOfCorrespondingType(currentColorType) as number].value)
      setClickedColorIndex(highlightPresetColorIndex(arr[0].value, presetColorToHEX(presetColor || systemPresetColor)))
    } else {
      setAlpha(1)
      setAlphaNoVerifyVal(100 + '%')
    }
  }
  const handleSwitchChange = (switchValue: boolean) => {
    if (themeColor) {
      const inputValType = validateColor(themeColor)
      if (inputValType) {
        setIsFollow(switchValue)
        if (switchValue) {
          const formatArr = colorFormat(themeColor, alpha) as IColorTypes[]
          setInputColorValue('#themeColor')
          setCorrectColorValue(formatArr[valOfCorrespondingType(currentColorType) as number].value)
          setColTypeArr(formatArr)
          setClickedColorIndex(
            highlightPresetColorIndex(formatArr[0].value, presetColorToHEX(presetColor || systemPresetColor)),
          )
          setAlpha(strFixed(Color(getColorObj(themeColor)).alpha(), 2))
          setAlphaNoVerifyVal(strFixed(Color(getColorObj(themeColor)).alpha(), 2) * 100 + '%')
        } else {
          const formatArr = colorFormat(defaultSystemColor, 1, 'all', true) as IColorTypes[]
          setColTypeArr(formatArr)
          setInputColorValue('')
          setCorrectColorValue(defaultSystemColor)
          setClickedColorIndex(-1)
          setAlpha(1)
          setAlphaNoVerifyVal(100 + '%')
        }
      }
      devWarning(!inputValType, 'color-picker', "'themeColor' must be hexadecimal, RGB, HSB, HSL or color English name")
    }
  }
  const handleChromeChange = (color: any) => {
    const formatArr = colorFormat(color.hex, color.rgb.a) as IColorTypes[]
    const colorObj = formatArr[valOfCorrespondingType(currentColorType) as number]
    setIsFollow(false)
    setColTypeArr(formatArr)
    setInputColorValue(colorObj.value)
    setCorrectColorValue(colorObj.value)
    setAlpha(color.rgb.a)
    setAlphaNoVerifyVal((color.rgb.a * 100).toFixed() + '%')
    setClickedColorIndex(
      highlightPresetColorIndex(formatArr[0].value, presetColorToHEX(presetColor || systemPresetColor)),
    )
  }

  const checkUserPresetColor = (colorArr: string[] | undefined): boolean => {
    if (!colorArr) return false
    const isTrueFormat = colorArr.every((hexColor) => {
      return ['HEX', 'HSB', 'RGB', 'HSL', 'colorName'].indexOf(validateColor(hexColor)) !== -1
    })
    devWarning(!isTrueFormat, 'color-picker', "'presetColor' must be Array of the HEX string type")
    return isTrueFormat
  }

  // useEffect(() => {
  //   if (correctColorValue !== '#themeColor') {
  //     const formatArr = colorFormat(correctColorValue, alpha) as IColorTypes[]
  //     setColTypeArr(formatArr)
  //     setCorrectColorValue(formatArr[valOfCorrespondingType(currentColorType) as number].value)
  //     setClickedColorIndex(
  //       highlightPresetColorIndex(formatArr[0].value, presetColorToHEX(presetColor || systemPresetColor)),
  //     )
  //   }
  // }, [correctColorValue, alpha])

  useOnClickOutside([panelClsRef, inputRef], () => {
    setShowPanel(false)
  })

  return (
    <div className={panelCls} ref={panelClsRef}>
      {showColorPickerBox && (
        <ChromePicker
          className={panelChromePickerCls}
          color={colTypeArr[2].value}
          onChange={handleChromeChange}
        ></ChromePicker>
      )}
      {themeColor && showFollowThemeSwitch && (
        <div className={panelFollowThemeCls}>
          <span>跟随主题色</span>
          <Switch checked={isFollow} onChange={handleSwitchChange} />
        </div>
      )}
      {showChangeColorTypeInput && (
        <>
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
        </>
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
  )
}

export default ColorPickerPanel
