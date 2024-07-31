import React from 'react'
import zhCNData from './zh-CN'
export type LocaleDataType = typeof zhCNData
export type ComponentType = keyof LocaleDataType

export interface LocaleConfigType {
  locale: string
  localeData: LocaleDataType | any
  customGetLangMsg?: (componentName: string, labelName: string, params: any) => any
}

export interface CompLangMsgParams {
  componentName: string
  labels?: string[]
  labelParams?: any
}

interface ILocalesData {
  [key: string]: LocaleDataType | any
}

class LocaleCache {
  localesData: ILocalesData

  locale: string

  constructor(localesData: ILocalesData, locale?: string) {
    this.locale = locale || zhCNData.locale
    this.localesData = localesData
  }

  /**
   * 设置语言包并切换当前语言
   * @param {LocaleDataType | string} localeData 语言数据集合 | 语言类型
   * @returns 设置后的语言对应的语言包
   */
  setLocalesData(locale: string, localeData?: LocaleDataType) {
    if (!(localeData || this.localesData[locale])) {
      console.error(`Missing language pack for ${locale}. Please check and reconfigure.`)
      return
    }
    const newLocaleData = { ...zhCNData, ...localeData }
    const newLocale = locale || newLocaleData?.locale
    this.locale = newLocale
    this.localesData[newLocale] = newLocaleData
    return localeData
  }

  /**
   * 获取当前语言包数据
   */
  getLocalData() {
    return this.localesData[this.locale]
  }

  /**
   * 获取当前语言类型
   */
  getLocal() {
    return this.locale
  }

  /**
   * 获取所有语言包数据
   */
  getLocalesData() {
    return this.localesData
  }
}
const localeCacher = new LocaleCache({ [zhCNData.locale]: zhCNData })
export default localeCacher

export const getLangMsg = (
  componentName: ComponentType | string,
  labelName: string,
  params?: any,
): string | React.ReactNode[] => {
  const localData = localeCacher.getLocalData()
  const msg = localData[`${componentName}.${labelName}`] || localData[`global.${labelName}`] || ''
  return analysVariables(msg, params)
}

/**
 * 解析模板字符串中的变量
 * @param {*} msg
 * @param {*} variables
 */
function analysVariables(msg: string | Array<string>, variables: any): string | React.ReactNode[] | Array<string> {
  if (typeof msg === 'string') {
    const reg = /{[\w\W]*?}/g
    const matchArr = msg.match(reg) || []
    const isObject = (value: any) => {
      return typeof value === 'object' || typeof value === 'function'
    }

    const getVarName = (str: string) => {
      const len = str.length
      return str.slice(1, len - 1)
    }

    const stringVar = []
    const eleVar = []
    for (const item of matchArr) {
      const varName = getVarName(item)
      const value = variables[varName]
      if (isObject(value)) {
        eleVar.push({ k: varName, v: value })
      } else {
        stringVar.push({ k: varName, v: value })
      }
    }
    msg = formatText(msg, stringVar)
    let msgArr: React.ReactNode[] = []
    if (eleVar.length > 0) {
      msgArr = formatElement(msg, variables)
    }
    return eleVar.length > 0 ? msgArr : msg
  } else {
    return msg
  }
}

/**
 * 替换基本类型的变量
 * @param {*} msg
 * @param {*} stringVar
 */
function formatText(msg: string, stringVar: any[]): string {
  stringVar.forEach((item) => {
    const { k, v } = item
    const reg = new RegExp('{' + k + '}', 'g')
    msg = msg.replace(reg, v)
  })
  return msg
}

/**
 * 替换React元素类型的变量
 * @param {*} msg
 * @param {*} eleVar
 * @param {*} variables
 */
function formatElement(msg: string, variables: any) {
  const splitByElement = (msg: string) => {
    const array: any[] = []
    let item = { t: 0, v: '' } // 0-string 1-react
    const len = msg.length
    msg.split('').forEach((c, i) => {
      if (c === '{') {
        array.push(item)
        item = { t: 1, v: '' }
      } else if (c === '}') {
        array.push(item)
        item = { t: 0, v: '' }
      } else {
        item.v = item.v + c
      }
      if (i === len - 1) {
        array.push(item)
      }
    })
    return array
  }

  const elements: React.ReactNode[] = []
  const eleArr = splitByElement(msg)
  eleArr.forEach((item, index) => {
    const { t, v } = item
    if (t === 0 && v !== '') {
      elements.push(<span key={index}>{v}</span>)
    } else if (t === 1) {
      elements.push(React.cloneElement(variables[v], { key: index }))
    }
  })
  return elements
}

export const getCompLangMsg = (
  compLangMsgParams: CompLangMsgParams,
  customGetLangMsg?: (componentName: string, labelName: string, params: any) => any,
  localeDate?: any,
) => {
  let { componentName, labels, labelParams } = compLangMsgParams
  labels = labels || []
  labelParams = labelParams || {}
  localeDate = localeDate || zhCNData
  if (!labels.length) {
    for (const key in localeDate) {
      const componentNameAndLabel = key.split('.')
      if (componentName === componentNameAndLabel[0] && componentNameAndLabel[1]) {
        labels.push(componentNameAndLabel[1])
      }
    }
  }
  const componentLangMsg: any = {
    locale: localeDate.locale,
  }
  labels.forEach((label) => {
    if (customGetLangMsg && typeof customGetLangMsg === 'function') {
      componentLangMsg[label] = customGetLangMsg(componentName, label, labelParams[label] || {})
    } else {
      componentLangMsg[label] = getLangMsg(componentName, label, labelParams[label] || {})
    }
  })
  return componentLangMsg
}
