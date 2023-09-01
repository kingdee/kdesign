import React from 'react'
import { mount, ReactWrapper } from 'enzyme'
import { sleep } from '../../../tests/utils'
import Form from '../index'
import Input from '../../input'
import Radio from '../../radio'
import Select from '../../select'
import Checkbox from '../../checkbox'
import Switch from '../../switch'
import Upload from '../../upload'
import Transfer from '../../transfer'
import { RangePicker } from '../../date-picker'
import mountTest from '../../../tests/shared/mountTest'
import ConfigProvider from '../../config-provider/index'

const { Item } = Form

describe('Form', () => {
  const errorSpy = jest.spyOn(console, 'error').mockImplementation()
  const warnSpy = jest.spyOn(console, 'warn').mockImplementation()
  let wrapper: ReactWrapper
  beforeEach(() => {
    wrapper = mount(
      <Form>
        <Item label="name" name="username">
          <Input />
        </Item>
      </Form>,
    )
  })

  afterEach(() => {
    wrapper = mount(
      <Form>
        <Item label="name" name="username">
          <Input />
        </Item>
      </Form>,
    )
    warnSpy.mockReset()
    errorSpy.mockReset()
  })

  afterAll(() => {
    errorSpy.mockRestore()
    warnSpy.mockRestore()
  })

  // 1. mount test
  mountTest(Form)
  mountTest(Item)

  // 2. render test
  it('renders correctly', () => {
    const LABEL_ALIGN_TYPE: any = ['left', 'right']
    const LAYOUT_TYPE: any = ['horizontal', 'vertical', 'inline']
    const wrapper = mount(
      <Form>
        <Item label="name" name={''}>
          <Input />
        </Item>
      </Form>,
    )

    expect(wrapper).toMatchSnapshot()

    LABEL_ALIGN_TYPE.forEach((labelAlign: any) => {
      wrapper.setProps({ labelAlign, labelWidth: 100 })
      wrapper.update()
      expect(wrapper).toMatchSnapshot()
    })

    LAYOUT_TYPE.forEach((layout: any) => {
      wrapper.setProps({ layout, wrappedWidth: 200 })
      wrapper.update()
      expect(wrapper).toMatchSnapshot()
    })

    expect(
      mount(
        <Form disabled>
          <Item label="name" name="" required>
            <Input />
          </Item>
        </Form>,
      ),
    ).toMatchSnapshot()
  })

  // 3. warns in component
  it('warns in component', () => {
    wrapper = mount(
      <Form>
        <Item name="name">
          <Input />
          <Input />
        </Item>
      </Form>,
    )
    expect(warnSpy).toBeCalled()
    const errorList: string[] = []
    warnSpy.mock.calls.forEach((d: string[]) => {
      errorList.push(...d)
    })

    expect(errorList.includes('Warning: [kdesign]-Form.Item: Form.Item must have only child')).toBeTruthy()
  })

  // 4. render null or undefined without errors
  describe('4. render null or undefined without errors', () => {
    it('render null or undefined without errors', () => {
      const wrapper = (
        <Form>
          {null}
          {undefined}
        </Form>
      )
      expect(wrapper).toMatchSnapshot()
    })
    it('render item null or undefined without errors', () => {
      const wrapper = (
        <Form>
          <Item name="name">
            {null}
            {undefined}
          </Item>
        </Form>
      )
      expect(wrapper).toMatchSnapshot()
    })
  })

  // 5. displayName
  it('should have displayName static property', () => {
    expect(Form.displayName).toBe('Form')
    expect(Item.displayName).toBe('Item')
  })

  // 6. class state
  describe('6. class state', () => {
    it('className', () => {
      wrapper = mount(
        <Form className={'my-form'}>
          <Item className={'my-item'} label="name" name="username" extra={'extra'}>
            <Input />
          </Item>
        </Form>,
      )
      expect(wrapper.find('.my-form')).toBeTruthy()
      expect(wrapper.find('.my-item')).toBeTruthy()
    })
  })

  // 7. form event
  it('event', async () => {
    let errorInfo = null
    let result = null
    const onChange = jest.fn()
    const onValuesChange = jest.fn()
    const onFinishFailed = jest.fn((v) => {
      errorInfo = v
    })
    const onFinish = jest.fn((v) => {
      result = v
    })
    // const [form] = Form.useForm()

    const wrapper = mount(
      <Form onValuesChange={onValuesChange} onFinishFailed={onFinishFailed} onFinish={onFinish}>
        <Form.Item label="用户名" name="username" required>
          <Input onChange={onChange} />
        </Form.Item>
      </Form>,
    )

    // submit
    wrapper.find('form').first().simulate('submit')
    await sleep(100)
    expect(errorInfo).toEqual({
      values: {},
      fields: { username: [{ message: '请输入您的用户名', field: 'username' }] },
    })

    // change & submit
    wrapper.find('input').simulate('change', { target: { value: 'tom' } })
    expect(onChange).toHaveBeenCalled()
    expect(onValuesChange).toHaveBeenCalled()
    expect(onValuesChange.mock.calls[0][0]).toEqual({ username: 'tom' })
    expect(onValuesChange.mock.calls[0][1]).toEqual({ username: 'tom' })
    wrapper.find('form').first().simulate('submit')
    await sleep(100)
    expect(result).toEqual({
      values: {
        username: 'tom',
      },
    })

    // reset
    wrapper.find('form').first().simulate('reset')
    await sleep(100)
    expect(wrapper.find('input').props().value).toBe('')
  })

  // 8. config provider
  it('should config use config provider', () => {
    const config = {
      compDefaultProps: {
        Form: {
          layout: 'vertical',
          labelAlign: 'right',
          size: 'small',
        },
      },
    }
    const wrapper = mount(
      <ConfigProvider value={config}>
        <Form>
          <Item label="name" name="username">
            <Input />
          </Item>
        </Form>
      </ConfigProvider>,
    )
    expect(wrapper.find('form')).toHaveClassName('.kd-form-vertical')
    expect(wrapper.find(`.kd-form-field-label`)).toHaveClassName(`.kd-form-field-label-right`)
    expect(wrapper.find('.kd-input-size-small')).toBeTruthy()
  })

  // 9. ref test
  it('ref & FormInstance', async () => {
    const ref: any = React.createRef()
    const onFinishFailed = jest.fn()
    const onFinish = jest.fn()
    wrapper = mount(
      <Form ref={ref} defaultValues={{ firstname: 'tom' }} onFinishFailed={onFinishFailed} onFinish={onFinish}>
        <Item label="firstname" name="firstname">
          <Input />
        </Item>
        <Item label="lastname" name="lastname" required>
          <Input />
        </Item>
      </Form>,
    )

    const instance = ref.current
    // getFieldValue
    const firstname = instance.getFieldValue('firstname')
    expect(firstname).toEqual('tom')

    // getFieldsValue
    expect(instance.getFieldsValue(['firstname', 'lastname'])).toEqual({ firstname: 'tom', lastname: undefined })

    // setFieldValue
    instance.setFieldValue('firstname', 'tom1')
    expect(instance.getFieldValue('firstname')).toEqual('tom1')

    // setFieldsValue
    instance.setFieldsValue({ lastname: 'tom2' })
    expect(instance.getFieldValue('lastname')).toEqual('tom2')

    // validateFields
    const data = await instance.validateFields()
    expect(data).toEqual({ values: { firstname: 'tom1', lastname: 'tom2' } })

    // resetFields
    instance.resetFields()
    expect(instance.getFieldsValue(['firstname', 'lastname'])).toEqual({ firstname: 'tom', lastname: '' })

    // submit
    instance.submit()
    await sleep(100)
    expect(onFinishFailed).toHaveBeenCalled()
    await expect(instance.validateFields()).rejects.toEqual({
      errorInfos: {
        fields: {
          lastname: [
            {
              field: 'lastname',
              message: '请输入您的lastname',
            },
          ],
        },
        values: { firstname: 'tom', lastname: '' },
      },
      errors: [{ field: 'lastname', message: '请输入您的lastname' }],
    })

    // getFieldError
    expect(instance.getFieldError('lastname')).toEqual('请输入您的lastname')
  })

  // 10. api test
  describe('api test', () => {
    it('defaultValue', function () {
      wrapper = mount(
        <Form defaultValues={{ username: 'tom' }}>
          <Item label="name" name="username">
            <Input />
          </Item>
        </Form>,
      )
      expect(wrapper.find('input').at(0).props().value).toBe('tom')
      wrapper = mount(
        <Form>
          <Item defaultValue={'jack'} label="name" name="username">
            <Input />
          </Item>
        </Form>,
      )
      expect(wrapper.find('input').at(0).props().value).toBe('jack')
    })

    it('disabled', async () => {
      wrapper = mount(
        <Form disabled>
          <Item label="name" name="username">
            <Input />
          </Item>
        </Form>,
      )

      expect(wrapper.find('.kd-input-disabled')).toHaveLength(1)
      expect(wrapper.find('input').props().disabled).toBeTruthy()

      wrapper = mount(
        <Form>
          <Item disabled label="name" name="username">
            <Input />
          </Item>
        </Form>,
      )
      expect(wrapper.find('.kd-input-disabled')).toHaveLength(1)
      expect(wrapper.find('input').props().disabled).toBeTruthy()
    })

    it('htmlFor', () => {
      const wrapper = mount(
        <Form>
          <Item htmlFor="name" label="name" name="username">
            <Input />
          </Item>
        </Form>,
      )

      expect(wrapper.find('label').props().htmlFor).toBe('name')
    })

    it('error message & rules & validateTrigger', async () => {
      wrapper = mount(
        <Form>
          <Form.Item
            name="test"
            label="test"
            validateTrigger={'onChange'}
            rules={[
              { required: true, message: '请输入' },
              { min: 6, message: '请输入至少6位字符' },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>,
      )

      wrapper.find('input').simulate('change', { target: { value: '' } })
      await sleep(200)
      wrapper.update()
      expect(wrapper.find('.kd-form-field-wrapper-message').length).toBeTruthy()
      expect(wrapper.find('.kd-form-field-wrapper-message').at(0).text()).toEqual('请输入')

      wrapper.find('input').simulate('change', { target: { value: 'king' } })
      await sleep(200)
      wrapper.update()
      expect(wrapper.find('input').at(0).props().value).toEqual('king')
      expect(wrapper.find('.kd-form-field-wrapper-message').length).toBeTruthy()
      expect(wrapper.find('.kd-form-field-wrapper-message').at(0).text()).toEqual('请输入至少6位字符')
    })
  })

  // 11. special case
  describe('special case', () => {
    it('get value', async () => {
      let result = null
      const onFinish = jest.fn((v) => {
        result = v
      })
      const mockData = []
      for (let i = 1; i < 10; i++) {
        mockData.push({
          key: i.toString(),
          title: `选项${i}`,
          description: `选项描述${i}`,
          disabled: i % 6 === 0,
        })
      }

      const wrapper = mount(
        <Form onFinish={onFinish}>
          <Item name="radio">
            <Radio value={'radio'} checked={true} />
          </Item>
          <Item name="radiogroup">
            <Radio.Group name="radiogroup" value={'AAAA'}>
              <Radio value={'AAAA'}>A</Radio>
              <Radio value={'BBBB'}>B</Radio>
            </Radio.Group>
          </Item>
          <Item name="checkbox">
            <Checkbox value={'checkbox'} checked={true} />
          </Item>
          <Item name="checkboxgroup">
            <Checkbox.Group name="checkboxgroup" value={['AAAA']}>
              <Checkbox value={'AAAA'}>A</Checkbox>
              <Checkbox value={'BBBB'}>B</Checkbox>
            </Checkbox.Group>
          </Item>
          <Item name="switch">
            <Switch checked={true} />
          </Item>
          <Item name="upload">
            <Upload fileList={[{ uid: '123', name: '123.png', status: 'done', size: 123, type: '' } as any]} />
          </Item>
          <Item name="transfer">
            <Transfer dataSource={mockData} targetKeys={['1', '2', '3'] as any} render={(item) => item.title} />
          </Item>
          <Item name="rangepicker">
            <RangePicker value={[new Date('2000-10-01'), new Date('2000-10-31')]} />
          </Item>
        </Form>,
      )

      wrapper.find('form').first().simulate('submit')
      await sleep(100)
      expect(result).toEqual({
        values: {
          checkbox: true,
          checkboxgroup: ['AAAA'],
          radio: true,
          radiogroup: 'AAAA',
          switch: true,
          transfer: ['1', '2', '3'],
          rangepicker: [new Date('2000-10-01'), new Date('2000-10-31')],
          upload: [
            {
              name: '123.png',
              size: 123,
              status: 'done',
              type: '',
              uid: '123',
            },
          ],
        },
      })
    })

    it('instance', async () => {
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

    it('clear select', async () => {
      let value = 'male'
      const onChange = jest.fn((e) => {
        value = e
      })
      const ref: any = React.createRef()
      wrapper = mount(
        <Form ref={ref}>
          <Item label="name" name="username">
            <Select placeholder="请选择" allowClear value={value} onChange={onChange}>
              <Select.Option value="male">male</Select.Option>
              <Select.Option value="female">female</Select.Option>
            </Select>
          </Item>
        </Form>,
      )
      wrapper.find('.kd-select-icon-clear').simulate('click')
      expect(onChange).toHaveBeenCalled()
      expect(value).toEqual(undefined)
      expect(ref.current.getFieldValue('username')).toEqual(undefined)
    })

    it('extra', function () {
      wrapper = mount(
        <Form>
          <Item name="username" extra="extra">
            <Input />
          </Item>
        </Form>,
      )
      expect(wrapper.find('.kd-form-field-wrapper-extra')).toBeTruthy()
      expect(wrapper.find('.kd-form-field-wrapper-extra-text').text()).toBe('extra')
    })
  })
})
