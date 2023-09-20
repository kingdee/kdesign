import { mount, render } from 'enzyme'
import React from 'react'
import mountTest from '../../../tests/shared/mountTest'
import ConfigProvider from '../../config-provider/index'
import { ClipboardAction, ClipboardActions, ClipboardSize, ClipboardSizes } from '../clipboard'
import Clipboard from '../index'

describe('Clipboard', () => {
  // 1. mount test
  describe('1. mount test', () => {
    mountTest(Clipboard)
    ClipboardActions.forEach((action) => {
      mountTest(() => <Clipboard action={action} />)
    })
    ClipboardSizes.forEach((size) => {
      mountTest(() => <Clipboard size={size} />)
    })
  })

  // 2. render test
  describe('2. render test', () => {
    it('renders correctly', () => {
      expect(render(<Clipboard />)).toMatchSnapshot()

      expect(render(<Clipboard style={{ width: 100 }} />)).toMatchSnapshot()

      expect(render(<Clipboard content={'00268'} />)).toMatchSnapshot()

      expect(
        render(
          <Clipboard
            onError={(e) => {
              console.log(e)
            }}
          ></Clipboard>,
        ),
      ).toMatchSnapshot()

      ClipboardActions.forEach((action) => {
        expect(render(<Clipboard action={action} />)).toMatchSnapshot()
      })
      ClipboardSizes.forEach((size) => {
        expect(render(<Clipboard size={size} />)).toMatchSnapshot()
      })
    })
  })

  // 3. warns in component
  describe('3. warns in component', () => {
    it('warns if action is wrong', () => {
      const mockWarn = jest.fn()
      jest.spyOn(console, 'warn').mockImplementation(mockWarn)
      const action = 'who am I' as any as ClipboardAction
      render(<Clipboard action={action} />)
      expect(mockWarn).toHaveBeenCalledTimes(1)
      expect(mockWarn.mock.calls[0][0]).toMatch(
        "Warning: [kdesign]-clipboard: cannot found clipboard action 'who am I'",
      )
    })

    it('warns if size is wrong', () => {
      const mockWarn = jest.fn()
      jest.spyOn(console, 'warn').mockImplementation(mockWarn)
      const size = 'who am I' as any as ClipboardSize
      render(<Clipboard size={size} />)
      expect(mockWarn).toHaveBeenCalledTimes(1)
      expect(mockWarn.mock.calls[0][0]).toMatch("Warning: [kdesign]-clipboard: cannot found clipboard size 'who am I'")
    })
  })

  // 4. render null or undefined without errors
  describe('4. render null or undefined without errors', () => {
    it('render null or undefined without errors', () => {
      const wrapper = (
        <Clipboard>
          {null}
          {undefined}
        </Clipboard>
      )
      expect(wrapper).toMatchSnapshot()
    })
  })

  // 5. displayName
  describe('5. displayName', () => {
    it('should have displayName static property', () => {
      expect(Clipboard.displayName).toBe('Clipboard')
    })
  })

  // 6. class state
  describe('6. class state', () => {
    it('other properties should be passed', () => {
      const handleCallback = jest.fn()
      const wrapper = mount(
        <Clipboard className="my-class" onSuccess={handleCallback} onError={handleCallback} disabled data-test="test">
          hello world
        </Clipboard>,
      )
      expect(wrapper).toHaveClassName('my-class')
      wrapper.simulate('click')
      expect(handleCallback).not.toHaveBeenCalled()
      expect(wrapper.prop('data-test')).toEqual('test')

      const DefaultButton = mount(<Clipboard />)
      expect(DefaultButton.find('.kd-clipboard')).toHaveClassName('.kd-clipboard-size-middle')
      expect(DefaultButton.find('.kd-clipboard')).toHaveClassName('.kd-clipboard-icon-only')

      ClipboardSizes.forEach((size) => {
        const TestButton = mount(<Clipboard size={size}>copy</Clipboard>)
        expect(TestButton.find(`.kd-clipboard`)).toHaveClassName(`.kd-clipboard-size-${size}`)
        expect(TestButton.find(`.kd-clipboard`)).not.toHaveClassName('.kd-clipboard-icon-only')
      })
    })
  })

  // 7.component interaction(event)
  describe('7.component interaction(event)', () => {
    it('should not clickable when Clipboard is disabled', () => {
      const onSuccess = jest.fn()
      const wrapper = mount(
        <Clipboard disabled content="www.kingdee.com" onSuccess={onSuccess}>
          clipboard
        </Clipboard>,
      )
      wrapper.simulate('click')
      expect(onSuccess).not.toHaveBeenCalledWith()
    })

    it('should trigger error callback ', () => {
      const onError = jest.fn()
      const wrapper = mount(<Clipboard onError={onError}>clipboard</Clipboard>)
      wrapper.simulate('click')
      expect(onError).toHaveBeenCalled()
    })
  })

  // 8.config provider
  describe('8.config provider', () => {
    it('should config use config provider', () => {
      const clipboardConfig = {
        compDefaultProps: {
          Clipboard: {
            action: 'cut',
            size: 'large',
            disabled: true,
          },
        },
      }
      const wrapper = mount(
        <ConfigProvider value={clipboardConfig}>
          <Clipboard>Clipboard Text</Clipboard>
        </ConfigProvider>,
      )
      expect(wrapper.find('.kd-clipboard')).toHaveClassName('.kd-clipboard-size-large')
      expect(wrapper.find('.kd-clipboard')).toHaveProp('disabled')
    })
  })

  // 9. ref test
  describe('9. ref test', () => {
    it('should get Clipboard element from ref', () => {
      const ref = React.createRef()
      mount(<Clipboard ref={ref}></Clipboard>)
      expect((ref.current as HTMLElement).classList.contains('kd-clipboard')).toBe(true)
    })
  })

  // 10. api test

  // 11. special case
})
