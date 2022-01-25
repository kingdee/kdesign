import React from 'react'
import { Link } from 'bisheng/router'
import './nav.less'

interface Item {
  path: string
  text: string
  details: string
}

interface Props {
  list: Array<Item>
  pathname: string
}

function Nav(props: Props) {
  const { list, pathname } = props
  const _pathname = pathname.startsWith('/') ? pathname : `/${pathname}`
  return (
    <div className="header-nav">
      {list.map((n) => (
        <Link
          to={n.path}
          key={n.details}
          className={`nav-item ${_pathname.includes(n.details) ? 'nav-active-item' : ''}`}
        >
          {n.text}
        </Link>
      ))}
    </div>
  )
}

export default Nav
