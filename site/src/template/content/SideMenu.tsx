import React, { useRef, useState } from 'react'
import './SideMenu.less'
import { useOnClickOutside } from '../../../../components/_utils/hooks'

export default ({ children }: any) => {
  const [menuCollapsed, setMenuCollapsed] = useState<boolean>(true)
  const ref = useRef(null)

  useOnClickOutside([ref], () => {
    setMenuCollapsed(true)
  })

  return (
    <div className="side-menu-wrapper" data-mobile-show={!menuCollapsed || undefined}>
      <div
        ref={ref}
        className="side-menu"
        onClick={(evt) => evt.stopPropagation()}
        data-mobile-show={!menuCollapsed || undefined}
      >
        <div className="side-menu-inner">
          <div className="menu-list">{children}</div>
        </div>
        <button
          className="side-menu-toggle"
          onClick={(e) => {
            setMenuCollapsed(!menuCollapsed)
            e.stopPropagation()
          }}
        >
          <i className="side-menu-toggle-icon" />
        </button>
      </div>
    </div>
  )
}
