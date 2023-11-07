import React from 'react'
import { render, mount } from 'enzyme'
import Typography from '../index'
import ConfigProvider from '../../config-provider/index'
import Title, { TitleLevels, TitleLevel } from '../title'
import Paragraph from '../paragraph'
import Text from '../text'
import Base, { BaseTypes, BaseType } from '../base'
import mountTest from '../../../tests/shared/mountTest'

describe('Typography', () => {
  // 1.mount test
  describe('1.mount test', () => {
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
  })

  // 2.render test
  describe('2.render test', () => {
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
  })

  // 3.warns in component
  describe('3.render no child without errors', () => {
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
  })

  // 4. render null or undefined without errors
  describe('4. render null or undefined without errors', () => {
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
  })

  // 5. displayName
  describe('5. displayName', () => {
    it('should have displayName static property', () => {
      const wrapper = mount(<Typography>Typography</Typography>)
      expect((wrapper.type() as any).displayName).toBe('Typography')
    })
  })

  // 6. class state
  describe('6. class state', () => {
    it('should class use right', () => {
      BaseTypes.forEach((type) => {
        const TestText = mount(<Text type={type}>Text</Text>)
        expect(TestText.find(`.kd-typography`)).toHaveClassName(`.kd-typography-${type}`)
        const TestTitle = mount(<Title type={type}>Text</Title>)
        expect(TestTitle.find(`.kd-typography`)).toHaveClassName(`.kd-typography-${type}`)
        const TestParagraph = mount(<Paragraph type={type}>Text</Paragraph>)
        expect(TestParagraph.find(`.kd-typography`)).toHaveClassName(`.kd-typography-${type}`)
      })

      // disable
      const DisableText = mount(<Text disabled>Text</Text>)
      expect(DisableText.find(`.kd-typography`)).toHaveClassName('kd-typography-disabled')
      const DisableTitle = mount(<Title disabled>Text</Title>)
      expect(DisableTitle.find(`.kd-typography`)).toHaveClassName('kd-typography-disabled')
      const DisableParagraph = mount(<Paragraph disabled>Text</Paragraph>)
      expect(DisableParagraph.find(`.kd-typography`)).toHaveClassName('kd-typography-disabled')

      // mark
      const MarkText = mount(<Text mark>mark</Text>)
      expect(MarkText.find(`.kd-typography`)).toContainReact(<mark>mark</mark>)
      const MarkTitle = mount(<Title mark>mark</Title>)
      expect(MarkTitle.find(`.kd-typography`)).toContainReact(<mark>mark</mark>)
      const MarkParagraph = mount(<Paragraph mark>mark</Paragraph>)
      expect(MarkParagraph.find(`.kd-typography`)).toContainReact(<mark>mark</mark>)

      // code
      const CodeText = mount(<Text code>code</Text>)
      expect(CodeText.find(`.kd-typography`)).toContainReact(<code>code</code>)
      const CodeTitle = mount(<Title code>code</Title>)
      expect(CodeTitle.find(`.kd-typography`)).toContainReact(<code>code</code>)
      const CodeParagraph = mount(<Paragraph code>code</Paragraph>)
      expect(CodeParagraph.find(`.kd-typography`)).toContainReact(<code>code</code>)

      // keyboard
      const KeyboardText = mount(<Text keyboard>keyboard</Text>)
      expect(KeyboardText.find(`.kd-typography`)).toContainReact(<kbd>keyboard</kbd>)
      const KeyboardTitle = mount(<Title keyboard>keyboard</Title>)
      expect(KeyboardTitle.find(`.kd-typography`)).toContainReact(<kbd>keyboard</kbd>)
      const KeyboardParagraph = mount(<Paragraph keyboard>keyboard</Paragraph>)
      expect(KeyboardParagraph.find(`.kd-typography`)).toContainReact(<kbd>keyboard</kbd>)

      // underline
      const UnderlineText = mount(<Text underline>underline</Text>)
      expect(UnderlineText.find(`.kd-typography`)).toContainReact(<u>underline</u>)
      const UnderlineTitle = mount(<Title underline>underline</Title>)
      expect(UnderlineTitle.find(`.kd-typography`)).toContainReact(<u>underline</u>)
      const UnderlineParagraph = mount(<Paragraph underline>underline</Paragraph>)
      expect(UnderlineParagraph.find(`.kd-typography`)).toContainReact(<u>underline</u>)

      // delete
      const DeleteText = mount(<Text delete>delete</Text>)
      expect(DeleteText.find(`.kd-typography`)).toContainReact(<del>delete</del>)
      const DeleteTitle = mount(<Title delete>delete</Title>)
      expect(DeleteTitle.find(`.kd-typography`)).toContainReact(<del>delete</del>)
      const DeleteParagraph = mount(<Paragraph delete>delete</Paragraph>)
      expect(DeleteParagraph.find(`.kd-typography`)).toContainReact(<del>delete</del>)

      // strong
      const StrongText = mount(<Text strong>strong</Text>)
      expect(StrongText.find(`.kd-typography`)).toContainReact(<strong>strong</strong>)
      const StrongParagraph = mount(<Paragraph strong>strong</Paragraph>)
      expect(StrongParagraph.find(`.kd-typography`)).toContainReact(<strong>strong</strong>)

      // italic
      const ItalicText = mount(<Text italic>italic</Text>)
      expect(ItalicText.find(`.kd-typography`)).toContainReact(<i>italic</i>)
      const ItalicTitle = mount(<Title italic>italic</Title>)
      expect(ItalicTitle.find(`.kd-typography`)).toContainReact(<i>italic</i>)
      const ItalicParagraph = mount(<Paragraph italic>italic</Paragraph>)
      expect(ItalicParagraph.find(`.kd-typography`)).toContainReact(<i>italic</i>)
    })
  })

  // 7.component interaction(event)
  describe('7.component interaction(event)', () => {
    it('should clickable ', () => {
      const onClickText = jest.fn()
      const wrapperText = mount(<Text onClick={onClickText}>Text</Text>)
      wrapperText.simulate('click')
      const onClickTitle = jest.fn()
      const wrapperTitle = mount(<Title onClick={onClickTitle}>Title</Title>)
      wrapperTitle.simulate('click')
      const onClickParagraph = jest.fn()
      const wrapperParagraph = mount(<Paragraph onClick={onClickParagraph}>Paragraph</Paragraph>)
      wrapperParagraph.simulate('click')
      expect(onClickText).toHaveBeenCalled()
      expect(onClickTitle).toHaveBeenCalled()
      expect(onClickParagraph).toHaveBeenCalled()
    })
  })
  // 8.config provider
  describe('8.config provider', () => {
    it('should config use config provider', () => {
      const ref = React.createRef()
      const typographyConfig = {
        compDefaultProps: {
          Typography: {
            ref: ref,
          },
        },
      }
      mount(
        <ConfigProvider value={typographyConfig}>
          <Typography />
        </ConfigProvider>,
      )
      expect(ref.current instanceof HTMLElement).toBe(true)
    })
  })

  // 9.ref test
  it('should get button element from ref', () => {
    const ref = React.createRef()
    mount(<Typography ref={ref}></Typography>)
    expect(ref.current instanceof HTMLElement).toBe(true)
  })
  // 10.api test
})
