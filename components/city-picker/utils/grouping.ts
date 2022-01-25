/**
 * 进行分组
 * @param groups 组别
 * @param nums 每组个数
 * @returns 分组结果
 */
export default function grouping(groups: Array<string> = [], nums = 4) {
  if (groups.length === 0 || nums <= 1) return groups
  const result: Array<string> = []
  let str = ''
  for (let i = 0; i < groups.length; i++) {
    if (str.length === nums) {
      result.push(str)
      str = ''
    }
    str += groups[i]

    if (i === groups.length - 1) {
      result.push(str)
    }
  }
  return result
}
