import React from 'react'
import { render, mount } from 'enzyme'
import Space from '..'
import Button from '../../button'
import Popconfirm from '../../popconfirm'
import mountTest from '../../../tests/shared/mountTest'

describe('Space', () => {
  mountTest(Space)

  it('should render width empty children', () => {
    const wrapper = mount(<Space />)

    expect(wrapper.instance()).toBe(null)
  })

  it('should render correct', () => {
    const wrapper = render(
      <div>
        <Space>
          <span>1</span>
          <span>2</span>
        </Space>
        <Space size="middle">
          <span>1</span>
          <span>2</span>
        </Space>
        <Space size="large">
          <span>1</span>
          <span>2</span>
        </Space>
      </div>,
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('split', () => {
    const wrapper1 = render(
      <Space split="-">
        text1<span>text1</span>
        <>text3</>
      </Space>,
    )
    const wrapper2 = render(
      <Space split={<span>|</span>}>
        text1<span>text1</span>
        <>text3</>
      </Space>,
    )

    expect(wrapper1).toMatchSnapshot()
    expect(wrapper2).toMatchSnapshot()
  })

  it('should render correct with children', () => {
    const wrapper = render(
      <Space>
        text1<span>text1</span>
        <>text3</>
      </Space>,
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('should render width multiple chidren', () => {
    const wrapper = render(
      <Space>
        <>
          Text<Button>Button</Button>
        </>
        Text
        <Popconfirm title="Are you sure delete this task?" okText="Yes" cancelText="No">
          <Button>Delete</Button>
        </Popconfirm>
        <Popconfirm title="Are you sure delete this task?" okText="Yes" cancelText="No">
          <Button disabled>Delete</Button>
        </Popconfirm>
        {null}
        {false}
        {1}
        Text
        {null}
        {undefined}
      </Space>,
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('should render width customize size', () => {
    const wrapper = mount(
      <Space size={10}>
        <span>1</span>
        <span>2</span>
      </Space>,
    )

    expect(wrapper.find('div.kd-space').first()).toHaveStyle('--cgap', '10px')
  })

  it('should render width size 0', () => {
    const wrapper = mount(
      <Space size={NaN}>
        <span>1</span>
        <span>2</span>
      </Space>,
    )

    expect(wrapper.find('div.kd-space').first()).toHaveStyle('--cgap', '0px')
  })

  it('should render vertical space width customize size', () => {
    const wrapper = mount(
      <Space size={10} direction="vertical">
        <span>1</span>
        <span>2</span>
      </Space>,
    )

    expect(wrapper.find('div.kd-space').first()).toHaveStyle('--cgap', '10px')
  })

  it('should render width size is Array', () => {
    const wrapper = mount(
      <Space size={[8, 16]}>
        <span>1</span>
        <span>2</span>
      </Space>,
    )

    expect(wrapper.find('div.kd-space').first()).toHaveStyle({ '--cgap': '8px', '--rgap': '16px' })
  })

  it('should render with invalidElement', () => {
    const wrapper = mount(
      <Space>
        text1<span>text1</span>
        text1
      </Space>,
    )

    expect(wrapper.find('span')).toHaveLength(3)
  })

  it('should render width wrap', () => {
    const wrapper = mount(
      <Space wrap>
        <span>1</span>
        <span>2</span>
      </Space>,
    )

    expect(wrapper.find('div.kd-space').first()).toHaveClassName('kd-space-wrap')
  })
})
