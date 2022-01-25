import React from 'react'
import { render, mount } from 'enzyme'
import Badge from '../index'
import { PresetStatusColorTypes, BadgeSizes } from '../badge'
import mountTest from '../../../tests/shared/mountTest'

describe('Badge', () => {
  // 1.mount test
  mountTest(Badge)

  // 2.render test
  it('renders correctly', () => {
    PresetStatusColorTypes.forEach((type) => {
      const wrapper = render(<Badge status={type} />)
      expect(wrapper).toMatchSnapshot()
    })

    BadgeSizes.forEach((size) => {
      const wrapper = render(<Badge count={10} size={size} />)
      expect(wrapper).toMatchSnapshot()
    })
  })

  // 3. render null or undefined without errors
  it('render null or undefined Badge without errors', () => {
    expect(
      mount(
        <Badge>
          {null}
          {undefined}
        </Badge>,
      ),
    ).toBeEmptyRender()
  })

  // 5. displayName
  it('should have displayName static property', () => {
    const wrapper = mount(<Badge>Text</Badge>)
    expect((wrapper.type() as any).displayName).toBe('Badge')
  })

  // 6. class state
  it('should class use right', () => {
    // default
    const DefaultBadge = mount(<Badge count={99} />)
    expect(DefaultBadge.find('.kd-badge-count').length).toBeGreaterThanOrEqual(1)

    // shhowZero
    const ShhowZeroBadge = mount(<Badge count={0} showZero />)
    expect(ShhowZeroBadge.find('.kd-badge-count').length).toBeGreaterThanOrEqual(1)

    // multiple count
    const MultipleBadge = mount(<Badge count={99} />)
    expect(MultipleBadge.find('.kd-badge-multiple-words').length).toBeGreaterThanOrEqual(1)

    // sm size
    const SizeSmBadge = mount(<Badge count={99} size="small" />)
    expect(SizeSmBadge.find('.kd-badge-count-sm').length).toBeGreaterThanOrEqual(1)

    // dot
    const DotBadge = mount(<Badge dot />)
    expect(DotBadge.find('.kd-badge-dot').length).toBeGreaterThanOrEqual(1)

    // status types
    PresetStatusColorTypes.forEach((type) => {
      const TestButton = mount(<Badge status={type} />)
      expect(TestButton.find(`.kd-badge-status-${type}`).length).toBeGreaterThanOrEqual(1)
    })
  })
})
