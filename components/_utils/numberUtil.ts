import Big from 'big.js'
/**
 * 使用定点表示法来格式化一个数
 * @param  {String|Number}  number     [必选，数字或者表示数字的字符串,范围为[0,20],超过范围则报错]
 * @param  {Number}  digits  [必选，小数点后数字的个数]
 * @param  {Boolean} isRound [可选，格式化时是否四舍五入，默认为false，即进行四舍五入,为false时直接截取，不满足位数的往后补0]
 * @return {String}          [结果]
 */
export function toFixed(number: string, digits: number, isRound = false): string {
  // 非数字
  // if (!/(^-\d+|^\d+)\.?\d*$/gi.test(number)) { // Number.isFinite(number)
  //   throw new Error('toFixed() number argument must be a valid number')
  // }
  if (Number.isNaN(Number(number))) {
    throw new Error('toFixed() number argument must be a valid number')
  }
  // 是否为正数
  const isPositive = +number >= 0
  // 转化为字符串
  number += ''

  isRound = Boolean(isRound)
  // 去掉正负号，统一按照正数来处理，最后再加上符号
  number = number.replace(/^(?:-|\+)/gi, '')

  // 小数点过大
  if (digits > 20 || digits < 0) {
    throw new RangeError('toFixed() digits argument must be between 0 and 20')
  }

  // 如果是简写如.11则整数位补0，变成0.11
  if (/^\./gi.test(number)) {
    number = '0' + number
  }

  const numParts = number.split('.')
  let result = ''

  // 在str后面加n个0
  const _paddingZero = function (str: string, n: number): string {
    for (let i = 0; i < n; i++) {
      str += '0'
    }
    return str
  }

  // 在str后面加0，直至str的长度达到n
  // 如果超过了n，则直接截取前n个字符串
  const _paddingZeroTo = function (str: string, n: number): string {
    if (str.length >= n) {
      return str.substr(0, n)
    } else {
      return _paddingZero(str, n - str.length)
    }
  }

  // 直接就是整数
  if (numParts.length < 2) {
    result = numParts[0] + '.' + _paddingZero('', digits)
  } else {
    // 为浮点数
    // 如果为截取
    if (isRound === false) {
      result = numParts[0] + '.' + _paddingZeroTo(numParts[1], digits)
      // 如果为四舍五入
    } else {
      // 放大10的N次方倍
      let enlarge = numParts[0] + _paddingZeroTo(numParts[1], digits) + '.' + numParts[1].substr(digits)
      // 取整
      enlarge = Math.round(parseFloat(enlarge)) + ''
      // 缩小10的N次方
      while (enlarge.length <= digits) {
        enlarge = '0' + enlarge
      }
      result = enlarge.substr(0, enlarge.length - digits) + '.' + enlarge.substr(enlarge.length - digits)
    }
  }

  // 如果最后一位为.,则去除
  result = result.replace(/\.$/gi, '').replace(/^\./gi, '0.')

  // 加上正负数符号位
  result = isPositive ? result : '-' + result

  return result
}

/**
 * 将已有的数字进行前面补零的方法
 * @param {String|Number} number [需要在前面补零的数字]
 * @param {Number} lenght [补零后的数字长度]
 * 如：supplementZero(1, 4) return '0001'
 */
export function supplementZero(number: string, length = 2): string {
  number += ''
  if (number.length > length) return number
  return (Array(length).join('0') + number).slice(-length)
}

/**
 *
 * 序列化字符串为数字，只取字符串中的数字、小数点、正负号
 * @param {String} strNumber 字符串
 */
export function serialization(strNumber: string): string {
  const numberList = strNumber.match(/\d|^-|\./g)
  if (!numberList) return ''
  // 取出正负号
  const sign = numberList[0] === '-' ? '-' : ''
  if (sign === '-') {
    // 有负号, 去掉数组的负号
    numberList.shift()
  }
  const numberString = numberList.join('')
  // .replace('.', 'a').replace(/\./g, '').replace('a', '.')
  const res = numberString.replace(/^0{2,}/gi, '0')
  if (/^(0[^.])/gi.test(res)) {
    return sign + res.slice(1)
  }
  return sign + res
}

// 根据整数精度和小数精度获取最大值
export function getMaxNumberByPrecision(integerPrecision: number, decimalPrecision: number): number {
  const integerString = Array(integerPrecision)
    .fill('9')
    .reduce((res, value) => (res += value), '')
  return decimalPrecision <= 0
    ? Number(integerString)
    : Number(
        Array(decimalPrecision)
          .fill('9')
          .reduce((res, value) => (res += value), integerString + '.'),
      )
}

/**
 * 判断是否为正则表达式
 * @param {string|number} number 待判断的值
 */
export function isExp(number: string | number): boolean {
  return /\d+\.?\d*e[+-]*\d+/i.test(number.toString())
}

/**
 * 将科学计数法显示的数字格式化为正常浮点数
 * 1e-6 => 0.000006
 * @param {Number} number 待格式化的科学计数法
 * @returns num 格式化后的数值，如果不满足科学计数法的话，则原值返回
 */
export function exponentToFloat(number: string | number): string {
  const tempNumber = Number(number)
  if (isNaN(tempNumber) || !isFinite(tempNumber) || number === '') return tempNumber.toString()
  const bigNum = new Big(number)
  const bigNumValue = bigNum.valueOf()
  const exponentReg = /^(?!-0(\.0+)?(e|$))-?(0|[1-9]\d*)(\.\d+)?(e-?(0|[1-9]\d*))?$/i
  if (exponentReg.test(bigNumValue)) {
    // 获取精度， 默认 10
    const lenArr = exponentReg.exec(bigNumValue)
    const len = Number(lenArr && lenArr[6] ? lenArr[6] : 10)
    const fixedNumber = bigNum.toFixed(len).valueOf()
    const zeros = /^(\d{1,}(?:,\d{3})*\.(?:0*[1-9]+)?)(0*)?$/.exec(fixedNumber)
    if (zeros) {
      const res = zeros[1]
      return res[res.length - 1] === '.' ? res.substr(0, res.length - 1) : res
    } else {
      return fixedNumber
    }
  }
  return bigNumValue
}
