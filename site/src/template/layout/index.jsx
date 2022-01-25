import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Header from './header'

if (typeof window !== 'undefined') {
  require('@src/static/style')
}

if (typeof window !== 'undefined') {
  // eslint-disable-next-line global-require
  require('../../static/style')
  window.IFRAME_CODES = {}
  // Expose to iframe
  window.react = React
  window['react-dom'] = ReactDOM
  // eslint-disable-next-line global-require
  window.kdesign = require('kdesign')

  // Error log statistic
  window.addEventListener('error', function onError(e) {
    // Ignore ResizeObserver error
    if (e.message === 'ResizeObserver loop limit exceeded') {
      e.stopPropagation()
      e.stopImmediatePropagation()
    }
  })
}

class Layout extends Component {
  componentDidMount() {
    let t1 = 0
    let t2 = 0
    let timer = null // 定时器
    const element = document.body
    document.styleSheets[0].addRule('body::-webkit-scrollbar-thumb', 'display:none;')

    element.onscroll = function () {
      clearTimeout(timer)
      timer = setTimeout(isScrollEnd, 500)
      t1 = element.scrollTop
      document.styleSheets[0].addRule('body::-webkit-scrollbar-thumb', 'display:block;')
    }

    function isScrollEnd() {
      t2 = element.scrollTop
      if (t2 === t1) {
        document.styleSheets[0].addRule('body::-webkit-scrollbar-thumb', 'display:none;')
      }
    }
  }

  render() {
    const { children } = this.props
    return (
      <>
        <Header />
        {children}
      </>
    )
  }
}

export default Layout
