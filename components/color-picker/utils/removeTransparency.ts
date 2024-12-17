import { ColorTypes } from '../interface'
import { colorFormat } from './colorFormat'

export type ICurrentColorType = Exclude<typeof ColorTypes[number], 'themeColor'>

export const removeTransparency = (color: string, currentColorType: ICurrentColorType) => {
  return colorFormat(color, 1, currentColorType, true) as string
}
