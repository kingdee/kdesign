import React from 'react'
import { Dropdown } from 'kdesign'
import TopMenu from './../../../static/image/top_menu.png'
export interface MenuProps {
  pathname: string
  list: Array<any>
}

export default function DropMenu(props: MenuProps) {
  const { list } = props

  const versionOptions = list.map((li) => {
    return <Dropdown.Item key={li.text}>{li.text}</Dropdown.Item>
  })
  const handleItemClick = (key: any) => {
    const _link = list.filter((li) => {
      return li.text === key
    })
    console.log(key, _link)
    location.href = _link[0].path
  }
  const menu = <Dropdown.Menu onClick={handleItemClick}>{versionOptions}</Dropdown.Menu>

  return (
    <Dropdown menu={menu} getPopupContainer={() => document.querySelector('.header') as HTMLElement}>
      <a href="true" className="kd-dropdown-link kd-dropdown-version" onClick={(e) => e.preventDefault()}>
        <img src={TopMenu} style={{ width: '20px' }} />
      </a>
    </Dropdown>
  )
}
