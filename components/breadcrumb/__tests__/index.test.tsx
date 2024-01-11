import { mount, render } from 'enzyme'
import React from 'react'
import mountTest from '../../../tests/shared/mountTest'
import ConfigProvider from '../../config-provider/index'
import { ColorModelTypes, IBreadcrumbItem } from '../interface'
import Breadcrumb from '../index'
import Icon from '../../icon'

const config = [
  {
    title: 'KDesign',
    href: 'https://kingdee.design/',
  },
  {
    title: 'KDesign React',
    href: 'https://react.kingdee.design/',
  },
  {
    title: 'Breadcrumb',
  },
]

const iconConfig = [
  {
    title: 'KDesign',
    href: 'https://kingdee.design/',
    icon: <Icon type="star" />,
  },
  {
    title: 'KDesign React',
    href: 'https://react.kingdee.design/',
  },
  {
    title: 'Breadcrumb',
  },
]

const errorConfig = [
  {
    title: 'KDesign',
    href: 'https://kingdee.design/',
    path: 'kd/main',
  },
  {
    title: 'KDesign React',
    href: 'https://react.kingdee.design/',
    path: 'kd/main',
  },
  {
    title: 'Breadcrumb',
  },
]

describe('Breadcrumb', () => {
  // 1. mount test
  describe('1. mount test', () => {
    mountTest(Breadcrumb)
    ColorModelTypes.forEach((type) => {
      mountTest(() => <Breadcrumb items={config} colorModel={type} />)
    })
  })

  // 2. render test
  describe('2. render test', () => {
    it('renders correctly', () => {
      expect(render(<Breadcrumb items={config} />)).toMatchSnapshot()

      ColorModelTypes.forEach((type) => {
        expect(render(<Breadcrumb items={config} colorModel={type} />)).toMatchSnapshot()
      })
    })
  })

  // 3. warns in component
  describe('3. warns in component', () => {
    it('warns if href and path coexist', () => {
      const mockWarn = jest.fn()
      jest.spyOn(console, 'warn').mockImplementation(mockWarn)
      const wrapper = mount(<Breadcrumb items={errorConfig} />)
      wrapper.find('.kd-breadcrumb-item').at(0).simulate('click')
      expect(mockWarn).toHaveBeenCalledTimes(1)
      expect(mockWarn.mock.calls[0][0]).toMatch(
        'Warning: [kdesign]-breadcrumb: `href` and `path` not coexist  within the `item` object',
      )
    })
  })

  // 4. render null or undefined without errors
  describe('4. render null or undefined without errors', () => {
    it('render null or undefined without errors', () => {
      const wrapper = (
        <Breadcrumb items={config}>
          {null}
          {undefined}
        </Breadcrumb>
      )
      expect(wrapper).toMatchSnapshot()
    })
  })

  // 5. displayName
  describe('5. displayName', () => {
    it('should have displayName static property', () => {
      expect(Breadcrumb.displayName).toBe('Breadcrumb')
    })
  })

  // 6. class state
  describe('6. class state', () => {
    it('other properties should be passed', () => {
      const wrapper = mount(
        <Breadcrumb items={config} className="my-class" data-test="test">
          hello world
        </Breadcrumb>,
      )
      expect(wrapper).toHaveClassName('my-class')
      expect(wrapper.prop('data-test')).toEqual('test')

      const defaultBreadcrumb = mount(<Breadcrumb items={config} />)
      expect(defaultBreadcrumb.find('.kd-breadcrumb-item')).toHaveLength(3)
      expect(defaultBreadcrumb.find('.kd-breadcrumb-item').at(0).childAt(0)).toHaveClassName('kd-breadcrumb-item-text')
      expect(defaultBreadcrumb.find('.kd-breadcrumb-item').at(0).childAt(1)).toHaveClassName(
        'kd-breadcrumb-item-separator',
      )
      expect(defaultBreadcrumb.find('.kd-breadcrumb-item-link')).toExist()
      expect(defaultBreadcrumb.find('.kd-breadcrumb-item').at(0)).toHaveClassName('kd-breadcrumb-item-emphasize-model')
      expect(defaultBreadcrumb.find('.kd-breadcrumb-item').at(2)).toHaveClassName(
        'kd-breadcrumb-item-emphasize-model-current',
      )

      const weakenBreadcrumb = mount(<Breadcrumb items={config} colorModel="weaken" />)
      expect(weakenBreadcrumb.find('.kd-breadcrumb-item')).toHaveLength(3)
      expect(weakenBreadcrumb.find('.kd-breadcrumb').childAt(0)).not.toHaveClassName('kd-breadcrumb-item-link')
      expect(weakenBreadcrumb.find('.kd-breadcrumb-item').at(0)).toHaveClassName('kd-breadcrumb-item-weaken-model')
      expect(weakenBreadcrumb.find('.kd-breadcrumb-item').at(2)).toHaveClassName(
        'kd-breadcrumb-item-weaken-model-current',
      )

      const iconBreadcrumb = mount(<Breadcrumb items={iconConfig} />)
      expect(iconBreadcrumb.find('.kd-breadcrumb-item').at(0).childAt(0)).toHaveClassName('kd-breadcrumb-item-icon')
    })
  })

  // 7.component interaction(event)
  describe('7.component interaction(event)', () => {
    it('should trigger onItemClick callback', () => {
      const onClick = jest.fn()
      const wrapper = mount(<Breadcrumb items={config} onItemClick={onClick} />)
      wrapper.find('.kd-breadcrumb').childAt(0).simulate('click')
      expect(onClick).toHaveBeenCalledTimes(1)
    })
  })

  // 8.config provider
  describe('8.config provider', () => {
    it('should config use config provider', () => {
      const clipboardConfig = {
        compDefaultProps: {
          Breadcrumb: {
            colorModel: 'weaken',
            separator: '>',
          },
        },
      }
      const wrapper = mount(
        <ConfigProvider value={clipboardConfig}>
          <Breadcrumb items={config} />
        </ConfigProvider>,
      )
      expect(wrapper.find('.kd-breadcrumb-item').at(0)).toHaveClassName('kd-breadcrumb-item-weaken-model')
      expect(wrapper.find('.kd-breadcrumb-item-separator').at(0)).toHaveText('>')
    })
  })

  // 9. ref test

  // 10. api test
  describe('10. api test', () => {
    it('separator api', () => {
      const wrapper = mount(<Breadcrumb separator="X" items={config} />)
      expect(wrapper.find('.kd-breadcrumb-item-separator').at(0)).toHaveText('X')
    })
    it('items api', () => {
      const itemsConfig = [
        {
          title: 'KDesign',
          className: 'my-item',
          href: 'https://kingdee.design/',
          icon: '*',
          dropdownProps: {
            defaultVisible: true,
            menu: [
              {
                key: 1,
                label: '按钮',
                href: 'https://react.kingdee.design/components/button',
              },
              {
                key: 2,
                label: '剪贴板',
                href: 'https://react.kingdee.design/components/clipboard',
              },
              {
                key: 3,
                label: '图标',
                href: 'https://react.kingdee.design/components/icon',
              },
            ],
          },
        },
      ]
      const wrapper = mount(<Breadcrumb items={itemsConfig as unknown as IBreadcrumbItem[]} />)
      expect(wrapper.find('.kd-breadcrumb-item-icon')).toHaveText('*')
      expect(wrapper.find('.kd-breadcrumb-item-text')).toHaveText('KDesign')
      expect(wrapper.find('.kd-breadcrumb-item')).toHaveClassName('my-item')
      expect(wrapper.find('.kd-breadcrumb-item').find('.kd-dropdown-trigger')).toExist()
    })
  })

  // 11. special case
  describe('11. special case', () => {
    it('should hide section items to adaptive parent width', () => {
      const adaptiveConfig = [
        {
          title: 'KDesign',
          href: 'https://kingdee.design/',
        },
        {
          title: 'KDesign React',
          href: 'https://react.kingdee.design/',
        },
        {
          title: 'KDesign React',
          href: 'https://react.kingdee.design/',
        },
        {
          title: 'Breadcrumb',
        },
      ]
      const wrapper = mount(
        <div className="parent">
          <Breadcrumb items={adaptiveConfig} />
        </div>,
      )
      wrapper.setProps({ style: { width: '200px' } })
      wrapper.update()
      expect(wrapper.find('.kdicon-more').length).toEqual(1)
    })
  })
})
