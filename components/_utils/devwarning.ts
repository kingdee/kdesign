const warned: Record<string, boolean> = {}

export default function (valid: boolean, component: string, message: string): void {
  if (process.env.NODE_ENV !== 'production' && valid && !warned[message]) {
    warned[message] = true
    console.warn(`Warning: [kdesign]-${component}: ${message}`)
  }
}
