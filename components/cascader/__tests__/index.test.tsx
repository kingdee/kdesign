import React from 'react'
import { render, mount } from 'enzyme'
import ConfigProvider from '../../config-provider'
import Icon from '../../icon'
import Cascader from '..'
import mountTest from '../../../tests/shared/mountTest'
import { sleep } from '../../../tests/utils'

const options = [
  {
    value: 'guangdong',
    label: 'Guangdong',
    children: [
      {
        value: 'guangzhou',
        label: 'Guangzhou',
        children: [
          {
            value: 'tianhe',
            label: 'Tian He',
            code: 440106,
          },
          {
            value: 'yuexiu',
            label: 'Yue Xiu',
            code: 440104,
          },
        ],
      },
      {
        value: 'shenzhen',
        label: 'Shenzhen',
        children: [
          {
            value: 'futian',
            label: 'Fu Tian',
            code: 440304,
          },
          {
            value: 'nanshan',
            label: 'Nan Shan',
            code: 440305,
          },
        ],
      },
    ],
  },
  {
    value: 'jiangxi',
    label: 'Jiangxi',
    children: [
      {
        value: 'nanchang',
        label: 'Nanchang',
        children: [
          {
            value: 'donghu',
            label: 'Dong Hu',
            code: 360102,
          },
          {
            value: 'qingshanhu',
            label: 'Qing Shan Hu',
            code: 360111,
          },
        ],
      },
      {
        value: 'ganzhou',
        label: 'Ganzhou',
        children: [
          {
            value: 'zhanggong',
            label: 'Zhang Gong',
            code: 360702,
          },
          {
            value: 'ningdu',
            label: 'Ning Du',
            code: 360730,
          },
        ],
      },
    ],
  },
]

const wrapperRef = React.createRef() as any

describe('Cascader', () => {
  // 1. mount test
  mountTest(Cascader)

  // 2. render test
  it('renders correctly', () => {
    expect(render(<Cascader placeholder="Please select" />)).toMatchSnapshot()
    expect(render(<Cascader options={options} placeholder="Please select" />)).toMatchSnapshot()
    expect(render(<Cascader options={options} placeholder="Please select" bordered />)).toMatchSnapshot()
  })

  // 3. warns in components
  // 4. render null or undefined without errors
  it('render null or undefined without errors', () => {
    expect(
      mount(
        <Cascader>
          {null}
          {undefined}
        </Cascader>,
      ),
    ).toMatchSnapshot()
  })

  // 5.displayName
  it('should have displayName static property', () => {
    const wrapper = mount(<Cascader options={options} placeholder="Please select" />)
    expect((wrapper.type() as any).displayName).toBe('Cascader')
  })

  // 6. API test
  describe('API test', () => {
    it('set default value', () => {
      const defaultValue = ['guangdong', 'shenzhen', 'nanshan']
      const wrapper = mount(<Cascader options={options} defaultValue={defaultValue} />)
      expect(wrapper.find('.kd-input-wrapper input')).toHaveValue(defaultValue)
      expect(wrapper.find('.kdicon-close-solid')).toExist()
    })

    it('set value', () => {
      const value = ['guangdong', 'shenzhen', 'nanshan']
      const wrapper = mount(<Cascader options={options} value={value} />)
      expect(wrapper.find('.kd-input-wrapper input')).toHaveValue(value)
    })

    it('should display value when both value and defaultValue exist', () => {
      const value = ['guangdong', 'shenzhen', 'nanshan']
      const defalutValue = ['jiangxi', 'nanchang', 'donghu']
      const wrapper = mount(<Cascader options={options} value={value} defaultValue={defalutValue} />)
      expect(wrapper.find('.kd-input-wrapper input')).toHaveValue(value)
    })

    it('should not change value when component controlled by `value` props', () => {
      const onChange = jest.fn((value) => {
        expect(value).toEqual(['guangdong', 'guangzhou', 'tianhe'])
      })
      const wrapper = mount(
        <div ref={wrapperRef}>
          <Cascader options={options} getPopupContainer={() => wrapperRef.current} onChange={onChange} popupVisible />
        </div>,
      )
      wrapper.find('.kd-cascader-menu').at(0).find('.kd-cascader-menu-item').at(0).simulate('click') // guangdong guangzhou tianhe
      wrapper.find('.kd-cascader-menu').at(1).find('.kd-cascader-menu-item').at(0).simulate('click')
      wrapper.find('.kd-cascader-menu').at(2).find('.kd-cascader-menu-item').at(0).simulate('click')
      expect(wrapper.find('.kd-cascader-picker-label')).toHaveText('Guangdong/Guangzhou/Tian He')
    })

    // it('should not change value when component controlled by `value` props', () => {
    //   const onChange = jest.fn((value) => {
    //     expect(value).toEqual(['guangdong', 'guangzhou', 'tianhe'])
    //   })
    //   const wrapper = mount(
    //     <div ref={wrapperRef}>
    //       <Cascader
    //         options={options}
    //         value={['guangdong', 'shenzhen', 'nanshan']}
    //         getPopupContainer={() => wrapperRef.current}
    //         onChange={onChange}
    //         popupVisible
    //       />
    //     </div>,
    //   )
    //   wrapper.find('.kd-cascader-menu').at(0).find('.kd-cascader-menu-item').at(0).simulate('mouseenter') // guangdong guangzhou tianhe
    //   wrapper.find('.kd-cascader-menu').at(1).find('.kd-cascader-menu-item').at(0).simulate('mouseenter')
    //   wrapper.find('.kd-cascader-menu').at(2).find('.kd-cascader-menu-item').at(0).simulate('click')
    //   expect(wrapper.find('.kd-cascader-picker-label')).toHaveText('Guangdong/Shenzhen/Nan Shan')
    // })

    it('maxTag & maxTagPlaceholder', () => {
      const maxTagPlaceholder = jest.fn((omittedValues) => {
        return `一共${omittedValues.length}项`
      })
      const wrapper = mount(
        <Cascader
          options={options}
          value={[['nanshan'], ['futian']]}
          maxTagPlaceholder={maxTagPlaceholder}
          maxTagCount={1}
          mode="multiple"
        />,
      )
      expect(wrapper.find('.kd-tag-ellipsis').at(0)).toHaveText('Nan Shan')
      expect(wrapper.find('.kd-tag-ellipsis').at(1)).not.toHaveText('Fu Tian')

      expect(wrapper.find('.kd-tag-ellipsis').at(1)).toHaveText('一共2项')
    })

    it('notFoundContent is useful', () => {
      const wrapper = mount(
        <div ref={wrapperRef}>
          <Cascader options={[]} notFoundContent="暂无数据" popupVisible getPopupContainer={() => wrapperRef.current} />
        </div>,
      )
      expect(wrapper.find('.kd-empty-description')).toHaveText('暂无数据')
    })

    it('allowClear is useful', () => {
      const wrapper = mount(<Cascader options={options} />)
      expect(wrapper.find('.kdicon-close-solid')).not.toExist()
      wrapper.setProps({ value: ['tianhe'] })
      wrapper.update()
      wrapper.simulate('mouseenter')
      expect(wrapper.find('.kdicon-close-solid')).toExist()
    })

    // autoFocus is useful to do here

    it('move enter menu item for expand', () => {
      const wrapper = mount(
        <div ref={wrapperRef}>
          <Cascader popupVisible options={options} expandTrigger="hover" getPopupContainer={() => wrapperRef.current} />
        </div>,
      )
      wrapper.find('.kd-cascader-menu').at(0).find('.kd-cascader-menu-item').at(0).simulate('mouseenter')
      wrapper.find('.kd-cascader-menu').at(1).find('.kd-cascader-menu-item').at(1).simulate('mouseenter')
      wrapper.find('.kd-cascader-menu').at(2).find('.kd-cascader-menu-item').at(1).simulate('click')
      expect(wrapper.find('.kd-cascader-picker-label')).toHaveText('Guangdong/Shenzhen/Nan Shan')
    })

    it('custom render', () => {
      const children = <a href="true">Change city</a>
      const wrapper = mount(<Cascader options={options}>{children}</Cascader>)
      expect(wrapper.find('.kd-cascader-picker')).toContainReact(children)
    })

    it('options disabled', () => {
      const options = [
        {
          value: 'jiangxi',
          label: 'Jiangxi',
          disabled: true,
          children: [
            {
              value: 'nanchang',
              label: 'Nanchang',
            },
          ],
        },
      ]

      const wrapper = mount(
        <div ref={wrapperRef}>
          <Cascader options={options} getPopupContainer={() => wrapperRef.current} popupVisible />
        </div>,
      )
      expect(wrapper.find('.kd-cascader-menu-item')).toHaveClassName('disabled')
    })

    it('changeOnSelect is useful', () => {
      const onChange = jest.fn((value) => {
        expect(value).toEqual(['guangdong'])
      })
      const wrapper = mount(
        <div ref={wrapperRef}>
          <Cascader
            options={options}
            getPopupContainer={() => wrapperRef.current}
            onChange={onChange}
            changeOnSelect
            popupVisible
          />
        </div>,
      )
      wrapper.find('.kd-cascader-menu').at(0).find('.kd-cascader-menu-item').at(0).simulate('click')
    })

    it('label text custom render ', () => {
      const displayRender = (labels: string[], selectedOptions: any[]) =>
        labels.map((label, i) => {
          const option = selectedOptions[i]
          if (i === labels.length - 1) {
            return (
              <span key={option.value}>
                {label} ({option.code})
              </span>
            )
          }
          return <span key={option.value}>{label} / </span>
        })
      const wrapper = mount(
        <Cascader
          options={options}
          defaultValue={['guangdong', 'shenzhen', 'nanshan']}
          displayRender={displayRender}
          style={{ width: 400 }}
          placeholder="Please select"
        />,
      )
      expect(wrapper.find('.kd-cascader-picker-label')).toHaveText('Guangdong / Shenzhen / Nan Shan (440305)')
    })

    it('dynamic load options', () => {
      const optionLists = [
        {
          value: 'guangdong',
          label: 'Guangdong',
          isLeaf: false,
        },
        {
          value: 'jiangxi',
          label: 'Jiangxi',
          isLeaf: false,
        },
      ]

      const LazyOptions = () => {
        const [options, setOptions] = React.useState(optionLists)

        const loadData = (selectedOptions: any[]) => {
          const targetOption = selectedOptions[selectedOptions.length - 1]
          targetOption.loading = true
          setTimeout(() => {
            targetOption.loading = false
            targetOption.children = [
              {
                label: `${targetOption.label} Dynamic 1`,
                value: 'dynamic1',
              },
              {
                label: `${targetOption.label} Dynamic 2`,
                value: 'dynamic2',
              },
            ]
            setOptions([...options])
          }, 1000)
        }

        return (
          <div ref={wrapperRef}>
            <Cascader
              popupVisible
              changeOnSelect
              options={options}
              loadData={loadData}
              getPopupContainer={() => wrapperRef.current}
            />
          </div>
        )
      }
      const wrapper = mount(<LazyOptions />)
      wrapper.find('.kd-cascader-menu').at(0).find('.kd-cascader-menu-item').at(1).simulate('click')
      setTimeout(() => {
        wrapper.find('.kd-cascader-menu').at(1).find('.kd-cascader-menu-item').at(1).simulate('click')
        expect(wrapper.find('.kd-cascader-picker-label')).toHaveText('Jiangxi/Jiangxi Dynamic 2')
      }, 1000)
    })

    it('custom fields name', () => {
      const options = [
        {
          code: 'guangdong',
          name: 'Guangdong',
          items: [
            {
              code: 'guangzhou',
              name: 'Guangzhou',
              items: [
                {
                  code: 'tianhe',
                  name: 'Tian He',
                },
              ],
            },
          ],
        },
      ]
      const wrapper = mount(
        <div ref={wrapperRef}>
          <Cascader
            popupVisible
            options={options}
            getPopupContainer={() => wrapperRef.current}
            fieldNames={{ label: 'name', value: 'code', children: 'items' }}
          />
        </div>,
      )
      wrapper.find('.kd-cascader-menu').at(0).find('.kd-cascader-menu-item').at(0).simulate('click')
      wrapper.find('.kd-cascader-menu').at(1).find('.kd-cascader-menu-item').at(0).simulate('click')
      wrapper.find('.kd-cascader-menu').at(2).find('.kd-cascader-menu-item').at(0).simulate('click')
      expect(wrapper.find('.kd-cascader-picker-label')).toHaveText('Guangdong/Guangzhou/Tian He')
    })

    it('custom icons', () => {
      const wrapper = mount(
        <div ref={wrapperRef}>
          <Cascader
            popupVisible
            options={options}
            suffixIcon={<Icon type="star" />}
            expandIcon={<Icon type="star" />}
            getPopupContainer={() => wrapperRef.current}
          />
        </div>,
      )
      expect(wrapper.find('.kd-cascader-picker').find('.kdicon-star')).toExist()
      expect(wrapper.find('.kd-cascader-menus').find('.kdicon-star')).toExist()
    })

    it('expanded menu', () => {
      const extraElement = <div style={{ padding: 8 }}>The footer is not very short.</div>
      function dropdownRender(menus: React.ReactElement) {
        return (
          <div>
            {menus}
            {extraElement}
          </div>
        )
      }

      const wrapper = mount(
        <div ref={wrapperRef}>
          <Cascader
            popupVisible
            options={options}
            dropdownRender={dropdownRender}
            getPopupContainer={() => wrapperRef.current}
          />
        </div>,
      )
      expect(wrapper.find('.kd-cascader-menus')).toContainReact(extraElement)
    })
  })

  // 7. class or style state
  it('class or style state', () => {
    // mode
    const wrapper = mount(<Cascader options={options} bordered data-test="test" disabled mode="multiple" />)
    expect(wrapper.find('.kd-cascader-multiple')).toHaveClassName('kd-cascader-bordered')
    expect(wrapper.find('.kd-cascader-multiple')).toHaveClassName('kd-cascader-disabled')
    expect(wrapper.find('.kd-cascader-multiple').prop('data-test')).toEqual('test')
    const wrapperSingle = mount(<Cascader options={options} data-test="test" bordered disabled />)
    expect(wrapperSingle.find('.kd-input-wrapper')).not.toHaveClassName('kd-input-wrapper-underline')
    expect(wrapperSingle.find('.kd-input-wrapper')).toHaveClassName('kd-input-wrapper-disabled')
    expect(wrapperSingle.find('.kd-cascader-picker').prop('data-test')).toEqual('test')
  })

  // 8. component interaction(event)
  // 9. config provider
  it('config provider', () => {
    const cascaderConfig = {
      compDefaultProps: {
        Cascader: {
          mode: 'multiple',
        },
      },
    }
    const wrapper = mount(
      <ConfigProvider value={cascaderConfig}>
        <Cascader></Cascader>
      </ConfigProvider>,
    )
    expect(wrapper.find('.kd-cascader-multiple')).toExist()
  })
  // 10. ref test
  // 11. special case
  describe('special case', () => {
    it('disabled operate', async () => {
      const ref: any = React.createRef()
      const onOpenChange = jest.fn()
      const wrapper = mount(
        <div ref={ref}>
          <Cascader
            options={options}
            disabled
            onPopperVisibleChange={onOpenChange}
            getPopupContainer={() => ref.current}
          />
        </div>,
      )

      expect(wrapper.find('.kd-cascader-menus').length).toEqual(0)
      wrapper.find('.kd-cascader-picker').simulate('mouseup')
      await sleep(100)
      expect(ref.current.querySelectorAll('.kd-cascader-menus').length).toEqual(0)
    })
  })
})
