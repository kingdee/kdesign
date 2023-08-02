import React from 'react'
import { render, mount } from 'enzyme'
import Badge from '../index'
import ConfigProvider from '../../config-provider/index'
import { PresetStatusColorTypes, BadgeSizes } from '../badge'
import mountTest from '../../../tests/shared/mountTest'

describe('Badge', () => {
  // 1.mount test
  describe('1.mount test', () => {
    mountTest(Badge)
  })

  // 2.render test
  describe('2.render test', () => {
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
  })
  // 3.warns in component
  // 4. render null or undefined without errors
  describe('4.render null or undefined without errors', () => {
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
  })

  // 5. displayName
  describe('5.displayName', () => {
    it('should have displayName static property', () => {
      const wrapper = mount(<Badge>Text</Badge>)
      expect((wrapper.type() as any).displayName).toBe('Badge')
    })
  })

  // 6. class state
  describe('6.class state', () => {
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

  // 7.component interaction(event)
  // 8.config provider
  describe('8.config provider', () => {
    it('should config use config provider', () => {
      const badgeConfig = {
        compDefaultProps: {
          Badge: {
            color: 'blue',
          },
        },
      }
      const wrapper = mount(
        <ConfigProvider value={badgeConfig}>
          <Badge>
            <span className="head-example" />
          </Badge>
        </ConfigProvider>,
      )
      expect(wrapper.find(`.kd-badge-dot`).prop('style')?.backgroundColor).toBe('blue')
    })
  })
  // 9. ref test
  // 10. api test
  describe('10.api test', () => {
    // color
    it('color', () => {
      const colorBadge = mount(
        <Badge color="blue">
          <span className="head-example" />
        </Badge>,
      )
      expect(colorBadge.find(`.kd-badge-dot`).prop('style')?.backgroundColor).toBe('blue')
    })
    // count
    it('count', () => {
      const countBadge = mount(
        <Badge count={5}>
          <span className="head-example" />
        </Badge>,
      )
      expect(countBadge.find(`.kd-badge-count`).prop('title')).toEqual(5)
      expect(countBadge.find(`.kd-badge-count`)).toHaveText('5')
    })
    // dot
    it('dot', () => {
      const dotBadge = mount(
        <Badge dot count={5}>
          <span className="head-example" />
        </Badge>,
      )
      expect(dotBadge.find(`.kd-badge-dot`).prop('title')).toEqual(5)
      expect(dotBadge.find(`.kd-badge-dot`)).toHaveText('')
    })
    // offset
    it('offset', () => {
      const offsetBadge = mount(
        <Badge count={5} offset={[10, 10]}>
          <span className="head-example" />
        </Badge>,
      )
      expect(offsetBadge.find(`.kd-badge-count`).prop('style')?.marginTop).toBe(10)
      expect(offsetBadge.find(`.kd-badge-count`).prop('style')?.right).toBe(-10)
    })
    // overflowCount
    it('overflowCount', () => {
      const overflowCountBadge = mount(
        <Badge count={100} overflowCount={10}>
          <span className="head-example" />
        </Badge>,
      )
      expect(overflowCountBadge.find(`.kd-badge-count`)).toHaveText('10+')
    })
    // showZero
    it('showZero', () => {
      const showZeroBadge = mount(
        <Badge showZero={false} count={0}>
          <span className="head-example" />
        </Badge>,
      )
      expect(showZeroBadge.exists('.kd-badge-count')).toBeFalsy()
    })
    // status
    it('status', () => {
      PresetStatusColorTypes.forEach((type) => {
        const statusBadge = mount(<Badge status={type} />)
        expect(statusBadge.exists('.kd-badge-count')).toBeFalsy()
      })
    })
    // text
    it('text', () => {
      PresetStatusColorTypes.forEach((type) => {
        const textBadge = mount(<Badge status={type} text={type} />)
        expect(textBadge.find(`.kd-badge-status-text`)).toHaveText(type)
      })
    })
    // title
    it('title', () => {
      const titleBadge = mount(
        <Badge count={100} overflowCount={10} title="300">
          <span className="head-example" />
        </Badge>,
      )
      expect(titleBadge.find(`.kd-badge-count`).prop('title')).not.toEqual(100)
      expect(titleBadge.find(`.kd-badge-count`).prop('title')).toEqual('300')
    })
  })
})
