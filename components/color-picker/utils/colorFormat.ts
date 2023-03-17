import Color from 'color'
import { validateColor } from './validateColor'
import { toLowerCase } from './convertLetters'

type IOutType = 'HEX' | 'HSB' | 'HSL' | 'RGB' | 'all'

export const colorFormat = (colorStr: string, alpha = 1, outType: IOutType = 'all', formatHex = false) => {
  const ColorTools: any = Color(getColorObj(colorStr)).alpha(alpha)
  const toHex = () => {
    if (/^#([0-9a-fA-F]{8})$/.test(colorStr)) {
      if (formatHex) {
        return toLowerCase(alpha === 1 ? ColorTools.hex() : ColorTools.hexa())
      } else {
        return colorStr
      }
    } else {
      return toLowerCase(alpha === 1 ? ColorTools.hex() : ColorTools.hexa())
    }
  }
  const HEX = toHex()
  const HSB = colorToStr(ColorTools.hsv())
  const RGB = ColorTools.rgb().string()
  const HSL = colorToStr(ColorTools.hsl())

  if (outType === 'HEX') return HEX
  if (outType === 'HSB') return HSB
  if (outType === 'HSL') return HSL
  if (outType === 'RGB') return RGB
  if (outType === 'all') {
    return [
      {
        type: 'HEX',
        value: HEX,
      },
      {
        type: 'HSB',
        value: HSB,
      },
      {
        type: 'RGB',
        value: RGB,
      },
      {
        type: 'HSL',
        value: HSL,
      },
    ]
  }
}

export const getColorObj = (colorStr: string) => {
  const colorArray = colorStr.split(',')
  const type = validateColor(colorStr)

  if (type === 'HSB' || type === 'HSBA') {
    const s = removePercentage(colorArray[1])
    if (type === 'HSB') {
      const h = colorArray[0].replace('hsb(', '')
      const b = colorArray[2].replace(')', '')
      return { h: h, s: s, v: removePercentage(b) }
    } else {
      const h = colorArray[0].replace('hsba(', '')
      const b = colorArray[2]
      const a = colorArray[3].replace(')', '')
      return { h: +h, s: s, v: removePercentage(b), alpha: +a }
    }
  } else if (type === 'HSL' || type === 'HSLA') {
    const s = addPercentage(colorArray[1])
    if (type === 'HSL') {
      const h = colorArray[0].replace('hsl(', '')
      const l = colorArray[2].replace(')', '')
      return `hsl(${h},${s},${addPercentage(l)})`
    } else {
      const h = colorArray[0].replace('hsla(', '')
      const l = colorArray[2]
      const a = colorArray[3].replace(')', '')
      return `hsla(${h},${s},${addPercentage(l)},${a})`
    }
  } else if (type === 'RGB' || type === 'RGBA') {
    const g = colorArray[1]
    if (type === 'RGB') {
      const r = colorArray[0].replace('rgb(', '')
      const b = colorArray[2].replace(')', '')
      return `rgb(${strFixed(r)},${strFixed(g)},${strFixed(b)})`
    } else {
      const r = colorArray[0].replace('rgba(', '')
      const b = colorArray[2]
      const a = colorArray[3].replace(')', '')
      return `rgba(${strFixed(r)},${strFixed(g)},${strFixed(b)},${strFixed(a, 2)})`
    }
  } else {
    return colorStr
  }
}

const addPercentage = (parameter: string): string => {
  return parameter?.indexOf('%') !== -1
    ? parameter
    : +parameter > 0 && +parameter <= 1
    ? +parameter * 100 + '%'
    : parameter + '%'
}
const removePercentage = (parameter: string): number => {
  return parameter?.indexOf('%') !== -1
    ? +parameter.replace('%', '')
    : +parameter > 0 && +parameter <= 1
    ? +parameter * 100
    : +parameter
}

const colorToStr = (obj: any): string => {
  const arr = obj.color
  if (obj.valpha === 1) {
    return `${obj.model === 'hsv' ? 'hsb' : 'hsl'}(${strFixed(arr[0])}, ${strFixed(arr[1])}%, ${strFixed(arr[2])}%)`
  } else {
    return `${obj.model === 'hsv' ? 'hsba' : 'hsla'}(${strFixed(arr[0])}, ${strFixed(arr[1])}%, ${strFixed(
      arr[2],
    )}%, ${strFixed(obj.valpha, 2)})`
  }
}

export const strFixed = (numStr: string | number, num = 0): number => {
  return +(+numStr).toFixed(num)
}

export const valOfCorrespondingType = (currentColorType: string): number | undefined => {
  let index
  switch (currentColorType) {
    case 'HEX':
      index = 0
      break
    case 'HSB':
      index = 1
      break
    case 'RGB':
      index = 2
      break
    case 'HSL':
      index = 3
      break
  }
  return index
}

export const highlightPresetColorIndex = (color: string, colorArr: string[]): number => {
  const index = colorArr.findIndex((val) => {
    return val === color
  })
  return index
}

export const presetColorToHEX = (colorArr: string[] | undefined): string[] => {
  if (!colorArr) return []
  const hexColorArr = colorArr.map((color: string) => {
    return colorFormat(color, 1, 'HEX')
  })
  return hexColorArr
}
