import React from 'react'
import { render } from 'enzyme'
import ConfigProvider, { ConfigContext } from '../index'
import mountTest from '../../../tests/shared/mountTest'

const TestComp: React.FC = () => {
  const { getPrefixCls, prefixCls: pkgPrefixCls, locale } = React.useContext(ConfigContext)
  const prefixCls = getPrefixCls!(pkgPrefixCls, 'pagination')
  const paginationLangMsg = locale.getCompLangMsg({ componentName: 'Pagination' })
  return <div className={prefixCls}>{paginationLangMsg.first}</div>
}

describe('ConfigProvider', () => {
  // 1.mount test
  mountTest(ConfigProvider)

  // 2.render test
  it('renders correctly', () => {
    const localeConfig = {
      locale: 'zh_TW',
      localeData: {},
    }
    expect(
      render(
        <ConfigProvider value={{ localeConfig: localeConfig }}>
          <TestComp />
        </ConfigProvider>,
      ),
    ).toMatchSnapshot()
  })

  it('customGetLangMsg', () => {
    const localeConfig = {
      locale: 'zh_TW',
      localeData: {},
      customGetLangMsg: (componentName: any, labelName: any, params: any) => `${componentName}-${labelName}-${params}`,
    }
    expect(
      render(
        <ConfigProvider value={{ localeConfig: localeConfig }}>
          <TestComp />
        </ConfigProvider>,
      ),
    ).toMatchSnapshot()
  })
})
