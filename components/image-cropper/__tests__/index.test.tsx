import React from 'react'
import { render, mount } from 'enzyme'
import ImageCropper from '../index'
import mountTest from '../../../tests/shared/mountTest'
import { simulateEvent } from '../../../tests/shared/simulateEvent'

describe('ImageCropper', () => {
  // 1.mount test
  mountTest(ImageCropper)

  // 2.render test
  it('renders correctly', () => {
    expect(render(<ImageCropper visible={true} getContainer={false} />)).toMatchSnapshot()
  })

  // 3. render no child without errors
  it('render no child without errors', () => {
    expect(mount(<ImageCropper visible={true}></ImageCropper>)).toMatchSnapshot()
  })

  // 4. render null or undefined without errors
  it('render null or undefined ImageCropper without errors', () => {
    expect(
      mount(
        <ImageCropper visible={true}>
          {null}
          {undefined}
        </ImageCropper>,
      ),
    ).toMatchSnapshot()
  })

  // 5. displayName
  it('should have displayName static property', () => {
    const wrapper = mount(<ImageCropper visible={true} />)
    expect((wrapper.type() as any).displayName).toBe('ImageCropper')
  })

  // 7.component interaction(event)
  it('onClose', () => {
    const onClose = jest.fn()
    const wrapper = mount(
      <ImageCropper
        visible={true}
        title="拖拽图片"
        image="https://webstatic.mihoyo.com/ys/event/e20210721-fab/images/1.f6ed965b.jpg"
        getContainer={false}
        onClose={onClose}
      />,
    )
    simulateEvent(document.body, 'keydown', {
      key: 'Escape',
    })
    wrapper.update()
    expect(onClose).toHaveBeenCalled()
  })
})
