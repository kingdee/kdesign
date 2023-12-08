import { mount, render } from 'enzyme'
import React from 'react'
import mountTest from '../../../tests/shared/mountTest'
import ConfigProvider from '../../config-provider/index'
import { DividerTypes, DividerOrientations, DividerBorderStyles } from '../divider'
import Divider from '../index'

describe('Divider', () => {
  // 1. mount test
  describe('1. mount test', () => {
    mountTest(Divider)
    DividerTypes.forEach((type) => {
      mountTest(() => <Divider type={type} />)
    })
    DividerOrientations.forEach((orientation) => {
      mountTest(() => <Divider orientation={orientation} />)
    })
    DividerBorderStyles.forEach((borderStyle) => {
      mountTest(() => <Divider borderStyle={borderStyle} />)
    })
  })

  // 2. render test
  describe('2. render test', () => {
    it('renders correctly', () => {
      expect(render(<Divider />)).toMatchSnapshot()

      expect(render(<Divider style={{ width: 100 }} />)).toMatchSnapshot()

      expect(render(<Divider orientationMargin="12">Divider</Divider>)).toMatchSnapshot()

      DividerTypes.forEach((type) => {
        expect(render(<Divider type={type} />)).toMatchSnapshot()
      })

      DividerOrientations.forEach((orientation) => {
        expect(render(<Divider orientation={orientation} />)).toMatchSnapshot()
      })

      DividerBorderStyles.forEach((borderStyle) => {
        expect(render(<Divider borderStyle={borderStyle} />)).toMatchSnapshot()
      })
    })
  })

  // 3. warns in component
  describe('3. warns in component', () => {
    it('warns if type is vertical and children exist', () => {
      const mockWarn = jest.fn()
      jest.spyOn(console, 'warn').mockImplementation(mockWarn)
      mount(<Divider type="vertical">divider</Divider>)
      expect(mockWarn).toHaveBeenCalledTimes(1)
      expect(mockWarn.mock.calls[0][0]).toMatch(
        'Warning: [kdesign]-divider: `children` not working in `vertical` mode.',
      )
    })
  })

  // 4. render null or undefined without errors
  describe('4. render null or undefined without errors', () => {
    it('render null or undefined without errors', () => {
      const wrapper = (
        <Divider>
          {null}
          {undefined}
        </Divider>
      )
      expect(wrapper).toMatchSnapshot()
    })
  })

  // 5. displayName
  describe('5. displayName', () => {
    it('should have displayName static property', () => {
      expect(Divider.displayName).toBe('Divider')
    })
  })

  // 6. class state
  describe('6. class state', () => {
    it('other properties should be passed', () => {
      const wrapper = mount(
        <Divider className="my-class" data-test="test">
          hello world
        </Divider>,
      )
      expect(wrapper).toHaveClassName('my-class')
      expect(wrapper.prop('data-test')).toEqual('test')

      const defaultDivider = mount(<Divider />)
      expect(defaultDivider.find('.kd-divider')).toHaveClassName('kd-divider-solid')

      const verticalDivider = mount(<Divider type="vertical" />)
      expect(verticalDivider.find('.kd-divider')).toHaveClassName('kd-divider-vertical')

      DividerBorderStyles.forEach((borderStyle) => {
        const testBorderStyleDivider = mount(<Divider borderStyle={borderStyle}></Divider>)
        expect(testBorderStyleDivider.find(`.kd-divider`)).toHaveClassName(`kd-divider-${borderStyle}`)
      })

      DividerOrientations.forEach((orientation) => {
        const testOrientationDivider = mount(<Divider orientation={orientation}>Divider</Divider>)
        expect(testOrientationDivider.find(`.kd-divider`)).toHaveClassName(`kd-divider-with-text`)
        expect(testOrientationDivider.find(`.kd-divider`)).toHaveClassName(`kd-divider-with-text-${orientation}`)
      })
    })
  })

  // 7.component interaction(event)

  // 8.config provider
  describe('8.config provider', () => {
    it('should config use config provider', () => {
      const clipboardConfig = {
        compDefaultProps: {
          Divider: {
            borderStyle: 'dotted',
            orientation: 'right',
          },
        },
      }
      const wrapper = mount(
        <ConfigProvider value={clipboardConfig}>
          <Divider>Divider</Divider>
        </ConfigProvider>,
      )
      expect(wrapper.find('.kd-divider')).toHaveClassName('kd-divider-dotted')
      expect(wrapper.find(`.kd-divider`)).toHaveClassName('kd-divider-with-text')
      expect(wrapper.find(`.kd-divider`)).toHaveClassName('kd-divider-with-text-right')
    })
  })

  // 9. ref test

  // 10. api test
  describe('10. api test', () => {
    it('orientationMargin api', () => {
      const wrapper = mount(
        <Divider orientation="left" orientationMargin="20">
          divider
        </Divider>,
      )
      expect(wrapper.find('.kd-divider').find('.kd-divider-inner-text')).toExist()
      expect(wrapper.find('.kd-divider-inner-text')).toHaveStyle({ marginLeft: '20px' })
    })
  })

  // 11. special case
})
