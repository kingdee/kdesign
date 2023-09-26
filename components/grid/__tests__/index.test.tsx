import React from 'react'
import { mount, render } from 'enzyme'
import { Row, Col } from '../index'
import matchMediaPolyfill from 'mq-polyfill'
import ConfigProvider from '../../config-provider/index'
import mountTest from '../../../tests/shared/mountTest'

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

describe('Grid', () => {
  // 1. mount test
  describe('1. mount test', () => {
    mountTest(Row)
    mountTest(Col)
  })

  // 2.render test
  describe('2. render test', () => {
    it('should render Col', () => {
      const wrapper = render(<Col span={2} />)
      expect(wrapper).toMatchSnapshot()
    })

    it('should render Row', () => {
      const wrapper = render(<Row />)
      expect(wrapper).toMatchSnapshot()
    })

    it('should render Row gutter 12', () => {
      const wrapper = render(
        <Row gutter={12}>
          <Col span={8}>
            <div>col-8</div>
          </Col>
          <Col span={8}>
            <div>col-8</div>
          </Col>
          <Col span={8}>
            <div>col-8</div>
          </Col>
        </Row>,
      )
      expect(wrapper).toMatchSnapshot()
    })
  })

  // 3.warns in component

  // 4. render null or undefined without errors
  describe('4. render null or undefined without errors', () => {
    it('render null or undefined Row Col without errors', () => {
      expect(
        mount(
          <Row>
            <Col>
              {null}
              {undefined}
            </Col>
          </Row>,
        ),
      ).toMatchSnapshot()
    })
  })

  // 5. displayName
  describe('5. displayName', () => {
    it('should have displayName static property', () => {
      expect(Row.displayName).toBe('Row')
      expect(Col.displayName).toBe('Col')
    })
  })

  // 6. api test
  describe('6. api test', () => {
    it('when align is bottom', () => {
      const wrapper = mount(<Row align="bottom" />)
      expect(wrapper.find('div').first()).toHaveStyle({ alignItems: 'flex-end' })
    })

    it('when typeof gutter is number', () => {
      const wrapper = mount(<Row gutter={20} />)
      expect(wrapper.find('div').first()).toHaveStyle('margin', '0 -10px')
    })

    it('when typeof gutter is object', () => {
      const wrapper = mount(<Row gutter={{ xs: 8, sm: 16, md: 24 }} />)
      expect(wrapper.find('div').first()).toHaveStyle('margin', '0 -12px')
    })

    it('when typeof gutter is array', () => {
      const wrapper = mount(<Row gutter={[8, 20]} />)
      expect(wrapper.find('div').first()).toHaveStyle({ 'row-gap': '20px' })
    })

    it('when typeof gutter is object array', () => {
      const wrapper1 = mount(<Row gutter={[12, { xs: 8, sm: 16, md: 24, lg: 32, xl: 40 }]} />)
      const wrapper2 = mount(<Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32, xl: 40 }, 12]} />)
      expect(wrapper1.find('div').first()).toHaveStyle({ 'row-gap': '24px', margin: '0 -6px' })
      expect(wrapper2.find('div').first()).toHaveStyle({ 'row-gap': '12px', margin: '0 -12px' })
    })

    it('when wrap is false', () => {
      const wrapper = mount(
        <Row wrap={false}>
          <Col>Col</Col>
        </Row>,
      )
      expect(wrapper.find('div').first()).toHaveClassName('nowrap')
    })

    it('when justify is space-between', () => {
      const wrapper = mount(<Row justify="space-between" />)
      expect(wrapper.find('div').first()).toHaveStyle('justifyContent', 'space-between')
    })

    it('when flex is number', () => {
      const wrapper = mount(
        <Row>
          <Col flex={2}>2 / 5</Col>
          <Col flex={3}>3 / 5</Col>
        </Row>,
      )
      expect(wrapper.find('.kd-col').first()).toHaveStyle('flex', '2 2 auto')
      expect(wrapper.find('.kd-col').last()).toHaveStyle('flex', '3 3 auto')
    })

    it('when flex is fixed value', () => {
      const wrapper = mount(
        <Row>
          <Col flex="100px">100px</Col>
        </Row>,
      )
      expect(wrapper.find('.kd-col').first()).toHaveStyle('flex', '0 0 100px')
    })

    it('when flex is flex string', () => {
      const wrapper = mount(
        <Row>
          <Col flex="auto">auto</Col>
          <Col flex="1 1 300px">1 1 300px</Col>
        </Row>,
      )
      expect(wrapper.find('.kd-col').first()).toHaveStyle('flex', 'auto')
      expect(wrapper.find('.kd-col').last()).toHaveStyle('flex', '1 1 300px')
    })

    it('should offset Col', () => {
      const wrapper = mount(
        <Row>
          <Col span={12} offset={6}>
            col-12 col-offset-6
          </Col>
        </Row>,
      )
      expect(wrapper.find('.kd-col').first()).toHaveStyle({ flex: '0 0 50%', maxWidth: '50%', marginLeft: '25%' })
    })

    it('should push and pull Col', () => {
      const wrapper = mount(
        <Row>
          <Col span={18} push={6}>
            col-18 col-push-6
          </Col>
          <Col span={6} pull={18}>
            col-6 col-pull-18
          </Col>
        </Row>,
      )
      expect(wrapper.find('.kd-col').first()).toHaveStyle({ flex: '0 0 75%', maxWidth: '75%', left: '25%' })
      expect(wrapper.find('.kd-col').last()).toHaveStyle({ flex: '0 0 25%', maxWidth: '25%', right: '75%' })
    })

    it('should order Col', () => {
      const wrapper = mount(
        <Row>
          <Col span={6} order={4}>
            1 col-order-4
          </Col>
          <Col span={6} order={3}>
            2 col-order-3
          </Col>
          <Col span={6} order={2}>
            3 col-order-2
          </Col>
          <Col span={6} order={1}>
            4 col-order-1
          </Col>
        </Row>,
      )
      expect(wrapper.find('.kd-col').at(0)).toHaveStyle({ order: 4 })
      expect(wrapper.find('.kd-col').at(1)).toHaveStyle({ order: 3 })
      expect(wrapper.find('.kd-col').at(2)).toHaveStyle({ order: 2 })
      expect(wrapper.find('.kd-col').at(3)).toHaveStyle({ order: 1 })
    })

    it('should responsive', () => {
      const wrapper = mount(
        <Row
          gutter={[
            { xs: 8, sm: 16, md: 24, lg: 32, xl: 40 },
            { xs: 8, sm: 16, md: 24, lg: 32, xl: 40 },
          ]}
        >
          <Col xs={24} sm={12} md={8} lg={6} xl={4}>
            Col
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 12, offset: 12 }}
            md={{ span: 8, offset: 16 }}
            lg={{ span: 6, offset: 18 }}
            xl={{ span: 4, offset: 20 }}
          >
            Col
          </Col>
        </Row>,
      )

      // when window.innerWidth is 1024
      expect(wrapper.find('div').first()).toHaveStyle({ 'row-gap': '24px', margin: '0 -12px' })
      expect(wrapper.find('.kd-col').at(0)).toHaveStyle({ flex: '0 0 33.33333333333333%' })
      expect(wrapper.find('.kd-col').at(1)).toHaveStyle({
        flex: '0 0 33.33333333333333%',
        marginLeft: '66.66666666666666%',
      })

      // when window.innerWidth is 599
      window.resizeTo(599, 1000)
      wrapper.update()
      expect(wrapper.find('div').first()).toHaveStyle({ 'row-gap': '8px', margin: '0 -4px' })
      expect(wrapper.find('.kd-col').at(0)).toHaveStyle({ flex: '0 0 100%' })
      expect(wrapper.find('.kd-col').at(1)).toHaveStyle({ flex: '0 0 100%' })

      // when window.innerWidth is 600
      window.resizeTo(600, 1000)
      wrapper.update()
      expect(wrapper.find('div').first()).toHaveStyle({ 'row-gap': '16px', margin: '0 -8px' })
      expect(wrapper.find('.kd-col').at(0)).toHaveStyle({ flex: '0 0 50%' })
      expect(wrapper.find('.kd-col').at(1)).toHaveStyle({
        flex: '0 0 50%',
        marginLeft: '50%',
      })

      // when window.innerWidth is 1280
      window.resizeTo(1280, 1000)
      wrapper.update()
      expect(wrapper.find('div').first()).toHaveStyle({ 'row-gap': '32px', margin: '0 -16px' })
      expect(wrapper.find('.kd-col').at(0)).toHaveStyle({ flex: '0 0 25%' })
      expect(wrapper.find('.kd-col').at(1)).toHaveStyle({
        flex: '0 0 25%',
        marginLeft: '75%',
      })

      // when window.innerWidth is 1921
      window.resizeTo(1921, 1000)
      wrapper.update()
      expect(wrapper.find('div').first()).toHaveStyle({ 'row-gap': '40px', margin: '0 -20px' })
      expect(wrapper.find('.kd-col').at(0)).toHaveStyle({ flex: '0 0 16.666666666666664%' })
      expect(wrapper.find('.kd-col').at(1)).toHaveStyle({
        flex: '0 0 16.666666666666664%',
        marginLeft: '83.33333333333334%',
      })
    })
  })

  // 7.component interaction(event)

  // 8.config provider
  describe('8.config provider', () => {
    it('should config use config provider', () => {
      const Config = {
        compDefaultProps: {
          Row: {
            align: 'middle',
          },
        },
      }
      const wrapper = mount(
        <ConfigProvider value={Config}>
          <Row>
            <Col flex={2}>2 / 5</Col>
            <Col flex={3}>3 / 5</Col>
          </Row>
        </ConfigProvider>,
      )
      expect(wrapper.find('.kd-row')).toHaveStyle({ alignItems: 'center' })
    })
  })

  // 9. ref test
  // describe('9. ref test', () => {
  //   it('should get Row element from ref', () => {
  //     const ref = React.createRef()
  //     mount(
  //       <Row ref={ref}>
  //         <Col>Col</Col>
  //       </Row>,
  //     )
  //     expect(ref.current instanceof HTMLElement).toBe(true)
  //   })
  // })
})
