import React, { ComponentType, useState } from 'react'
import { Link, withRouter as withRouterComponent } from 'bisheng/router'

import Nav from './nav'
import DropMenu from './DropMenu'
import DocsSearch from './docs-search'
import MDocsSearch from './m-search'
import Menus from './Menus'
import './index.less'
import logo from './../../../static/image/logo.svg'
import Search from './../../../static/image/top_search.png'
import Login from './login'
import { version as kdesignVersion } from '../../../../../package.json'
// import Version from './version'

const appIdQS = 'J5MHBTB51H'
const apiKeyQS = 'e2ed9a8a86cf9a0e71db39c0114f1aab'
const indexNameQS = 'KDesign'
const transformData = function (suggestions: any[]) {
  return suggestions.map((suggestion) => {
    suggestion.url = suggestion.url.replace('https://react.kingdee.design', '')
    return suggestion
  })
}

const width = {}

const navList = [
  {
    text: '指南',
    details: 'guide',
    path: '/docs/guide/introduce',
  },
  {
    text: '组件',
    details: 'components',
    path: '/components/overview',
  },
]
export function withRouter<P, C extends ComponentType<P>>(target: C & React.ComponentType<P>): any {
  return withRouterComponent(target)
}

export interface NavProps {
  location: { pathname: string }
}

export interface MenuProps {
  pathname: string
}

const Header = (props: NavProps) => {
  const [clientWidth] = useState(document.body.clientWidth)
  const [showSearch, setShowSearch] = useState(false)
  const {
    location: { pathname },
  } = props

  const showModal = () => {
    setShowSearch(true)
    document.body.style.overflow = 'hidden'
  }

  const hideModal = () => {
    setShowSearch(false)
    document.body.style.overflow = 'initial'
  }

  const MenuList = (props: MenuProps) => {
    const { pathname } = props

    return (
      <>
        <div className="header-m">
          <div className="header-icon">
            <Menus hiddenInPc={false} />
            <div className="header-content-m">
              <DropMenu list={navList} pathname={pathname} />
            </div>
          </div>
          <Logo />
          <div className="header-search-m" onClick={showModal}>
            <img src={Search} style={{ width: '20px' }} />
          </div>
          <Login></Login>
        </div>
        <div className="header-wapper" style={width}>
          <Menus hiddenInPc={false} />
          <Logo />
          <div className="header-content ">
            <Nav list={navList} pathname={pathname} />
            <div className="header-search">
              <DocsSearch appId={appIdQS} indexName={indexNameQS} apiKey={apiKeyQS} transformData={transformData} />
              <div className="header-version">v {kdesignVersion}</div>
              <a
                href="https://github.com/kdcloudone/kdesign"
                rel="noreferrer"
                className="header-github-link"
                target="_blank"
              >
                <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32">
                  <path
                    d="M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9 23.5 23.2 38.1 55.4 38.1 91v112.5c0.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227 304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z"
                    p-id="2035"
                  ></path>
                </svg>
              </a>
            </div>
          </div>
          <Login></Login>
        </div>
      </>
    )
  }

  const Logo = () => {
    return (
      <>
        <div className="header-logo">
          <Link className="header-link" to="/">
            <img src={logo} style={{ height: 28 }}></img>
          </Link>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="header">
        <MenuList pathname={pathname} />
      </div>
      {showSearch && clientWidth < 576 && (
        <MDocsSearch appId={appIdQS} indexName={indexNameQS} apiKey={apiKeyQS} hideModal={hideModal} />
      )}
    </>
  )
}

export default withRouter(Header)
