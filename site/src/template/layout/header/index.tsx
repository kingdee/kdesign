import React, { ComponentType, useState } from 'react'
import { Link, withRouter as withRouterComponent } from 'bisheng/router'

import Nav from './nav'
import DropMenu from './DropMenu'
import DocsSearch from './docs-search'
import MDocsSearch from './m-search'
import './index.less'
import logo from './../../../static/image/logo.svg'
import Search from './../../../static/image/top_search.png'
// import Version from './version'

const appIdQS = 'J5MHBTB51H'
const apiKeyQS = 'e2ed9a8a86cf9a0e71db39c0114f1aab'
const indexNameQS = 'KDesign'
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
  // if (pathname !== '/') {
  //   width = { maxWidth: '100%' }
  // } else {
  //   width = { maxWidth: '1200px' }
  // }

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
    if (clientWidth < 576) {
      return (
        <>
          <div className="header-m">
            <div className="header-content-m">
              <DropMenu list={navList} pathname={pathname} />
            </div>
            <Logo />
            <div className="header-search-m" onClick={showModal}>
              <img src={Search} style={{ width: '20px' }} />
            </div>
          </div>
        </>
      )
    }
    return (
      <div className="header-wapper" style={width}>
        <Logo />
        <div className="header-content ">
          <Nav list={navList} pathname={pathname} />
          <div className="header-search">
            <DocsSearch appId={appIdQS} indexName={indexNameQS} apiKey={apiKeyQS} />
            <div className="header-version">v 1.0.0</div>
          </div>
        </div>
      </div>
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
