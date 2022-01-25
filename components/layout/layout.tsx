import * as React from 'react'
import classNames from 'classnames'
import { getCompProps } from '../_utils'
import { ConfigContext } from '../config-provider'

export interface GeneratorProps {
  suffixCls: string
  tagName: 'header' | 'footer' | 'main' | 'section'
  displayName: string
}
export interface BasicProps extends React.HTMLAttributes<HTMLDivElement> {
  prefixCls?: string
  hasSider?: boolean
}

export interface LayoutContextProps {
  siderHook: {
    addSider: (id: string) => void
    removeSider: (id: string) => void
  }
}
export const LayoutContext = React.createContext<LayoutContextProps>({
  siderHook: {
    addSider: () => null,
    removeSider: () => null,
  },
})

interface BasicPropsWithTagName extends BasicProps {
  tagName: 'header' | 'footer' | 'main' | 'section'
}

function generator({ suffixCls, tagName, displayName }: GeneratorProps) {
  return (BasicComponent: any) => {
    const Adapter: React.FC<BasicProps> = (props) => {
      const {
        getPrefixCls,
        prefixCls: pkgPrefixCls,
        compDefaultProps: userDefaultProps,
      } = React.useContext(ConfigContext)
      // 属性需要合并一遍用户定义的默认属性
      const { prefixCls: customPrefixcls } = getCompProps('Layout', userDefaultProps, props)

      // className前缀
      const prefixCls = getPrefixCls!(pkgPrefixCls, suffixCls, customPrefixcls)

      return <BasicComponent prefixCls={prefixCls} tagName={tagName} {...props} />
    }
    Adapter.displayName = displayName
    return Adapter
  }
}

const Basic = (props: BasicPropsWithTagName) => {
  const { compDefaultProps: userDefaultProps } = React.useContext(ConfigContext)
  // 属性需要合并一遍用户定义的默认属性
  const { className, children, prefixCls, tagName, ...others } = getCompProps('Layout', userDefaultProps, props)

  const classString = classNames(prefixCls, className)
  return React.createElement(tagName, { className: classString, ...others }, children)
}

const BasicLayout: React.FC<BasicPropsWithTagName> = (props) => {
  const { compDefaultProps: userDefaultProps } = React.useContext(ConfigContext)
  // 属性需要合并一遍用户定义的默认属性
  const {
    style,
    className,
    children,
    prefixCls,
    hasSider,
    tagName: Tag,
    ...others
  } = getCompProps('Layout', userDefaultProps, props)

  const [siders, setSiders] = React.useState<string[]>([])

  const classString = classNames(
    prefixCls,
    {
      [`${prefixCls}-has-sider`]: typeof hasSider === 'boolean' ? hasSider : siders.length > 0,
    },
    className,
  )

  const styleString = {
    ...style,
  }

  return (
    <LayoutContext.Provider
      value={{
        siderHook: {
          addSider: (id: string) => {
            setSiders((prev) => [...prev, id])
          },
          removeSider: (id: string) => {
            setSiders((prev) => prev.filter((currentId) => currentId !== id))
          },
        },
      }}
    >
      <Tag className={classString} {...others} style={styleString}>
        {children}
      </Tag>
    </LayoutContext.Provider>
  )
}

const Layout = generator({
  suffixCls: 'layout',
  tagName: 'section',
  displayName: 'Layout',
})(BasicLayout)

const Header = generator({
  suffixCls: 'layout-header',
  tagName: 'header',
  displayName: 'Header',
})(Basic)

const Footer = generator({
  suffixCls: 'layout-footer',
  tagName: 'footer',
  displayName: 'Footer',
})(Basic)

const Content = generator({
  suffixCls: 'layout-content',
  tagName: 'main',
  displayName: 'Content',
})(Basic)

export { Header, Footer, Content }

export default Layout
