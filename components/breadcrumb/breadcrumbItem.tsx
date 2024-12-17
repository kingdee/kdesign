import React, { useContext, FC, memo } from 'react'
import { IBreadcrumbItems } from './interface'
import Dropdown from '../dropdown'
import Icon from '../icon'
import devWarning from '../_utils/devwarning'
import ConfigContext from '../config-provider/ConfigContext'
import classNames from 'classnames'

const BreadcrumbItem: FC<IBreadcrumbItems> = (props) => {
  const { getPrefixCls, prefixCls } = useContext(ConfigContext)
  const { item, index, separator, openEllipsis, isLast, isTooltip, colorModel, onItemClick } = props
  const { title, dropdownProps, href, path, icon, className } = item
  const breadcrumbPrefixCls = getPrefixCls!(prefixCls, 'breadcrumb')
  const breadcrumbSeparatorClass = classNames(`${breadcrumbPrefixCls}-item-separator`)
  const itemTextCls = `${breadcrumbPrefixCls}-item-text`
  const itemIconCls = `${breadcrumbPrefixCls}-item-icon`

  const getBreadcrumbItemClass = () => {
    return classNames(className, `${breadcrumbPrefixCls}-item`, {
      [`${breadcrumbPrefixCls}-item-link`]: path || href,
      [`${breadcrumbPrefixCls}-item-${colorModel || 'emphasize'}-model-current`]: isTooltip ? false : isLast,
      [`${breadcrumbPrefixCls}-item-${colorModel || 'emphasize'}-model`]: isTooltip ? true : !isLast,
    })
  }

  const handleItemClick = () => {
    if (href && !path) {
      window.open(href, '_self')
    } else if (!href && path) {
      window.location.pathname = path + (title && `/${title}`)
    } else if (href && path) {
      devWarning(true, 'breadcrumb', '`href` and `path` not coexist  within the `item` object')
    }
    onItemClick && onItemClick(item, index)
  }

  const getSeparator = () => {
    if (isLast) {
      return null
    } else {
      return <span className={breadcrumbSeparatorClass}>{separator}</span>
    }
  }
  return (
    <>
      <div className={getBreadcrumbItemClass()} onClick={handleItemClick}>
        {icon && <div className={itemIconCls}>{icon}</div>}
        <div
          className={itemTextCls}
          title={typeof title === 'string' ? title : ''}
          style={{ maxWidth: openEllipsis ? '170px' : 'unset', overflow: openEllipsis ? 'hidden' : 'inherit' }}
        >
          {title}
        </div>
        {dropdownProps && 'menu' in dropdownProps && (
          <Dropdown placement="bottomRight" {...dropdownProps}>
            <Icon type="arrow-down" />
          </Dropdown>
        )}
        {getSeparator()}
      </div>
    </>
  )
}
export default memo(BreadcrumbItem)
