import React from 'react'
import { render, mount } from 'enzyme'
import mountTest from '../../../tests/shared/mountTest'
import Progress, { ProgressType } from '../index'
import { ProgressTypes, ProgressStatuses } from '../progress'
import ConfigProvider from '../../config-provider/index'

describe('Progress', () => {
  // 1.mount test
  mountTest(Progress)

  ProgressTypes.forEach((type) => {
    mountTest(() => <Progress type={type} />)
  })

  // 2.render test
  it('renders correctly', () => {
    ProgressTypes.forEach((type) => {
      expect(render(<Progress type={type} />)).toMatchSnapshot()
    })

    ProgressStatuses.forEach((status) => {
      expect(render(<Progress status={status} />)).toMatchSnapshot()
    })
  })
  // 3.render no child without errors
  it('render no child without errors', () => {
    expect(mount(<Progress />)).toMatchSnapshot()
  })

  // 4.render null or undefined without errors
  it('render null or undefined without errors', () => {
    expect(
      mount(
        <Progress>
          {null}
          {undefined}
        </Progress>,
      ),
    ).toMatchSnapshot()
  })

  // 5.displayName
  it('should have displayName static property', () => {
    const wrapper = mount(<Progress></Progress>)
    expect((wrapper.type() as any).displayName).toBe('Progress')
  })

  // 6. warn test
  it('warns if type is wrong', () => {
    const mockWarn = jest.fn()
    jest.spyOn(console, 'warn').mockImplementation(mockWarn)
    const type = 'Wrong Type' as any as ProgressType
    render(<Progress type={type} />)
    expect(mockWarn).toHaveBeenCalledTimes(1)
    expect(mockWarn.mock.calls[0][0]).toMatch("Warning: [kdesign]-progress: cannot found progress type 'Wrong Type'")
  })

  it('warns if width use wrong', () => {
    const mockWarn = jest.fn()
    jest.spyOn(console, 'warn').mockImplementation(mockWarn)
    render(<Progress width={10} />)
    expect(mockWarn).toHaveBeenCalledTimes(1)
    expect(mockWarn.mock.calls[0][0]).toMatch(
      'Warning: [kdesign]-progress: props width only effect when type is circle',
    )
  })
  // 7.class state
  it('should class use right', () => {
    const DefaultProgress = mount(<Progress />)
    expect(DefaultProgress.find('.kd-progress')).toHaveClassName('.kd-progress-status-normal')
    expect(DefaultProgress.find('.kd-progress')).toHaveClassName('.kd-progress-show-info')

    ProgressTypes.forEach((type) => {
      const TestProgress = mount(<Progress type={type} />)
      expect(TestProgress.find('.kd-progress')).toHaveClassName(`.kd-progress-type-${type}`)
    })

    ProgressStatuses.forEach((status) => {
      const TestProgress = mount(<Progress status={status} />)
      expect(TestProgress.find('.kd-progress')).toHaveClassName(`.kd-progress-status-${status}`)
    })
  })
  // 8.api
  it('should props width render right', () => {
    const TestProgress = mount(<Progress type="circle" width={100} />)
    expect(TestProgress.find('.kd-progress-circle-box')).toHaveStyle('width', '100px')
  })
  // percent
  it('should props percent render right', () => {
    const TestProgress = mount(<Progress percent={30} />)
    expect(TestProgress.find('.kd-progress-bg')).toHaveStyle('width', '30%')
  })
  // strokeWidth
  it('should props strokeWidth render right', () => {
    const TestProgress = mount(<Progress percent={30} strokeWidth={10} />)
    expect(TestProgress.find('.kd-progress-bg')).toHaveStyle('height', '10px')
  })
  // strokeColor
  it('should props strokeColor render right', () => {
    const TestProgress = mount(<Progress percent={30} strokeColor="#333" />)
    expect(TestProgress.find('.kd-progress-bg')).toHaveStyle('background', '#333')
  })
  // trailColor
  it('should props trailColor render right', () => {
    const TestProgress = mount(<Progress percent={30} trailColor="#333" />)
    expect(TestProgress.find('.kd-progress-inner')).toHaveStyle('backgroundColor', '#333')
  })
  // showInfo
  it('should props showInfo render right', () => {
    const LineProgress = mount(<Progress percent={30} showInfo={false} />)
    const CircleProgress = mount(<Progress type="circle" percent={30} showInfo={false} />)
    expect(LineProgress).not.toContainMatchingElement('.kd-progress-text')
    expect(CircleProgress).not.toContainMatchingElement('.kd-progress-special-text')
  })

  it("should progress's default text render right with infoPosition set", () => {
    const loadingProgress = mount(<Progress percent={30} infoPosition="bottom" />)
    const successProgress = mount(<Progress percent={100} infoPosition="bottom" />)
    const failureProgress = mount(<Progress percent={30} infoPosition="bottom" status="failure" />)
    expect(loadingProgress).toHaveText('正在加载中...')
    expect(successProgress).toHaveText('加载成功')
    expect(failureProgress).toHaveText('加载失败')
  })
  it('should props textMap render right', () => {
    const loadingDom = (
      <>
        <span style={{ float: 'left', textAlign: 'left' }}>loading...</span>
        <span style={{ float: 'right', textAlign: 'right' }}>30%</span>
      </>
    )
    const TestProgress = mount(<Progress percent={30} infoPosition="bottom" textMap={[loadingDom]} />)
    expect(TestProgress.find('.kd-progress-special-text').exists()).toBe(true)
    expect(TestProgress).toHaveText('loading...30%')
  })

  it('should gradient progress which type is circle render right', () => {
    const TestProgress = mount(
      <Progress
        type="circle"
        percent={30}
        strokeColor={{
          '0%': '#108ee9',
          '100%': '#87d068',
        }}
      />,
    )
    expect(TestProgress).toContainMatchingElement('linearGradient')
  })
  // test format
  it('should props format render right', () => {
    const TestProgress = mount(<Progress percent={30} type="circle" format={(percent) => `${percent} days`} />)
    expect(TestProgress.find('.kd-progress-text')).toHaveText('30 days')
  })
  // test onProcess callback
  it('should onProcess called when percent change', () => {
    const onProcessMock = jest.fn()
    const TestProgress = mount(<Progress percent={30} onProcess={onProcessMock} />)
    TestProgress.setProps({ percent: 40 })
    expect(onProcessMock).toHaveBeenCalled()
  })

  // 9.config provider
  it('should config use config provider', () => {
    const localeData = {
      'Progress.circleLoadingDesc': 'loading',
    }
    const searchConfig = {
      compDefaultProps: {
        Progress: {
          type: 'circle',
          percent: 50,
        },
      },
      localeConfig: { localeData, locale: 'zh-EN' },
    }
    const wrapper = mount(
      <ConfigProvider value={searchConfig}>
        <Progress />
      </ConfigProvider>,
    )
    expect(wrapper.find('.kd-progress')).toHaveClassName('.kd-progress-type-circle')
    expect(wrapper.find('.kd-progress-text-percent').text()).toBe('50')
    expect(wrapper.find('.kd-progress-special-text').text()).toBe('loading')
  })

  // 10. ref test
  // no ref,can't test
  // it('should get Demo element from ref', () => {
  //   const ref = React.createRef()
  //   mount(<Progress ref={ref} type="line" />)
  //   expect(ref.current instanceof HTMLElement).toBe(true)
  //   expect((ref.current as HTMLElement).classList.contains('kd-progress-type-line')).toBe(true)
  // })
})
