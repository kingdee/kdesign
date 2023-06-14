import React, { useState } from 'react'
import { mount } from 'enzyme'
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

const { Header, Footer, Sider, Content } = Layout

describe('Layout', () => {
  // 1. mount test
  describe('1. mount test', () => {
    mountTest(Layout)
    mountTest(Content)
    mountTest(Sider)
    mountTest(() => (
      <Layout>
        <Sider breakpoint="xs" />
        <Content />
      </Layout>
    ))
  })

  // 2.render test
  describe('2. render test', () => {
    it('should be controlled by collapsed', () => {
      const wrapper = mount(<Sider>Sider</Sider>)
      expect(wrapper).toMatchSnapshot()
      wrapper.setProps({ collapsed: true })
      wrapper.update()
      expect(wrapper).toMatchSnapshot()
    })
    it('Header, Footer, Sider, Content 1', () => {
      const wrapper = mount(
        <Layout>
          <Header>Header</Header>
          <Content>Content</Content>
          <Footer>Footer</Footer>
        </Layout>,
      )
      expect(wrapper).toMatchSnapshot()
    })

    it('Header, Footer, Sider, Content 2 ', () => {
      const wrapper = mount(
        <Layout>
          <Header>Header</Header>
          <Layout>
            <Sider>Sider</Sider>
            <Content>Content</Content>
          </Layout>
          <Footer>Footer</Footer>
        </Layout>,
      )
      expect(wrapper).toMatchSnapshot()
    })
  })
  // 3.warns in component

  // 4. render null or undefined without errors
  it('render null or undefined Layout without errors', () => {
    expect(
      mount(
        <Layout>
          <Sider>
            {null}
            {undefined}
          </Sider>
          <Content>
            {null}
            {undefined}
          </Content>
        </Layout>,
      )
        .find('.kd-layout')
        .first(),
    ).toMatchSnapshot()
  })

  // 5. displayName
  it('should have displayName static property', () => {
    expect(Sider.displayName).toBe('Sider')
    expect(Content.displayName).toBe('Content')
    expect(Layout.displayName).toBe('Layout')
  })

  // 6. api test
  describe('6. api test', () => {
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

    it('should have 50% and className width of sidebar', async () => {
      const wrapper = mount(
        <Layout>
          <div>
            <Sider width="50%" className="my-Sider" style={{ padding: 0 }}>
              Sider
            </Sider>
          </div>
          <Content>Content</Content>
        </Layout>,
      )
      // console.log(wrapper.debug())
      expect(wrapper.find('Sider').at(0)).toHaveClassName('my-Sider')
      expect(wrapper.find('.kd-layout-sider').at(0)).toHaveStyle('maxWidth', '50%')
      expect(wrapper.find('.kd-layout-sider').at(0)).toHaveStyle('flex', '0 0 50%')
      expect(wrapper.find('.kd-layout-sider').at(0)).toHaveStyle('padding', 0)
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
        it('onCollapse', () => {
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

        it('defaultCollapsed', () => {
          const Demo = () => {
            return (
              <Layout>
                <Sider defaultCollapsed>Sider</Sider>
                <Content>Content</Content>
              </Layout>
            )
          }

          const wrapper = mount(<Demo />)
          expect(wrapper.find('.kd-layout-sider')).toHaveClassName('kd-layout-sider-collapsed')
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

    it('should not add kd-layout-has-sider when `hasSider` is `false`', () => {
      const wrapper = mount(
        <Layout hasSider={false}>
          <Sider>Sider</Sider>
        </Layout>,
      )
      expect(wrapper.find('.kd-layout')).not.toHaveClassName('kd-layout-has-sider')
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

      expect(wrapper.find('.kd-layout-sider .kd-layout-sider-zero-width-trigger').find('.my-trigger')).toExist()
    })

    it('hides trigger when trigger is set to null', () => {
      const wrapper = mount(
        <Sider collapsedWidth={0} collapsible trigger={null}>
          <Menu theme="dark" mode="inline" defaultSelectedKey={'1'}>
            <Menu.Item key="1">
              <Icon type="user" />
              <span>nav 1</span>
            </Menu.Item>
          </Menu>
        </Sider>,
      )
      expect(wrapper.find('.kd-layout-sider .kd-layout-sider-zero-width-trigger')).not.toExist()
    })

    it('reverses arrow when Sider is on the right', () => {
      const wrapper = mount(
        <Layout>
          <Content>Content</Content>
          <Sider className="site-layout-background" width={200} collapsible reverseArrow={false}>
            Sider
          </Sider>
        </Layout>,
      )
      expect(wrapper.find('.kd-layout .kd-layout-sider .kd-layout-sider-trigger .kdicon-unfoldmenu')).toExist()
    })
  })

  // 7.component interaction(event)

  // 8.config provider

  // 9. ref test
  // describe('9. ref test', () => {
  //   it('should get aside element from ref', () => {
  //     const ref = React.createRef()
  //     const wrapper = mount(
  //       <Layout ref={ref as any}>
  //         <Sider>Sider</Sider>
  //         <Content>Content</Content>
  //       </Layout>,
  //     )
  //     expect((ref.current as HTMLElement).classList.contains('.kd-layout')).toBe(true)
  //   })
  // })
})
