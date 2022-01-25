import * as React from 'react'
import { ViewContainerProps } from './view-container'

const ViewContext = React.createContext<ViewContainerProps | null>(null)

export const ViewContextProvider = ViewContext.Provider

export default ViewContext
