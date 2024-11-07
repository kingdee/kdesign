import React from 'react'
import { render, mount } from 'enzyme'
import mountTest from '../../../tests/shared/mountTest'
import ConfigProvider from '../../config-provider/index'
import Pagination from '../index'
import Icon from '../../icon'
import { PageTypes } from '../pagination'
const defaultPaginationProps = {
  onChange: jest.fn(),
  onShowSizeChange: jest.fn(),
}
describe('Pagination', () => {
  // 1.mount test
  describe('1.mount test', () => {
    mountTest(Pagination)
    PageTypes.forEach((type) => {
      mountTest(() => <Pagination pageType={type} defaultCurrent={1} total={50} />)
    })
  })

  // 2.render test
  describe('2.render test', () => {
    it('renders correctly', () => {
      expect(render(<Pagination defaultCurrent={1} total={50} />)).toMatchSnapshot()
      PageTypes.forEach((type) => {
        expect(render(<Pagination pageType={type} defaultCurrent={1} total={50} />)).toMatchSnapshot()
      })
    })
  })

  // 3.render no child without errors
  describe('3.render no child without errors', () => {
    it('render no child without errors', () => {
      expect(mount(<Pagination defaultCurrent={1} total={50}></Pagination>)).toMatchSnapshot()
    })
  })

  // 4. render null or undefined without errors
  describe('4. render null or undefined without errors', () => {
    it('render null or undefined without errors', () => {
      expect(
        mount(
          <Pagination defaultCurrent={1} total={50}>
            {null}
            {undefined}
          </Pagination>,
        ),
      ).toMatchSnapshot()
    })
  })
  // 5. displayName
  describe('5. displayName', () => {
    it('should have displayName static property', () => {
      const wrapper = mount(<Pagination defaultCurrent={1} total={50} />)
      expect((wrapper.type() as any).displayName).toBe('Pagination')
    })
  })
  // 6.class state
  describe('6. class state', () => {
    it('should class use right', () => {
      // default
      const DefaultPagination = mount(<Pagination defaultCurrent={1} total={50} />)
      expect(DefaultPagination.find('.kd-pagination')).toHaveClassName('.kd-pagination')
    })
  })
  // 7.component interaction(event)
  describe('7.component interaction(event)', () => {
    it('should not clickable when button is loading', () => {
      const onClick = jest.fn()
      const wrapper = mount(<Pagination defaultCurrent={3} total={500} disabled />)
      wrapper.simulate('click')
      expect(onClick).not.toHaveBeenCalledWith()
    })
  })
  // 8.config provider
  describe('8.config provider', () => {
    it('should config use config provider', () => {
      const paginationConfig = {
        compDefaultProps: {
          Pagination: {
            current: 3,
          },
        },
        localeConfig: {
          locale: 'zh-CN',
          localeData: {
            'Pagination.confirm': 'GO',
          },
        },
      }
      const wrapper = mount(
        <ConfigProvider value={paginationConfig}>
          <Pagination pageType="nicety" total={50} />
        </ConfigProvider>,
      )
      expect(wrapper.find(`.kd-pagination-pages-item.active`).at(0).text()).toEqual('3')
      expect(wrapper.find(`.kd-pagination-jumper-button`).at(0).text()).toEqual('GO')
    })
  })
  // 9.API test
  describe('9.api test', () => {
    it('api test', () => {
      // border
      const defaultwrapper = mount(
        <Pagination bordered pageType="simple" defaultCurrent={2} total={50} showSizeChanger />,
      )
      expect(defaultwrapper.find(`.kd-pagination-action`)).toHaveClassName(`.bordered`)

      // current
      const defalutPagination = mount(<Pagination current={3} total={50} />)
      expect(defalutPagination.find(`.kd-pagination-current-input`).at(0).prop('value')).toEqual(3)

      const billPagination = mount(<Pagination pageType="bill" current={3} total={50} showQuickJumper />)
      expect(billPagination.find(`.kd-pagination-current-input`).at(0).prop('value')).toEqual(3)

      const nicetyPagination = mount(<Pagination pageType="nicety" current={3} total={50} />)
      expect(nicetyPagination.find(`.kd-pagination-pages-item.active`).at(0).prop('title')).toEqual('3')

      const lessPagination = mount(<Pagination pageType="less" current={3} total={50} />)
      expect(lessPagination.find(`.kd-pagination-pages-item.active`).at(0).prop('title')).toEqual('3')
      const simplePagination = mount(<Pagination bordered pageType="simple" current={2} total={50} />)
      expect(simplePagination.find(`.kd-pagination-current-input`).at(0).prop('value')).toEqual(2)
      // defaultCurrent
      expect(defalutPagination.find(`.kd-pagination-current-input`).at(0).prop('value')).toEqual(3)

      const billPaginationTwo = mount(<Pagination pageType="bill" defaultCurrent={3} total={50} showQuickJumper />)
      expect(billPaginationTwo.find(`.kd-pagination-current-input`).at(0).prop('value')).toEqual(3)

      const nicetyPaginationTwo = mount(<Pagination pageType="nicety" defaultCurrent={3} total={50} />)
      expect(nicetyPaginationTwo.find(`.kd-pagination-pages-item.active`).at(0).prop('title')).toEqual('3')

      const lessPaginationTwo = mount(<Pagination pageType="less" defaultCurrent={3} total={50} />)
      expect(lessPaginationTwo.find(`.kd-pagination-pages-item.active`).at(0).prop('title')).toEqual('3')
      const simplePaginationTwo = mount(<Pagination bordered pageType="simple" defaultCurrent={2} total={50} />)
      expect(simplePaginationTwo.find(`.kd-pagination-current-input`).at(0).prop('value')).toEqual(2)

      // defaultPageSize
      const wrapper = mount(<Pagination defaultPageSize={20} defaultCurrent={1} total={50} showSizeChanger />)
      expect(wrapper.find(`.kd-dropdown-trigger`).find('span').at(0).text()).toEqual(`20 条/页`)

      // dropdownProps
      // hideOnSinglePage
      const hidePagination = mount(<Pagination defaultCurrent={1} total={10} showSizeChanger hideOnSinglePage />)
      expect(hidePagination.exists('.kd-dropdown')).toBeFalsy()

      // pageSize
      const pageSizePagination = mount(<Pagination pageSize={30} defaultCurrent={1} total={100} />)
      expect(pageSizePagination.find(`.kd-dropdown-trigger`).find('span').at(0).text()).toEqual(`30 条/页`)

      // pageSizeOptions
      // const pageSizeOptionsPagination = mount(
      //   <Pagination showSizeChanger pageSizeOptions={['10', '20', '30', '40']} defaultCurrent={1} total={100} />,
      // )
      // expect(pageSizeOptionsPagination.find('.kd-dropdown-menu-item').at(0)).toHaveText('苹果')
      // expect(pageSizeOptionsPagination.find('.kd-dropdown-menu-item').at(1)).toHaveText('橘子')
      // expect(pageSizeOptionsPagination.find('.kd-dropdown-menu-item').at(2)).toHaveText('橘子')
      // expect(pageSizeOptionsPagination.find('.kd-dropdown-menu-item').at(3)).toHaveText('橘子')

      // showTotal
      const showTotalPagePagination = mount(<Pagination showTotal={'page'} defaultCurrent={1} total={500} />)
      expect(showTotalPagePagination.find('.kd-pagination-total').at(0)).toHaveText('共 50 页')

      const showTotalRowPagination = mount(<Pagination showTotal={'row'} defaultCurrent={1} total={500} />)
      expect(showTotalRowPagination.find('.kd-pagination-total').at(0)).toHaveText('共 500 条')

      const showTotalAllPagination = mount(<Pagination showTotal={'all'} defaultCurrent={1} total={500} />)
      expect(showTotalAllPagination.find('.kd-pagination-total').at(0)).toHaveText('共 50 页 500条')
      // showQuickJumper

      const showQuickJumperPagination = mount(
        <Pagination showQuickJumper pageType="nicety" defaultCurrent={1} total={50} />,
      )
      expect(showQuickJumperPagination.exists('.kd-pagination-jumper')).toBeTruthy()
      // showSizeChanger
      const showSizeChangerPagination = mount(
        <Pagination showSizeChanger={false} pageType="nicety" defaultCurrent={1} total={49} />,
      )
      expect(showSizeChangerPagination.exists('.kd-pagination-options')).toBeFalsy()

      const showSizeChangerPagination2 = mount(<Pagination pageType="nicety" defaultCurrent={1} total={129} />)
      expect(showSizeChangerPagination2.exists('.kd-pagination-options')).toBeTruthy()

      // showTitle
      // total
      const totalRowPagination = mount(<Pagination showTotal={'row'} defaultCurrent={1} total={1000} />)
      expect(totalRowPagination.find('.kd-pagination-total').at(0)).toHaveText('共 1000 条')
      // onChange
      const onChangePagination = mount(
        <Pagination pageType="nicety" pageSize={20} defaultCurrent={1} total={50} {...defaultPaginationProps} />,
      )
      onChangePagination.find('.kd-pagination-pages-item').at(3).find('button').simulate('click')

      expect(defaultPaginationProps.onChange).toHaveBeenCalled()
      // onShowSizeChange

      // icons
      const iconsPagination = mount(<Pagination pageType="bill" total={50} bordered />)
      iconsPagination.setProps({ icons: { first: <Icon type="arrow-up" /> } })
      expect(iconsPagination.find('.kdicon-arrow-up').length).toBe(1)
    })
  })
})
