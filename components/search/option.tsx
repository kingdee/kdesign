import React, { useContext, useRef } from 'react'
import classNames from 'classnames'
import ConfigContext from '../config-provider/ConfigContext'
import { OptionProps } from './interface'
import { getStringToArray } from '../_utils/arrayUtil'

const InternalOption: React.ForwardRefRenderFunction<unknown, OptionProps> = (props, ref: unknown) => {
  const optionRef = useRef<HTMLDivElement>(null) || (ref as any)

  const { className, onChangeSelect, tag, value, searchValue, index, selectedIndex, isFormatVal } = props

  const {
    getPrefixCls,
    prefixCls,
    locale: { getLangMsg },
  } = useContext(ConfigContext)
  const optionPrefixCls = getPrefixCls!(prefixCls, 'quick-search')

  const optionCls = classNames(className, {
    [`${optionPrefixCls}-option`]: true,
    [`${optionPrefixCls}-option-selected`]: index === selectedIndex,
  })

  const optionTagCls = classNames({
    [`${optionPrefixCls}-option-tag`]: true,
  })

  const optionContentCls = classNames({
    [`${optionPrefixCls}-option-content`]: true,
  })

  const handleClick = () => {
    // setSelected(!isSelected)
    onChangeSelect && onChangeSelect?.({ tag, label: searchValue, value })
  }

  const formatSearchValue = isFormatVal
    ? getStringToArray(searchValue || '').join(` ${getLangMsg('Search', 'or')} `)
    : searchValue

  return (
    <div ref={optionRef} className={optionCls} onClick={handleClick}>
      <span className={optionTagCls}>{`${tag}：`}</span>
      <span className={optionContentCls} title={formatSearchValue}>
        {formatSearchValue}
      </span>
    </div>
  )
}

const Option = React.forwardRef<unknown, OptionProps>(InternalOption)
Option.displayName = 'Option'

export default Option
