import React from 'react'
import { render, mount } from 'enzyme'
import Upload from '../index'
import Icon from '../../icon'
import Button from '../../button'
import { UploadListType, UploadProps, UploadFile } from '../interface'
import mountTest from '../../../tests/shared/mountTest'

const sleep = (timeout = 0) => new Promise((resolve) => setTimeout(resolve, timeout))
const dragButton = (
  <div>
    <Icon type="add" style={{ fontSize: 16, color: '#666', fontWeight: 'bolder' }} />
    <div>点击或拖拽上传</div>
  </div>
)
const uploadButton = <Button icon={<Icon type="upload" />}>Upload</Button>
const defaultFileList = [
  {
    uid: '1',
    size: '100',
    status: 'done',
    name: 'xxx.png',
    response: 'Server Error 500',
    url: 'http://www.baidu.com/xxx.png',
  },
  {
    uid: '2',
    size: '100',
    name: 'yyy.png',
    status: 'done',
    url: 'http://www.baidu.com/yyy.png',
  },
  {
    uid: '3',
    size: '100',
    name: 'zzz.png',
    status: 'error',
    response: 'Server Error 500',
    url: 'http://www.baidu.com/zzz.png',
  },
] as unknown as UploadFile[]
const action = 'https://www.mocky.io/v2/5cc8019d300000980a055e76'
const defaultUploadProps: UploadProps = {
  defaultFileList,
  action,
}

describe('Upload', () => {
  // 1.mount test
  mountTest(Upload)

  // 2.render test
  it('renders correctly', () => {
    const wrapper = render(<Upload.Dragger>{dragButton}</Upload.Dragger>)
    expect(wrapper).toMatchSnapshot()
    const types = ['text', 'picture']
    types.forEach((type: UploadListType) => {
      const wrapper = render(<Upload listType={type}></Upload>)
      expect(wrapper).toMatchSnapshot()
    })
  })

  // 3.render no child without errors
  it('render no child without errors', () => {
    expect(mount(<Upload></Upload>)).toMatchSnapshot()
  })

  // 4. render null or undefined without errors
  it('render null or undefined without errors', () => {
    expect(
      mount(
        <Upload>
          {null}
          {undefined}
        </Upload>,
      ),
    ).toMatchSnapshot()
  })

  // 5.displayName
  it('should have displayName static property', () => {
    const wrapper = mount(<Upload></Upload>)
    expect((wrapper.type() as any).displayName).toBe('Upload')
  })

  // 6.render defaultFileList without error
  it('render defaultFileList without error', () => {
    const wrapper = mount(<Upload {...defaultUploadProps}></Upload>)
    expect(wrapper).toMatchSnapshot()
  })

  // 7. test beforeUpload transformFile onChange can be called
  it('test callback', async () => {
    const fileList = [] as any
    const transformFileMock = jest.fn()
    const beforeUploadMock = jest.fn(() => {
      return true
    })
    const onChangeMock = jest.fn(() => {
      setTimeout(() => {
        expect(transformFileMock).toHaveBeenCalled()
      }, 100)
    })
    const wrapper = mount(
      <Upload
        action={action}
        transformFile={transformFileMock}
        fileList={fileList}
        beforeUpload={beforeUploadMock}
        onChange={onChangeMock}
      >
        {uploadButton}
      </Upload>,
    )
    const file = new File(['test'], 'test.png', { type: 'image/png' })
    wrapper.find('input').simulate('change', {
      target: {
        files: [file],
      },
    })
    expect(beforeUploadMock).toHaveBeenCalledWith(file, [file])
    await sleep(2000)
    expect(onChangeMock).toHaveBeenCalled()
  })

  // api
  it('api test', () => {
    const wrapper = mount(<Upload {...defaultUploadProps}>{uploadButton}</Upload>)

    wrapper.setProps({ showUploadList: false })
    expect(wrapper.find('.kd-upload-text-list').exists()).toBe(false)
    wrapper.setProps({ showUploadList: true })
    expect(wrapper.find('.kd-upload-text-list').exists()).toBe(true)
    expect(wrapper.find('.kd-upload-text-list-item-delete').exists()).toBe(true)
    expect(wrapper.find('.kd-upload-text-list-item-reupload').exists()).toBe(true)

    // accept
    wrapper.setProps({ accept: 'image/png, image/jpeg' })
    expect(wrapper.find('input').prop('accept')).toBe('image/png, image/jpeg')

    // disabled
    expect(wrapper.find('input').prop('disabled')).toBe(false)
    wrapper.setProps({ disabled: true })
    expect(wrapper.find('.kd-upload').hasClass('disabled')).toBe(true)
    expect(wrapper.find('input').prop('disabled')).toBe(true)

    // directory
    expect(wrapper.find('input').prop('directory')).toBe(undefined)
    wrapper.setProps({ directory: true })
    expect(wrapper.find('input').prop('directory')).toBe('directory')

    // multiple
    expect(wrapper.find('input').prop('multiple')).toBe(false)
    wrapper.setProps({ multiple: true })
    expect(wrapper.find('input').prop('multiple')).toBe(true)
  })

  it('onPreview', () => {
    const onPreview = jest.fn()
    const wrapper = mount(
      <Upload {...defaultUploadProps} onPreview={onPreview}>
        {uploadButton}
      </Upload>,
    )
    wrapper.find('.kd-upload-text-list-item-name').at(0).simulate('click')
    expect(onPreview).toHaveBeenCalled()
    wrapper.find('.kd-upload-text-list-item-icon').at(0).simulate('click')
    expect(onPreview).toHaveBeenCalledTimes(2)
  })

  it('onRemove', () => {
    let value = { ...defaultFileList[0] }
    const onRemove = jest.fn((v) => {
      value = v
    })
    const wrapper = mount(
      <Upload {...defaultUploadProps} onRemove={onRemove}>
        {uploadButton}
      </Upload>,
    )
    wrapper.find('.kd-upload-text-list-item-delete').at(0).simulate('click')
    expect(onRemove).toHaveBeenCalled()
    expect(value.status).toEqual('removed')
  })
})
