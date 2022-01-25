import * as React from 'react'
import { IRadioGroupContextProps } from './interface'

const RadioGroupContext = React.createContext<IRadioGroupContextProps | null>(null)

export const RadioGroupContextProvider = RadioGroupContext.Provider

export default RadioGroupContext
