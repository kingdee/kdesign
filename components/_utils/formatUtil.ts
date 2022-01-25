import { toFixed, exponentToFloat, isExp } from './numberUtil'
export interface FormatParam {
  mask?: string
  zeroShow?: boolean
  decimalLength?: number
  showDecimalTailZero?: boolean
  isRound?: boolean
  symbol?: string
  code?: string
}

export interface EditFormatParam {
  zeroShow?: boolean
  decimalLength?: number
  showDecimalTailZero?: boolean
  roundMethod?: string
  symbol?: string
}

interface NumberInfo {
  numStr: string
  intStr: string
  decimalStr: string
}

interface MaskInfo {
  errorMask: boolean
  currencySign: boolean
  percent: boolean
  intMask: string
  decimalMask: string
  formatMask: string
}

/**
 * [数值类型格式化]
 * @param  {[type]}  num                              [待格式化的数字]
 * @param  {String}  mask                             [数值掩码
 * 0：必须输入数字（0—9）
 * 9：可选择输入数字（0—9）或空格
 * #：可选择输入数字（0—9） 递归
 * .: 小数点
 * ,: 千位符
 * %: 对最终值除以100处理
 * %%: 对最终值不做处理
 * //A: [a-zA-Z0-9]
 * //S: [a-zA-Z]
 * //&：必须输入任一字符或空格
 * //C：可选择输入任一字符或空格
 * $: 货币
 * ]
 * @param  {Boolean} zeroShow                         [为零显示]
 * @param  {[type]}  decimalLength                    [小数精度的位数]
 * @param  {Boolean} showDecimalTailZero              [是否显示尾部零]
 * @return                                            [格式化后的数值]
 */
export function formatNumber(num: string | number, formatParams: FormatParam): string {
  const {
    mask = '',
    zeroShow = false,
    decimalLength,
    showDecimalTailZero = false,
    isRound, // 是否是四舍五入
    ...param
  } = formatParams
  if (decimalLength !== undefined && (decimalLength < 0 || decimalLength > 100)) return num + ''
  if (num === undefined || num === null) num = ''
  let numInfo = { numStr: '', intStr: '', decimalStr: '' }
  if (typeof num === 'number') {
    numInfo.numStr = num + ''
  } else {
    numInfo.numStr = num.replace(/,/g, '')
    if (isExp(numInfo.numStr)) {
      numInfo.numStr = exponentToFloat(numInfo.numStr)
    }
  }
  let floatNum = Number.parseFloat(numInfo.numStr)
  // 非纯数字不处理，直接返回''
  // if (Number.isNaN(floatNum)) return ''
  if (Number.isNaN(Number(num))) {
    // throw new Error('toFixed() number argument must be a valid number')
    return num + ''
  }
  // 为零不显示，且等于零,直接返回''
  if (!zeroShow && Number(num) === 0) return ''

  const maskInfo = analyzMask(mask)
  if (maskInfo.errorMask) return numInfo.numStr
  const isIncludePercent = numInfo.numStr.includes('%')
  if (maskInfo.percent) {
    if (!isIncludePercent) {
      const point = numInfo.numStr.indexOf('.')
      const length = numInfo.numStr.length
      if (point < 0) {
        numInfo.numStr = numInfo.numStr + '00'
      } else if (point === length - 1) {
        numInfo.numStr = numInfo.numStr.replace('.', '') + '00'
      } else if (point === length - 2) {
        numInfo.numStr = numInfo.numStr.replace('.', '') + '0'
      } else {
        const numStr = numInfo.numStr.replace('.', '')
        numInfo.numStr = numStr.substring(0, point + 2) + '.' + numStr.substring(point + 2)
      }
      // 去掉数字前面的零
      numInfo.numStr = numInfo.numStr.replace(/^0+/, '')
      if (numInfo.numStr === '.') numInfo.numStr = '0'
      if (numInfo.numStr.includes('-')) {
        // 负数的情况 去掉前面的0
        numInfo.numStr = numInfo.numStr.replace('-', '')
        numInfo.numStr = numInfo.numStr.replace(/^0+/, '')
        numInfo.numStr = '-' + numInfo.numStr
      }
      floatNum = floatNum * 100
    }
  }

  const isNegativeNumber = floatNum < 0 // 是否是负数
  if (isNegativeNumber) {
    floatNum = Math.abs(floatNum)
    numInfo.numStr = numInfo.numStr.slice(1) // 去除第一个负号
  }

  let numStrArr = numInfo.numStr.split('.')
  numInfo.intStr = numStrArr[0]
  numInfo.decimalStr = numStrArr[1] || ''
  if (!showDecimalTailZero) {
    numInfo = cutTailZero(numInfo)
  }
  // 小数部分处理。暂时不考虑其他。只校验位数和尾数补零问题,整数
  if (decimalLength !== undefined && decimalLength >= 0) {
    // floatNum = Number.parseFloat(numInfo.numStr) // 当整数位数大于16位时，parseFloat会丢掉末尾的值,有问题！！！
    numInfo.numStr = toFixed(numInfo.numStr, decimalLength, isRound)
    numStrArr = numInfo.numStr.split('.')
    // 去除整数部分多余的 0
    const intStr = numStrArr[0].replace(/^0+/, '')
    numInfo.intStr = intStr === '' ? '0' : intStr
    numInfo.decimalStr = numStrArr[1] || ''
    if (!showDecimalTailZero) {
      numInfo = cutTailZero(numInfo)
    }
  }
  // 整数部分格式化
  const formatValue = intFormatMask(maskInfo.intMask, numInfo.intStr)
  let currencySign = maskInfo.currencySign ? '$' : ''
  if (param.symbol) {
    currencySign = param.symbol
  }
  return (
    currencySign +
    (isNegativeNumber ? '-' : '') +
    (formatValue || numInfo.intStr || '0') +
    (numInfo.decimalStr.length > 0 ? '.' : '') +
    numInfo.decimalStr +
    (maskInfo.percent ? '%' : '')
  )
}

/**
 * 格式化数字字段编辑态的值
 * 不支持掩码的格式化信息
 * @param {*} num
 * @param {*} param
 */
export function formatEditNumber(
  num: number | string,
  { zeroShow = false, decimalLength, showDecimalTailZero = false, roundMethod = '0', symbol }: EditFormatParam,
): string {
  // 如果精度超过100，直接返回数值
  if (decimalLength && (decimalLength < 0 || decimalLength > 100)) return num + ''
  if (num === undefined || num === null) num = ''
  let numInfo = { numStr: '', intStr: '', decimalStr: '' }
  if (zeroShow && num === '') return ''
  if (typeof num === 'number') {
    numInfo.numStr = num + ''
  } else {
    numInfo.numStr = num.replace(/,/g, '')
    if (isExp(numInfo.numStr)) {
      numInfo.numStr = exponentToFloat(numInfo.numStr)
    }
    if (symbol && numInfo.numStr.indexOf(symbol) === 0) {
      numInfo.numStr = numInfo.numStr.replace(symbol, '')
    }
  }
  let floatNum = Number.parseFloat(numInfo.numStr)
  // 非纯数字不处理，直接返回''
  if (Number.isNaN(floatNum)) return ''
  // 为零不显示，且等于零,直接返回''
  if (!zeroShow && floatNum === 0) return ''

  const isNegativeNumber = floatNum < 0 // 是否是负数
  if (isNegativeNumber) {
    floatNum = Math.abs(floatNum)
    numInfo.numStr = numInfo.numStr.slice(1) // 去除第一个负号
  }

  let numStrArr = numInfo.numStr.split('.')
  numInfo.intStr = numStrArr[0]
  numInfo.decimalStr = numStrArr[1] || ''
  if (!showDecimalTailZero) {
    numInfo = cutTailZero(numInfo)
  }
  // 小数部分处理。暂时不考虑其他。只校验位数和尾数补零问题,整数
  if (decimalLength != null && decimalLength >= 0) {
    // floatNum = Number.parseFloat(numInfo.numStr) // 当整数位数大于16位时，parseFloat会丢掉末尾的值
    const isRound = roundMethod.toString() === '1' // 是否四舍五入
    numInfo.numStr = toFixed(numInfo.numStr, decimalLength, isRound)
    numStrArr = numInfo.numStr.split('.')
    numInfo.intStr = numStrArr[0]
    numInfo.decimalStr = numStrArr[1] || ''
    if (!showDecimalTailZero) {
      numInfo = cutTailZero(numInfo)
    }
  }

  return (
    (isNegativeNumber ? '-' : '') +
    (numInfo.intStr || '0') +
    (numInfo.decimalStr.length > 0 ? '.' : '') +
    numInfo.decimalStr
  )
}

function analyzMask(mask: string): MaskInfo {
  const maskInfo = {
    errorMask: false,
    currencySign: false,
    percent: false,
    intMask: '',
    decimalMask: '',
    formatMask: '',
  }
  mask = mask.replace(/%%/g, '')
  maskInfo.currencySign = mask.indexOf('$') >= 0 // 是否显示货币标识
  maskInfo.percent = mask.indexOf('%') >= 0 // 是否有百分号
  mask = mask.replace(/%/g, '').replace(/\$/g, '') // 清楚上面的特殊字符
  const masks = mask.split('.') // 以小数点为界切分掩码
  if (masks.length > 2) {
    maskInfo.errorMask = true
  }
  maskInfo.intMask = masks[0]
  maskInfo.decimalMask = masks[1]
  maskInfo.formatMask = mask
  return maskInfo
}

function cutTailZero(numInfo: NumberInfo): NumberInfo {
  let decimalStr = numInfo.decimalStr
  const len = decimalStr.length
  if (len > 0) {
    for (let i = len - 1; i >= 0; i--) {
      if (decimalStr[i] === '0') {
        decimalStr = decimalStr.slice(0, i)
      } else {
        break
      }
    }
    numInfo.decimalStr = decimalStr
  }
  return numInfo
}

function intFormatMask(intMask: string, intValue: string, numGroupFormat = ''): string {
  let index = 0

  const firstHashIndex = intMask.indexOf('#')

  let lastHashIndex = intMask.lastIndexOf('#')

  let formatValue = ''
  if (intMask.split(',').length > 1) {
    // 如果包含多个分隔符，则认为是末尾分隔符为分组数
    lastHashIndex = intMask.length - 1 - intMask.lastIndexOf(',')
  }

  for (let i = intMask.length - 1; i >= 0; ) {
    let char = intMask.charAt(i)
    switch (char) {
      case '0': // 数字必录
        formatValue = (intValue.charAt(intValue.length - 1 - index) || '0') + formatValue
        index++
        i--
        break
      case '9': // 数字可选
        formatValue = intValue.charAt(intValue.length - 1 - index) + formatValue
        index++
        i--
        break
      case '#': // 递归
        formatValue = intValue.charAt(intValue.length - 1 - index) + formatValue
        index++
        i = i === firstHashIndex ? lastHashIndex : i - 1
        break
      default:
        if (numGroupFormat) char = numGroupFormat
        formatValue = char + formatValue
        i--
        break
    }
    if (index >= intValue.length) break
  }
  // 如果第一个字符不是数字，去掉
  if (formatValue && !/^[0-9]*$/.test(formatValue.charAt(0))) {
    formatValue = formatValue.substring(1)
  }
  return formatValue
}
