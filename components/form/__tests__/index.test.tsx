import React from 'react'
import { mount, ReactWrapper } from 'enzyme'
import { sleep } from '../../../tests/utils'
import Form from '../index'
import Input from '../../input'

describe('Form', () => {
  let wrapper: ReactWrapper
  beforeEach(() => {
    wrapper = mount(
      <Form>
        <Form.Item label="姓名" name="username" required>
          <Input />
        </Form.Item>
        <Form.Item name="password" validateTrigger="onBlur">
          <Input />
        </Form.Item>
        <Form.Item name="username1" validateTrigger={['onBlur', 'onMouseDown']}>
          <Input />
        </Form.Item>
      </Form>,
    )
  })

  const change = async (wrapper: ReactWrapper, index: number, value: any) => {
    wrapper.find('input').at(index).simulate('change', { target: { value } })
    await sleep(200)
    wrapper.update()
  }

  it('should have displayName static property', () => {
    expect((wrapper.type() as any).displayName).toBe('Form')
  })
  it('should unregister when unmount', () => {
    wrapper.unmount()
  })
  it('submit', () => {
    const mockInstance = {
      submit: jest.fn(),
      getInternalHooks: jest.fn().mockReturnValue({
        setDefaultValues: jest.fn(),
        setCallbacks: jest.fn(),
      }),
    }
    jest.spyOn(Form, 'useForm').mockReturnValue([mockInstance])
    const [instance] = Form.useForm()
    wrapper = mount(<Form form={instance}></Form>)
    wrapper.find('form').first().simulate('submit')
    expect(instance.submit).toHaveBeenCalled()
  })
  it('Field handleValueChange', async () => {
    wrapper = mount(
      <Form>
        <Form.Item name="test">
          <Input />
        </Form.Item>
      </Form>,
    )

    await change(wrapper, 0, 'king')

    const input = wrapper.find('input').at(0)
    expect(input).toMatchInlineSnapshot(`
      <input
        className="kd-input kd-input-size-middle kd-input-underline"
        onBlur={[Function]}
        onChange={[Function]}
        onFocus={[Function]}
        onKeyUp={[Function]}
        type="text"
        value="king"
      />
    `)
    expect(input.props().value).toEqual('king')
  })

  it('Field handleValueValidate', async () => {
    wrapper = mount(
      <Form>
        <Form.Item name="test" required>
          <Input />
        </Form.Item>
      </Form>,
    )

    await change(wrapper, 0, '')
    wrapper.find(Input).at(0).simulate('blur')
    await sleep(200)
    wrapper.update()

    expect(wrapper.find('.kd-form-field-wrapper-message').length).toBeTruthy()
    expect(wrapper.find('.kd-form-field-wrapper-message').at(0).text()).toEqual('test is required')
  })

  it('Field defaultValue', async () => {
    wrapper = mount(
      <Form>
        <Form.Item name="test" defaultValue="king">
          <Input />
        </Form.Item>
      </Form>,
    )

    expect(wrapper.find('input').at(0)).toMatchInlineSnapshot(`
      <input
        className="kd-input kd-input-size-middle kd-input-underline"
        onBlur={[Function]}
        onChange={[Function]}
        onFocus={[Function]}
        onKeyUp={[Function]}
        type="text"
        value="king"
      />
    `)

    expect(wrapper.find('input').at(0).props().value).toEqual('king')
  })
})
