import * as React from 'react'
import Icon from '../icon'
import Button, { ButtonType, IButtonProps } from '../button'
import { getCompProps } from '../_utils'
import { ConfigContext } from '../config-provider'
import usePopper, { PopperProps } from '../_utils/usePopper'

export type RenderFunction = () => React.ReactNode

export interface PopconfirmProps extends PopperProps {
  okText?: string
  okType?: ButtonType
  cancelText?: string
  icon?: React.ReactNode
  children?: React.ReactNode
  okButtonProps?: IButtonProps
  cancelButtonProps?: IButtonProps
  title?: React.ReactNode | RenderFunction
  message?: React.ReactNode | RenderFunction
  onCancel?: (e?: React.MouseEvent<HTMLElement>) => void
  onConfirm?: (e?: React.MouseEvent<HTMLElement>) => void
}

const Popconfirm: React.FC<PopconfirmProps> = (props) => {
  const {
    getPrefixCls,
    prefixCls: pkgPrefixCls,
    compDefaultProps: userDefaultProps,
    locale,
  } = React.useContext(ConfigContext)

  // 属性需要合并一遍用户定义的默认属性
  const allProps = getCompProps('Popconfirm', userDefaultProps, props)

  const {
    icon,
    title,
    okText,
    okType,
    message,
    children,
    onCancel,
    onConfirm,
    cancelText,
    okButtonProps,
    defaultVisible,
    onVisibleChange,
    cancelButtonProps,
    prefixCls: customPrefixcls,
  } = allProps

  // className前缀
  const prefixCls = getPrefixCls!(pkgPrefixCls, 'popconfirm', customPrefixcls)

  const [visible, setVisible] = React.useState(!!props.visible || defaultVisible)
  React.useEffect(() => {
    setVisible(!!props.visible)
  }, [props.visible])

  const confirmLocator = React.Children.count(children) === 1 && children.type ? children : <span>{children}</span>

  const confirmTitle = typeof title === 'function' ? title() : title

  const confirmMsg = typeof title === 'function' ? message() : message

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    props.visible === undefined && setVisible(false)
    onVisibleChange && onVisibleChange(false)
    onCancel && onCancel(e)
  }
  const handleConfirm = (e: React.MouseEvent<HTMLButtonElement>) => {
    props.visible === undefined && setVisible(false)
    onVisibleChange && onVisibleChange(false)
    onConfirm && onConfirm(e)
  }

  const confirmPopper = (
    <div className={`${prefixCls}-content`}>
      {confirmTitle && (
        <h3 className={`${prefixCls}-title`}>
          {'icon' in props ? icon === true ? <Icon type="warning-solid" /> : icon : null}
          {confirmTitle}
        </h3>
      )}
      <div className={`${prefixCls}-message`}>{confirmMsg}</div>
      <div className={`${prefixCls}-interaction`}>
        <Button {...cancelButtonProps} onClick={handleCancel}>
          {cancelText || locale.getLangMsg('Popconfirm', 'cancel')}
        </Button>
        <Button {...okButtonProps} type={okType} onClick={handleConfirm}>
          {okText || locale.getLangMsg('Popconfirm', 'confirm')}
        </Button>
      </div>
    </div>
  )

  const handleVisibleChange = (visible: boolean) => {
    props.visible === undefined && setVisible(visible)
    onVisibleChange && onVisibleChange(visible)
  }

  const popperProps = {
    ...allProps,
    visible,
    prefixCls,
    arrow: true,
    onVisibleChange: handleVisibleChange,
  }

  return usePopper(confirmLocator, confirmPopper, popperProps)
}

Popconfirm.displayName = 'Popconfirm'
export default Popconfirm
