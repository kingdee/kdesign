import React from 'react'
import { render, mount } from 'enzyme'
import Empty from '../index'
import mountTest from '../../../tests/shared/mountTest'

describe('Empty', () => {
  // 1. mount test
  mountTest(() => <Empty />)

  // 2. render test
  it('renders correctly', () => {
    expect(render(<Empty />)).toMatchSnapshot()

    expect(render(<Empty description="我是空组件" />)).toMatchSnapshot()

    expect(render(<Empty image="http://ikd.kingdee.com/ikd2/images/common/empty-content.png" />)).toMatchSnapshot()

    expect(render(<Empty>空组件自定义附属内容</Empty>)).toMatchSnapshot()
  })

  // 3. warns in component

  // 4. render null or undefined without errors
  it('render null or undefined spin without errors', () => {
    expect(
      mount(
        <Empty image={false} description={false}>
          {null}
          {undefined}
        </Empty>,
      ),
    ).not.toBeEmptyRender()
  })

  // 5. displayName
  it('should have displayName static property', () => {
    const wrapper = mount(<Empty />)
    expect((wrapper.type() as any).displayName).toBe('Empty')
  })

  // 6. class state
  it('should class use right', () => {
    const defaultEmpty = mount(<Empty />)
    expect(defaultEmpty.find(`.kd-empty`)).toExist()
    expect(defaultEmpty.find(`.kd-empty-image`)).toExist()
    expect(defaultEmpty.find(`.kd-empty-description`)).toExist()

    const noImageEmpty = mount(<Empty image={false} />)
    expect(noImageEmpty.find(`.kd-empty-image`)).not.toExist()
    expect(noImageEmpty.find(`.kd-empty-description`)).toExist()

    const noDescriptionEmpty = mount(<Empty description={false} />)
    expect(noDescriptionEmpty.find(`.kd-empty-image`)).toExist()
    expect(noDescriptionEmpty.find(`.kd-empty-description`)).not.toExist()

    const hasChildrenEmpty = mount(<Empty>点击新增</Empty>)
    expect(hasChildrenEmpty.find(`.kd-empty-footer`)).toExist()
    expect(hasChildrenEmpty.find(`.kd-empty-footer`).text()).toEqual('点击新增')

    const customDescriptionEmpty = mount(<Empty description="自定义描述" />)
    expect(customDescriptionEmpty.find(`.kd-empty-description`).text()).toEqual('自定义描述')

    const customImageEmpty = mount(<Empty image="http://ikd.kingdee.com/ikd2/images/common/empty-content.png" />)
    expect(customImageEmpty.find(`.kd-empty-image`).prop('src')).toEqual(
      'http://ikd.kingdee.com/ikd2/images/common/empty-content.png',
    )
  })

  // 7. event

  // 8. config provider

  // 9. ref test
  it('should get Empty element from ref', () => {
    const ref = React.createRef()
    mount(<Empty ref={ref} />)
    expect(ref.current instanceof HTMLDivElement).toBe(true)
  })

  // 10. api test
  it('api test', () => {
    const wrapper = mount(<Empty imageStyle={{ height: '200px' }} />)
    expect(wrapper.find('.kd-empty-image').props().style?.height).toEqual('200px')

    const wrapperSrc = mount(<Empty image="" imageStyle={{ height: '200px' }} />)
    expect(wrapperSrc.find('.kd-empty-image').props().style?.height).toEqual('200px')
  })
})
