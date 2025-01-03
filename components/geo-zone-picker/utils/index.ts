import { RegionArray } from '../interface'

export const generateRegionMap = (letterArray: string[][], regionArray: RegionArray) => {
  const regionMap: Record<string, RegionArray> = {}

  letterArray.forEach((group) => {
    const key = group.join('') // 使用 join 将数组转换为字符串，作为键
    const matchingItems = regionArray
      .filter((item) => group.includes(item.group!.toUpperCase()))
      .sort((a, b) => a.group!.localeCompare(b.group!)) // 按照 A-Z 的顺序排序

    if (matchingItems.length > 0) {
      regionMap[key] = matchingItems
    }
  })

  return regionMap
}
