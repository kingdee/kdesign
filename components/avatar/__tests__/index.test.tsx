import React from 'react'
import { mount, render } from 'enzyme'
import ConfigProvider from '../../config-provider/index'
import Avatar from '../index'
import { AvatarShapes, AvatarShape, AvatarSizes } from '../avatar'
import Icon from '../../icon'
import mountTest from '../../../tests/shared/mountTest'

describe('Avatar', () => {
  // 1.mount test
  mountTest(Avatar)
  AvatarShapes.forEach((shape) => {
    mountTest(() => <Avatar shape={shape} />)
  })

  AvatarSizes.forEach((size) => {
    mountTest(() => <Avatar size={size} />)
  })

  // 2.render test
  it('renders correctly', () => {
    expect(render(<Avatar>Avatar</Avatar>)).toMatchSnapshot()

    AvatarSizes.forEach((size) => {
      expect(render(<Avatar size={size}>Avatar</Avatar>)).toMatchSnapshot()
    })
    AvatarShapes.forEach((shape) => {
      expect(render(<Avatar shape={shape}>Avatar</Avatar>)).toMatchSnapshot()
    })
  })

  // 3.warns in component
  it('warns if type is wrong', () => {
    const mockWarn = jest.fn()
    jest.spyOn(console, 'warn').mockImplementation(mockWarn)
    const shape = 'oval' as any as AvatarShape
    render(<Avatar shape={shape} />)
    expect(mockWarn).toHaveBeenCalledTimes(1)
    expect(mockWarn.mock.calls[0][0]).toMatch("Warning: [kdesign]-avatar: cannot found avatar shape 'oval'")
  })

  // 4. render null or undefined without errors
  it('render null or undefined buttons without errors', () => {
    expect(
      mount(
        <Avatar>
          {null}
          {undefined}
        </Avatar>,
      ),
    ).toMatchSnapshot()
  })

  // 5. displayName
  it('should have displayName static property', () => {
    const wrapper = mount(<Avatar>Avatar</Avatar>)
    expect((wrapper.type() as any).displayName).toBe('Avatar')
  })

  // 6. class state
  it('should class use right', () => {
    // default
    const DefaultAvatar = mount(<Avatar />)
    expect(DefaultAvatar.find('.kd-avatar')).toHaveClassName('.kd-avatar-md')
    expect(DefaultAvatar.find('.kd-avatar')).toHaveClassName('.kd-avatar-circle')

    const stringAvatar = mount(<Avatar>string</Avatar>)
    expect(stringAvatar.find('.kd-avatar').length).toBeGreaterThanOrEqual(1)

    AvatarShapes.forEach((shape) => {
      const TestButton = mount(<Avatar shape={shape}>Avatar</Avatar>)
      expect(TestButton.find(`.kd-avatar`)).toHaveClassName(`.kd-avatar-${shape}`)
    })

    const DisableAvatar = mount(<Avatar disabled />)
    expect(DisableAvatar.find(`.kd-avatar`)).toHaveClassName('.kd-avatar-disabled')

    const IconAvatar = mount(<Avatar icon={<Icon type="add"></Icon>} />)
    expect(IconAvatar.find(`.kd-avatar`)).toContainReact(<Icon type="add"></Icon>)
  })

  // 7.component interaction(event)
  it('Render long string correctly', () => {
    const wrapper = mount(<Avatar>TestString</Avatar>)
    const children = wrapper.find('.kd-avatar-string')
    expect(children.length).toBe(1)
  })

  it('should render fallback string correctly', () => {
    const div = global.document.createElement('div')
    global.document.body.appendChild(div)

    const wrapper = mount(<Avatar src="http://error.url">Fallback</Avatar>, { attachTo: div })
    wrapper.find('img').simulate('error')
    const children = wrapper.find('.kd-avatar-string')
    expect(children.length).toBe(1)
    expect(children.text()).toBe('Fallback')
    wrapper.detach()
    global.document.body.removeChild(div)
  })

  it('should handle onError correctly', () => {
    const LOAD_FAILURE_SRC = 'http://error.url'
    const LOAD_SUCCESS_SRC = 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'

    const div = global.document.createElement('div')
    global.document.body.appendChild(div)

    class Foo extends React.Component {
      state = {
        src: LOAD_FAILURE_SRC,
      }

      handleImgError = () => {
        this.setState({
          src: LOAD_SUCCESS_SRC,
        })
        return false
      }

      render() {
        const { src } = this.state
        return <Avatar src={src} onError={this.handleImgError} />
      }
    }

    const wrapper = mount(<Foo />, { attachTo: div })
    expect(div.querySelector('img')?.getAttribute('src')).toBe(LOAD_FAILURE_SRC)
    wrapper.find('img').simulate('error')

    expect(wrapper).toMatchSnapshot()
    expect(div.querySelector('img')?.getAttribute('src')).toBe(LOAD_SUCCESS_SRC)

    wrapper.detach()
    global.document.body.removeChild(div)
  })

  // 8.config provider
  it('should config use config provider', () => {
    const buttonConfig = {
      compDefaultProps: {
        Avatar: {
          size: 'large',
        },
      },
    }
    const wrapper = mount(
      <ConfigProvider value={buttonConfig}>
        <Avatar />
      </ConfigProvider>,
    )
    expect(wrapper.find('.kd-avatar')).toHaveClassName('.kd-avatar-lg')
  })

  // 9. ref test
  it('should get avatar element from ref', () => {
    const ref = React.createRef()
    mount(<Avatar ref={ref}></Avatar>)
    expect(ref.current instanceof HTMLSpanElement).toBe(true)
  })
})
