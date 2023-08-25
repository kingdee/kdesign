import React from 'react'
import { Link } from 'bisheng/router'
import { getChildren } from 'jsonml.js/lib/utils'
import * as utils from '../utils'
import { categoryOrder, typeOrder } from '../../../consts'
import PrevAndNext from './prev-and-next'
import Article from './article'
import Footer from '../layout/footer'
import SideMenu from './SideMenu'

// 获取文档菜单列表
function getMenuData(props) {
  const { pathname } = props.location
  const moduleName = /^\/?components/.test(pathname)
    ? 'components'
    : pathname
        .split('/')
        .filter((item) => item)
        .slice(0, 2)
        .join('/')
  const menuList = props.picked[moduleName] ? [...props.picked[moduleName]] : undefined
  return menuList
}

// docs 内的文件夹生成的 侧边菜单
function getMenu({ menuItems, pathname, deep = 0, prefixClass }) {
  return menuItems.map((item) => {
    const { title, filename, children } = item
    const paddingLeft = `${deep * 30 + 16}px`
    const path = filename && filename.replace(/(\/index)?\.md$/i, '')
    return (
      <ul className={`${prefixClass ? prefixClass + '-menu-item' : 'menu-item'}`} key={`${path || title}`}>
        <li
          className={
            `${prefixClass ? prefixClass + '-menu-item-title' : 'menu-item-title'}` +
            ' ' +
            `${path === pathname ? 'is-active' : ''}`
          }
          style={{ paddingLeft: prefixClass ? paddingLeft : '40px' }}
        >
          {filename ? (
            <Link to={path} key={path}>
              {title}
            </Link>
          ) : (
            <span>{title}</span>
          )}
        </li>
        {children ? (
          <li className={`${prefixClass ? prefixClass + '-menu-item-title' : 'menu-item-title'}`}>
            {getMenu({ menuItems: children, pathname, deep: deep + 1, prefixClass: 'sub' })}
          </li>
        ) : null}
      </ul>
    )
  })
}

// compocnents 组件的侧边菜单栏
function getComponentsMenu({ menuItems, pathname }) {
  return menuItems.map((item) => {
    const { title, subtitle, filename, children } = item
    if (title === '总览') {
      const { filename } = item.children[0]
      const path = filename && filename.replace(/(\/index)?\.md$/i, '')
      return (
        <div key={title} className={`${path === pathname ? 'is-active' : ''} menu-item-title`}>
          <Link to={path}>{title}</Link>
        </div>
      )
    } else {
      const path = filename && filename.replace(/(\/index)?\.md$/i, '')
      return (
        <ul key={`${path || title}`}>
          <li className={`${path === pathname ? 'is-active' : ''} menu-item-title`}>
            {filename ? <Link to={path}>{title + ' ' + subtitle}</Link> : <span>{title}</span>}
          </li>
          {children ? <li className="sub-menu-item">{getComponentsMenu({ menuItems: children, pathname })}</li> : ''}
        </ul>
      )
    }
  })
}

// 更新右侧锚点导航
function updateActiveToc(id) {
  ;[].forEach.call(document.querySelectorAll('.toc li a'), (node) => {
    node.className = ''
  })
  const currentNode = document.querySelectorAll(`.toc li a[href="#${id}"]`)[0]
  if (currentNode) {
    currentNode.className = 'current'
  }
}

// 扁平化菜单
function flattenMenu(menu) {
  if (!menu) {
    return []
  }
  if (menu.type) {
    return [menu]
  }
  if (Array.isArray(menu)) {
    return menu.reduce((acc, item) => {
      if (!item.filename) {
        if (item.children) {
          acc = [...acc, ...flattenMenu(item.children)]
        }
      } else {
        acc.push(item)
      }
      return acc
    }, [])
  }
}

function isIE() {
  // ie?
  if (!!window.ActiveXObject || 'ActiveXObject' in window) return true
  else return false
}

function isScrollEnd(element, t1) {
  const t2 = element.scrollTop
  if (t2 === t1) {
    document.styleSheets[0].insertRule('.menu-wapper::-webkit-scrollbar-thumb { display:none; }')
  }
}

class Content extends React.Component {
  componentDidMount() {
    this.componentDidUpdate()
    window.addEventListener('load', this.handleInitialHashOnLoad)
    window.addEventListener('hashchange', this.handleHashChange)

    if (!isIE()) {
      let t1 = 0
      let timer = null // 定时器
      const element = document.getElementById('default-menu-inner')
      document.styleSheets[0].insertRule('.menu-wapper::-webkit-scrollbar-thumb { display:none; }')
      element.onscroll = function () {
        clearTimeout(timer)
        timer = setTimeout(isScrollEnd(element, t1), 500)
        t1 = element.scrollTop
        document.styleSheets[0].insertRule('.menu-wapper::-webkit-scrollbar-thumb { display:block; }')
      }
    }
  }

  componentDidUpdate(prevProps) {
    const { location, localizedPageData } = this.props
    const { location: prevLocation = {} } = prevProps || {}
    if (!prevProps || prevLocation.pathname !== location.pathname) {
      this.bindScroller()
    } else {
      if (decodeURIComponent(prevLocation.hash) !== decodeURIComponent(location.hash)) {
        this.bindScroller()
      }
    }
    if (!window.location.hash && prevLocation.pathname !== location.pathname) {
      window.scrollTo(0, 0)
    }
    const title = localizedPageData?.meta?.subtitle || localizedPageData?.meta?.title
    document.title = title ? `${title} - KDesign React` : 'KDesign React'
  }

  componentWillUnmount() {
    if (this.scroller) {
      this.scroller.destroy()
    }
    window.removeEventListener('load', this.handleInitialHashOnLoad)
    window.removeEventListener('hashchange', this.handleHashChange)
    clearTimeout(this.timeout)
  }

  // load初始化
  handleInitialHashOnLoad = () => {
    setTimeout(() => {
      if (!window.location.hash) {
        return
      }
      const element = document.getElementById(decodeURIComponent(window.location.hash.replace('#', '')))
      // 如果页面的滚动到最顶部（初始化）时，页面需要滚动到 锚点 处
      if (element && document.documentElement.scrollTop === 0) {
        element.scrollIntoView()
      }
    }, 0)
  }

  // hash改变（锚点改变）
  handleHashChange = () => {
    this.timeout = setTimeout(() => {
      updateActiveToc(decodeURIComponent(window.location.hash.replace(/^#/, '')))
    })
  }

  // 绑定滚动事件
  bindScroller = () => {
    if (this.scroller) {
      this.scroller.destroy()
    }
    if (!document.querySelector('.markdown > h2, .demo > div:first-child ')) {
      return
    }
    // eslint-disable-next-line global-require
    require('intersection-observer')
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const scrollama = require('scrollama')
    this.scroller = scrollama()
    this.scroller
      .setup({
        // .markdown > h2 是组件文档的锚点
        // .demo > div:first-child 是文档（规范等）的锚点
        step: '.markdown > h2, .demo > .preview > div:first-child ', // required
        // header 80px 需要计算除外
        offset: '80px',
      })
      .onStepEnter(({ element }) => {
        updateActiveToc(element.id)
      })
  }

  // 渲染菜单
  renderMenu(menuList) {
    const menuItems = utils.getMenuItems(menuList, categoryOrder, typeOrder)
    const { pathname } = this.props.location
    return /^\/?components/.test(pathname) ? (
      <div className="menu-components-wapper">{getComponentsMenu({ menuItems, pathname })}</div>
    ) : (
      getMenu({ menuItems, pathname })
    )
  }

  // 渲染右部锚点导航
  renderToc(props) {
    const { localizedPageData, demos } = props
    const { toc, api, meta } = localizedPageData
    // demo需要生成的右侧导航
    let demosToc = demos
      ? Object.keys(demos)
          // .map((key) => demos[key])
          .sort((a, b) => demos[a].meta.order - demos[b].meta.order)
          .map((key) => {
            const { title, filename } = demos[key].meta
            const id = filename.replace(/\.md$/, '').replace(/\//g, '-')
            return (
              <li key={id} title={title}>
                <a href={`#${id}`}>{title}</a>
              </li>
            )
          })
      : ''
    // 总览页面的右部锚点导航另外考虑
    if (location.pathname.indexOf('components/overview') > -1) {
      demosToc = Object.keys(typeOrder)
        .filter((v) => typeOrder[v] > -1 && v.indexOf('title') < 0)
        .sort((a, b) => typeOrder[a] - typeOrder[b])
        .map((key) => {
          const { filename } = meta
          const id = filename.split('/').slice(0, 2).join('-') + '-demo-' + typeOrder[key]
          return (
            <li key={id} title={key}>
              <a href={`#${id}`}>{key}</a>
            </li>
          )
        })
    }

    let tokenToc = null
    // 文章需要生成的右侧导航
    const indexToc = getChildren(toc)
      .map((li) => {
        const liMeta = Array.isArray(li) && Array.isArray(li[1]) && li[1][1] ? li[1][1] : {}
        if (liMeta.href.match(/Design-Token/i)) {
          tokenToc = (
            <li key={liMeta.href} title={liMeta.title}>
              <a href={liMeta.href}>{liMeta.title}</a>
            </li>
          )
          return null
        }

        if (!liMeta.href.match(/api/i)) {
          return (
            <li key={liMeta.href} title={liMeta.title}>
              <a href={liMeta.href}>{liMeta.title}</a>
            </li>
          )
        }
      })
      .filter((n) => n)
    return (
      <ul className="toc">
        {indexToc}
        {demosToc}
        {api && (
          <li key="API" title="API">
            <a href="#API">API</a>
          </li>
        )}
        {tokenToc}
      </ul>
    )
  }

  // 获取当前选中的菜单（根据 路由参数或者路由path）
  getActiveMenuItem() {
    const {
      params: { children },
      location,
    } = this.props
    return children || location.pathname
  }

  // 获取底部上一页，下一页导航
  getFooterNav(menuItems, activeMenuItem) {
    const menuItemsList = flattenMenu(menuItems).filter((n) => n)
    let activeMenuItemIndex = -1
    menuItemsList.forEach((menuItem, i) => {
      const paths = menuItem.filename ? menuItem.filename.split('/').map((n) => n.replace(/\.md$/, '')) : []
      if (paths.includes(activeMenuItem)) {
        activeMenuItemIndex = i
      }
    })
    const prev = menuItemsList[activeMenuItemIndex - 1]
    const next = menuItemsList[activeMenuItemIndex + 1]
    return { prev, next }
  }

  render() {
    const menuList = getMenuData(this.props)
    const {
      localizedPageData: {
        meta: { hiddenAnchor },
      },
    } = this.props
    let activeMenuItem, menuItemsForFooterNav, prev, next
    // 如果有菜单需要渲染才会生成底部导航的数据
    if (menuList) {
      activeMenuItem = this.getActiveMenuItem()
      menuItemsForFooterNav = utils.getMenuItems(menuList, categoryOrder, typeOrder)
      const obj = this.getFooterNav(menuItemsForFooterNav, activeMenuItem)
      prev = obj.prev
      next = obj.next
    }
    return (
      <div className="body">
        <div className="wapper">
          <div className="main">
            {menuList ? (
              <>
                <div className="menu-wapper" id="default-menu-inner">
                  <div className="menu">
                    <div className="menu-list">{this.renderMenu(menuList)}</div>
                  </div>
                </div>
                <SideMenu>{this.renderMenu(menuList)}</SideMenu>
              </>
            ) : null}
            <div className="content" style={!menuList ? { paddingLeft: '16px' } : {}}>
              <div className="content-wapper" style={!menuList ? { paddingLeft: 0 } : {}}>
                <Article {...this.props} />
              </div>
              {hiddenAnchor ? null : <div className="toc-wapper">{this.renderToc(this.props)}</div>}
              {menuList ? <PrevAndNext prev={prev} next={next} /> : null}
              <Footer />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Content
