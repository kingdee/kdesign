import * as React from 'react'
import classNames from 'classnames'
import { getCompProps } from '../_utils'
import { ConfigContext } from '../config-provider'

import Tag, { ITagProps } from '../tag'
import Space from '../space'
import Search from '../search'
import Icon from '../icon'

import SchemeFilter from './scheme'
import ConditionFilter from './condition'

import { TOption, ICondition, TFilterValue, IScheme, IFilterProps } from './interface'

const Filter: React.FC<IFilterProps> = (props) => {
  const {
    getPrefixCls,
    prefixCls: pkgPrefixCls,
    compDefaultProps: userDefaultProps,
    locale,
    direction,
  } = React.useContext(ConfigContext)
  const FilterLangMsg = locale.getCompLangMsg({ componentName: 'Filter' })
  // 属性需要合并一遍用户定义的默认属性
  const {
    style,
    fields,
    schemes,
    onChange,
    className,
    conditions,
    onSchemeSave,
    defaultTabKey,
    onSpreadChange,
    getSchemeSettingMenu,
    prefixCls: customPrefixcls,
  } = getCompProps('Filter', userDefaultProps, props)

  // className前缀
  const prefixCls = getPrefixCls!(pkgPrefixCls, 'filter', customPrefixcls)
  const rtlCls = direction === 'rtl' ? `${prefixCls}-rtl` : null
  const { current: defaultValue } = React.useRef(
    typeof props.value === 'undefined' ? props.defaultValue || {} : props.value || {},
  )
  const [value, setValue] = React.useState(defaultValue)
  React.useEffect(() => {
    props.value && setValue(props.value)
  }, [props.value])

  const [tab, setTab] = React.useState(defaultTabKey)

  const onConditionChange = (nextValue: TFilterValue, condition?: ICondition, option?: TOption) => {
    props.value === undefined && setValue(nextValue)
    onChange && onChange(nextValue, condition, option)
  }

  const onConditionRemove = (key: string, e: React.MouseEvent) => {
    e.preventDefault()
    if (key) {
      const nextValue = Object.assign({}, value)
      delete nextValue[key]
      onConditionChange(nextValue)
    }
  }

  const onSchemeSearch = (scheme: IScheme) => {
    onConditionChange({ scheme })
  }

  const [spread, setSpread] = React.useState(props.spread || props.defaultSpread)
  React.useEffect(() => {
    props.spread !== undefined && setSpread(props.spread)
  }, [props.spread])
  const handleSwitchSpread = () => {
    props.spread === undefined && setSpread(!spread)
    onSpreadChange && onSpreadChange(!spread)
  }

  const tabs = [
    { key: 'condition', name: FilterLangMsg.commonCondition },
    { key: 'scheme', name: FilterLangMsg.schemeQuery },
  ]

  return (
    <div className={classNames(prefixCls, rtlCls, className)} style={style}>
      <header className={`${prefixCls}-header`}>
        <h3 className={`${prefixCls}-header-title`}>{props.title}</h3>
        <div className={`${prefixCls}-header-condition`}>
          <span className={`${prefixCls}-header-condition-label`}>{FilterLangMsg.filterCondition}</span>
          <Space wrap size={[4, 4]}>
            {Object.keys(value).map((conditionKey: string) => {
              let name, options, required
              if (conditionKey === 'scheme') {
                options = (value[conditionKey] as IScheme).name
                name = options && FilterLangMsg.scheme
              } else {
                const condition = conditions.find(({ key }: ICondition) => key === conditionKey)
                const labels = (value[conditionKey] as string[]).map((item: string) => {
                  const filterOption =
                    condition.options.find(({ value: optonValue }: TOption) => optonValue === item) || {}
                  return filterOption.label || filterOption.value || item
                })
                name = condition.label
                options = labels.join(',')
                required = condition.required
              }
              const conditionProps: ITagProps = {
                size: 'large',
                closable: !required,
                type: 'edit',
                onClose: onConditionRemove.bind(null, conditionKey),
              }
              return (
                name && (
                  <Tag className={`${prefixCls}-header-condition-item`} key={conditionKey} {...conditionProps}>
                    <span className={`${prefixCls}-header-condition-item-text`} title={options}>
                      {name}：{options}
                    </span>
                  </Tag>
                )
              )
            })}
          </Space>
        </div>
        <Search className={`${prefixCls}-header-search`} type="quick-search" {...props.search} />
        <div className={classNames(`${prefixCls}-header-handle`, { spread })} onClick={handleSwitchSpread}>
          {FilterLangMsg[spread ? 'packup' : 'spread']}
          {FilterLangMsg.filter} <Icon type="arrow-down" />
        </div>
      </header>
      <div className={classNames(`${prefixCls}-body`, { spread })}>
        <Space
          size={12}
          className={`${prefixCls}-body-tabs`}
          split={<span className={`${prefixCls}-body-tabs-split`}></span>}
        >
          {tabs.map(({ key, name }) => (
            <span
              key={key}
              onClick={() => setTab(key)}
              className={classNames(`${prefixCls}-body-tabs-item`, { active: key === tab })}
            >
              {name}
            </span>
          ))}
        </Space>
        <ConditionFilter
          {...{
            tab,
            prefixCls,
            conditions,
            FilterLangMsg,
            onConditionChange,
            onConditionRemove,
            value,
          }}
        />
        <SchemeFilter
          {...{
            tab,
            fields,
            schemes,
            prefixCls,
            onSchemeSave,
            FilterLangMsg,
            onSchemeSearch,
            getSchemeSettingMenu,
            direction: direction || 'ltr',
            value: value as { scheme: IScheme },
          }}
        />
      </div>
    </div>
  )
}

Filter.displayName = 'Filter'

export default Filter
