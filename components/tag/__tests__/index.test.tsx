import React from 'react'
import { render, mount } from 'enzyme'
import Tag, { TagType, TagSize } from '../index'
import { TagTypes, TagColors, TagSizes } from '../tag'
import Icon from '../../icon'
import mountTest from '../../../tests/shared/mountTest'
import ConfigProvider from '../../config-provider/index'

describe('Tag', () => {
  // 1. mount test
  mountTest(Tag)
  TagTypes.forEach((type) => {
    mountTest(() => <Tag type={type} />)
  })

  // 2. render test
  it('renders correctly', () => {
    expect(render(<Tag>Text</Tag>)).toMatchSnapshot()

    TagTypes.forEach((type) => {
      expect(render(<Tag type={type}>Text</Tag>)).toMatchSnapshot()
    })

    TagColors.forEach((color) => {
      expect(render(<Tag color={color}>Text</Tag>)).toMatchSnapshot()
    })

    TagSizes.forEach((size) => {
      expect(render(<Tag size={size}>Text</Tag>)).toMatchSnapshot()
    })
  })

  // 3. warns in component
  it('warns if type is wrong', () => {
    const mockWarn = jest.fn()
    jest.spyOn(console, 'warn').mockImplementation(mockWarn)
    const type = 'who am I' as any as TagType
    render(<Tag type={type} />)
    expect(mockWarn).toHaveBeenCalledTimes(1)
    expect(mockWarn.mock.calls[0][0]).toMatch("Warning: [kdesign]-tag: cannot found tag type 'who am I'")

    const size = 'who am I' as any as TagSize
    render(<Tag size={size} />)
    expect(mockWarn).toHaveBeenCalledTimes(2)
    expect(mockWarn.mock.calls[1][0]).toMatch("Warning: [kdesign]-tag: cannot found tag size 'who am I'")
  })

  // 4. render null or undefined without errors
  it('render null or undefined tag without errors', () => {
    expect(
      mount(
        <Tag>
          {null}
          {undefined}
        </Tag>,
      ).find('.kd-tag-ellipsis').length,
    ).toBe(1)
  })

  // 5. displayName
  it('should have displayName static property', () => {
    const wrapper = mount(<Tag>Text</Tag>)
    expect((wrapper.type() as any).displayName).toBe('Tag')
  })

  // 6. class state
  it('should class use right', () => {
    const DefaultTag = mount(<Tag>Text</Tag>)
    expect(DefaultTag.find('.kd-tag')).toHaveClassName('.kd-tag-shape-status')

    TagTypes.forEach((type) => {
      const TestTag = mount(<Tag type={type}>Text</Tag>)
      expect(TestTag.find(`.kd-tag`)).toHaveClassName(`.kd-tag-shape-${type}`)
    })

    TagColors.forEach((color) => {
      const TestTag = mount(<Tag color={color}>Text</Tag>)
      expect(TestTag.find(`.kd-tag`)).toHaveClassName(`.kd-tag-${color}`)
    })

    TagSizes.forEach((size) => {
      const TestTag = mount(<Tag size={size}>Text</Tag>)
      expect(TestTag.find(`.kd-tag`)).toHaveClassName(`.kd-tag-size-${size}`)
    })

    const CustomColorTag = mount(
      <Tag type="attribute" color="#ff0">
        Text
      </Tag>,
    )
    expect(CustomColorTag.find(`.kd-tag`)).toHaveClassName(`.kd-tag-has-color`)

    const IconTag = mount(<Tag icon={<Icon type="add-solid" />}>Text</Tag>)
    expect(IconTag.find(`.kd-tag`)).toContainReact(<Icon type="add-solid"></Icon>)

    const ClickableTag = mount(<Tag clickable>Text</Tag>)
    expect(ClickableTag.find(`.kd-tag`)).toHaveClassName(`.kd-tag-clickable`)

    const ClosableTag = mount(<Tag closable>Text1</Tag>)
    expect(ClosableTag.find(`.kd-tag`)).toHaveClassName(`.kd-tag-closable`)

    const DisabledTag = mount(
      <Tag type="edit" closable disabled>
        Text1
      </Tag>,
    )
    expect(DisabledTag.find(`.kd-tag`)).toHaveClassName(`.kd-tag-closable-disabled`)
  })

  // 7.component interaction(event)
  it('should clickable ', () => {
    const onClick = jest.fn()
    const wrapper = mount(
      <Tag clickable onClick={onClick}>
        text
      </Tag>,
    )
    wrapper.simulate('click')
    expect(onClick).toHaveBeenCalled()
  })

  it('should closable ', () => {
    const onClose = jest.fn()
    const wrapper = mount(
      <Tag type="edit" closable onClose={onClose}>
        text
      </Tag>,
    )
    wrapper.find(`.kd-tag-closeWrapper`).simulate('click')
    expect(onClose).toHaveBeenCalled()
  })

  it('should not closable ', () => {
    const onClose = jest.fn()
    const wrapper = mount(
      <Tag type="edit" closable onClose={onClose} disabled>
        text
      </Tag>,
    )
    wrapper.find(`.kd-tag-closeWrapper`).simulate('click')
    expect(onClose).toHaveBeenCalledTimes(0)
  })

  // 8.config provider
  it('should config use config provider', () => {
    const tagConfig = {
      compDefaultProps: {
        Tag: {
          type: 'attribute',
        },
      },
    }
    const wrapper = mount(
      <ConfigProvider value={tagConfig}>
        <Tag>Tag Text</Tag>
      </ConfigProvider>,
    )
    expect(wrapper.find('.kd-tag')).toHaveClassName('.kd-tag-shape-attribute')
  })

  // 9. ref test
  it('should get Tag element from ref', () => {
    const ref = React.createRef()
    mount(<Tag ref={ref} type="status"></Tag>)
    expect(ref.current instanceof HTMLSpanElement).toBe(true)
  })

  // 10. api test
  it('api test', () => {
    // closable disabled color
    TagTypes.forEach((type) => {
      const tagDemo = mount(<Tag type={type} closable color="#f00" disabled></Tag>)
      if (type === 'edit') {
        expect(tagDemo.find('.kd-tag .kd-tag-close-icon')).toExist()
        expect(tagDemo.find('.kd-tag.kd-tag-closable-disabled')).toExist()
      } else {
        expect(tagDemo.find('.kd-tag .kd-tag-close-icon')).not.toExist()
        expect(tagDemo.find('.kd-tag.kd-tag-closable-disabled')).not.toExist()
      }
      // color
      if (type === 'attribute') {
        expect(tagDemo.find('.kd-tag.kd-tag-has-color').props()?.style?.backgroundColor).toEqual('#f00')
      } else {
        expect(tagDemo.find('.kd-tag').props()?.style?.backgroundColor).not.toEqual('#f00')
      }
    })

    // closeIcon
    const tagDemo = mount(<Tag type="edit" closable closeIcon={<Icon type="add"></Icon>}></Tag>)
    expect(tagDemo.find('.kd-tag .kdicon-add')).toExist()
  })
})
