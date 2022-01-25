import React from 'react'
import classNames from 'classnames'
import { SplitPanelMode, FoldDirection } from './interface'
import Icon from '../icon'

interface TriggerProps {
  prefixCls: string
  style?: React.CSSProperties
  mode: SplitPanelMode
  disabled?: boolean
  showFoldIcons: boolean
  foldIcons?: React.ReactNode[]
  hideFirstPanel: (e: React.MouseEvent, direction: FoldDirection) => void
  hideSecondPanel: (e: React.MouseEvent, direction: FoldDirection) => void
  handleMousedown: (e: React.MouseEvent) => void
}

const Trigger: React.FC<TriggerProps> = (props) => {
  const {
    prefixCls,
    style,
    mode,
    disabled,
    showFoldIcons,
    foldIcons,
    hideFirstPanel,
    hideSecondPanel,
    handleMousedown,
  } = props

  const triggerPrefixCls = `${prefixCls}-trigger`
  const isVertical = mode === 'vertical'

  const getCustomFoldIcons = (index: number) => {
    return foldIcons && foldIcons[index]
  }

  const triggerCls = classNames(
    triggerPrefixCls,
    isVertical ? `${triggerPrefixCls}-vertical` : `${triggerPrefixCls}-horizontal`,
    {
      [`is-disabled`]: disabled,
    },
  )
  const getArrowCls = (cls: string) =>
    classNames(`${triggerPrefixCls}-arrow`, isVertical ? `is-vertical` : `is-horizontal`, cls)

  const firstCustomIcons = getCustomFoldIcons(0)
  const secondCustomIcons = getCustomFoldIcons(1)

  const renderFoldIcons = () => {
    if (!showFoldIcons) {
      return null
    }
    const firstIconPos = isVertical ? 'left' : 'top'
    const secondIconPos = isVertical ? 'right' : 'bottom'
    const firstIconType = isVertical ? 'arrow-left-solid' : 'arrow-up-solid'
    const secondIconType = isVertical ? 'arrow-right-solid' : 'arrow-down-solid'
    return (
      <>
        <span className={getArrowCls(firstIconPos)} onClick={(e: React.MouseEvent) => hideFirstPanel(e, firstIconPos)}>
          {firstCustomIcons || <Icon type={firstIconType} />}
        </span>
        <span
          className={getArrowCls(secondIconPos)}
          onClick={(e: React.MouseEvent) => hideSecondPanel(e, secondIconPos)}
        >
          {secondCustomIcons || <Icon type={secondIconType} />}
        </span>
      </>
    )
  }

  return (
    <>
      <div className={triggerCls} style={style} onMouseDown={handleMousedown}></div>
      {renderFoldIcons()}
    </>
  )
}

export default React.memo(Trigger)
