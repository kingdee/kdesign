import { ProgressGradient, StringGradients } from './progress'

export function validProgress(progress: number | undefined) {
  if (!progress || progress < 0) {
    return 0
  }
  if (progress > 100) {
    return 100
  }
  return progress
}

export const sortGradient = (gradients: StringGradients) => {
  let tempArr: any[] = []
  Object.keys(gradients).forEach((key) => {
    const formattedKey = parseFloat(key.replace(/%/g, ''))
    if (!isNaN(formattedKey)) {
      tempArr.push({
        key: formattedKey,
        value: gradients[key],
      })
    }
  })
  tempArr = tempArr.sort((a, b) => a.key - b.key)
  return tempArr.map(({ key, value }) => `${value} ${key}%`).join(', ')
}

export const handleGradient = (strokeColor: ProgressGradient) => {
  const { from, to, direction = 'to right', ...rest } = strokeColor
  if (Object.keys(rest).length !== 0) {
    const sortedGradients = sortGradient(rest as StringGradients)
    return { backgroundImage: `linear-gradient(${direction}, ${sortedGradients})` }
  }
  return { backgroundImage: `linear-gradient(${direction}, ${from}, ${to})` }
}
