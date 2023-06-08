import React from 'react'
import { mount, render } from 'enzyme'
import TimeLine from '..'
import mountTest from '../../../tests/shared/mountTest'
import ConfigProvider from '../../config-provider/index'

const { Item } = TimeLine

const wrapperFactory = (timeLineProps = {}, labelItems?: any) =>
  mount(
    <TimeLine {...timeLineProps}>
      <Item key="1">foo</Item>
      <Item key="2">bar</Item>
      <Item key="3">baz</Item>
      {labelItems}
    </TimeLine>,
  )

const RenderWrapperFactory = (timeLineProps = {}, labelItems?: any) =>
  render(
    <TimeLine {...timeLineProps}>
      <Item key="1">foo</Item>
      <Item key="2">bar</Item>
      <Item key="3">baz</Item>
      {labelItems}
    </TimeLine>,
  )

describe('TimeLine', () => {
  // 1. mount test
  mountTest(TimeLine)
  mountTest(TimeLine.Item)

  // 2. render test
  describe('render correct', () => {
    it('snapshot render correct', () => {
      const pendingDot = <i>dot</i>
      const green = 'green'
      const red = 'red'
      const blue = 'blue'
      const gray = 'gray'
      expect(RenderWrapperFactory()).toMatchSnapshot()
      expect(RenderWrapperFactory({ pending })).toMatchSnapshot()
      expect(RenderWrapperFactory({ pending, pendingDot })).toMatchSnapshot()
      expect(RenderWrapperFactory({ pending, reverse: true, mode: 'alternate' })).toMatchSnapshot()
      expect(
        RenderWrapperFactory({}, [
          <Item key="4" color={green}>
            foo green
          </Item>,
          <Item key="5" color={red}>
            foo red
          </Item>,
          <Item key="6" color={blue}>
            foo blue
          </Item>,
          <Item key="7" color={gray}>
            foo gray
          </Item>,
        ]),
      ).toMatchSnapshot()
    })
  })

  // 3. warns in component

  // 4. render null or undefined without errors
  describe('render null or undefined without errors', () => {
    it('render null without errors', () => {
      const wrapper = mount(
        <TimeLine>
          {null}
          {undefined}
        </TimeLine>,
      )
      expect(wrapper.find('ul').children()).not.toExist()
    })

    it('item render null without errors', () => {
      const wrapper = mount(
        <TimeLine>
          <Item>
            {null}
            {undefined}
          </Item>
        </TimeLine>,
      )
      expect(wrapper.find('.kd-timeline-item').first()).toHaveClassName('last')
      expect(wrapper.find('.kd-timeline-item .kd-timeline-item-content').text()).toBe('')
    })
  })
  // 5. displayName
  describe('should have displayName static property', () => {
    it('displayName', () => {
      const wrapper = mount(<TimeLine></TimeLine>)
      expect((wrapper.type() as any).displayName).toBe('Timeline')
    })
  })
  // 6. class state

  // 7.component interaction(event)

  // 8.config provider
  describe('should config use config provider', () => {
    it('should config use config provider', () => {
      const timelineConfig = {
        compDefaultProps: {
          Timeline: {
            reverse: true,
            mode: 'right',
            labelWidth: 100,
            lineHeight: 24,
          },
        },
      }
      const wrapper = mount(
        <ConfigProvider value={timelineConfig}>
          <TimeLine style={{ width: 300 }}>
            <TimeLine.Item label="2022-10-01">节点内容一</TimeLine.Item>
            <TimeLine.Item label="2022-10-02">节点内容二</TimeLine.Item>
            <TimeLine.Item label="2022-10-03">节点内容三</TimeLine.Item>
          </TimeLine>
        </ConfigProvider>,
      )
      expect(wrapper.find('.kd-timeline.right .last .kd-timeline-item-content').text()).toEqual('节点内容一')
      expect(wrapper.find('.kd-timeline.right .last .kd-timeline-item-label').props().style?.width).toEqual('100px')
      expect(wrapper.find('.kd-timeline.right .last .kd-timeline-item-content').props().style?.lineHeight).toEqual(
        '24px',
      )
    })
  })

  // 9. ref test
  // describe('ref test', () => {
  //   it('should get Demo element from ref', () => {
  //     const ref = React.createRef()
  //     mount(<TimeLine ref={ref}></TimeLine>)
  //     expect(ref.current instanceof HTMLElement).toBe(true)

  //     mount(<TimeLine ref={ref} type="text"></TimeLine>)
  //     expect(ref.current instanceof HTMLSpanElement).toBe(true)
  //   })
  // })

  // 10. api test
  describe('renders items without passing any props correctly', () => {
    const wrapper = wrapperFactory()

    it('has 3 timeline item', () => {
      expect(wrapper.find('li.kd-timeline-item')).toHaveLength(3)
    })

    it('has only 1 timeline item is marked as the last item', () => {
      expect(wrapper.find('li.last')).toHaveLength(1)
    })

    it('its last item is marked as the last item', () => {
      expect(wrapper.find('li.kd-timeline-item').last()).toHaveClassName('last')
    })
  })

  // labelWidth lineHeight
  it('renders labelWidth lineHeight correctly', () => {
    const wrapper = mount(
      <TimeLine labelWidth={80} lineHeight={25} mode="right">
        <TimeLine.Item label="2022-10-01">节点内容一</TimeLine.Item>
        <TimeLine.Item label="2022-10-02">节点内容二</TimeLine.Item>
        <TimeLine.Item label="2022-10-03">节点内容三</TimeLine.Item>
      </TimeLine>,
    )
    expect(wrapper.find('li.last .kd-timeline-item-label').props().style?.width).toEqual('80px')
    expect(wrapper.find('li.last .kd-timeline-item-content').props().style?.lineHeight).toEqual('25px')
  })

  // pending pendingDot
  describe('renders pending item', () => {
    const pending = <div>pending...</div>
    const pendingDot = <i>dot</i>

    it('has one extra timeline item', () => {
      const wrapper = wrapperFactory({ pending })
      expect(wrapper.find('li.kd-timeline-item')).toHaveLength(4)
    })

    it('has extra pending timeline item', () => {
      const wrapper = wrapperFactory({ pending })
      expect(wrapper.find('li.pending')).toHaveLength(1)
    })

    it("renders the pending timeline item as long as it receive a truthy prop value to 'pending'", () => {
      const wrapper = wrapperFactory({ pending: true })
      expect(wrapper.find('li.pending')).toBeTruthy()
    })

    it('its last item is marked as the pending item', () => {
      const wrapper = wrapperFactory({ pending })
      expect(wrapper.find('li.kd-timeline-item').last()).toHaveClassName('pending')
    })

    it('its second to last item is marked as the last item', () => {
      const wrapper = wrapperFactory({ pending })
      const items = wrapper.find('li.kd-timeline-item')
      expect(items.at(items.length - 2)).toHaveClassName('last')
    })

    it('has the correct pending node', () => {
      const wrapper = wrapperFactory({ pending })
      expect(wrapper.find('li.pending')).toContainReact(pending)
    })

    it('has the correct pending dot node', () => {
      const wrapper = wrapperFactory({ pending, pendingDot })
      expect(wrapper.find('li.pending')).toContainReact(pendingDot)
    })

    it("has no pending dot if without passing a truthy 'pending' prop", () => {
      const wrapper = wrapperFactory({ pendingDot })
      expect(wrapper.find('li.pending').contains(pendingDot)).toBeFalsy()
    })
  })

  // reverse
  describe('the item rendering sequence is controlled by reverse', () => {
    it('items is in order when prop reverse is false', () => {
      const wrapper = wrapperFactory({ reverse: false })
      expect(wrapper.find('.kd-timeline-item-content').map((w) => w.text())).toEqual(['foo', 'bar', 'baz'])
    })

    it('items is reversed when prop reverse is true', () => {
      const wrapper = wrapperFactory({ reverse: true })
      expect(wrapper.find('.kd-timeline-item-content').map((w) => w.text())).toEqual(['baz', 'bar', 'foo'])
    })
  })

  describe('renders items reversely and with pending item', () => {
    const pending = <div>pending...</div>

    it('its last item is marked as the last item', () => {
      const wrapper = wrapperFactory({ pending, reverse: true })
      expect(wrapper.find('li.kd-timeline-item').last()).toHaveClassName('last')
    })

    it('its first item is marked as the pending item', () => {
      const wrapper = wrapperFactory({ pending, reverse: true })
      expect(wrapper.find('li.kd-timeline-item').first()).toHaveClassName('pending')
    })
  })

  // mode
  describe('renders Timeline mode correctly', () => {
    it('has 3 timeline item that has className right when mode is right', () => {
      const wrapper = wrapperFactory({ mode: 'right' })
      expect(wrapper.find('.kd-timeline')).toHaveClassName('right')
    })

    it('has 2 timeline item that has className left and has 1 timeline item that has className left when mode is alternate', () => {
      const wrapper = wrapperFactory({ mode: 'alternate' })
      expect(wrapper.find('.kd-timeline')).toHaveClassName('alternate')
    })
  })

  // color
  describe('render Timeline Item with props correctly', () => {
    it('renders Timeline item with color correctly', () => {
      const green = 'green'
      const red = 'red'
      const blue = 'blue'
      const gray = 'gray'
      const color1 = 'rgb(255, 0, 255)'
      const wrapper1 = wrapperFactory({}, [
        <Item key="4" color={green}>
          foo green
        </Item>,
        <Item key="5" color={red}>
          foo red
        </Item>,
        <Item key="6" color={blue}>
          foo blue
        </Item>,
        <Item key="7" color={gray}>
          foo gray
        </Item>,
      ])
      const wrapper2 = wrapperFactory(
        {},
        <Item key="4" color={color1}>
          foo
        </Item>,
      )
      expect(wrapper1.find('li.kd-timeline-item').at(3).find('.kd-timeline-item-dot')).toHaveClassName(green)
      expect(wrapper1.find('li.kd-timeline-item').at(4).find('.kd-timeline-item-dot')).toHaveClassName(red)
      expect(wrapper1.find('li.kd-timeline-item').at(5).find('.kd-timeline-item-dot')).toHaveClassName(blue)
      expect(wrapper1.find('li.kd-timeline-item').at(6).find('.kd-timeline-item-dot')).toHaveClassName(gray)
      expect(wrapper2.find('li.kd-timeline-item').last().find('.kd-timeline-item-dot')).toHaveStyle(
        'backgroundColor',
        color1,
      )
    })

    // dot
    it('renders Timeline item with dot correctly', () => {
      const dot = <i>dot</i>
      const wrapper = wrapperFactory(
        {},
        <Item key="4" dot={dot}>
          foo
        </Item>,
      )
      const itemDot = wrapper.find('li.kd-timeline-item').last().find('.kd-timeline-item-dot')
      expect(itemDot).toHaveClassName('custom')
      expect(itemDot).toContainReact(dot)
    })

    // label
    it('renders Timeline item with label correctly', () => {
      const label = '2020-01-01'
      const wrapper = wrapperFactory(
        {},
        <Item key="4" label={label}>
          foo
        </Item>,
      )
      expect(wrapper.find('.kd-timeline-item-label').last()).toHaveText(label)
    })
  })
})
