import React from 'react'
import { mount } from 'enzyme'
import Tooltip from '../index'
import Input from '../../input'
import ConfigProvider from '../../config-provider'

// import mountTest from '../../../tests/shared/mountTest'
const wrapperRef = React.createRef() as any

describe('Tooltip', () => {
  // 1. mount test
  // mountTest(Tooltip)

  // 2. render test
  it('render Test', () => {
    const wrapper = mount(
      <Tooltip tip="tips text">
        <span>text</span>
      </Tooltip>,
    )
    expect(wrapper).toMatchSnapshot()
  })
  // 3. warns in components

  // 4. render null or undefined without errors
  // it('render null or undefined without errors', () => {
  //   expect(
  //     mount(
  //       <Tooltip>
  //         {null}
  //         {undefined}
  //       </Tooltip>,
  //     ),
  //   ).toMatchSnapshot()
  // })

  // 5. displayName
  it('should have displayName static property', () => {
    const wrapper = mount(
      <Tooltip tip="tips text">
        <span>text</span>
      </Tooltip>,
    )
    expect((wrapper.type() as any).displayName).toBe('Tooltip')
  })

  // 6. API test
  describe('API test', () => {
    it('arrow is useful', () => {
      const wrapper = mount(
        <div ref={wrapperRef}>
          <Tooltip tip="" defaultVisible getPopupContainer={() => wrapperRef.current}>
            <span>text</span>
          </Tooltip>
        </div>,
      )
      expect(wrapper.find('.kd-tooltip')).toHaveClassName('arrow')
    })

    it('disabled is useful', () => {
      // 不能用
      const onVisibleChange = jest.fn((visible) => {
        console.log('vi', visible)
        expect(visible).toBe(false)
      })
      const wrapper = mount(
        <div ref={wrapperRef}>
          <Tooltip tip="tips text" onVisibleChange={onVisibleChange} getPopupContainer={() => wrapperRef.current}>
            <span className="kd-test-trigger">text</span>
          </Tooltip>
        </div>,
      )
      wrapper.find('.kd-test-trigger').simulate('mousemove')
    })

    it('getTriggerElement is useful', () => {
      const wrapper = mount(
        <div ref={wrapperRef}>
          <Tooltip tip="tips text" visible getPopupContainer={() => wrapperRef.current}>
            <span className="kd-test-trigger">text</span>
          </Tooltip>
        </div>,
      )
      expect(wrapper.find('.kd-tooltip')).toExist()
    })

    it('popperClassName & popperStyle is useful', () => {
      const wrapper = mount(
        <Tooltip
          tip="text"
          defaultVisible
          popperStyle={{ color: 'red' }}
          popperClassName="test"
          getPopupContainer={() => wrapperRef.current}
        >
          <span>text</span>
        </Tooltip>,
      )
      expect(wrapper.find('.kd-tooltip')).toHaveClassName('test')
      expect(wrapper.find('.kd-tooltip')).toHaveStyle({ color: 'red' })
    })

    it('placement is useful', () => {
      const placementArray = [
        'top',
        'left',
        'right',
        'bottom',
        'topLeft',
        'topRight',
        'bottomLeft',
        'bottomRight',
        'leftTop',
        'leftBottom',
        'rightTop',
        'rightBottom',
      ]
      placementArray.forEach((p: any) => {
        const wrapper = mount(
          <Tooltip tip="text" defaultVisible placement={p}>
            <span>text</span>
          </Tooltip>,
        )
        expect(wrapper.find('.kd-tooltip')).toHaveClassName(p)
      })
    })

    it('control by `visible` ', () => {
      const wrapper = mount(
        <Tooltip tip="tip text" visible={true}>
          <span>text</span>
        </Tooltip>,
      )
      expect(wrapper.find('.kd-tooltip')).toHaveText('tip text')
    })

    it('onVisibleChange  is useful ', () => {
      const onVisibleChange = jest.fn((visible) => {
        expect(visible).toBe(true)
      })
      const wrapper = mount(
        <Tooltip tip="tip text" onVisibleChange={onVisibleChange}>
          <span>text</span>
        </Tooltip>,
      )
      wrapper.setProps({ visible: true })
    })
    // it('click trigger tooltip', async () => {
    //   const content = 'tips text'
    //   const wrapperRef = React.createRef() as any
    //   const onVisibleChange = jest.fn((visible) => {
    //     wrapper.setProps({ visible: visible })
    //   })
    //   const wrapper = mount(
    //     <div ref={wrapperRef}>
    //       <Tooltip
    //         tip={content}
    //         visible={false}
    //         trigger="click"
    //         onVisibleChange={onVisibleChange}
    //         getPopupContainer={() => wrapperRef.current}
    //       >
    //         <span className="kd-test-trigger">text</span>
    //       </Tooltip>
    //     </div>,
    //   )
    //   wrapper.find('.kd-test-trigger').simulate('change', { target: { visible: true } })
    //   wrapper.update()
    //   expect(wrapper.find('.kd-tooltip')).toHaveText(content)
    // })
  })

  // 7. poperClass popperStyle
  it('should poperClass popperStyle useful', () => {
    const wrapper = mount(
      <div ref={wrapperRef}>
        <Tooltip
          tip="test"
          defaultVisible
          popperClassName="test"
          popperStyle={{ color: 'red' }}
          getPopupContainer={() => wrapperRef.current}
        >
          <div>test</div>
        </Tooltip>
      </div>,
    )
    expect(wrapper.find('.kd-tooltip')).toHaveClassName('test')
    expect(wrapper.find('.kd-tooltip')).toHaveStyle({ color: 'red' })
  })
  // 8. component interaction(event)
  // 9. config Provider
  it('tooltip config provider', () => {
    const wrapperRef = React.createRef()
    const toolTipConfig = {
      compDefaultProps: {
        ToolTip: {
          placement: 'bottom',
        },
      },
    }
    const wrapper = mount(
      <ConfigProvider value={toolTipConfig}>
        <Tooltip visible tip="tips text">
          <span ref={wrapperRef as any}>text</span>
        </Tooltip>
        ,
      </ConfigProvider>,
    )
    expect(wrapper.find('.kd-tooltip')).toHaveClassName('bottom')
  })

  // 10. ref test
  // 11. special case
  describe('special case', () => {
    it('测试ref返回值不为dom元素', () => {
      const wrapper = mount(
        <Tooltip tip="tips text">
          <Input borderType="bordered" prefix="KDesign" suffix="Kdesign" />
        </Tooltip>,
      )
      expect(wrapper).toMatchSnapshot()
    })
  })
})
