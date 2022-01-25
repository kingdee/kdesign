import React from 'react'
export interface MenuInfo {
  key: React.Key
  keyPath: React.Key[]
  domEvent: Event
}

export type MenuClickEventHandler = (info: MenuInfo) => void

export type MenuMode = 'inline' | 'vertical'

export type TriggerSubMenuAction = 'click' | 'hover'

export type SubMenuChangeEventHandler = (openKey: string) => void

export type KeyType = React.Key

export type MenuTheme = 'dark' | 'light'
