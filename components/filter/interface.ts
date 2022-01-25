import React from 'react'
import { Menu } from '../dropdown/menu'
import { IQuickSearchProps } from '../search'

type TabKey = 'condition' | 'scheme'

export type TFilterValue = {
  [key: string]: string[] | IScheme
}

export type TOption = {
  value?: string
  label?: string
  component?: React.ReactNode
}

export interface ICondition {
  key: string
  label: string
  options: TOption[]
  required?: boolean
  multiple?: boolean
  addition?: React.ReactNode
}

export interface IField {
  name: string
  label: string
  required?: boolean
  operators: React.ReactElement
  assignOptions: Record<string, React.ReactElement>
}

export interface ISchemeItem {
  fieldName: string
  value: string
  operator: string
  required?: boolean
}

export interface IScheme {
  name?: string
  preset?: boolean
  items: ISchemeItem[]
}

export interface IFilterProps {
  spread?: boolean
  fields?: IField[]
  className?: string
  schemes?: IScheme[]
  value?: TFilterValue
  defaultTabKey?: TabKey
  defaultSpread?: boolean
  title?: React.ReactNode
  conditions?: ICondition[]
  search?: IQuickSearchProps
  style?: React.CSSProperties
  defaultValue?: TFilterValue
  onSchemeSave?: (scheme: IScheme) => void
  onSpreadChange?: (spread: boolean) => void
  getSchemeSettingMenu?: (scheme: IScheme) => typeof Menu
  onChange?: (value: TFilterValue, condition?: ICondition, option?: TOption) => void
}

export interface IConditionProps {
  tab: string
  prefixCls: string
  value: TFilterValue
  conditions: ICondition[]
  FilterLangMsg: Record<string, any>
  onConditionRemove: (key: string, e: React.MouseEvent) => void
  onConditionChange: (value: TFilterValue, condition?: ICondition, option?: TOption) => void
}

export interface ISchemeProps {
  tab: string
  fields: IField[]
  prefixCls: string
  schemes: IScheme[]
  value: { scheme: IScheme }
  FilterLangMsg: Record<string, any>
  onSchemeSave: (scheme: IScheme) => void
  onSchemeSearch: (scheme: IScheme) => void
  getSchemeSettingMenu?: (scheme: IScheme) => void
}
