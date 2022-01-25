import React, { useContext } from 'react'
import classNames from 'classnames'
import ConfigContext from '../config-provider/ConfigContext'
import { getCompProps } from '../_utils'
import { ViewContextProvider } from './context'

export interface ViewContainerProps extends React.HTMLAttributes<HTMLElement> {
  className?: string
  viewPanes?: Array<string | number | React.ReactNode>
  activeKey?: string | number
  defaultActiveKey?: string | number
}

const InternalViewContainer: React.ForwardRefRenderFunction<ViewContainerProps> = (props) => {
  const { getPrefixCls, prefixCls, compDefaultProps: userDefaultProps } = useContext(ConfigContext)
  const ViewContainerProps = getCompProps('ViewContainer', userDefaultProps, props)
  const { className, prefixCls: customPrefixcls, defaultActiveKey } = ViewContainerProps

  const ViewContainerPrefixCls = getPrefixCls!(prefixCls, 'tabs', customPrefixcls)

  const viewContainerClasses = classNames(ViewContainerPrefixCls, className, {
    // [`${tabsPrefixCls}-size-${size}`]: size, // 尺寸样式
    // [`${tabsPrefixCls}-disabled`]: disabled, // 禁用态样式
    // [`${tabsPrefixCls}-active`]: newChecked, // 选中样式
  })

  return (
    <ViewContextProvider
      value={{
        defaultActiveKey,
      }}
    >
      <div className={viewContainerClasses}></div>
    </ViewContextProvider>
  )
}

const ViewContainer = React.forwardRef<unknown, ViewContainerProps>(InternalViewContainer)

ViewContainer.displayName = 'ViewContainer'

export default ViewContainer
