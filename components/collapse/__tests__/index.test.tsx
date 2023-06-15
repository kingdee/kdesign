import React from 'react'
import { mount, render } from 'enzyme'
import mountTest from '../../../tests/shared/mountTest'
import Collapse from '../index'
import Icon from '../../icon'
import { IconPositionTypes } from '../collapse'
import ConfigProvider from '../../config-provider/index'

const collapseProps = {
  accordion: false,
  bordered: false,
  onChange: jest.fn(),
}
const collapsePanelProps = {
  disabled: false,
}
describe('Image', () => {
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
          </Collapse>,
        ),
      ).toMatchSnapshot()
    })
  })

  // 3. warns in component

  // 4. render null or undefined without errors
  describe('4. render null or undefined without errors', () => {
    it('render null or undefined without errors', () => {
      const wrapper = mount(
        <Collapse>
          <Collapse.Panel header={'This is the header'} panelKey="panel_1">
            {null}
            {undefined}
          </Collapse.Panel>
        </Collapse>,
      )
      // expect(wrapper).toBeEmptyRender()
      expect(wrapper.find('.kd-collapse')).toBeTruthy()
    })
  })

  // 5. displayName
  describe('5. displayName', () => {
    it('should have displayName static property', () => {
      const wrapper = mount(
        <Collapse>
          <Collapse.Panel header={'This is the header'} panelKey="panel_1">
            折叠面板内容
          </Collapse.Panel>
        </Collapse>,
      )
      expect((wrapper.type() as any).displayName).toBe('Collapse')
    })
  })

  // 6. api test
  describe('6. api test', () => {
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
        expect(wrapper.find(`.kd-collapse-panel-${type}`).childAt(0)).toHaveClassName('.kd-collapse-panel-icon')
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
        expect(wrapper.find(`.kd-collapse-panel-children`).length).toBe(1)
        wrapper.find(`.kd-collapse-panel-icon`).at(2).simulate('click')
        expect(wrapper.find(`.kd-collapse-panel-children`).length).toBe(1)
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
      expect(wrapper.find(`.kd-collapse-panel-border`).length).toBe(1)
      expect(wrapper.find(`.kd-collapse-panel-top-border`).length).toBe(1)
    })

    it('customize expand icon', () => {
      IconPositionTypes.forEach((type) => {
        const wrapper = mount(
          <Collapse
            {...collapseProps}
            expandIcon={() => {
              return <Icon type="arrow-right"></Icon>
            }}
          >
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
        expect(wrapper.find(`.kdicon-arrow-right`).length).toBe(1)
      })
    })

    it('test default active key', () => {
      IconPositionTypes.forEach((type) => {
        const wrapper = mount(
          <Collapse {...collapseProps} defaultActiveKey="panel_1">
            <Collapse.Panel
              {...collapsePanelProps}
              expandIconPosition={type}
              header={'This is the header'}
              panelKey="panel_1"
              disabled
            >
              折叠面板内容
            </Collapse.Panel>
            <Collapse.Panel
              {...collapsePanelProps}
              expandIconPosition={type}
              header={'This is the header'}
              panelKey="panel_2"
              disabled
            >
              折叠面板内容
            </Collapse.Panel>
          </Collapse>,
        )
        expect(wrapper.find(`.kd-collapse-panel-children`).length).toBe(1)
      })
    })

    it('test disabled', () => {
      IconPositionTypes.forEach((type) => {
        const wrapper = mount(
          <Collapse
            {...collapseProps}
            defaultActiveKey="panel_1"
            expandIcon={() => {
              return <Icon type="arrow-right"></Icon>
            }}
          >
            <Collapse.Panel
              {...collapsePanelProps}
              expandIconPosition={type}
              header={'This is the header1'}
              panelKey="panel_1"
              disabled
            >
              折叠面板内容1
            </Collapse.Panel>
            <Collapse.Panel
              {...collapsePanelProps}
              expandIconPosition={type}
              header={'This is the header2'}
              panelKey="panel_2"
              disabled
            >
              折叠面板内容2
            </Collapse.Panel>
          </Collapse>,
        )
        expect(wrapper.find(`.kd-collapse-panel-disabled`).length).toBeGreaterThan(1)
        expect(wrapper.find(`.kd-collapse-panel-children`).length).toBe(1)
      })
    })

    it('customize upper right corner content', () => {
      const extra1 = (
        <div style={{ cursor: 'pointer', display: 'flex' }} className={'extra'}>
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
          <Icon type="setting" />
        </div>
      )
      IconPositionTypes.forEach((type) => {
        const wrapper = mount(
          <Collapse {...collapseProps}>
            <Collapse.Panel
              {...collapsePanelProps}
              expandIconPosition={type}
              header={'This is the header1'}
              panelKey="panel_1"
              extra={extra1}
            >
              折叠面板内容1
            </Collapse.Panel>
            <Collapse.Panel
              {...collapsePanelProps}
              expandIconPosition={type}
              header={'This is the header2'}
              panelKey="panel_2"
              extra={extra2}
            >
              折叠面板内容2
            </Collapse.Panel>
          </Collapse>,
        )
        expect(wrapper.find(`.extra`).length).toBe(1)
        expect(wrapper.find(`.kdicon-setting`).length).toBe(1)
      })
    })

    it('customize header', () => {
      const header = (
        <div>
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
      expect(wrapper.find(`.kd-collapse-panel-header`).at(0).childAt(0).childAt(1).childAt(0)).toHaveClassName(
        'kdicon-warning-solid',
      )
    })

    it('should render with correct panelKey', () => {
      const wrapper = mount(
        <Collapse {...collapseProps}>
          <Collapse.Panel header="header" panelKey="1" />
        </Collapse>,
      )
      expect(wrapper.find('Panel').prop('panelKey')).toEqual('1')
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

      expect(wrapper.find('.kd-collapse').first().find('.kd-collapse-panel-right')).toBeTruthy()
    })
  })

  // 9. ref test
  // describe('9. ref test', () => {
  //   it('should get Demo element from ref', () => {
  //     const ref = React.createRef()
  //     mount(
  //       <ConfigProvider ref={ref}>
  //         <Collapse>
  //           <Collapse.Panel header="This is the header1" panelKey="panel_1">
  //             折叠面板内容1
  //           </Collapse.Panel>
  //           <Collapse.Panel header="This is the header2" panelKey="panel_2">
  //             折叠面板内容2
  //           </Collapse.Panel>
  //         </Collapse>
  //       </ConfigProvider>,
  //     )
  //     expect(ref.current instanceof HTMLElement).toBe(true)
  //   })
  // })
})
