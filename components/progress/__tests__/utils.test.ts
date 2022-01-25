import { validProgress, sortGradient, handleGradient } from '../utils'

describe('Progress utils test', () => {
  it('validProgress always return number', () => {
    const result = validProgress(30)
    expect(result).not.toBeNaN()
  })

  it('validProgress get 120 return 100', () => {
    const result = validProgress(120)
    expect(result).toBe(100)
  })

  it('sortGradient return right', () => {
    const result = sortGradient({
      '0%': '#108ee9',
      '100%': '#87d068',
    })
    expect(result).toBe('#108ee9 0%, #87d068 100%')
  })

  it("handleGradient's return always has property backgroundImage", () => {
    const resultPercent = handleGradient({
      '0%': '#108ee9',
      '100%': '#87d068',
    })
    expect(resultPercent).toHaveProperty('backgroundImage')
    const resultFrom = handleGradient({
      from: '#108ee9',
      to: '#87d068',
    })
    expect(resultFrom).toHaveProperty('backgroundImage')
  })
})
