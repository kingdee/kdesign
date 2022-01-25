import InternalLayout, { BasicProps, Content, Footer, Header } from './layout'
import Sider from './sider'

export { BasicProps as LayoutProps } from './layout'
export { SiderProps } from './sider'

interface LayoutType extends React.FC<BasicProps> {
  Header: typeof Header
  Footer: typeof Footer
  Content: typeof Content
  Sider: typeof Sider
}

const Layout = InternalLayout as LayoutType

Layout.Header = Header
Layout.Footer = Footer
Layout.Content = Content
Layout.Sider = Sider

export default Layout
