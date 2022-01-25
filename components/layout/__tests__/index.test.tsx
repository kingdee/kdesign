import React, { useState } from 'react'
import { mount, render } from 'enzyme'
import Layout from '..'
import Icon from '../../icon'
import Menu from '../../menu'
import mountTest from '../../../tests/shared/mountTest'
import matchMediaPolyfill from 'mq-polyfill'

beforeAll(() => {
  matchMediaPolyfill(window)
  window.resizeTo = function resizeTo(width, height) {
    Object.assign(this, {
      innerWidth: width,
      innerHeight: height,
      outerWidth: width,
      outerHeight: height,
    }).dispatchEvent(new this.Event('resize'))
  }
})

const { Sider, Content } = Layout

describe('Layout', () => {
  mountTest(Layout)
  mountTest(Content)
  mountTest(Sider)
  mountTest(() => (
    <Layout>
      <Sider breakpoint="xs" />
      <Content />
    </Layout>
  ))

  it('detect the sider as children', () => {
    const wrapper = mount(
      <Layout>
        <Sider>Sider</Sider>
        <Content>Content</Content>
      </Layout>,
    )
    expect(wrapper.find('.kd-layout')).toHaveClassName('kd-layout-has-sider')
    wrapper.unmount()
  })

  it('umount from multiple siders', async () => {
    const App = () => {
      const [hide1, setHide1] = useState(false)
      const [hide2, setHide2] = useState(false)
      return (
        <Layout>
          {hide1 ? null : <Sider>Sider</Sider>}
          {hide2 ? null : <Sider>Sider</Sider>}
          <Content>
            <button onClick={() => setHide1(true)} type="button">
              hide sider 1
            </button>
            <button onClick={() => setHide2(true)} type="button">
              hide sider 2
            </button>
          </Content>
        </Layout>
      )
    }
    const wrapper = mount(<App />)
    expect(wrapper.find('.kd-layout')).toHaveClassName('kd-layout-has-sider')
    wrapper.find('button').at(0).simulate('click')
    expect(wrapper.find('.kd-layout')).toHaveClassName('kd-layout-has-sider')
    wrapper.find('button').at(1).simulate('click')
    expect(wrapper.find('.kd-layout')).not.toHaveClassName('kd-layout-has-sider')
  })

  it('detect the sider inside the children', async () => {
    const wrapper = mount(
      <Layout>
        <div>
          <Sider>Sider</Sider>
        </div>
        <Content>Content</Content>
      </Layout>,
    )
    expect(wrapper.find('.kd-layout')).toHaveClassName('kd-layout-has-sider')
  })

  it('detect kd-layout-sider-has-trigger class in sider when kd-layout-sider-trigger div tag exists', async () => {
    const wrapper = mount(
      <Layout>
        <div>
          <Sider collapsible>Sider</Sider>
        </div>
        <Content>Content</Content>
      </Layout>,
    )
    expect(wrapper.find('.kd-layout-sider')).toHaveClassName('kd-layout-sider-has-trigger')
  })

  it('should have 50% width of sidebar', async () => {
    const wrapper = mount(
      <Layout>
        <div>
          <Sider width="50%">Sider</Sider>
        </div>
        <Content>Content</Content>
      </Layout>,
    )
    expect(wrapper.find('.kd-layout-sider').at(0)).toHaveStyle('maxWidth', '50%')
    expect(wrapper.find('.kd-layout-sider').at(0)).toHaveStyle('flex', '0 0 50%')
  })

  describe('zeroWidth', () => {
    it('detect kd-layout-sider-zero-width class in sider when its width is 0%', async () => {
      const wrapper = mount(
        <Layout>
          <div>
            <Sider width="0%">Sider</Sider>
          </div>
          <Content>Content</Content>
        </Layout>,
      )
      expect(wrapper.find('.kd-layout-sider')).toHaveClassName('kd-layout-sider-zero-width')
    })

    describe('should collapsible', () => {
      it('uncontrolled', () => {
        const onCollapse = jest.fn()

        const wrapper = mount(
          <Layout>
            <Sider collapsible breakpoint="lg" collapsedWidth="0" onCollapse={onCollapse}>
              Sider
            </Sider>
            <Content>Content</Content>
          </Layout>,
        )

        onCollapse.mockReset()

        wrapper.find('.kd-layout-sider-zero-width-trigger').simulate('click')
        expect(onCollapse).toHaveBeenCalledTimes(1)
      })

      it('controlled', () => {
        const Demo = () => {
          const [collapsed, setCollapsed] = React.useState(true)

          return (
            <Layout>
              <Sider collapsed={collapsed} collapsible breakpoint="lg" collapsedWidth="0" onCollapse={setCollapsed}>
                Sider
              </Sider>
              <Content>Content</Content>
            </Layout>
          )
        }

        const wrapper = mount(<Demo />)
        expect(wrapper.find(Sider).prop('collapsed')).toBeTruthy()

        wrapper.find('.kd-layout-sider-zero-width-trigger').simulate('click')
        expect(wrapper.find(Sider).prop('collapsed')).toBeFalsy()
      })
    })
  })

  it('detect kd-layout-sider-dark as default theme', async () => {
    const wrapper = mount(<Sider>Sider</Sider>)
    expect(wrapper.find('.kd-layout-sider')).toHaveClassName('kd-layout-sider-dark')
  })

  it('detect kd-layout-sider-light when set light theme', async () => {
    const wrapper = mount(<Sider theme="light">Sider</Sider>)
    expect(wrapper.find('.kd-layout-sider')).toHaveClassName('kd-layout-sider-light')
  })

  it('renders string width correctly', () => {
    const wrapper = render(<Sider width="200">Sider</Sider>)
    expect(wrapper).toMatchSnapshot()
  })

  it('should be controlled by collapsed', () => {
    const wrapper = mount(<Sider>Sider</Sider>)
    expect(wrapper).toMatchSnapshot()
    wrapper.setProps({ collapsed: true })
    wrapper.update()
    expect(wrapper).toMatchSnapshot()
  })

  it('should not add kd-layout-has-sider when `hasSider` is `false`', () => {
    const wrapper = mount(
      <Layout hasSider={false}>
        <Sider>Sider</Sider>
      </Layout>,
    )
    expect(wrapper.find('.kd-layout')).not.toHaveClassName('kd-layout-has-sider')
  })
})

describe('Sider', () => {
  const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => ({}))

  afterEach(() => {
    errorSpy.mockReset()
  })

  afterAll(() => {
    errorSpy.mockRestore()
  })

  it('should trigger onBreakpoint', () => {
    const onBreakpoint = jest.fn()
    mount(
      <Sider breakpoint="lg" onBreakpoint={onBreakpoint}>
        Sider
      </Sider>,
    )
    window.resizeTo(1279, 1000)
    expect(onBreakpoint).toHaveBeenCalledWith(true)
  })

  it('zeroWidthTriggerStyle should work', () => {
    const wrapper = mount(
      <Sider collapsedWidth={0} collapsible zeroWidthTriggerStyle={{ background: '#F96' }}>
        <Menu theme="dark" mode="inline" defaultSelectedKey={'1'}>
          <Menu.Item key="1">
            <Icon type="user" />
            <span>nav 1</span>
          </Menu.Item>
        </Menu>
      </Sider>,
    )
    expect(wrapper.find('.kd-layout-sider-zero-width-trigger')).toHaveStyle({ background: '#F96' })
  })

  it('should be able to customize zero width trigger by trigger prop', () => {
    const wrapper = mount(
      <Sider collapsedWidth={0} collapsible trigger={<span className="my-trigger" />}>
        <Menu theme="dark" mode="inline" defaultSelectedKey={'1'}>
          <Menu.Item key="1">
            <Icon type="user" />
            <span>nav 1</span>
          </Menu.Item>
        </Menu>
      </Sider>,
    )
    expect(wrapper.find('.kd-layout-sider-zero-width-trigger').find('.my-trigger')).toHaveLength(1)
  })

  it('should get aside element from ref', () => {
    const ref = React.createRef()
    const onSelect = jest.fn()

    mount(
      <Sider onSelect={onSelect} ref={ref as any}>
        Sider
      </Sider>,
    )
    expect(ref.current instanceof HTMLElement).toBe(true)
  })
})
