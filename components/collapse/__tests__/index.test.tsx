import React from 'react'
import { mount, render } from 'enzyme'
import mountTest from '../../../tests/shared/mountTest'
import Collapse from '../index'
import Icon from '../../icon'
import { IconPositionTypes } from '../collapse'
import ConfigProvider from '../../config-provider/index'
import { sleep } from '../../../tests/utils'
// import { act } from 'react-dom/test-utils'

const collapseProps = {
  accordion: false,
  bordered: false,
  onChange: jest.fn(),
}
const collapsePanelProps = {
  disabled: false,
}
describe('collapse', () => {
  // 1. mount test
  describe('1. mount test', () => {
    mountTest(Collapse)
  })

  // 2. render test
  describe('2. render test', () => {
    it('renders correctly', () => {
      expect(
        render(
          <Collapse>
            <Collapse.Panel header={'This is the header'} panelKey="panel_1">
              折叠面板内容
            </Collapse.Panel>
            <Collapse.Panel header={'This is the header'} panelKey="panel_2">
              折叠面板内容
            </Collapse.Panel>
          </Collapse>,
        ),
      ).toMatchSnapshot()
    })
    it('renders accordion ', () => {
      expect(
        render(
          <Collapse accordion>
            <Collapse.Panel header={'This is the header'} panelKey="panel_1">
              折叠面板内容
            </Collapse.Panel>
            <Collapse.Panel header={'This is the header'} panelKey="panel_2">
              折叠面板内容
            </Collapse.Panel>
          </Collapse>,
        ),
      ).toMatchSnapshot()
    })
  })

  // 3. warns in component

  // 4. render null or undefined without errors
  describe('4. render null or undefined without errors', () => {
    it('Collapse render null or undefined without errors', () => {
      const wrapper = mount(
        <Collapse>
          {null}
          {undefined}
        </Collapse>,
      )
      expect(wrapper).toMatchSnapshot()
    })
  })

  // 5. displayName
  describe('5. displayName', () => {
    it('should have displayName static property', () => {
      expect(Collapse.displayName).toBe('Collapse')
      expect(Collapse.Panel.displayName).toBe('Panel')
    })
  })

  // 6. api test
  describe('6. api test', () => {
    beforeEach(() => {
      jest.useFakeTimers()
    })
    afterEach(() => {
      jest.useRealTimers()
    })

    it('data-test style className', () => {
      const wrapper = mount(
        <Collapse data-test="data-Collapse" style={{ padding: 0 }} className="my-className">
          <Collapse.Panel header={'This is the header'} panelKey="panel_1">
            折叠面板内容
          </Collapse.Panel>
        </Collapse>,
      )
      expect(wrapper.find('[data-test="data-Collapse"]')).toExist()
      expect(wrapper.find('.kd-collapse')).toHaveStyle('padding', 0)
      expect(wrapper.find('.my-className.kd-collapse')).toExist()
    })

    it('test icon position types', () => {
      IconPositionTypes.forEach((type) => {
        const wrapper = mount(
          <Collapse>
            <Collapse.Panel
              {...collapsePanelProps}
              expandIconPosition={type}
              header={'This is the header'}
              panelKey="panel_1"
            >
              折叠面板内容
            </Collapse.Panel>
          </Collapse>,
        )
        expect(wrapper.find(`.kd-collapse-panel-${type} .kd-collapse-panel-icon`)).toExist()
      })
    })

    it('test click event', () => {
      IconPositionTypes.forEach((type) => {
        const wrapper = mount(
          <Collapse {...collapseProps}>
            <Collapse.Panel
              {...collapsePanelProps}
              expandIconPosition={type}
              header={'This is the header'}
              panelKey="panel_1"
            >
              折叠面板内容
            </Collapse.Panel>
          </Collapse>,
        )
        wrapper.find(`.kd-collapse-panel-icon`).simulate('click')
        expect(collapseProps.onChange).toHaveBeenCalled()
      })
    })

    it('test disabled', () => {
      const onChange = jest.fn()
      const wrapper = mount(
        <Collapse defaultActiveKey="panel_1" onChange={onChange}>
          <Collapse.Panel {...collapsePanelProps} header={'This is the header1'} panelKey="panel_1" disabled>
            折叠面板内容1
          </Collapse.Panel>
        </Collapse>,
      )
      expect(wrapper.find(`.kd-collapse-panel-top.kd-collapse-panel-disabled`)).toExist()
      expect(wrapper.find(`.kd-collapse-panel-children`).length).toBe(1)

      wrapper.find(`.kd-collapse-panel`).simulate('click')
      expect(onChange).not.toHaveBeenCalled()
    })

    it('test accordion mode', () => {
      IconPositionTypes.forEach((type) => {
        const wrapper = mount(
          <Collapse {...collapseProps} accordion>
            <Collapse.Panel
              {...collapsePanelProps}
              expandIconPosition={type}
              header={'This is the header1'}
              panelKey="panel_1"
            >
              折叠面板内容
            </Collapse.Panel>
            <Collapse.Panel
              {...collapsePanelProps}
              expandIconPosition={type}
              header={'This is the header2'}
              panelKey="panel_2"
            >
              折叠面板内容
            </Collapse.Panel>
            <Collapse.Panel
              {...collapsePanelProps}
              expandIconPosition={type}
              header={'This is the header3'}
              panelKey="panel_3"
            >
              折叠面板内容
            </Collapse.Panel>
            <Collapse.Panel
              {...collapsePanelProps}
              expandIconPosition={type}
              header={'This is the header4'}
              panelKey="panel_4"
            >
              折叠面板内容
            </Collapse.Panel>
          </Collapse>,
        )
        wrapper.find(`.kd-collapse-panel-icon`).at(0).simulate('click')
        expect(wrapper.find(`.kd-collapse-panel-children`)).toExist()
        wrapper.find(`.kd-collapse-panel-icon`).at(2).simulate('click')
        expect(wrapper.find(`.kd-collapse-panel-children`)).toExist()
      })
    })

    it('test have border', () => {
      const wrapper = mount(
        <Collapse {...collapseProps} bordered={true} defaultActiveKey={['panel_1']}>
          <Collapse.Panel
            {...collapsePanelProps}
            expandIconPosition={'left'}
            header={'This is the header'}
            panelKey="panel_1"
          >
            折叠面板内容
          </Collapse.Panel>
        </Collapse>,
      )
      expect(
        wrapper.find(
          `.kd-collapse .kd-collapse-panel.kd-collapse-panel-border .kd-collapse-panel-top.kd-collapse-panel-top-border`,
        ),
      ).toExist()
    })

    it('customize expand icon', () => {
      const wrapper = mount(
        <Collapse
          accordion={false}
          bordered={false}
          expandIcon={() => {
            return <Icon type="arrow-right" className="my-class"></Icon>
          }}
        >
          <Collapse.Panel header={'This is the header'} panelKey="panel_1">
            折叠面板内容
          </Collapse.Panel>
        </Collapse>,
      )

      // act(() => {
      //   jest.runAllTimers()
      // })
      expect(wrapper.find(`.kd-collapse-panel-left .kd-collapse-panel-icon .my-class.kdicon-arrow-right`)).toExist()
    })

    it('customize upper right corner content', () => {
      const extra1 = (
        <div style={{ cursor: 'pointer', display: 'flex' }} className={'my-class-extra'}>
          <button>按钮</button>
          <p>|</p>
          <button>按钮</button>
          <p>|</p>
          <button>按钮</button>
          <p>|</p>
          <button>按钮</button>
        </div>
      )
      const extra2 = (
        <div>
          <Icon type="setting" className="my-class" />
        </div>
      )

      const wrapper = mount(
        <Collapse {...collapseProps}>
          <Collapse.Panel {...collapsePanelProps} header={'This is the header1'} panelKey="panel_1" extra={extra1}>
            折叠面板内容1
          </Collapse.Panel>
          <Collapse.Panel {...collapsePanelProps} header={'This is the header2'} panelKey="panel_2" extra={extra2}>
            折叠面板内容2
          </Collapse.Panel>
        </Collapse>,
      )
      // act(() => {
      //   jest.runAllTimers()
      // })
      expect(wrapper.find(`.kd-collapse-panel-right .kd-collapse-panel-extra .my-class-extra`)).toExist()
      expect(
        wrapper.find(`.kd-collapse-panel-right .kd-collapse-panel-extra .kdicon.kdicon-setting.my-class`),
      ).toExist()
    })

    it('customize header', () => {
      const header = (
        <div className="my-class">
          <p>This is the header</p>
          <Icon type="warning-solid" />
        </div>
      )
      const wrapper = mount(
        <Collapse {...collapseProps}>
          <Collapse.Panel {...collapsePanelProps} expandIconPosition={'left'} panelKey="panel_1" header={header}>
            折叠面板内容
          </Collapse.Panel>
        </Collapse>,
      )
      // act(() => {
      //   jest.runAllTimers()
      // })

      expect(wrapper.find(`.kd-collapse-panel-left .kd-collapse-panel-header .my-class`)).toExist()
    })

    it('should render with correct panelKey', () => {
      const wrapper = mount(
        <Collapse {...collapseProps}>
          <Collapse.Panel header="header" panelKey="1" />
        </Collapse>,
      )
      expect(wrapper.find('Panel').prop('panelKey')).toEqual('1')
    })

    it('defaultActiveKey', () => {
      const wrapper = mount(
        <Collapse {...collapseProps} defaultActiveKey="panel_1">
          <Collapse.Panel {...collapsePanelProps} header={'This is the header'} panelKey="panel_1">
            折叠面板内容
          </Collapse.Panel>
          <Collapse.Panel {...collapsePanelProps} header={'This is the header'} panelKey="panel_2">
            折叠面板内容
          </Collapse.Panel>
        </Collapse>,
      )
      expect(wrapper.find(`.kd-collapse-panel`).first().find('.kd-collapse-panel-children')).toExist()
      expect(wrapper.find(`.kd-collapse-panel-children`).length).toBe(1)
    })

    it('activeKey', async () => {
      // jest.useFakeTimers()
      const wrapper = mount(
        <Collapse {...collapseProps} activeKey="panel_1">
          <Collapse.Panel {...collapsePanelProps} header={'This is the header'} panelKey="panel_1">
            折叠面板内容
          </Collapse.Panel>
          <Collapse.Panel {...collapsePanelProps} header={'This is the header'} panelKey="panel_2">
            折叠面板内容
          </Collapse.Panel>
        </Collapse>,
      )
      await sleep(2000)
      // await waitFakeTimer()
      expect(wrapper.find(`.kd-collapse-panel`).first().find('.kd-collapse-panel-children')).toExist()
      expect(wrapper.find(`.kd-collapse-panel-children`).length).toBe(1)
      // jest.useRealTimers()
    })

    it('onChange', async () => {
      // jest.useFakeTimers()
      let tempV = ''
      const onChange = jest.fn((e) => {
        tempV = e
      })
      const wrapper = mount(
        <Collapse defaultActiveKey="panel_2" onChange={onChange} accordion>
          <Collapse.Panel {...collapsePanelProps} header={'This is the header1'} panelKey="panel_1">
            折叠面板内容1
          </Collapse.Panel>
          <Collapse.Panel {...collapsePanelProps} header={'This is the header'} panelKey="panel_2">
            折叠面板内容
          </Collapse.Panel>
        </Collapse>,
      )
      wrapper.find(`.kd-collapse-panel-icon`).at(0).simulate('click')
      expect(onChange).toHaveBeenCalled()
      expect(tempV).toStrictEqual(['panel_1'])

      // jest.useRealTimers()
    })

    it('value defaultValue onChange', async () => {
      let tempV = ''
      const onChange = jest.fn((e) => {
        tempV = e
      })
      const wrapper = mount(
        <Collapse defaultActiveKey="panel_2" onChange={onChange} activeKey="panel_1">
          <Collapse.Panel header={'This is the header1'} panelKey="panel_1">
            折叠面板内容1
          </Collapse.Panel>
          <Collapse.Panel header={'This is the header'} panelKey="panel_2">
            折叠面板内容
          </Collapse.Panel>
        </Collapse>,
      )
      expect(wrapper.find(`.kd-collapse-panel`).at(0)).toHaveClassName('kd-collapse-panel-opened')
      expect(wrapper.find(`.kd-collapse-panel`).at(0).find('.kd-collapse-panel-children')).toExist()
      wrapper.find(`.kd-collapse-panel-icon`).at(0).simulate('click')
      expect(onChange).toHaveBeenCalled()
      expect(tempV).toStrictEqual([])
    })

    it('value onChange', async () => {
      let tempV = ''
      const onChange = jest.fn((e) => {
        tempV = e
        wrapper.setProps({ activeKey: tempV })
      })
      const wrapper = mount(
        <Collapse onChange={onChange} activeKey="panel_1">
          <Collapse.Panel header={'This is the header1'} panelKey="panel_1">
            折叠面板内容1
          </Collapse.Panel>
          <Collapse.Panel header={'This is the header'} panelKey="panel_2">
            折叠面板内容
          </Collapse.Panel>
        </Collapse>,
      )
      expect(wrapper.find(`.kd-collapse-panel`).at(0)).toHaveClassName('kd-collapse-panel-opened')
      expect(wrapper.find(`.kd-collapse-panel`).at(0).find('.kd-collapse-panel-children')).toExist()
      wrapper.find(`.kd-collapse-panel-icon`).at(0).simulate('click')
      expect(onChange).toHaveBeenCalled()
      expect(tempV).toStrictEqual([])
    })
  })

  // 7.component interaction(event)

  // 8.config provider
  describe('8.config provider', () => {
    it('should config use config provider', () => {
      const Config = {
        compDefaultProps: {
          Collapse: {
            expandIconPosition: 'right',
          },
        },
      }
      const wrapper = mount(
        <ConfigProvider value={Config}>
          <Collapse>
            <Collapse.Panel header="This is the header1" panelKey="panel_1">
              折叠面板内容1
            </Collapse.Panel>
            <Collapse.Panel header="This is the header2" panelKey="panel_2">
              折叠面板内容2
            </Collapse.Panel>
          </Collapse>
        </ConfigProvider>,
      )

      expect(
        wrapper.find(`.kd-collapse-panel-right .kd-collapse-panel-icon .kdicon.kdicon-arrow-right-solid`),
      ).toExist()
    })
  })

  // 9. ref test
  describe('9. ref test', () => {
    it('should get Demo element from ref', () => {
      const ref = React.createRef()
      mount(
        <Collapse ref={ref as any}>
          <Collapse.Panel header="This is the header1" panelKey="panel_1">
            折叠面板内容1
          </Collapse.Panel>
          <Collapse.Panel header="This is the header2" panelKey="panel_2">
            折叠面板内容2
          </Collapse.Panel>
        </Collapse>,
      )
      expect(ref.current instanceof HTMLElement).toBe(true)
    })
  })
})
