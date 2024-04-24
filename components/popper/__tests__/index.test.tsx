import React from 'react'
import { mount } from 'enzyme'
// import { render, screen } from '@testing-library/react'
// import userEvent from '@testing-library/user-event'
// import '@testing-library/jest-dom'
import Popper from '../index'
import Input from '../../input'
import { popperPlacementMap } from '../../popper'
import mountTest from '../../../tests/shared/mountTest'
import { sleep } from '../../../tests/utils'
import { act } from 'react-dom/test-utils'

// window.MutationObserver = require('mutation-observer')
// describe('Popper test visible', () => {
//   beforeEach(() => {
//     ;(window as any).document.getSelection = jest.fn(() => {
//       return {
//         removeAllRanges: jest.fn(),
//       }
//     })
//   })
//
//   it('calls onVisibleChange when visibility is toggled', async () => {
//     let visible = false
//     const onVisibleChange = jest.fn((v) => {
//       visible = v
//     })
//
//     const user = userEvent.setup()
//     const { container } = render(
//       <Popper onVisibleChange={onVisibleChange} trigger={'click'} tip={<div>tip</div>}>
//         <button>Content</button>
//       </Popper>,
//     )
//     const btn = await screen.findByText('Content')
//
//     await user.click(btn)
//     await sleep(300)
//     expect(await screen.findByText('tip')).toBeTruthy()
//     expect(visible).toEqual(true)
//     expect(container).toMatchSnapshot()
//     expect(onVisibleChange).toHaveBeenCalled()
//     await user.click(btn)
//     await sleep(300)
//     expect(visible).toBe(false)
//   })
// })

describe('Popper', () => {
  // 1. mount test
  mountTest(Popper)

  // 2. render test
  it('render Test', () => {
    const wrapper = mount(
      <Popper tip={<span>text</span>}>
        <span>text</span>
      </Popper>,
    )
    expect(wrapper).toMatchSnapshot()
  })
  // 3. warns in components
  // 4. render null or undefined without errors
  it('render null or undefined without errors', () => {
    expect(
      mount(
        <Popper>
          {null}
          {undefined}
        </Popper>,
      ),
    ).toMatchSnapshot()
  })

  // 5. displayName
  it('should have displayName static property', () => {
    const wrapper = mount(
      <Popper tip="tips text">
        <span>text</span>
      </Popper>,
    )
    expect((wrapper.type() as any).displayName).toBe('Popper')
  })

  // 6. API test
  describe('API test', () => {
    it('arrow is useful', () => {
      const wrapperRef: any = React.createRef()
      const wrapper = mount(
        <div ref={wrapperRef}>
          <Popper tip="test" arrow defaultVisible getPopupContainer={() => wrapperRef.current}>
            <span>text</span>
          </Popper>
        </div>,
      )
      expect(wrapper.find('.kd-popper').find('[data-popper-arrow]')).toHaveClassName('arrow')
    })

    it('defaultVisible & visible', async () => {
      const wrapper = mount(
        <Popper defaultVisible visible={false} tip="test" arrow trigger={'click'}>
          <div className={'kd-test'}>text</div>
        </Popper>,
      )

      expect(wrapper.find('.kd-popper').length).toEqual(0)
      wrapper.setProps({ visible: true })
      wrapper.update()
      expect(wrapper.find('.kd-popper').length).toEqual(1)
    })

    it('getTriggerElement is useful', async () => {
      const ref: any = React.createRef()
      const triggerRef: any = React.createRef()
      const wrapper = mount(
        <div ref={ref}>
          <button ref={triggerRef}>test</button>
          <Popper
            defaultVisible
            getTriggerElement={() => triggerRef.current}
            tip="tips text"
            getPopupContainer={() => ref.current}
          >
            <span className="kd-test-trigger">text</span>
          </Popper>
        </div>,
      )
      act(() => {
        triggerRef.current.click()
      })
      await sleep(300)
      expect(wrapper).toMatchSnapshot()
    })

    it('popperClassName & popperStyle is useful', () => {
      const ref: any = React.createRef()
      const wrapper = mount(
        <Popper
          tip="text"
          defaultVisible
          popperStyle={{ color: 'red' }}
          popperClassName="test"
          getPopupContainer={() => ref.current}
        >
          <span>text</span>
        </Popper>,
      )
      expect(wrapper.find('.kd-popper-top')).toHaveClassName('test')
      expect(wrapper.find('.kd-popper-top')).toHaveStyle({ color: 'red' })
    })

    it('className & placement is useful', () => {
      Object.entries(popperPlacementMap).forEach(([key, value]: any) => {
        const wrapper = mount(
          <Popper tip="text" defaultVisible placement={key} className={'my-popper'}>
            <span>text</span>
          </Popper>,
        )
        expect(wrapper.find('.my-popper').at(1)).toHaveClassName(`kd-popper-${value}`)
      })
    })

    it('trigger Popper', async () => {
      const content = 'tips text'
      const ref = React.createRef() as any
      const wrapper = mount(
        <div ref={ref}>
          <Popper tip={content} defaultVisible getPopupContainer={() => ref.current}>
            <span className="kd-test-trigger">text</span>
          </Popper>
        </div>,
      )

      wrapper.find('.kd-test-trigger').simulate('mouseleave')
      await sleep(300)
      expect(wrapper.find('.kd-popper').length).toBeTruthy()
    })
  })

  // 7. poperClass popperStyle
  it('should poperClass popperStyle useful', () => {
    const ref: any = React.createRef()
    const wrapper = mount(
      <div ref={ref}>
        <Popper
          tip="test"
          defaultVisible
          popperClassName="test"
          popperStyle={{ color: 'red' }}
          getPopupContainer={() => ref.current}
        >
          <div>test</div>
        </Popper>
      </div>,
    )
    expect(wrapper.find('.kd-popper-top')).toHaveClassName('test')
    expect(wrapper.find('.kd-popper-top')).toHaveStyle({ color: 'red' })
  })

  // 8. component interaction(event)
  it('component interaction(event)', async () => {
    const onTrigger = jest.fn()
    const onVisibleChange = jest.fn()
    const ref: any = React.createRef()
    const wrapper = mount(
      <Popper ref={ref} defaultVisible tip="tip text" onVisibleChange={onVisibleChange} onTrigger={onTrigger}>
        <div className={'kd-test-event'}>text</div>
      </Popper>,
    )
    expect(wrapper.find('.kd-test-event').length).toEqual(1)
    act(() => {
      ref.current.triggerOpen(false)
    })
    expect(onVisibleChange).toBeCalled()
    act(() => {
      ref.current.triggerOpen(true, 'hover', 0)
    })
    expect(onTrigger).toBeCalled()
  })

  // 9. config Provider
  // 10. ref test
  it('ref  is useful ', async () => {
    const ref: any = React.createRef()
    const wrapper = mount(
      <Popper ref={ref} defaultVisible tip="tip text" trigger={'click'}>
        <div className={'kd-test'}>text</div>
      </Popper>,
    )
    expect(wrapper.find('.kd-test').length).toEqual(1)
    act(() => {
      ref.current.triggerOpen(false)
    })
    await sleep(100)
    expect(ref.current.visible).toEqual(false)
    expect(wrapper).toMatchSnapshot()
  })

  // 11. special case
  describe('special case', () => {
    it('测试ref返回值不为dom元素', () => {
      const wrapper = mount(
        <Popper tip="tips text">
          <Input borderType="bordered" prefix="KDesign" suffix="Kdesign" />
        </Popper>,
      )
      expect(wrapper).toMatchSnapshot()
    })
  })
})
