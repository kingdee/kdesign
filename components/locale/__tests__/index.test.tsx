import React from 'react'
import Button from '../../button'
import localeCacher, { getCompLangMsg, getLangMsg, LocaleDataType } from '../index'
import CNLang from '../zh-CN'

describe('locale', () => {
  it('getCompLangMsg', () => {
    const ModalMsg = getCompLangMsg({ componentName: 'Modal' })
    expect(ModalMsg.okText).toBe(localeCacher.localesData[localeCacher.locale]['Modal.okText'])
  })
  it('getLangMsg', () => {
    const okText = getLangMsg('Modal', 'okText')
    expect(okText).toBe(localeCacher.localesData[localeCacher.locale]['Modal.okText'])
    const perPage = getLangMsg('Pagination', 'perPage', { size: 10 })
    getLangMsg('Pagination', 'perPage', { size: <Button>10</Button> })
    expect(perPage).toBe('10 条/页')
  })
  it('localeCacher getLocal', () => {
    const local = localeCacher.getLocal()
    expect(local).toBe('zh-CN')
  })

  it('localeCacher getLocalesData', () => {
    const localsData = localeCacher.getLocalesData()
    expect(Object.keys(localsData).length).toBe(1)
  })

  it('setLocalesData but have not localeData', () => {
    const locale = 'zh-TW'
    const testLocalText = 'test'
    const localeData: LocaleDataType = Object.assign({}, CNLang)
    localeData['Modal.okText'] = testLocalText
    localeCacher.setLocalesData(locale)
    const okText = getLangMsg('Modal', 'okText')
    expect(okText).toBe(localeCacher.localesData[localeCacher.locale]['Modal.okText'])
  })

  it('setLocalesData have localeData', () => {
    const locale = 'zh-TW'
    const testLocalText = 'test'
    const localeData: LocaleDataType = Object.assign({}, CNLang)
    localeData['Modal.okText'] = testLocalText
    localeCacher.setLocalesData(locale, localeData)
    const okText = getLangMsg('Modal', 'okText')
    expect(okText).toBe(testLocalText)
  })
})
