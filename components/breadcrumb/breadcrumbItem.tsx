import React, { useContext, FC } from 'react'
import { IBreadcrumbItems } from './interface'
import Dropdown from '../dropdown'
import Icon from '../icon'
import devWarning from '../_utils/devwarning'
import ConfigContext from '../config-provider/ConfigContext'

const BreadcrumbItem: FC<IBreadcrumbItems> = (props) => {
  const { getPrefixCls, prefixCls } = useContext(ConfigContext)
  const { item, index, separator, openEllipsis, onItemClick } = props
  const { title, className, dropdownProps, href, path, icon } = item
  const breadcrumbPrefixCls = getPrefixCls!(prefixCls, 'breadcrumb')
  const itemTextCls = `${breadcrumbPrefixCls}-item-text`
  const itemIconCls = `${breadcrumbPrefixCls}-item-icon`
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
  return (
    <>
      <div className={className} onClick={handleItemClick}>
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
        {separator}
      </div>
    </>
  )
}
export default BreadcrumbItem
