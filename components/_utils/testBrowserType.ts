export function testBrowserType(reg: RegExp, type: number) {
  const external: any = window.external || {}

  for (const i in external) {
    if (reg.test(type ? external[i] : i)) {
      return true
    }
  }

  return false
}
