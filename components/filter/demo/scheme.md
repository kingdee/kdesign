---
title: 方案查询
order: 7
---

切换到方案页签，选择方案进行过滤

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Filter, Dropdown, Select, DatePicker, RangePicker, Message } from '@kdcloudjs/kdesign'

function Demo() {
  const conditions = [
    {
      key: 'organization',
      label: '组织',
      required: true,
      multiple: true,
      options: [
        { value: 'organ1', label: '环球日化深圳销售部' },
        { value: 'organ2', label: '用户体验部' },
        { value: 'organ3', label: '前端开发项目部' },
        { value: 'organ4', label: '环球集团广州销售部' },
      ],
    },
    {
      key: 'status',
      label: '缺陷状态',
      multiple: true,
      options: [
        { value: 'status1', label: '● 计划' },
        { value: 'status2', label: '● 待修复' },
        { value: 'status3', label: '● 阻塞' },
        { value: 'status4', label: '● 修复中' },
        { value: 'status5', label: '● 修复完成' },
        { value: 'status6', label: '● 验证通过' },
        { value: 'status7', label: '● 失效' },
      ],
    },
    {
      key: 'project',
      label: '项目组',
      multiple: true,
      options: [
        { value: 'project1', label: 'DataOne大数据平台项目组' },
        { value: 'project2', label: '数据智能项目组' },
        { value: 'project3', label: 'IKD' },
        { value: 'project4', label: '统一平台' },
        { value: 'project5', label: 'KDesign-前端组件库' },
        { value: 'project6', label: '流程服务项目组' },
        { value: 'project7', label: '云架构项目组' },
      ],
    },
    {
      key: 'date',
      label: '日期',
      required: true,
      options: [
        { value: 'today', label: '今天' },
        { value: 'thisWeek', label: '本周' },
        { value: 'thisMonth', label: '本月' },
        { value: 'nearlyThreeMonths', label: '近三个月' },
        { value: 'nearlyYear', label: '近一年' },
      ],
    },
  ]

  const searchProps = {
    tags: [
      { value: 'label', tag: '名称' },
      { value: 'code', tag: '编码' },
    ],
    onChange: (_, option) => console.log(option),
  }

  const operators = [
    { value: '==', label: '等于' },
    { value: '!=', label: '不等于' },
    { value: '>', label: '大于' },
    { value: '<', label: '小于' },
    { value: '>=', label: '大于等于' },
    { value: '<=', label: '小于等于' },
    { value: '>= && <=', label: '从...到...' },
  ]

  const employees = [
    { value: '0001', label: '刘一' },
    { value: '0002', label: '陈二' },
    { value: '0003', label: '张三' },
    { value: '0004', label: '李四' },
    { value: '0005', label: '王五' },
    { value: '0006', label: '赵六' },
    { value: '0007', label: '孙七' },
    { value: '0008', label: '周八' },
    { value: '0009', label: '吴九' },
    { value: '0010', label: '郑十' },
  ]

  const times = [
    { value: 'today', label: '今天' },
    { value: 'yesterday', label: '昨天' },
    { value: 'thisWeek', label: '本周' },
    { value: 'lastWeek', label: '上周' },
    { value: 'thisMonth', label: '本月' },
    { value: 'lastMonth', label: '上月' },
    { value: 'pastThreeMonth', label: '过去三个月' },
    { value: 'pastYear', label: '过去一年' },
  ]

  const status = [
    { value: 'plan', label: '计划' },
    { value: 'toRepair', label: '待修复' },
    { value: 'repairing', label: '修复中' },
    { value: 'complete', label: '修复完成' },
    { value: 'toVerify', label: '待验证' },
    { value: 'verified', label: '验证通过' },
    { value: 'blocked', label: '阻塞' },
    { value: 'invalid', label: '失效' },
    { value: 'demand', label: '已转需求' },
  ]

  const TimeOperators = (
    <Select borderType="bordered" defaultValue={operators[0].value}>
      {operators.map(({ value, label }) => (
        <Option key={value} value={value} title={label}>
          {label}
        </Option>
      ))}
    </Select>
  )

  const TimeEqualOptions = (
    <Select borderType="bordered" defaultValue={times[0].value}>
      {times.map(({ value, label }) => (
        <Option key={value} value={value} title={label}>
          {label}
        </Option>
      ))}
    </Select>
  )

  const TimeDateOptions = <DatePicker borderType="bordered" />

  const TimeRangeOptions = <RangePicker borderType="bordered" />

  const Operators = (
    <Select borderType="bordered" defaultValue={operators[0].value}>
      {operators.map(({ value, label }) => (
        <Option key={value} value={value} title={label}>
          {label}
        </Option>
      ))}
    </Select>
  )

  const Employees = (
    <Select borderType="bordered" defaultValue={employees[0].value}>
      {employees.map(({ value, label }) => (
        <Option key={value} value={value} title={label}>
          {label}
        </Option>
      ))}
    </Select>
  )

  const fields = [
    {
      name: 'find.time',
      label: '发现时间',
      required: true,
      operators: TimeOperators,
      assignOptions: {
        '==': TimeEqualOptions,
        '!=': TimeEqualOptions,
        '>= && <=': TimeRangeOptions,
        default: TimeDateOptions,
      },
    },
    {
      name: 'finder.empno',
      label: '发现人.工号',
      operators: Operators,
      assignOptions: { default: Employees },
    },
    {
      name: 'processor.empno',
      label: '处理人.工号',
      operators: Operators,
      assignOptions: { default: Employees },
    },
    {
      name: 'repairer.empno',
      label: '修复人.工号',
      operators: Operators,
      assignOptions: { default: Employees },
    },
    {
      name: 'verifier.empno',
      label: '验证人.工号',
      operators: Operators,
      assignOptions: { default: Employees },
    },
    {
      name: 'status',
      label: '状态',
      operators: Operators,
      assignOptions: {
        default: (
          <Select borderType="bordered" defaultValue={status[0].value}>
            {status.map(({ value, label }) => (
              <Option key={value} value={value} title={label}>
                {label}
              </Option>
            ))}
          </Select>
        ),
      },
    },
  ]

  const defaultSchemes = [
    {
      name: '我创建的',
      preset: true,
      items: [
        { fieldName: 'find.time', operator: '==', value: 'pastYear' },
        { fieldName: 'finder.empno', operator: '==', value: '0001' },
        { fieldName: 'status', operator: '!=', value: 'invalid' },
      ],
    },
    {
      name: '我处理的',
      preset: true,
      items: [
        { fieldName: 'find.time', operator: '==', value: 'pastYear' },
        { fieldName: 'processor.empno', operator: '==', value: '0001' },
      ],
    },
    {
      name: '我修复的',
      preset: true,
      items: [
        { fieldName: 'find.time', operator: '==', value: 'pastYear' },
        { fieldName: 'repairer.empno', operator: '==', value: '0001' },
      ],
    },
    {
      name: '我验证的',
      preset: true,
      items: [
        { fieldName: 'find.time', operator: '==', value: 'pastYear' },
        { fieldName: 'verifier.empno', operator: '==', value: '0001' },
      ],
    },
  ]
  const [schemes, setSchemes] = React.useState(defaultSchemes)

  const defaultValue = { scheme: defaultSchemes[0] }
  const [value, setValue] = React.useState(defaultValue)

  const handleChange = (value) => {
    console.log('value: ', value)
    setValue(value)
  }

  const handleSchemeSave = (scheme) => {
    if (scheme.name) {
      const nextSchemes = schemes.slice(0)
      const schemeIndex = nextSchemes.findIndex(({ name }) => name === scheme.name)
      if (schemeIndex > -1) {
        if (scheme.preset) {
          Message.error('预置方案不能修改')
        } else {
          nextSchemes.splice(schemeIndex, 1, scheme)
        }
      } else {
        delete scheme.preset
        nextSchemes.push(scheme)
      }

      if (JSON.stringify(schemes) !== JSON.stringify(nextSchemes)) {
        setSchemes(nextSchemes)
        setValue({ scheme })
        Message.success('保存成功')
      }
    } else {
      Message.warning('方案名称不能为空，请检查')
    }
  }

  const handleDropdownClick = (scheme, key) => {
    const mapMsg = {
      setDefault: '设为默认方案',
      share: '分享方案',
    }
    if (key === 'remove') {
      if (scheme.preset) {
        Message.error(`预置方案不能删除`)
      } else {
        const nextSchemes = schemes.filter(({ name }) => name !== scheme.name)
        setSchemes(nextSchemes)
        setValue({})
      }
    } else {
      Message.success(`你点击了 ‘${mapMsg[key]}’ 菜单`)
    }
  }

  const getSchemeSettingMenu = (scheme) => {
    return (
      <Dropdown.Menu onClick={handleDropdownClick.bind(null, scheme)}>
        <Dropdown.Item key="setDefault">设为默认方案</Dropdown.Item>
        <Dropdown.Item key="remove">删除方案</Dropdown.Item>
        <Dropdown.Item key="share">分享方案</Dropdown.Item>
      </Dropdown.Menu>
    )
  }

  return (
    <Filter
      style={{ margin: '0 20px' }}
      title="缺陷列表"
      fields={fields}
      schemes={schemes}
      search={searchProps}
      defaultSpread
      defaultTabKey="scheme"
      conditions={conditions}
      onChange={handleChange}
      value={value}
      onSchemeSave={handleSchemeSave}
      getSchemeSettingMenu={getSchemeSettingMenu}
    />
  )
}

ReactDOM.render(<Demo />, mountNode)
```
