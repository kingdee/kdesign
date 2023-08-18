import React from 'react'
import { render, mount } from 'enzyme'
import Stepper from '../index'
import { StepTypes } from '../stepper'
import mountTest from '../../../tests/shared/mountTest'
import ConfigProvider from '../../config-provider/index'

describe('Stepper', () => {
  // 1. mount test
  describe('1. mount test', () => {
    mountTest(Stepper)
    StepTypes.forEach((type) => {
      mountTest(() => <Stepper type={type} />)
    })
  })

  // 2.render test
  describe('2. render test', () => {
    it('renders correctly', () => {
      expect(render(<Stepper />)).toMatchSnapshot()
      StepTypes.forEach((type) => {
        expect(render(<Stepper type={type} />)).toMatchSnapshot()
      })
    })
  })

  // 3. warns in component

  // 4. render null or undefined without errors
  // describe('4. render null or undefined without errors', () => {
  //   it('render null or undefined without errors', () => {
  //     expect(
  //       mount(
  //         <Stepper type="base">
  //           {null}
  //           {undefined}
  //         </Stepper>,
  //       ),
  //     ).toMatchSnapshot()
  //   })
  // })

  // 5. displayName
  describe('5. displayName', () => {
    it('should have displayName static property', () => {
      expect(Stepper.displayName).toBe('Stepper')
    })
  })

  // 6. api test
  describe('6. api test', () => {
    it('should class use right', () => {
      const BaseStepInput = mount(<Stepper type="base" />)
      expect(BaseStepInput.find('.kd-inputNumber-baseStep')).toHaveLength(2)
      const EmbedStepInput = mount(<Stepper type="embed" />)
      expect(EmbedStepInput.find('.kd-inputNumber-embedStep')).toHaveLength(1)
    })

    it('data-test style className', () => {
      const wrapper = mount(
        <Stepper type="base" data-test="input-field" style={{ padding: 0 }} className="my-className" />,
      )
      expect(wrapper.find('[data-test="input-field"]')).toExist()
      expect(wrapper.find('.kd-input-wrapper')).toHaveStyle('padding', 0)
      expect(wrapper.find('.my-className')).toExist()
    })

    it('test disabled', () => {
      const onChange = jest.fn()
      const wrapper = mount(<Stepper type="base" disabled onChange={onChange} />)
      expect(wrapper.find(`.kd-input-wrapper.kd-input-wrapper-disabled input.kd-input-disabled`)).toExist()
      expect(
        wrapper.find(
          `.kd-input-wrapper.kd-input-wrapper-disabled .kd-inputNumber-baseStep.kd-inputNumber-baseStep-disabled`,
        ),
      ).toExist()
      wrapper.find(`.kd-input-wrapper`).simulate('click')
      expect(onChange).not.toHaveBeenCalled()
    })

    it('baseStep handleStepChang step', () => {
      let value = '0'
      const onChange = jest.fn((e) => {
        value = e.target.value
      })
      const wrapper = mount(<Stepper type="base" onChange={onChange} value={10} step={10} />)
      wrapper.find('.kd-inputNumber-baseStep').at(0).simulate('mousedown')
      expect(value).toBe('0')
      wrapper.find('.kd-inputNumber-baseStep').at(1).simulate('mousedown')
      expect(value).toBe('20')
    })

    it('embedStep handleStepChang', () => {
      let value = '0'
      const onChange = jest.fn((e) => {
        value = e.target.value
      })
      const wrapper = mount(<Stepper type="embed" onChange={onChange} />)
      wrapper.find('.kd-inputNumber-embedStep-minus').simulate('mousedown')
      expect(value).toBe('-1')
      wrapper.find('.kd-inputNumber-embedStep-plus').simulate('mousedown')
      expect(value).toBe('0')
    })

    it('Stepper renders decimalLength', () => {
      const wrapper = mount(<Stepper placeholder="基本使用" type="base" decimalLength={2} defaultValue={'2.3333'} />)
      const input = wrapper.find('input')
      expect(input.props().value).toEqual('2.33')
    })

    it('Stepper renders  digitLength onChange', async () => {
      let value = ''
      const onChange = jest.fn((e) => {
        value = e.target.value
        expect(value).toBe('2333')
      })
      const wrapper = mount(<Stepper digitLength={4} onChange={onChange} />)
      wrapper.simulate('change', { target: { value: '23332.3333' } })
      // expect(onChange).toHaveBeenCalled()
    })

    it('Stepper renders stepBtnClass', () => {
      const wrapper = mount(<Stepper stepBtnClassName="stepBtnClass" />)
      expect(wrapper.find('.kd-inputNumber-baseStep').first()).toHaveClassName('stepBtnClass')
    })

    it('Stepper renders  symbol', () => {
      let value = ''
      const onChange = jest.fn((e) => {
        value = e.target.value
        expect(value).toBe('$1111')
      })
      const wrapper = mount(<Stepper onChange={onChange} symbol={'$'} />)
      wrapper.simulate('change', { target: { value: '1111' } })
    })

    it('Stepper renders zeroShow', () => {
      let value = ''
      const onChange = jest.fn((e) => {
        value = e.target.value
        expect(value).toBe('')
      })
      const wrapper = mount(<Stepper onChange={onChange} zeroShow={false} />)
      wrapper.simulate('change', { target: { value: '0' } })
    })

    it('defaultValue', () => {
      const wrapper = mount(<Stepper placeholder="基本使用" type="base" defaultValue={'123'} />)
      const input = wrapper.find('input')
      expect(input.prop('value')).toEqual('123')
    })

    it('value', () => {
      const wrapper = mount(<Stepper placeholder="基本使用" type="base" value={'123'} />)
      const input = wrapper.find('input')
      expect(input.prop('value')).toEqual('123')
    })

    it('value defaultValue onChange', () => {
      let value = ''
      const onChange = jest.fn((e) => {
        value = e.target.value
      })
      const wrapper = mount(<Stepper defaultValue={'123'} value={'1234'} onChange={onChange} />)
      const input = wrapper.find('input')
      expect(input.prop('value')).toEqual('1234')
      wrapper.find('.kd-inputNumber-baseStep').at(0).simulate('mousedown')
      expect(value).toEqual('1233')
      expect(input.prop('value')).toEqual('1234')
    })

    it('value onChange', () => {
      let value = ''
      const onChange = jest.fn((e) => {
        value = e.target.value
        wrapper.setProps({ value })
      })
      const wrapper = mount(<Stepper value={'1234'} onChange={onChange} />)
      const input = wrapper.find('input')
      wrapper.find('.kd-inputNumber-baseStep').at(0).simulate('mousedown')
      expect(value).toEqual('1233')
      expect(input.prop('value')).toEqual('1234')
    })
  })

  // 8.config provider
  describe('8.config provider', () => {
    it('should config use config provider', () => {
      const Config = {
        compDefaultProps: {
          Stepper: {
            step: 10,
          },
        },
      }
      let value = '0'
      const onChange = jest.fn((e) => {
        value = e.target.value
      })
      const wrapper = mount(
        <ConfigProvider value={Config}>
          <Stepper type="base" onChange={onChange} value={10} />
        </ConfigProvider>,
      )
      wrapper.find('.kd-inputNumber-baseStep').at(0).simulate('mousedown')
      expect(value).toBe('0')
      wrapper.find('.kd-inputNumber-baseStep').at(1).simulate('mousedown')
      expect(value).toBe('20')
    })
  })

  // 9. ref test
  it('should get stepper element from ref', () => {
    const ref: any = React.createRef()
    mount(<Stepper ref={ref} />)
    expect((ref.current?.input as HTMLInputElement).classList.contains('kd-input')).toBe(true)
    expect(ref.current?.focus).toBeTruthy()
    expect(ref.current?.blur).toBeTruthy()
    expect(ref.current?.select).toBeTruthy()
  })
})
