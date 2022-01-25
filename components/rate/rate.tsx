import * as React from 'react'
import classnames from 'classnames'
import ConfigContext from '../config-provider/ConfigContext'
import { getCompProps } from '../_utils'
import devWarning from '../_utils/devwarning'
import { tuple } from '../_utils/type'
export const SizeTypes = tuple('large', 'middle', 'small')
export type size = typeof SizeTypes[number]

export interface RateProps {
  allowHalf?: boolean
  icon?: React.ReactNode | ((props: any) => React.ReactNode)
  activeIcon?: React.ReactNode | ((props: any) => React.ReactNode)
  count?: number
  defaultValue?: number
  value?: number
  onlyActiveCurrent?: boolean
  disabled?: boolean
  color?: string
  // emotionalText?:Array<string>
  size?: size
  className?: string
  style?: React.CSSProperties
  onBlur?: () => void
  onChange?: (value: number) => void
  onHoverChange?: (value: number) => void
  onFocus?: () => void
}

const Rate: React.FC<RateProps> = (props) => {
  const { getPrefixCls, prefixCls: pkgPrefixCls, compDefaultProps: userDefaultProps } = React.useContext(ConfigContext)

  const {
    prefixCls: customPrefixcls,
    allowHalf,
    icon,
    activeIcon,
    count,
    defaultValue,
    value,
    onlyActiveCurrent,
    disabled,
    color,
    // emotionalText,
    size,
    className,
    style,
    onBlur,
    onChange,
    onHoverChange,
    onFocus,
  } = getCompProps('Rate', userDefaultProps, props)
  devWarning(SizeTypes.indexOf(size) === -1, 'Rate', `cannot found SizeType '${size}'`)
  // className前缀
  const prefixCls = getPrefixCls!(pkgPrefixCls, 'rate', customPrefixcls)
  const [selectedValue, setSelectedValue] = React.useState(defaultValue) // 当前选中的值，包含一位小数
  const [activeNumber, setActiveNumber] = React.useState(0) // 鼠标悬停icon位置对应的值

  React.useEffect(() => {
    if (value && value !== 0 && value !== selectedValue) {
      setSelectedValue(value)
    }
  }, [value, selectedValue])

  // const shouldSetValue = (value: number) => {
  //   return value && value !== 0 && value !== selectedValue
  // }

  const handleClick = React.useCallback(
    (value: number) => {
      setSelectedValue(value)
      onChange && onChange(value)
    },
    [onChange],
  )

  const handleMouseEnter = React.useCallback(
    (value: number) => {
      setActiveNumber(value)
      onHoverChange && onHoverChange(value)
    },
    [onHoverChange],
  )

  const handleMouseLeave = () => {
    setActiveNumber(0)
  }

  const handleFocus = React.useCallback(() => {
    onFocus && onFocus()
  }, [onFocus])

  const handleBlur = React.useCallback(() => {
    onBlur && onBlur()
  }, [onBlur])

  /**
   *获取图标
   * @param icon
   * @param index
   */
  const getIcon = (
    icon: React.ReactNode | ((props: any) => React.ReactNode),
    activeIcon: React.ReactNode | ((props: any) => React.ReactNode),
    index: number,
    isActive: boolean,
  ): React.ReactNode => {
    if (activeIcon && isActive) {
      icon = activeIcon
    }
    if (typeof icon === 'function') {
      return <span className={`${prefixCls}-icon-wrapper`}>{icon(index)}</span>
    }
    return <span className={`${prefixCls}-icon-second-content`}>{icon}</span>
  }

  /**
   * 获取第一个图标状态
   * @param value
   * @param index
   * @param onlyActiveCurrent
   * @param isSecondIconActive
   */
  const getFirstIconStatus = (
    value: number,
    index: number,
    onlyActiveCurrent: boolean,
    secondIconStatus: boolean,
  ): boolean => {
    const half = 0.5
    const isInteger = Number.isInteger(value)
    value = transferValue(value, index)
    const isActiveAllLeft: boolean = value >= index || value === index - half
    const isActiveCurrent: boolean = value === index
    const isActiveFirst: boolean = value === index - half
    let mark
    if (secondIconStatus) {
      // 第二个图标被激活则第一个也必须激活
      mark = true
    } else if (!onlyActiveCurrent) {
      // 激活点击位置所有左侧图标
      mark = isActiveAllLeft
    } else if (isInteger) {
      // 点击全图标只激活当前点击图标
      mark = isActiveCurrent
    } else {
      mark = isActiveFirst // 点击半个图标只激活当前点击图标
    }
    return mark
  }

  const transferValue = (value: number, index: number) => {
    const half = 0.5
    if (index - value === half) {
      return value
    } else {
      return Math.round(value)
    }
  }

  /**
   * 获取第二个图标状态
   * @param value
   * @param index
   * @param onlyActiveCurrent
   */
  const getSecondIconStatus = (value: number, index: number, onlyActiveCurrent: boolean): boolean => {
    if (!onlyActiveCurrent) {
      // 激活所有左侧图标
      return value >= index
    } else {
      return value === index // 只激活当前点击图标
    }
  }

  /**
   * 返回图标的样式
   * @param isActive
   */
  const getIconStyle = (isActive: boolean) => {
    if (isActive) return { color }
  }

  /**
   *
   * @param selectActive 当前图标是否被选中
   * @param mouseActive 当前图标是否触发鼠标hover效果
   */
  const isSelected = (selectActive: boolean, mouseActive: boolean): boolean => {
    return activeNumber !== 0 ? mouseActive : selectActive
  }

  const getIconClassName = (name: string, isActive: boolean) => {
    return classnames({
      [`${prefixCls}-icon-${name}`]: true,
      [`${prefixCls}-icon-selected`]: isActive,
    })
  }

  /**
   * 获取图标视图
   */
  const getRateIconView = (): React.ReactNode => {
    const half = 0.5
    const rateIconsView = []
    for (let i = 1; i <= count; i++) {
      const isMouseOnSecondIcon: boolean = getSecondIconStatus(activeNumber, i, onlyActiveCurrent)
      const isMouseOnFirstIcon: boolean = getFirstIconStatus(activeNumber, i, onlyActiveCurrent, isMouseOnSecondIcon)
      const isSecondSelected: boolean = getSecondIconStatus(selectedValue, i, onlyActiveCurrent)
      const isFirstSelected: boolean = getFirstIconStatus(selectedValue, i, onlyActiveCurrent, isSecondSelected)
      const isFirstActive: boolean = isSelected(isFirstSelected, isMouseOnFirstIcon)
      const isSecondActive: boolean = isSelected(isSecondSelected, isMouseOnSecondIcon)
      const IconStyle: React.CSSProperties | undefined = getIconStyle(isFirstActive)
      const firstIconStyle: React.CSSProperties | undefined = getIconStyle(isFirstActive)
      const firstIconClassName = getIconClassName('first', isFirstActive)
      const secondIconClassName = getIconClassName('second', isSecondActive)
      rateIconsView.push(
        <span className={`${prefixCls}-item`} key={i}>
          <div className={`${prefixCls}-icon-view`}>
            {allowHalf && (
              <span
                style={firstIconStyle}
                className={firstIconClassName}
                onClick={() => handleClick(i - half)}
                onMouseEnter={() => handleMouseEnter(i - half)}
                onMouseLeave={() => handleMouseLeave()}
              >
                {getIcon(icon, activeIcon, i, isFirstActive)}
              </span>
            )}
            <span
              style={IconStyle}
              className={secondIconClassName}
              onClick={() => handleClick(i)}
              onMouseEnter={() => handleMouseEnter(i)}
              onMouseLeave={() => handleMouseLeave()}
            >
              {getIcon(icon, activeIcon, i, isSecondActive)}
            </span>
          </div>
          {/* {emotionalText && getEmotionalTextView(i - 1)} */}
        </span>,
      )
    }
    return rateIconsView
  }

  /**
   * 获取图标下方情感描述文字
   * @param index 图标对应索引
   */
  //   const getEmotionalTextView = (index:number):React.ReactNode => {
  //     return (
  //         <span className={`${prefixCls}-item-text`}>
  //           {emotionalText[index] ? emotionalText[index] : null}
  //         </span>
  //     )
  //   }

  const getRateClassName = classnames(prefixCls, className, {
    [`${prefixCls}-size-${size}`]: size,
    [`${prefixCls}-disabled`]: disabled,
  })

  const rate: React.ReactElement = (
    <span
      className={getRateClassName}
      style={style}
      onMouseLeave={() => handleBlur()}
      onMouseEnter={() => handleFocus()}
    >
      {getRateIconView()}
      {/* {getScoreTextView()} */}
    </span>
  )
  return rate
}
Rate.displayName = 'Rate'
export default Rate
