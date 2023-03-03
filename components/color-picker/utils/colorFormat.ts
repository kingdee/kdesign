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
  const s = colorArray[1]
  const type = validateColor(colorStr)
  if (type === 'HSB' || type === 'HSBA') {
    if (type === 'HSB') {
      const h = colorArray[0].replace('hsb(', '')
      const b = colorArray[2].replace(')', '')
      return { h: strFixed(h), s: strFixed(s), v: strFixed(b) }
    } else {
      const h = colorArray[0].replace('hslb(', '')
      const l = colorArray[2]
      const a = colorArray[3].replace(')', '')
      return { h: strFixed(h), s: strFixed(s), v: strFixed(l), alpha: a }
    }
  } else if (type === 'HSL' || type === 'HSLA') {
    if (type === 'HSL') {
      const h = colorArray[0].replace('hsl(', '')
      const l = colorArray[2].replace(')', '')
      return `hsl(${h},${s}%,${l}%)`
    } else {
      const h = colorArray[0].replace('hsla(', '')
      const l = colorArray[2]
      const a = colorArray[3].replace(')', '')
      return `hsla(${h},${s}%,${l}%,${a})`
    }
  } else {
    return colorStr
  }
}

const colorToStr = (obj: any) => {
  const arr = obj.color
  if (obj.valpha === 1) {
    return `${obj.model === 'hsv' ? 'hsb' : 'hsl'}(${strFixed(arr[0])}, ${strFixed(arr[1])}, ${strFixed(arr[2])})`
  } else {
    return `${obj.model === 'hsv' ? 'hsba' : 'hsla'}(${strFixed(arr[0])}, ${strFixed(arr[1])}, ${strFixed(
      arr[2],
    )}, ${strFixed(obj.valpha, 2)})`
  }
}

export const strFixed = (numStr: string | number, num = 0) => {
  return +(+numStr).toFixed(num)
}

export const valOfCorrespondingType = (currentColorType: string) => {
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

export const highlightPresetColorIndex = (color: string, colorArr: string[]) => {
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
