import React from 'react'
import { render, mount } from 'enzyme'
import Typography from '../index'
import Title, { TitleLevels, TitleLevel } from '../title'
import Paragraph from '../paragraph'
import Text from '../text'
import Base, { BaseTypes, BaseType } from '../base'
import mountTest from '../../../tests/shared/mountTest'

describe('Typography', () => {
  // 1.mount test
  mountTest(Base)
  mountTest(Title)
  mountTest(Paragraph)
  mountTest(Text)
  mountTest(Typography)

  BaseTypes.forEach((type) => {
    mountTest(() => <Text type={type} />)
  })
  TitleLevels.forEach((level) => {
    mountTest(() => <Title level={level} />)
  })

  // 2.render test
  it('renders correctly', () => {
    expect(render(<Typography>Typography</Typography>)).toMatchSnapshot()
    expect(render(<Paragraph>Paragraph</Paragraph>)).toMatchSnapshot()
    expect(render(<Text>Text</Text>)).toMatchSnapshot()
    expect(render(<Title>Title</Title>)).toMatchSnapshot()

    BaseTypes.forEach((type) => {
      expect(render(<Text type={type}>Typography.Text type</Text>)).toMatchSnapshot()
    })
    TitleLevels.forEach((level) => {
      expect(render(<Title level={level}>Typography.Title level</Title>)).toMatchSnapshot()
    })
  })

  // 3.warns in component
  it('warns if type is wrong', () => {
    const mockWarn = jest.fn()
    jest.spyOn(console, 'warn').mockImplementation(mockWarn)
    const type = 'who am I' as any as BaseType
    render(<Text type={type}>Typography.Text type</Text>)
    expect(mockWarn).toHaveBeenCalledTimes(1)
    expect(mockWarn.mock.calls[0][0]).toMatch("Warning: [kdesign]-typography: cannot found type 'who am I'")
  })
  it('warns if level is wrong', () => {
    const mockWarn = jest.fn()
    jest.spyOn(console, 'warn').mockImplementation(mockWarn)
    const level = 4 as any as TitleLevel
    render(<Title level={level}>Title level</Title>)
    expect(mockWarn).toHaveBeenCalledTimes(1)
    expect(mockWarn.mock.calls[0][0]).toMatch("Warning: [kdesign]-typography: cannot found level '4'")
  })

  // 4. render null or undefined without errors
  it('render null or undefined typography without errors', () => {
    expect(
      mount(
        <Typography>
          {null}
          {undefined}
        </Typography>,
      ).find('kd-typography').length,
    ).toBe(0)
  })

  // 5. displayName
  it('should have displayName static property', () => {
    const wrapper = mount(<Typography>Typography</Typography>)
    expect((wrapper.type() as any).displayName).toBe('Typography')
  })

  // 6. class state
  it('should class use right', () => {
    BaseTypes.forEach((type) => {
      const TestButton = mount(<Text type={type}>Text</Text>)
      expect(TestButton.find(`.kd-typography`)).toHaveClassName(`.kd-typography-${type}`)
    })

    // disable
    const DisableText = mount(<Text disabled>Text</Text>)
    expect(DisableText.find(`.kd-typography`)).toHaveClassName('kd-typography-disabled')

    // mark
    const MarkText = mount(<Text mark>mark</Text>)
    expect(MarkText.find(`.kd-typography`)).toContainReact(<mark>mark</mark>)

    // code
    const CodeText = mount(<Text code>code</Text>)
    expect(CodeText.find(`.kd-typography`)).toContainReact(<code>code</code>)

    // keyboard
    const KeyboardText = mount(<Text keyboard>keyboard</Text>)
    expect(KeyboardText.find(`.kd-typography`)).toContainReact(<kbd>keyboard</kbd>)

    // underline
    const UnderlineText = mount(<Text underline>underline</Text>)
    expect(UnderlineText.find(`.kd-typography`)).toContainReact(<u>underline</u>)

    // delete
    const DeleteText = mount(<Text delete>delete</Text>)
    expect(DeleteText.find(`.kd-typography`)).toContainReact(<del>delete</del>)

    // strong
    const StrongText = mount(<Text strong>strong</Text>)
    expect(StrongText.find(`.kd-typography`)).toContainReact(<strong>strong</strong>)
  })

  // 7.component interaction(event)
  it('should clickable ', () => {
    const onClick = jest.fn()
    const wrapper = mount(<Text onClick={onClick}>Text</Text>)
    wrapper.simulate('click')
    expect(onClick).toHaveBeenCalled()
  })

  // 9. ref test
  it('should get button element from ref', () => {
    const ref = React.createRef()
    mount(<Typography ref={ref}></Typography>)
    expect(ref.current instanceof HTMLElement).toBe(true)
  })
})
