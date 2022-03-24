import React, {
  ReactNode,
  useContext,
  useEffect,
  useState,
  ReactElement,
  useCallback,
  CSSProperties,
  createRef,
} from 'react'
import { Icon } from '../index'
import ReactDOM from 'react-dom'
import { tuple } from '../_utils/type'
import classNames from 'classnames'
import ConfigContext from '../config-provider/ConfigContext'
import { getCompProps } from '../_utils'
import devWarning from '../_utils/devwarning'
import { useResizeObserver, useHideDocumentScrollBar } from '../_utils/hooks'
// import { usePrevious } from '../_utils/hooks'
import { toArray } from '../_utils/react-children'
export const PlacementTypes = tuple('top', 'right', 'bottom', 'left')
export type PlacementType = typeof PlacementTypes[number]
const relativePostionTypes = ['relative', 'absolute', 'fixed']
type CSSSelector = string
const horizontalPlacements = ['left', 'right']
const verticalPlacements = ['top', 'bottom']
/**
 * TODO:
 * 多层抽屉的实现方式无法确定（需求不明确，没有现行的业务场景）: 思考的两种方式:
 * 1. context嵌套，采用ant-design的context嵌套来实现，需要一个ref存父级Drawer（存疑, 但应该也可以）
 * 2. 状态存储，全局Map记录，如果不想记录可以用props来绕过，需要ref记录当前显示的次序（数组下标）
 */
// type placementSizeMap = {
//   height?: number
//   width?: number
// }
// interface PlacementMap<T> {
//   [prop: string]: T[]
// }
// type DrawerMapTypeByPlacementAndContainer = WeakMap<HTMLElement, PlacementMap<placementSizeMap>>
// const drawersMap: DrawerMapTypeByPlacementAndContainer = new WeakMap()

export interface IDrawerProps {
  className?: string
  closable?: boolean
  closeIcon?: ReactNode
  children?: ReactNode
  destroyOnClose?: boolean
  footer?: ReactNode
  footerClassName?: string
  footerStyle?: CSSProperties
  forceRender?: boolean
  getContainer?: (() => Element | CSSSelector | false | null) | Element | false
  headerStyle?: CSSProperties
  headerClassName?: string
  keyboard?: boolean
  mask?: boolean
  maskClassName?: string
  maskClosable?: boolean
  maskStyle?: CSSProperties
  onClose?: () => void
  placement?: PlacementType
  prefixCls?: string
  title?: ReactNode
  titleClassName?: string
  titleStyle?: CSSProperties
  visible?: boolean
  width?: string | number
  zIndex?: string | number
}
const documentBody = document.body

function transformSize(size: string | number, placement: string) {
  if (typeof size === 'string') {
    // 只考虑px 或者 %
    devWarning(
      !(size.endsWith('px') && size.endsWith('%')),
      'drawer',
      `cannot calculate drawer size: width | height for '${size}' besides px or %`,
    )
    if (placement === 'right' || placement === 'bottom') return size || 0
    return size ? '-' + size : 0
  }
  if (placement === 'right' || placement === 'bottom') return (size || 0) + 'px'
  return ('-' + size || 0) + 'px'
}

const InternalDrawer = (props: IDrawerProps, ref: unknown): ReactElement | React.ReactPortal => {
  const { getPrefixCls, prefixCls, compDefaultProps: userDefaultProps } = useContext(ConfigContext)
  const drawerProps: IDrawerProps = getCompProps('Drawer', userDefaultProps, props) // 属性需要合并一遍用户定义的默认属性
  const {
    className,
    closable,
    closeIcon,
    children,
    onClose,
    keyboard,
    mask,
    maskClosable,
    maskStyle,
    maskClassName,
    placement,
    title,
    titleStyle,
    titleClassName,
    footer,
    footerStyle,
    footerClassName,
    visible,
    width,
    headerStyle,
    headerClassName,
    zIndex: zindex,
    getContainer,
    forceRender,
    destroyOnClose,
    prefixCls: customPrefixcls,
  } = drawerProps
  const drawerPrefixCls = getPrefixCls!(prefixCls, 'drawer', customPrefixcls)
  const [showChildren, setShowChildren] = useState(false)
  const [currentWidth, setCurrentWidth] = useState(width)
  // const previousWidthRef = usePrevious(currentWidth)
  // const previousHeightRef = usePrevious(currentHeight)
  const containerRef = (ref as any) || createRef<HTMLDivElement>()
  devWarning(PlacementTypes.indexOf(placement!) === -1, 'drawer', `cannot found drawer type '${placement}'`)
  let drawerContainer: Element | CSSSelector | undefined | null | false =
    typeof getContainer === 'function' ? getContainer() : getContainer
  const isAtOriginalPlace = drawerContainer === false
  if (!(drawerContainer instanceof Element) && !isAtOriginalPlace) {
    try {
      drawerContainer = document.querySelector(drawerContainer as CSSSelector)
    } catch (error) {
      devWarning(true, 'drawer', 'getContainer"s returnValue/value is not a correct CSSSelector')
    }
    drawerContainer = documentBody
  }
  const isBody = (!drawerContainer && !isAtOriginalPlace) || drawerContainer === document.body
  useEffect(() => {
    setShowChildren(!!forceRender)
  }, [forceRender])
  useEffect(() => {
    let node: HTMLElement | null = null
    const portalNode = containerRef.current
    // 应该只有可见才能影响
    // 但是这样会有闪烁的问题
    if (!isBody && drawerContainer) {
      node = drawerContainer as HTMLElement
    } else if (isAtOriginalPlace) {
      node = portalNode && portalNode.parentElement
    }
    if (node && !relativePostionTypes.includes(window.getComputedStyle(node).position)) {
      devWarning(true, 'drawer', 'getContainer"s returnValue/value is not a relative/absolute/fixed positioned DOM')
    }
  }, [drawerContainer, isBody, isAtOriginalPlace, containerRef])

  const handleContainerResize = useCallback(
    ({ width: containerWidth }) => {
      if (!visible && width === currentWidth) return
      if (containerWidth < currentWidth!) {
        // 这里改成操作DOM？
        setCurrentWidth(containerWidth)
        // 这里拿不到正确的之前的宽度
        //  if (width !== previousWidthRef!)
        // 会一直触发
      } else {
        setCurrentWidth(width)
      }
    },
    [width, visible, currentWidth],
  )
  useResizeObserver(() => (drawerContainer || containerRef.current?.parentNode) as HTMLElement, handleContainerResize)
  useHideDocumentScrollBar(!!visible, isBody, !!mask)

  // 为了单测
  useEffect(() => {
    setCurrentWidth(width)
  }, [width])

  const closeDrawer = useCallback(() => {
    onClose && onClose()
    destroyOnClose && setShowChildren(false)
  }, [onClose, destroyOnClose])

  const escapeToCloseModal = useCallback(
    (evt: KeyboardEvent) => {
      // In Internet Explorer 9 and Firefox 36 and earlier, the Esc key returns "Esc" instead of "Escape"
      if (['Escape', 'Esc'].includes(evt.key)) {
        closeDrawer()
      }
    },
    [closeDrawer],
  )

  useEffect(() => {
    if (keyboard) {
      document.body.addEventListener('keydown', escapeToCloseModal)
    }
    return () => {
      document.body.removeEventListener('keydown', escapeToCloseModal)
    }
  }, [keyboard, closeDrawer, escapeToCloseModal])

  const handleMaskClick = useCallback(() => {
    if (maskClosable) {
      closeDrawer()
    }
  }, [maskClosable, closeDrawer])

  const drawerClasses = classNames(drawerPrefixCls, className, {
    [`${drawerPrefixCls}-hide`]: !visible,
    [`${drawerPrefixCls}-active`]: visible,
    [`${drawerPrefixCls}-not-at-body`]: !isBody,
  })
  const headerClass = `${drawerPrefixCls}-header`
  const containerStyle = Object.assign(
    { [placement!]: 0 },
    horizontalPlacements.includes(placement!)
      ? {
          width: currentWidth,
          transform: `translateX(${visible ? 0 : transformSize(currentWidth!, placement!)})`,
        }
      : {},
  )
  const container = (
    <div
      className={classNames({
        [`${drawerPrefixCls}-container-box`]: true,
        [`${drawerPrefixCls}-has-container-box`]: drawerContainer,
        [`${drawerPrefixCls}-container-${placement}`]: true,
      })}
      style={containerStyle}
    >
      {(title || closable) && (
        <div className={classNames(headerClass, headerClassName)} style={headerStyle}>
          <div className={classNames(`${drawerPrefixCls}-title`, titleClassName)} style={titleStyle}>
            {title}
          </div>
          {closable && (
            <div className={`${drawerPrefixCls}-close-icon`} onClick={() => closeDrawer()}>
              {closeIcon || <Icon type="close" />}
            </div>
          )}
        </div>
      )}
      <div className={`${drawerPrefixCls}-body`}>{(showChildren || visible) && toArray(children)}</div>
      {footer && (
        <div className={classNames(`${drawerPrefixCls}-footer`, footerClassName)} style={footerStyle}>
          {footer}
        </div>
      )}
    </div>
  )
  const opposition: string =
    !mask && PlacementTypes.includes(placement as PlacementType)
      ? horizontalPlacements.includes(placement as PlacementType)
        ? horizontalPlacements.filter((p) => p !== placement)[0]
        : verticalPlacements.filter((p) => p !== placement)[0]
      : ''
  const noneMaskStyle = !mask
    ? {
        width: containerStyle.width,
      }
    : {}
  const comp: ReactElement = (
    <div
      className={drawerClasses}
      style={{
        zIndex: (zindex as any) || 'auto',
        ...noneMaskStyle,
        ...(opposition ? { [opposition]: 'unset' } : {}),
      }}
      ref={containerRef}
    >
      {/* 增加clickOutside */}
      {mask && (
        <div
          onClick={handleMaskClick}
          className={classNames(`${drawerPrefixCls}-mask`, maskClassName)}
          style={maskStyle}
        ></div>
      )}
      {container}
    </div>
  )

  if (drawerContainer instanceof HTMLElement) return ReactDOM.createPortal(comp, drawerContainer!)
  else if (drawerContainer !== false) {
    return ReactDOM.createPortal(comp, documentBody!)
  }
  return comp
}
const Drawer = React.forwardRef<unknown, IDrawerProps>(InternalDrawer)

Drawer.displayName = 'Drawer'
export default Drawer
