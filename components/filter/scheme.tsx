import * as React from 'react'
import classNames from 'classnames'
import cloneDeep from 'lodash/cloneDeep'

import Button from '../button'
import Icon from '../icon'
import Input from '../input'
import Dropdown from '../dropdown'
import Select from '../select'
import Option from '../select/option'

import { ISchemeProps, IScheme, IField } from './interface'

const SchemeFilter: React.FC<ISchemeProps> = (props) => {
  const { value, prefixCls, fields, FilterLangMsg, onSchemeSearch, onSchemeSave, getSchemeSettingMenu } = props

  const [schemes, setSchemes] = React.useState(props.schemes || [])
  React.useEffect(() => {
    props.schemes !== undefined && setSchemes(props.schemes)
  }, [props.schemes])

  const defaultItems = fields
    .filter(({ required }: IField) => required)
    .map(({ name, operators, assignOptions }) => {
      const operator = operators?.props.defaultValue
      const defaultValue = (assignOptions[operator] || assignOptions.default)?.props.defaultValue
      return {
        operator,
        fieldName: name,
        required: true,
        value: defaultValue,
      }
    })

  const defaultScheme = {
    name: '',
    items: defaultItems,
  }

  const [scheme, setScheme] = React.useState<IScheme>(value.scheme || defaultScheme)
  React.useEffect(() => {
    const nextScheme = cloneDeep(value.scheme || defaultScheme)
    nextScheme.items = nextScheme.items.map((item) => {
      const field = fields.find(({ name }) => name === item.fieldName)
      item.required = field?.required
      return item
    })
    setScheme(nextScheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])
  React.useEffect(() => {
    const nextScheme = schemes.find(({ name }) => name === scheme.name)
    if (!nextScheme && value.scheme) {
      setScheme(defaultScheme)
      onSchemeSearch && onSchemeSearch(defaultScheme)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schemes])

  const handleSwitchScheme = (name: string) => {
    const nextScheme = cloneDeep(schemes.find((scheme) => name === scheme.name)) as IScheme
    nextScheme.items = nextScheme.items.map((item) => {
      const field = fields.find(({ name }) => name === item.fieldName)
      if (field?.required) item.required = field?.required
      return item
    })
    setScheme(nextScheme)
    onSchemeSearch && onSchemeSearch(nextScheme)
  }

  const handleAddCondition = () => {
    if (fields.length) {
      const nextScheme = cloneDeep(scheme)
      const { name: fieldName, operators, assignOptions } = fields.filter(({ required }: IField) => !required)[0]
      const operator = operators?.props.defaultValue
      const defaultValue = (assignOptions[operator] || assignOptions.default)?.props.defaultValue
      nextScheme.items.push({
        operator,
        fieldName,
        value: defaultValue,
      })
      setScheme(nextScheme)
    }
  }

  const handleDeleteCondition = (index: number) => {
    const nextScheme = cloneDeep(scheme)
    nextScheme.items.splice(index, 1)
    setScheme(nextScheme)
  }

  const handleChangeField = (index: number, fieldName: string) => {
    const nextScheme = cloneDeep(scheme)
    const { operators, assignOptions } = fields.find(({ name }: IField) => name === fieldName) as IField
    const operator = operators?.props.defaultValue
    const defaultValue = (assignOptions[operator] || assignOptions.default)?.props.defaultValue
    nextScheme.items[index] = {
      operator,
      fieldName,
      value: defaultValue,
    }
    // debugger
    setScheme(nextScheme)
  }

  const handleChangeOperator = (index: number, assignOptions: Record<string, React.ReactElement>, operator: string) => {
    const nextScheme = cloneDeep(scheme)
    const defaultValue = (assignOptions[operator] || assignOptions.default)?.props.defaultValue
    nextScheme.items[index] = { ...nextScheme.items[index], operator, value: defaultValue }
    setScheme(nextScheme)
  }

  const handleChangeOption = (index: number, value: any) => {
    const nextScheme = cloneDeep(scheme)
    const realValue = value.target !== undefined ? value.target.value : value
    nextScheme.items[index] = { ...nextScheme.items[index], value: realValue }
    setScheme(nextScheme)
  }

  const handleChangeSchemeName = (e: { target: { value: string } }) => {
    const nextScheme = cloneDeep(scheme)
    nextScheme.name = e.target.value
    setScheme(nextScheme)
  }

  const handleSearch = () => {
    onSchemeSearch && onSchemeSearch(scheme)
  }

  const SettingMenu = getSchemeSettingMenu && getSchemeSettingMenu(scheme)

  return (
    <ul className={classNames(`${prefixCls}-body-scheme`, { active: props.tab === 'scheme' })}>
      <li>
        <span className={`${prefixCls}-body-scheme-label`}>{FilterLangMsg.commonScheme}:</span>
        <ol className={`${prefixCls}-body-scheme-list`}>
          {schemes.map(({ name }) => (
            // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
            <li
              key={name}
              className={classNames(`${prefixCls}-body-scheme-item`, { active: name === scheme.name })}
              onClick={handleSwitchScheme.bind(null, name)}
            >
              {name}
            </li>
          ))}
        </ol>
        {SettingMenu && scheme.name && (
          <div className={`${prefixCls}-body-scheme-action`}>
            <Dropdown menu={SettingMenu} trigger="click" placement="bottomRight">
              <Button type="ghost" size="small">
                {FilterLangMsg.settings}
              </Button>
            </Dropdown>
          </div>
        )}
      </li>
      <li>
        <span className={`${prefixCls}-body-scheme-label`}>{FilterLangMsg.advancedQuery}：</span>
        <ol className={`${prefixCls}-body-scheme-detail`}>
          {scheme.items.map(({ fieldName, operator, value, required }, index) => {
            const field = fields.find(({ name }) => name === fieldName)
            return (
              <li key={index}>
                <span className={`${prefixCls}-body-scheme-detail-field`}>
                  {required ? (
                    field?.label
                  ) : (
                    <Select
                      borderType="bordered"
                      style={{ width: '100%' }}
                      value={fieldName}
                      onChange={handleChangeField.bind(null, index)}
                    >
                      {fields.map(({ name, label }: IField) => (
                        <Option key={name} value={name} title={label}>
                          {label}
                        </Option>
                      ))}
                    </Select>
                  )}
                </span>
                <span className={`${prefixCls}-body-scheme-detail-operator`}>
                  {field?.operators &&
                    React.cloneElement(field.operators, {
                      value: operator,
                      style: { width: '100%' },
                      onChange: handleChangeOperator.bind(null, index, field.assignOptions),
                    })}
                </span>
                <span className={`${prefixCls}-body-scheme-detail-value`}>
                  {field?.assignOptions &&
                    React.cloneElement(field.assignOptions[operator] || field.assignOptions.default, {
                      value: value,
                      style: { width: '100%' },
                      onChange: handleChangeOption.bind(null, index),
                    })}
                </span>
                <span className={`${prefixCls}-body-scheme-detail-and`}>{FilterLangMsg.and}</span>
                {!required && (
                  <span
                    className={`${prefixCls}-body-scheme-detail-delete`}
                    onClick={handleDeleteCondition.bind(null, index)}
                  >
                    <Icon type="close-solid" />
                  </span>
                )}
              </li>
            )
          })}
          <li>
            <Button type="primary" ghost size="small" onClick={handleAddCondition}>
              <Icon type="add" style={{ verticalAlign: 'top', marginRight: 5 }} />
              {FilterLangMsg.addCondition}
            </Button>
          </li>
        </ol>
      </li>
      {onSchemeSave && (
        <li>
          <span className={`${prefixCls}-body-scheme-label`}>{FilterLangMsg.schemeName}：</span>
          <div className={`${prefixCls}-body-scheme-edit`}>
            <Input
              borderType="bordered"
              placeholder={FilterLangMsg.schemeNamePlaceholder}
              style={{ width: 200 }}
              value={scheme.name}
              onChange={handleChangeSchemeName}
            />
            <Button type="ghost" style={{ marginLeft: 12 }} onClick={onSchemeSave.bind(null, scheme)}>
              {FilterLangMsg.saveScheme}
            </Button>
          </div>
          <div className={`${prefixCls}-body-scheme-action`}>
            <Button type="primary" onClick={handleSearch}>
              {FilterLangMsg.query}
            </Button>
          </div>
        </li>
      )}
    </ul>
  )
}

export default SchemeFilter
