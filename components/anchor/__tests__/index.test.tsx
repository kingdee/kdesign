import React from 'react'
import { mount, render } from 'enzyme'
import Anchor from '../index'
import Icon from '../../icon'
import { AnchorTypes, AnchorType } from '../anchor'
import mountTest from '../../../tests/shared/mountTest'
import ConfigProvider from '../../config-provider/index'
describe('Anchor', () => {
  // 1.mount test
  describe('1.mount test', () => {
    mountTest(Anchor)
    AnchorTypes.forEach((type) => {
      mountTest(() => <Anchor type={type} />)
    })
  })
  // 2.render test
  describe('2.render test', () => {
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
  })
  // 3.warns in component
  describe('3.warns in component', () => {
    it('warns if type is wrong', () => {
      const mockWarn = jest.fn()
      jest.spyOn(console, 'warn').mockImplementation(mockWarn)
      const type = 'who am I' as any as AnchorType
      render(<Anchor type={type} />)
      expect(mockWarn).toHaveBeenCalledTimes(1)
      expect(mockWarn.mock.calls[0][0]).toMatch("Warning: [kdesign]-anchor: cannot found anchor type 'who am I'")
    })
  })
  // 4. render null or undefined without errors
  describe('4.render null or undefined without errors', () => {
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
  })
  // 5. displayName
  describe('5.displayName', () => {
    it('should have displayName static property', () => {
      const wrapper = mount(<Anchor></Anchor>)
      expect((wrapper.type() as any).displayName).toBe('Anchor')
    })
  })
  // 6. class state
  describe('6.class state', () => {
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
  })

  // 7.component interaction(event)
  describe('7.component interaction(event)', () => {
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
  })

  // 8.config provider
  describe('8.config provider', () => {
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

  // 9. ref test
  // 10. api test
  describe('10.api test', () => {
    it('dropdownStyle API test', () => {
      const test = mount(
        <Anchor type="advanced" visible dropdownStyle={{ color: 'red' }}>
          <Anchor.Link href="#使用场景" title="使用场景" />
        </Anchor>,
      )
      expect(getComputedStyle(document.querySelector('.kd-anchor-advanced')!, null).getPropertyValue('color')).toBe(
        'red',
      )
      test.unmount()
    })
    it('icon API test', () => {
      // icon
      const iconDemo = mount(
        <Anchor type="advanced" icon={<Icon type="add"></Icon>}>
          <Anchor.Link href="#API" title="#API" />
        </Anchor>,
      )
      expect(iconDemo.exists('.kdicon-add')).toBeTruthy()
      // lockedIcon、visible
      const advanceAnchor = mount(
        <Anchor type="advanced" visible lockedIcon={false}>
          <Anchor.Link href="#使用场景" title="使用场景" />
        </Anchor>,
      )
      expect(document.querySelector('.kd-anchor-advanced-lock')).toBeFalsy()
      advanceAnchor.unmount()
      const advanceAnchor2 = mount(
        <Anchor
          type="advanced"
          visible
          lockedIcon={[<Icon type="add" key={1}></Icon>, <Icon type="add" key={2}></Icon>]}
        >
          <Anchor.Link href="#使用场景" title="使用场景" />
        </Anchor>,
      )
      expect(document.querySelector('.kdicon-add')).toBeTruthy()
      advanceAnchor2.unmount()
    })
    it('lockedIcon and visible API test', () => {
      const advanceAnchor = mount(
        <Anchor type="advanced" visible lockedIcon={false}>
          <Anchor.Link href="#使用场景" title="使用场景" />
        </Anchor>,
      )
      expect(document.querySelector('.kd-anchor-advanced-lock')).toBeFalsy()
      advanceAnchor.unmount()
      const advanceAnchor2 = mount(
        <Anchor
          type="advanced"
          visible
          lockedIcon={[<Icon type="add" key={1}></Icon>, <Icon type="add" key={2}></Icon>]}
        >
          <Anchor.Link href="#使用场景" title="使用场景" />
        </Anchor>,
      )
      expect(document.querySelector('.kdicon-add')).toBeTruthy()
      advanceAnchor2.unmount()
    })
  })
})
