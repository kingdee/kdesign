import React from 'react'
import { render, mount } from 'enzyme'
import Icon from '../../icon'
import ConfigProvider from '../../config-provider/index'
import Button, { ButtonType } from '../index'
import { ButtonSizes, ButtonShapes, ButtonTypes, ButtonHTMLTypes } from '../button'
import mountTest from '../../../tests/shared/mountTest'

describe('Button', () => {
  // 1.mount test
  mountTest(Button)
  ButtonTypes.forEach((type) => {
    mountTest(() => <Button type={type} />)
  })

  // 2.render test
  it('renders correctly', () => {
    expect(render(<Button>Button Text</Button>)).toMatchSnapshot()

    ButtonTypes.forEach((type) => {
      expect(render(<Button type={type}>Button Text</Button>)).toMatchSnapshot()
    })
    ButtonSizes.forEach((size) => {
      expect(render(<Button size={size}>Button Text</Button>)).toMatchSnapshot()
    })

    ButtonHTMLTypes.forEach((htmlType) => {
      expect(render(<Button htmlType={htmlType}>Button Text</Button>)).toMatchSnapshot()
    })
  })

  // 3.warns in component
  it('warns if type is wrong', () => {
    const mockWarn = jest.fn()
    jest.spyOn(console, 'warn').mockImplementation(mockWarn)
    const type = 'who am I' as any as ButtonType
    render(<Button type={type} />)
    expect(mockWarn).toHaveBeenCalledTimes(1)
    expect(mockWarn.mock.calls[0][0]).toMatch("Warning: [kdesign]-button: cannot found button type 'who am I'")
  })

  // 4. render null or undefined without errors
  it('render null or undefined buttons without errors', () => {
    expect(
      mount(
        <Button>
          {null}
          {undefined}
        </Button>,
      ),
    ).toBeEmptyRender()
  })

  // 5. displayName
  it('should have displayName static property', () => {
    const wrapper = mount(<Button>Button Text</Button>)
    expect((wrapper.type() as any).displayName).toBe('Button')
  })

  // 6. class state
  it('should class use right', () => {
    // default
    const DefaultButton = mount(<Button>Button Text</Button>)
    expect(DefaultButton.find('.kd-btn')).toHaveClassName('.kd-btn-second')
    expect(DefaultButton.find('.kd-btn')).toHaveClassName('.kd-btn-size-middle')

    ButtonTypes.forEach((type) => {
      const TestButton = mount(<Button type={type}>Button Text</Button>)
      expect(TestButton.find(`.kd-btn`)).toHaveClassName(`.kd-btn-${type}`)
    })

    ButtonSizes.forEach((size) => {
      const TestButton = mount(<Button size={size}>Button Text</Button>)
      expect(TestButton.find(`.kd-btn`)).toHaveClassName(`.kd-btn-size-${size}`)
    })

    ButtonShapes.forEach((shape) => {
      const TestButton = mount(<Button shape={shape}>Button Text</Button>)
      expect(TestButton.find(`.kd-btn`)).toHaveClassName(`.kd-btn-shape-${shape}`)
    })

    const LoadingButton = mount(<Button loading>Button Text</Button>)
    expect(LoadingButton.find(`.kd-btn`)).toHaveClassName(`.kd-btn-loading`)

    const GhostButton = mount(<Button ghost>Button Text</Button>)
    expect(GhostButton.find(`.kd-btn`)).toHaveClassName(`.kd-btn-background-ghost`)

    const DisableButton = mount(<Button disabled>Button Text</Button>)
    expect(DisableButton.find(`.kd-btn`)).toBeDisabled()

    const BorderedButton = mount(<Button bordered={false}>Button Text</Button>)
    expect(BorderedButton.find(`.kd-btn`)).toHaveClassName(`.kd-btn-no-border`)

    const BlockButton = mount(<Button block>Button Text</Button>)
    expect(BlockButton.find(`.kd-btn`)).toHaveClassName(`.kd-btn-block`)

    const IconButton = mount(<Button icon={<Icon type="add"></Icon>}>Button Text</Button>)
    expect(IconButton.find(`.kd-btn`)).toContainReact(<Icon type="add"></Icon>)

    const TextButton = mount(<Button type="text"></Button>)
    expect(TextButton.find(`.kd-btn`)).toHaveDisplayName('span')
    expect(TextButton.find('.kd-btn')).toHaveClassName('kd-btn-text')

    const RightIconPlace = mount(
      <Button icon={<Icon type="add"></Icon>} iconPlace="right">
        Button Text
      </Button>,
    )
    expect(RightIconPlace.find(`.kd-btn > span:last-child`)).toHaveClassName('.kd-btn-iconWrapper-right')

    const LeftIconPlace = mount(<Button icon={<Icon type="add"></Icon>}>Button Text</Button>)
    expect(LeftIconPlace.find(`.kd-btn > span:first-child`)).toHaveClassName('.kd-btn-iconWrapper-left')
  })

  // 7.component interaction(event)
  it('should not clickable when button is loading', () => {
    const onClick = jest.fn()
    const wrapper = mount(
      <Button loading onClick={onClick}>
        button
      </Button>,
    )
    wrapper.simulate('click')
    expect(onClick).not.toHaveBeenCalledWith()
  })

  it('should clickable ', () => {
    const onClick = jest.fn()
    const wrapper = mount(<Button onClick={onClick}>button</Button>)
    wrapper.simulate('click')
    expect(onClick).toHaveBeenCalled()
  })

  // 8.config provider
  it('should config use config provider', () => {
    const buttonConfig = {
      compDefaultProps: {
        Button: {
          type: 'primary',
        },
      },
    }
    const wrapper = mount(
      <ConfigProvider value={buttonConfig}>
        <Button>Button Text</Button>
      </ConfigProvider>,
    )
    expect(wrapper.find('.kd-btn')).toHaveClassName('.kd-btn-primary')
  })

  // 9. ref test
  it('should get button element from ref', () => {
    const ref = React.createRef()
    mount(<Button ref={ref}></Button>)
    expect(ref.current instanceof HTMLButtonElement).toBe(true)

    mount(<Button ref={ref} type="text"></Button>)
    expect(ref.current instanceof HTMLSpanElement).toBe(true)
  })

  it('text attributes should not use with shape or loading', () => {
    const wrapper = mount(
      <Button shape="circle" type="text">
        Button Text
      </Button>,
    )
    expect(wrapper.find('.kd-btn-shape-circle').length).toBe(0)
  })

  // 10. api test

  describe('10. api test', () => {
    it('block API test', () => {
      const wrapper = mount(<Button block>block Button</Button>)
      expect(wrapper.find(`.kd-btn`)).toHaveClassName(`.kd-btn-block`)

      ButtonShapes.forEach((shape) => {
        const TestButton = mount(
          <Button block shape={shape}>
            block Button
          </Button>,
        )
        expect(TestButton.find(`.kd-btn`)).not.toHaveClassName(`.kd-btn-block`)
      })
    })

    it('bordered API test', () => {
      const BorderedButton = mount(<Button bordered={true}>Button Text</Button>)
      expect(BorderedButton.find(`.kd-btn`)).not.toHaveClassName(`.kd-btn-no-border`)
    })

    it('htmlType API test', () => {
      ButtonHTMLTypes.forEach((htmlType) => {
        const TestButton = mount(
          <Button block htmlType={htmlType}>
            test Button
          </Button>,
        )
        expect(TestButton.find(`.kd-btn`).prop('type')).toEqual(htmlType)
      })
    })
  })
})
