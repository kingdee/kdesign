import React from 'react'
import { render, mount } from 'enzyme'
import ConfigProvider from '../../config-provider/index'
import Icon from '../../icon'
import Steps, { Step, Directions, Direction, LabelPlacement, LabelPlacements, Statuses, Status } from '../index'
import mountTest from '../../../tests/shared/mountTest'

describe('Steps', () => {
  // 1.mount test
  describe('1.mount test', () => {
    mountTest(Steps)
    Directions.forEach((direction) => {
      mountTest(() => (
        <Steps direction={direction}>
          <Step title="Step1" description="hello word hello word hello word hello word hello word hello word" />
          <Step title="Step2" description="hello word" />
        </Steps>
      ))
    })
  })

  // 2.render test
  describe('2.render test', () => {
    it('renders correctly', () => {
      expect(
        render(
          <Steps>
            <Step title="Step1" description="hello word hello word hello word hello word hello word hello word" />
            <Step title="Step2" description="hello word" />
          </Steps>,
        ),
      ).toMatchSnapshot()

      Directions.forEach((direction) => {
        expect(
          render(
            <Steps direction={direction}>
              <Step title="Step1" description="hello word hello word hello word hello word hello word hello word" />
              <Step title="Step2" description="hello word" />
            </Steps>,
          ),
        ).toMatchSnapshot()
      })
      LabelPlacements.forEach((labelPlacement) => {
        expect(
          render(
            <Steps labelPlacement={labelPlacement}>
              <Step title="Step1" description="hello word hello word hello word hello word hello word hello word" />
              <Step title="Step2" description="hello word" />
            </Steps>,
          ),
        ).toMatchSnapshot()
      })
      Statuses.forEach((status) => {
        expect(
          render(
            <Steps status={status}>
              <Step title="Step1" description="hello word hello word hello word hello word hello word hello word" />
              <Step title="Step2" description="hello word" />
            </Steps>,
          ),
        ).toMatchSnapshot()
      })

      const icons = {
        process: <Icon type="loadding" spin />,
        wait: <Icon type="wating" />,
        error: <Icon type="close" />,
        finish: <Icon type="right-bold" />,
      }

      expect(
        render(
          <Steps icons={icons} current={2} status="error">
            <Step title="Step1" description="hello word" icon={<Icon type="right-bold" />} />
            <Step title="Step2" description="hello word" />
            <Step title="Step3" description="hello word" />
            <Step title="Step4" description="hello word" />
          </Steps>,
        ),
      ).toMatchSnapshot()
    })
  })

  // 3.warns in component
  describe('3.warns in component', () => {
    it('warns if direction is wrong', () => {
      const mockWarn = jest.fn()
      jest.spyOn(console, 'warn').mockImplementation(mockWarn)
      const direction = 'who am I' as any as Direction
      render(<Steps direction={direction} />)
      expect(mockWarn).toHaveBeenCalledTimes(1)
      expect(mockWarn.mock.calls[0][0]).toMatch("Warning: [kdesign]-steps: cannot found steps direction 'who am I'")
    })

    it('warns if labelPlacement is wrong', () => {
      const mockWarn = jest.fn()
      jest.spyOn(console, 'warn').mockImplementation(mockWarn)
      const labelPlacement = 'who am I' as any as LabelPlacement
      render(<Steps labelPlacement={labelPlacement} />)
      expect(mockWarn).toHaveBeenCalledTimes(1)
      expect(mockWarn.mock.calls[0][0]).toMatch(
        "Warning: [kdesign]-steps: cannot found steps labelPlacement 'who am I'",
      )
    })
    it('warns if status is wrong', () => {
      const mockWarn = jest.fn()
      jest.spyOn(console, 'warn').mockImplementation(mockWarn)
      const status = 'who am I' as any as Status
      render(<Steps status={status} />)
      expect(mockWarn).toHaveBeenCalledTimes(1)
      expect(mockWarn.mock.calls[0][0]).toMatch("Warning: [kdesign]-steps: cannot found steps status 'who am I'")
    })
  })

  // 4. render null or undefined without errors
  describe('4.render null or undefined without errors', () => {
    it('render null or undefined buttons without errors', () => {
      expect(
        mount(
          <Steps>
            {null}
            {undefined}
          </Steps>,
        ),
      ).toMatchSnapshot()
    })
  })

  // 5. displayName
  describe('5.displayName', () => {
    it('should have displayName static property', () => {
      const wrapper = mount(
        <Steps>
          <Step title="Step1" description="hello word hello word hello word hello word hello word hello word" />
          <Step title="Step2" description="hello word" />
        </Steps>,
      )
      expect((wrapper.type() as any).displayName).toBe('Steps')
    })
  })

  // 6. class state
  describe('6.class state', () => {
    it('should class use right', () => {
      // default
      const DefaultSteps = mount(
        <Steps>
          <Step title="Step1" description="hello word hello word hello word hello word hello word hello word" />
          <Step title="Step2" description="hello word" />
        </Steps>,
      )
      expect(DefaultSteps.find('.kd-steps')).toHaveClassName('.kd-steps-horizontal')
      expect(DefaultSteps.find('.kd-steps')).toHaveClassName('.kd-steps-bottomLable')
      const mockOnChange = jest.fn()
      const clickableSteps = mount(
        <Steps onChange={mockOnChange}>
          <Step title="Step1" description="hello word" />
        </Steps>,
      )
      expect(clickableSteps.find('.kd-steps-item')).toHaveClassName('.kd-steps-item-clickable')

      Directions.forEach((direction) => {
        const TestSteps = mount(
          <Steps direction={direction}>
            <Step title="Step1" description="hello word" />
          </Steps>,
        )
        expect(TestSteps.find(`.kd-steps`)).toHaveClassName(`.kd-steps-${direction}`)
      })

      LabelPlacements.forEach((labelPlacement) => {
        const TestSteps = mount(
          <Steps labelPlacement={labelPlacement}>
            <Step title="Step1" description="hello word" />
          </Steps>,
        )
        expect(TestSteps.find(`.kd-steps`)).toHaveClassName(`.kd-steps-${labelPlacement}Lable`)
      })
      Statuses.forEach((status) => {
        const TestSteps = mount(
          <Steps status={status}>
            <Step title="Step1" description="hello word" />
          </Steps>,
        )
        expect(TestSteps.find(`.kd-steps-item`)).toHaveClassName(`.kd-steps-item-${status}`)
      })
    })
  })
  // 7.component interaction(event)
  describe('7.component interaction(event)', () => {
    it('should clickable ', () => {
      const onChange = jest.fn()
      const wrapper = mount(
        <Steps onChange={onChange}>
          <Step title="Step1" description="hello word" />
          <Step title="Step2" description="hello word" />
          <Step title="Step3" description="hello word" />
        </Steps>,
      )
      wrapper.find('.kd-steps-item').at(1).simulate('click')
      expect(onChange).toHaveBeenCalled()
    })
  })

  // 8.config provider
  describe('8.config provider', () => {
    it('should config use config provider', () => {
      const stepsConfig = {
        compDefaultProps: {
          Steps: {
            direction: 'vertical',
          },
        },
      }
      const wrapper = mount(
        <ConfigProvider value={stepsConfig}>
          <Steps>
            <Step title="Step1" description="hello word" />
          </Steps>
        </ConfigProvider>,
      )
      expect(wrapper.find('.kd-steps')).toHaveClassName('.kd-steps-vertical')
    })
  })

  // 9.API test
  describe('9.api test', () => {
    it('Steps API test', () => {
      // canClickCurrentStep
      const onChange = jest.fn()
      const canClickCurrentSteps = mount(
        <Steps onChange={onChange} canClickCurrentStep={true}>
          <Step title="Step1" description="hello word" />
          <Step title="Step2" description="hello word" />
          <Step title="Step3" description="hello word" />
        </Steps>,
      )
      canClickCurrentSteps.find('.kd-steps-item').at(0).simulate('click')
      expect(onChange).toHaveBeenCalled()
      // current
      const currentOnChange = jest.fn()
      const currentSteps = mount(
        <Steps onChange={currentOnChange} current={1}>
          <Step title="Step1" description="hello word" />
          <Step title="Step2" description="hello word" />
          <Step title="Step3" description="hello word" />
        </Steps>,
      )
      currentSteps.find('.kd-steps-item').at(1).simulate('click')
      expect(currentOnChange).not.toHaveBeenCalled()
      // initial
      const initialSteps = mount(
        <Steps initial={2}>
          <Step title="步骤条节点标题文本，我是比较长的文本" />
          <Step title="标题内容2" />
          <Step title="标题内容3" />
          <Step title="标题内容4" />
        </Steps>,
      )
      expect(initialSteps.find('.kd-steps-item').at(0).find('.kd-steps-icon').text()).toEqual(`3`)
    })
    it('Steps.step API test', () => {
      // status
      const statusSteps = mount(
        <Steps>
          <Step title="标题内容1" status="error" />
          <Step title="标题内容2" status="wait" />
          <Step title="标题内容3" status="process" />
          <Step title="标题内容4" status="finish" />
        </Steps>,
      )
      expect(statusSteps.exists('.kd-steps-item-error')).toBeTruthy()
      expect(statusSteps.exists('.kd-steps-item-wait')).toBeTruthy()
      expect(statusSteps.exists('.kd-steps-item-process')).toBeTruthy()
      expect(statusSteps.exists('.kd-steps-item-finish')).toBeTruthy()
      // stepNumber
      const stepNumberSteps = mount(
        <Steps>
          <Step title="标题内容1" stepNumber={200} />
        </Steps>,
      )
      expect(stepNumberSteps.find('.kd-steps-item').at(0).find('.kd-steps-icon').text()).toEqual(`200`)
    })
  })
})
