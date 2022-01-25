import * as React from 'react'
import { ITabsProps } from './tabs'

const TabsContext = React.createContext<ITabsProps | null>(null)

export const TabsContextProvider = TabsContext.Provider

export default TabsContext
