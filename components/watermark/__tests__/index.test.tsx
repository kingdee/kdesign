import React from 'react'
import { render, mount } from 'enzyme'
// import ConfigProvider from '../../config-provider/index'
import Watermark from '../index'
import mountTest from '../../../tests/shared/mountTest'

describe('Watermark', () => {
  // 1. mount test
  describe('1. mount test', () => {
    mountTest(() => <Watermark />)
  })

  // 2. render test
  /**
   * 1. 组件快照 可以测试多个不同props下组件生成的快照。当组件更新结构后，生成的快照会不同，这是跑组件的单测会导致报错
   * 2. 运行 yarn test:update 指令可以更新快照
   */
  describe('2. render test', () => {
    it('renders correctly', () => {
      expect(render(<Watermark />)).toMatchSnapshot()

      expect(render(<Watermark content={['KDsign']} />)).toMatchSnapshot()

      expect(render(<Watermark content={['KDsign']} gap={[10, 10]} />)).toMatchSnapshot()

      expect(
        render(
          <Watermark content={['KDsign']} gap={[10, 10]} fontStyle={{ color: 'rgba(0, 112, 241,0.2)' }}></Watermark>,
        ),
      ).toMatchSnapshot()
    })
  })

  // 3. warns in component
  /**
   * 针对不存在的 api 属性值的验证。看各组件内是否需要类似的代码检测，没有的话可以不用验证
   */
  describe('3. warns in component', () => {
    it('warns if type is wrong', () => {
      const mockWarn = jest.fn()
      jest.spyOn(console, 'warn').mockImplementation(mockWarn)
      const content = 122 as any as string
      render(<Watermark content={content} />)
      expect(mockWarn).toHaveBeenCalledTimes(1)
      expect(mockWarn.mock.calls[0][0]).toMatch(
        "Warning: [kdesign]-watermark: cannot found watermark content type 'number'",
      )
    })
  })

  // 4. render null or undefined without errors
  /**
   * 验证特殊值的渲染是否正确 针对还有子元素Watermark.Item的组件也需要对子组件进行验证
   */
  describe('4. render null or undefined without errors', () => {
    it('render null or undefined without errors', () => {
      const wrapper = (
        <Watermark>
          {null}
          {undefined}
        </Watermark>
      )
      expect(wrapper).toMatchSnapshot()
    })
    // it('render null or undefined without errors', () => {
    //   const wrapper = (
    //     <Watermark>
    //       <Watermark.Item>
    //         {null}
    //         {undefined}
    //       </Watermark.Item>
    //     </Watermark>
    //   )
    //   expect(wrapper).toMatchSnapshot()
    // })
  })

  // 5. displayName
  /**
   * 1. 组件的displayName使用驼峰的命名方式
   * 2. 针对父子组件结合的组件，比如dropDown和dropDown.Item都需要测试displayName
   */
  describe('5. displayName', () => {
    it('should have displayName static property', () => {
      expect(Watermark.displayName).toBe('Watermark')
      // expect(Watermark.Item.displayName).toBe('WatermarkItem')
    })
  })

  // 6. class state
  /**
   * 需测试className style能否正确挂载 disabeld状态下是否还能触发事件 data-test能传递下去
   */
  describe('6. class state', () => {
    /*     it('className style disabled', () => {
      const handleClick = jest.fn()
      const wrapper = mount(
        // @ts-ignore
        <Watermark className="my-class" style={{ width: 60 }} disabled onClick={handleClick} data-test="test">
          hello world
        </Watermark>,
      )
      // className
      expect(wrapper).toHaveClassName('my-class')
      // style
      expect(wrapper.prop('width')).toEqual('60px')
      // disabled
      expect(wrapper.find('.watermark-disabed')).toExist()
      const triggerDom = wrapper.find('.watermark-click-dom')
      // 禁用状态下点击事件不应该被触发
      triggerDom.simulate('click')
      expect(handleClick).not.toHaveBeenCalled()
      // 其余不同的属性(...others)能传递下去
      expect(wrapper.prop('data-test')).toEqual('test')
    }) */

    // 上面是整合在一起进行测试，也可以单独对style className disabled进行测试
    it('className', () => {
      const wrapper = mount(<Watermark className="my-class" content={'hello world'}></Watermark>)
      expect(wrapper).toHaveClassName('my-class')
    })
    /* it('style', () => {
      const wrapper = mount(<Watermark style={{width: 60}}>hello world</Watermark>)
      expect(wrapper.prop('width')).toEqual('60px')
    })

    it('disabled', () => {
      const handleClick = jest.fn()
      const wrapper = mount(<Watermark disabled={{width: 60}} onClick={handleClick}>hello world</Watermark>)
      expect(wrapper.find('.watermark-disabed')).toExist()
      const triggerDom = wrapper.find('.watermark-click-dom')
      triggerDom.simulate('click')
      expect(handleClick).not.toHaveBeenCalled()
    }) */
  })

  // 7.component interaction(event)
  /**
   * 事件测试
   */
  describe('7.component interaction(event)', () => {
    it('should call the provided getContainer function', () => {
      // Mock getContainer function that returns a div element
      const mockGetContainer = jest.fn().mockReturnValue(document.createElement('div'))

      // Render the Watermark component with the mock getContainer function
      const wrapper = mount(<Watermark content={['hello world']} getContainer={mockGetContainer} />)

      // Check if the getContainer function was called
      expect(mockGetContainer).toHaveBeenCalled()

      // Cleanup
      wrapper.unmount()
    })
    /* it('should not clickable when Watermark is loading', () => {
      const onClick = jest.fn()
      const wrapper = mount(
        // @ts-ignore
        <Watermark loading onClick={onClick}>
          watermark
        </Watermark>,
      )
      wrapper.simulate('click')
      expect(onClick).not.toHaveBeenCalledWith()
    })

    it('should clickable ', () => {
      const onClick = jest.fn()
      // @ts-ignore
      const wrapper = mount(<Watermark onClick={onClick}>watermark</Watermark>)
      wrapper.simulate('click')
      expect(onClick).toHaveBeenCalled()
    }) */
  })

  // 8.config provider
  /**
   * 全局化配置测试
   * 1. 属性只需判断一个就好 如果有需要可以写多个
   * 2. 注意要和默认的属性区分开 比如size默认值为'middle',此时应该传入'small'或者'large'
   * 3. 如果有组件有配置国际化的代码，也需要进行测试
   */
  /* describe('8.config provider', () => {
    it('should config use config provider', () => {
      const watermarkConfig = {
        compDefaultProps: {
          Watermark: {
            type: 'primary',
            size: 'large',
            placement: 'left',
          },
        },
      }
      const wrapper = mount(
        <ConfigProvider value={watermarkConfig}>
          <Watermark>Watermark Text</Watermark>
        </ConfigProvider>,
      )
      expect(wrapper.find('.kd-watermark')).toHaveClassName('.kd-watermark-primary')
      expect(wrapper.find('.kd-watermark')).toHaveClassName('.kd-watermark-large')
      expect(wrapper.find('.kd-watermark')).toHaveClassName('.kd-watermark-left')
    })
  }) */

  // 9. ref test
  /**
   * ref的挂载测试
   * 1. 不是必测项，开放出去了就需要测试
   * 2. 不是每个组件都需要开放ref出去，看具体的业务场景
   */
  /*   describe('9. ref test', () => {
    it('should get Watermark element from ref', () => {
      const ref = React.createRef()
      // @ts-ignore
      mount(<Watermark ref={ref}></Watermark>)
      // 有的组件开放出去的ref是一个对象 比如Select组件此时获取dom对象就需要使用ref.current.input获取 如果开放出去的ref对象还提供有特殊的方法也需要测试 比如 focus、blur、scrollToIndex等
      expect((ref.current as HTMLElement).classList.contains('.kd-watermark')).toBe(true)
    })
  }) */

  // 10. api test
  /**
   * 1. 需要对文档中的所有api进行测试 如果demo中提供了，测试案例中不好测试可以不用测试
   * 2. 针对一些api在上面步骤中已经测试到的也可以不用测试
   * 3. 这里需要特别注意的案例是受控用法的测试 如果提供了value和onChange api是必须要测试受控用法的
   */
  describe('10. api test', () => {
    // 受控与非受控需要测试（此组件无需这样的设计）
    /* it('defaultValue', () => {
      // @ts-ignore
      const wrapper = mount(<Watermark defaultValue="123">watermark</Watermark>)
      expect(wrapper.find('.kd-watermark-input').prop('value')).toEqual('123')
    })

    it('value', () => {
      // @ts-ignore
      const wrapper = mount(<Watermark value="123">watermark</Watermark>)
      expect(wrapper.find('.kd-watermark-input').prop('value')).toEqual('123')
    }) */
    /**
     * 1. onChange的触发一般通过一系列的点击操作(click, mousedown)去实现,然后去检测onChange事件是否被触发
     * 2. 对于input checkbox radio等能通过input change事件触发的可以使用simulate('change', {})
     */
    /* it('onChange', () => {
      let tempV = ''
      const handleChange = jest.fn((e) => {
        tempV = e.target.value
      })
      // @ts-ignore
      const wrapper = mount(<Watermark onChange={handleChange}>watermark</Watermark>)
      // 通过一系列的点击操作去触发
      wrapper.find('.watermark-trigger1').simulate('click')
      wrapper.find('.watermark-trigger2').simulate('click')
      // 通过simulate去触发input的change事件触发
      const triggerDom = wrapper.find('.kd-watermark-input')
      triggerDom.simulate('change', { target: { value: '123' } })
      expect(handleChange).toHaveBeenCalled()
      expect(tempV).toEqual('123')
      // 对于存在有下拉面板的需要判断change后输入框与下拉面板是否真的都有变化值切一致 比如说date-picker
      expect(wrapper.find('.watermark-input').prop('value').toEqual('123'))
      expect(wrapper.find('.watermark-dropdown').prop('value').toEqual('123'))
    }) */
    // 受控测试
    /* it('value defaultValue onChange', () => {
      let tempV = ''
      const handleChange = jest.fn((e) => {
        tempV = e.target.value
      })
      const wrapper = mount(
        // @ts-ignore
        <Watermark defaultValue="000" value="123" onChange={handleChange}>
          watermark
        </Watermark>,
      )
      // 测试value的值覆盖defaultValue
      expect(wrapper.find('.kd-watermark-input').prop('value')).toEqual('123')
      // 通过点击事件触发onChange
      wrapper.find('.watermark-trigger1').simulate('click')
      // onChange返回值已经更改 但是界面上的值保持123不变
      expect(tempV).toEqual('456')
      expect(wrapper.find('.kd-watermark-input').prop('value')).toEqual('123')
    }) */
    // 联动受控
    /* it('value onChange', () => {
      let tempV = ''
      const handleChange = jest.fn((e) => {
        tempV = e.target.value
        wrapper.setProps({ value: tempV })
      })
      const wrapper = mount(
        // @ts-ignore
        <Watermark value="000" onChange={handleChange}>
          watermark
        </Watermark>,
      )
      wrapper.find('.watermark-trigger1').simulate('click')
      expect(tempV).toEqual('123')
      expect(wrapper.find('.kd-watermark-input').prop('value')).toEqual('123')
    }) */
    // 复合组件只需要测试本组件的api 针对引用的其他组件api只需要测试个别的api，看能否挂载出去。比如说dropdown引用了tooltip 可以测试popperClassName能否挂载到下拉面板
    /* it('popperClassName', () => {
      // @ts-ignore
      const wrapper = mount(<Watermark popperClassName="my-class" popperStyle={{ width: 100 }}></Watermark>)
      const dropdownPanel = wrapper.find('.kd-watermark-dropdown-panel')
      expect(dropdownPanel).toHaveClassName('my-class')
      // @ts-ignore
      expect(dropdownPanel.props().style.width).toEqual('100px')
    }) */
  })

  // 11. special case
  /**
   * 这里写的单测一般是开发在使用过程中在github issues上提出来的 上面的单测没覆盖到的针对一些特殊使用和边界情况的补充。比如点击清空按钮应该触发onClear，而不应该触发onChange
   */
  /* describe('11. special case', () => {
    it('in windows case should render correctly', () => {})
  }) */
})
