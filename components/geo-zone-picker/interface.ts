import { tuple } from '../_utils/type'
export const BorderTypes = tuple('underline', 'bordered')
export type BorderType = typeof BorderTypes[number]
const TabTypes = tuple('PROVINCE', 'CITY', 'DISTRICT')
export type TabType = typeof TabTypes[number]
export interface Country {
  code: number | string
  name: string
}

export interface Region {
  code: string
  name: string
  group?: string
  children?: Region[]
}

// 声明数组对象的类型
export type RegionArray = Array<Region>

export interface RegionValue {
  countryCode?: string | number
  countryName?: string
  provinceCode?: string | number
  provinceName?: string
  cityCode?: string | number
  cityName?: string
  districtCode?: string | number
  districtName?: string
}
