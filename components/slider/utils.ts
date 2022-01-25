export function getHandleCenterposition(vertical: boolean, handle: HTMLElement) {
  const coords = handle.getBoundingClientRect()
  return vertical ? coords.top + coords.height * 0.5 : window.pageXOffset + coords.left + coords.width * 0.5
}

export function getPrecision(step: number) {
  const stepString = step.toString()
  let precision = 0
  if (stepString.indexOf('.') >= 0) {
    precision = stepString.length - stepString.indexOf('.') - 1
  }
  return precision
}

export function getClosestPoint(val: number, props: any) {
  const { marks, step, min, max } = props
  const points = Object.keys(marks).map(parseFloat)
  if (step !== null) {
    const baseNum = 10 ** getPrecision(step)
    const maxSteps = Math.floor((max * baseNum - min * baseNum) / (step * baseNum))
    const steps = Math.min((val - min) / step, maxSteps)
    const closestStep = Math.round(steps) * step + min
    points.push(closestStep)
  }
  const diffs = points.map((point) => Math.abs(val - point))
  return points[diffs.indexOf(Math.min(...diffs))]
}

export function ensureValueInRange(val: number, { max, min }: { max?: number; min?: number }) {
  if (val <= min!) {
    return min
  }
  if (val >= max!) {
    return max
  }
  return val
}

export function ensureValuePrecision(val: number, props: any) {
  const { step } = props
  const closestPoint = isFinite(getClosestPoint(val, props)) ? getClosestPoint(val, props) : 0
  return step === null ? closestPoint : parseFloat(closestPoint.toFixed(getPrecision(step)))
}
