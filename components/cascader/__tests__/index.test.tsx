import React from 'react'
import { render, mount } from 'enzyme'
import Icon from '../../icon'
import Cascader from '..'
import mountTest from '../../../tests/shared/mountTest'

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
  mountTest(Cascader)

  it('renders correctly', () => {
    expect(render(<Cascader placeholder="Please select" />)).toMatchSnapshot()
    expect(render(<Cascader options={options} placeholder="Please select" />)).toMatchSnapshot()
    expect(render(<Cascader options={options} placeholder="Please select" bordered />)).toMatchSnapshot()
  })

  it('should have displayName static property', () => {
    const wrapper = mount(<Cascader options={options} placeholder="Please select" />)
    expect((wrapper.type() as any).displayName).toBe('Cascader')
  })

  it('should get button element from ref', () => {
    const ref = React.createRef()
    mount(<Cascader options={options} ref={ref} />)
    expect(ref.current instanceof HTMLSpanElement).toBe(true)
  })

  it('set default value', () => {
    const defaultValue = ['guangdong', 'shenzhen', 'nanshan']
    const wrapper = mount(<Cascader options={options} defaultValue={defaultValue} />)
    expect(wrapper.find('.kd-input-wrapper input')).toHaveValue(defaultValue)
    expect(wrapper.find('.kdicon-close-solid')).toExist()
  })

  it('allowClear is unavailabel', () => {
    // eslint-disable-next-line jsx-a11y/no-autofocus
    const wrapper = mount(<Cascader options={options} allowClear={false} autoFocus />)
    expect(wrapper.find('.kdicon-close-solid')).not.toExist()
  })

  it('move enter menu item for expand', () => {
    const wrapper = mount(
      <div ref={wrapperRef}>
        <Cascader
          popupVisible
          changeOnSelect
          options={options}
          expandTrigger="hover"
          getPopupContainer={() => wrapperRef.current}
        />
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

  it('change on select', () => {
    const wrapper = mount(
      <div ref={wrapperRef}>
        <Cascader options={options} getPopupContainer={() => wrapperRef.current} changeOnSelect popupVisible />
      </div>,
    )
    wrapper.find('.kd-cascader-menu').at(0).find('.kd-cascader-menu-item').at(0).simulate('click')
    wrapper.find('.kd-cascader-menu').at(1).find('.kd-cascader-menu-item').at(1).simulate('click')
    expect(wrapper.find('.kd-cascader-picker-label')).toHaveText('Guangdong/Shenzhen')
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
          changeOnSelect
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
          changeOnSelect
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
