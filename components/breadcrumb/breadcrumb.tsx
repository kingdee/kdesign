import React, { FunctionComponentElement, useContext, useEffect, useRef } from 'react'
import classNames from 'classnames'
import ConfigContext from '../config-provider/ConfigContext'
import { getCompProps } from '../_utils'
import { IBreadcrumbProps, IBreadcrumbItem, IItemsWidth } from './interface'
import BreadcrumbItem from './breadcrumbItem'
import Icon from '../icon'
import Tooltip from '../tooltip'
import { cloneDeep } from 'lodash'

export type { IBreadcrumbProps } from './interface'

const Breadcrumb = (props: IBreadcrumbProps): FunctionComponentElement<IBreadcrumbProps> => {
  const { getPrefixCls, prefixCls, compDefaultProps: userDefaultProps } = useContext(ConfigContext)
  const breadcrumbProps = getCompProps('Breadcrumb', userDefaultProps, props)
  const {
    className,
    prefixCls: customPrefixcls,
    items,
    separator,
    colorModel,
    onItemClick,
    ...others
  } = breadcrumbProps
  const breadcrumbRef = useRef<HTMLDivElement>(null)
  const breadcrumbHideIconRef = useRef<HTMLDivElement>(null)
  const [itemsConfig, setItemsConfig] = React.useState<IBreadcrumbItem[]>(items)
  const [itemsArray, setItemsArray] = React.useState<IItemsWidth[]>([])
  const [breadcrumbWidth, setBreadcrumbWidth] = React.useState<number>(0)
  const [openEllipsis, setOpenEllipsis] = React.useState<boolean>(false)

  const breadcrumbPrefixCls = getPrefixCls!(prefixCls, 'breadcrumb', customPrefixcls)
  const breadcrumbClass = classNames(breadcrumbPrefixCls, className)
  const breadcrumbPopperClass = classNames(`${breadcrumbPrefixCls}-popper`)
  const breadcrumbMorePanelClass = classNames(`${breadcrumbPrefixCls}-more-panel`)
  const breadcrumbSeparatorClass = classNames(`${breadcrumbPrefixCls}-item-separator`)
  const breadcrumbHideIconClass = classNames(`${breadcrumbPrefixCls}-hide-icon`)
  const getBreadcrumbItemClass = (item: IBreadcrumbItem, isLast: boolean) => {
    return classNames(item.className, `${breadcrumbPrefixCls}-item`, {
      [`${breadcrumbPrefixCls}-item-link`]: item?.path || item?.href,
      [`${breadcrumbPrefixCls}-item-${colorModel || 'emphasize'}-model-current`]: isLast,
      [`${breadcrumbPrefixCls}-item-${colorModel || 'emphasize'}-model`]: !isLast,
    })
  }
  const MIN_ITEM = 3 // 加上more只显示3个元素的时候，末尾元素开启省略号
  const isLastItem = (index: number, items: IBreadcrumbItem[]) => {
    return index === items?.length - 1
  }
  const getSeparator = (index: number, items: IBreadcrumbItem[]) => {
    if (isLastItem(index, items)) {
      return null
    } else {
      return <span className={breadcrumbSeparatorClass}>{separator}</span>
    }
  }

  const getMoreIconContent = (items: IBreadcrumbItem[]) => {
    const MoreItems = () => {
      return (
        <div className={breadcrumbMorePanelClass}>
          {items.map((item, index) => {
            return (
              <BreadcrumbItem
                key={`breadcrumb--more-item-${index}`}
                index={index}
                item={{ ...item, className: getBreadcrumbItemClass(item, false) }}
                separator={getSeparator(index, items)}
              />
            )
          })}
        </div>
      )
    }
    return (
      <>
        <Tooltip
          popperClassName={breadcrumbPopperClass}
          arrow={false}
          tip={<MoreItems />}
          trigger="hover"
          placement="bottomLeft"
        >
          <Icon type="more" />
        </Tooltip>
      </>
    )
  }

  const getElementWidth = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      return ref.current.offsetWidth
    } else {
      return 0
    }
  }

  const getItemsConfig = (widthArr: IItemsWidth[], breadcrumbWidth: number) => {
    const difference = getElementWidth(breadcrumbRef) - breadcrumbWidth!
    if (difference < 0) {
      const number = -difference
      const removeItem = widthArr?.reduce(
        (acc, cur, ind) => {
          if (ind > 0 && ind < widthArr.length - 1) {
            if (acc.width < number + getElementWidth(breadcrumbHideIconRef)) {
              acc.width += cur.width
              acc.index = ind
              return acc
            } else {
              return acc
            }
          } else {
            return acc
          }
        },
        { width: 0, index: 0 },
      )
      if (removeItem.index > 0 && removeItem.index < items.length - 1) {
        const newItemsConfig = cloneDeep(items)
        newItemsConfig.splice(1, removeItem.index, {
          title: getMoreIconContent(cloneDeep(items).splice(1, removeItem.index)),
        })
        setItemsConfig(newItemsConfig)
      }
    } else {
      setItemsConfig(items)
    }
  }

  useEffect(() => {
    const isMore = itemsConfig?.some((item: IBreadcrumbItem) => {
      if (React.isValidElement(item?.title)) {
        return item?.title?.props?.children?.type?.displayName === 'Tooltip'
      }
      return false
    })
    setOpenEllipsis(isMore && itemsConfig.length === MIN_ITEM)
  }, [itemsConfig])

  useEffect(() => {
    if (breadcrumbRef?.current) {
      const itemsArray = Array.from(breadcrumbRef.current.children, (item: HTMLElement, index: number) => {
        return {
          width: item.offsetWidth,
          index: index,
        }
      })
      const breadcrumbWidth = itemsArray.reduce((acc, cur) => acc + cur.width, 0)
      setItemsArray(itemsArray)
      setBreadcrumbWidth(breadcrumbWidth)
      if (itemsArray && breadcrumbWidth) {
        getItemsConfig(itemsArray, breadcrumbWidth)
      }
    }
  }, [])

  useEffect(() => {
    if (itemsArray && breadcrumbWidth) {
      window.addEventListener('resize', () => {
        getItemsConfig(itemsArray, breadcrumbWidth)
      })
    }

    return () =>
      window.removeEventListener('resize', () => {
        getItemsConfig(itemsArray, breadcrumbWidth)
      })
  }, [itemsArray, breadcrumbWidth])

  return (
    <>
      <div className={breadcrumbClass} {...others} ref={breadcrumbRef}>
        {itemsConfig?.length > 0 &&
          itemsConfig.map((item: IBreadcrumbItem, index: number) => {
            return (
              <BreadcrumbItem
                key={`breadcrumb-item-${index}`}
                item={{
                  ...item,
                  className: getBreadcrumbItemClass(item, isLastItem(index, itemsConfig)),
                }}
                onItemClick={onItemClick}
                index={index}
                separator={getSeparator(index, itemsConfig)}
                openEllipsis={isLastItem(index, itemsConfig) ? openEllipsis : false}
              />
            )
          })}
      </div>
      <div className={breadcrumbHideIconClass} ref={breadcrumbHideIconRef}>
        <Icon type="more" />
        <span className={breadcrumbSeparatorClass}>{separator}</span>
      </div>
    </>
  )
}

Breadcrumb.displayName = 'Breadcrumb'
export default Breadcrumb
