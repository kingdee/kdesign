import React from 'react'
import { mount, render } from 'enzyme'
import Anchor from '../index'
import { AnchorTypes, AnchorType } from '../anchor'
import mountTest from '../../../tests/shared/mountTest'
import ConfigProvider from '../../config-provider/index'

describe('Anchor', () => {
  // 1.mount test
  mountTest(Anchor)
  AnchorTypes.forEach((type) => {
    mountTest(() => <Anchor type={type} />)
  })

  // 2.render test
  it('renders correctly', () => {
    expect(
      render(
        <Anchor>
          <Anchor.Link href="#使用场景" title="使用场景" />
        </Anchor>,
      ),
    ).toMatchSnapshot()

    AnchorTypes.forEach((type) => {
      expect(
        render(
          <Anchor type={type}>
            <Anchor.Link href="#使用场景" title="使用场景" />
          </Anchor>,
        ),
      ).toMatchSnapshot()
    })
  })

  // 3.warns in component
  it('warns if type is wrong', () => {
    const mockWarn = jest.fn()
    jest.spyOn(console, 'warn').mockImplementation(mockWarn)
    const type = 'who am I' as any as AnchorType
    render(<Anchor type={type} />)
    expect(mockWarn).toHaveBeenCalledTimes(1)
    expect(mockWarn.mock.calls[0][0]).toMatch("Warning: [kdesign]-anchor: cannot found anchor type 'who am I'")
  })

  // 4. render null or undefined without errors
  it('render null or undefined buttons without errors', () => {
    expect(
      mount(
        <Anchor>
          {null}
          {undefined}
        </Anchor>,
      ),
    ).toMatchSnapshot()
  })

  // 5. displayName
  it('should have displayName static property', () => {
    const wrapper = mount(<Anchor></Anchor>)
    expect((wrapper.type() as any).displayName).toBe('Anchor')
  })

  // 6. class state
  it('should class use right', () => {
    const DefaultAnchor = mount(
      <Anchor>
        <Anchor.Link href="#使用场景" title="使用场景" />
      </Anchor>,
    )
    expect(DefaultAnchor.find(`.kd-anchor`).length).toBeGreaterThanOrEqual(1)

    const menuAnchor = mount(
      <Anchor type="menu">
        <Anchor.Link href="#使用场景" title="使用场景" />
      </Anchor>,
    )
    expect(menuAnchor.find(`.kd-anchor-menu`).length).toBeGreaterThanOrEqual(1)

    const advancedAnchor = mount(
      <Anchor type="advanced">
        <Anchor.Link href="#使用场景" title="使用场景" />
      </Anchor>,
    )
    expect(advancedAnchor.find(`.kd-anchor-advanced-arrows`).length).toBeGreaterThanOrEqual(1)
  })

  // 7.component interaction(event)
  it('onClick', () => {
    const onClick = jest.fn()
    const wrapper = mount(
      <Anchor onClick={onClick}>
        <Anchor.Link href="#使用场景" title="使用场景" />
      </Anchor>,
    )

    wrapper.find('.kd-anchor-link-title').at(0).simulate('click')
    expect(onClick).toHaveBeenCalled()
  })

  it('onChange', () => {
    const onChange = jest.fn()
    const wrapper = mount(
      <Anchor onChange={onChange}>
        <Anchor.Link href="#使用场景" title="使用场景" />
      </Anchor>,
    )

    wrapper.find('.kd-anchor-link-title').at(0).simulate('click')
    expect(onChange).toHaveBeenCalled()
  })

  // 8.config provider
  it('should config use config provider', () => {
    const anchorConfig = {
      compDefaultProps: {
        Anchor: {
          type: 'menu',
        },
      },
    }
    const wrapper = mount(
      <ConfigProvider value={anchorConfig}>
        <Anchor></Anchor>
      </ConfigProvider>,
    )
    expect(wrapper.find(`.kd-anchor-menu`).length).toBeGreaterThanOrEqual(1)
  })
})
