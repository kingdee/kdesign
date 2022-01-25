import React, { useState } from 'react'
import { version as kdesignVersion } from '../../../../../package.json'
import { docVersions } from '../../../../consts'
import './version.less'
import { Dropdown, Icon } from 'kdesign'

export default function Version() {
  const version = { [kdesignVersion]: kdesignVersion, ...docVersions }
  const [nowVersion, setNowVersion] = useState(Object.keys(version)[0])
  const versionOptions = Object.keys(version).map((version) => {
    return <Dropdown.Item key={version}>{version}</Dropdown.Item>
  })
  const handleItemClick = (key: any) => {
    setNowVersion(key)
  }
  const menu = <Dropdown.Menu onClick={handleItemClick}>{versionOptions}</Dropdown.Menu>

  return (
    <Dropdown menu={menu} getPopupContainer={() => document.querySelector('.header') as HTMLElement}>
      <a href="true" className="kd-dropdown-link kd-dropdown-version" onClick={(e) => e.preventDefault()}>
        {nowVersion} <Icon type="arrow-down-solid" />
      </a>
    </Dropdown>
  )
}
