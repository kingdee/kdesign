import React from 'react'
import { mount, render } from 'enzyme'
import Filter from '../index'
import mountTest from '../../../tests/shared/mountTest'
import Select from '../../select'
import DatePicker from '../../date-picker'
import RangePicker from '../../date-picker/range-picker'
import { IField } from '../interface'

const { Option } = Select

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
      { value: 'status8', label: '● 下版处理' },
      { value: 'status9' },
      {},
      { value: 'status10', label: '● 已转需求' },
    ],
  },
  {
    key: 'project',
    label: '项目组',
    required: true,
    options: [
      { value: 'project1', label: 'DataOne大数据平台项目组' },
      { value: 'project2', label: '数据智能项目组' },
      { value: 'project3', label: 'IKD' },
      { value: 'project4', label: '统一平台' },
      { value: 'project5', label: 'KDesign-前端组件库' },
      { value: 'project6', label: '流程服务项目组' },
      { value: 'project7', label: '云架构项目组' },
      { value: 'project8', label: '轻分析项目组' },
      { value: 'project9', label: '前端技术项目组' },
      { value: 'project10', label: '基础数据项目组' },
      { value: 'project11', label: '集成服务项目组' },
      { value: 'project12', label: '税务管理项目组' },
      { value: 'project13', label: '产品总监项目组' },
      { value: 'project14', label: '发票云项目组' },
      { value: 'project15', label: '物联网应用项目组' },
      { value: 'project16', label: 'IIoT平台项目组' },
      { value: 'project17', label: '项目赋能组' },
      { value: 'project18', label: '渠道云项目组' },
      { value: 'project19', label: '电商云项目组' },
      { value: 'project20', label: '开放平台项目组' },
    ],
  },
  {
    key: 'date',
    label: '日期',
    options: [
      { value: 'today', label: '今天' },
      { value: 'thisWeek', label: '本周' },
      { value: 'thisMonth', label: '本月' },
      { value: 'nearlyThreeMonths', label: '近三个月' },
      { value: 'nearlyYear', label: '近一年' },
      {
        label: '自定义',
        component: (
          <RangePicker
            borderType="bordered"
            style={{ margin: '-4px 0' }}
            allowClear={false}
            disabledDate={(date) => date && date > new Date()}
          />
        ),
      },
    ],
  },
]

const conditions1 = [
  {
    key: 'organization',
    label: '组织',
    multiple: true,
    options: [
      { value: 'organ1', label: '环球日化深圳销售部' },
      { value: 'organ2', label: '用户体验部' },
      { value: 'organ3', label: '前端开发项目部' },
      { value: 'organ4', label: '环球集团广州销售部' },
    ],
  },
  {
    key: 'project',
    label: '项目组',
    multiple: true,
    options: [
      { value: 'project2', label: '数据智能项目组' },
      { value: 'project3', label: 'IKD' },
      { value: 'project4', label: '统一平台' },
      { value: 'project5', label: 'KDesign-前端组件库' },
      { value: 'project6', label: '流程服务项目组' },
      { value: 'project7', label: '云架构项目组' },
      { value: 'project8', label: '轻分析项目组' },
    ],
  },
  {
    key: 'date',
    label: '日期',
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

const schemes = [
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

const defaultValue = {
  organization: ['organ2', 'organ3'],
  date: ['nearlyThreeMonths'],
}

describe('Filter', () => {
  mountTest(Filter)

  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('renders correctly', () => {
    expect(render(<Filter title="Filter Test" />)).toMatchSnapshot()
    expect(render(<Filter conditions={conditions} title="Filter Test" />)).toMatchSnapshot()
    expect(render(<Filter conditions={conditions} title="Filter Test" schemes={schemes} />)).toMatchSnapshot()
    expect(
      render(<Filter conditions={conditions} title="Filter Test" schemes={schemes} fields={fields as IField[]} />),
    ).toMatchSnapshot()

    expect(
      render(
        <Filter
          conditions={conditions}
          title="Filter Test"
          schemes={schemes}
          fields={fields as IField[]}
          search={searchProps}
        />,
      ),
    ).toMatchSnapshot()
  })

  it('should have displayName static property', () => {
    const wrapper = mount(<Filter />)
    expect((wrapper.type() as any).displayName).toBe('Filter')
  })

  it('set default value', () => {
    const wrapper = mount(<Filter conditions={conditions1} defaultValue={defaultValue} />)
    expect(wrapper.find('.kd-filter-header-condition-item-text')).toHaveLength(2)
    expect(wrapper.find('.kd-filter-header-condition-item-text').at(0)).toHaveText('组织：用户体验部,前端开发项目部')
    expect(wrapper.find('.kd-filter-header-condition-item-text').at(1)).toHaveText('日期：近三个月')
    wrapper.find('.kd-filter-body-condition').at(0).find('.kd-filter-body-condition-option').at(0).simulate('click')
    wrapper.find('.kd-filter-body-condition').at(1).find('.kd-filter-body-condition-option').at(0).simulate('click')
    wrapper.find('.kd-filter-body-condition').at(2).find('.kd-filter-body-condition-option').at(0).simulate('click')
    expect(wrapper.find('.kd-filter-header-condition-item-text')).toHaveLength(0)
  })

  it('set value null', () => {
    const wrapper = mount(<Filter conditions={conditions1} value={null as any} defaultValue={defaultValue} />)
    expect(wrapper.find('.kd-filter-header-condition-item-text')).toHaveLength(0)
  })

  it('control the value', () => {
    const onChange = jest.fn()
    const wrapper = mount(<Filter conditions={conditions} value={defaultValue} onChange={onChange} />)
    wrapper.setProps({
      value: { organization: ['organ1'], project: ['project1', 'test'], date: ['2021-09-01至2021-09-02'] },
    })
    wrapper.find('.kd-filter-body-condition').at(0).find('.kd-filter-body-condition-option').at(1).simulate('click')
    wrapper.find('.kd-filter-body-condition').at(0).find('.kd-filter-body-condition-option').at(0).simulate('click')
    wrapper.find('.kd-filter-body-condition').at(0).find('.kd-filter-body-condition-option').at(1).simulate('click')

    wrapper.find('.kd-filter-body-condition').at(1).find('.kd-filter-body-condition-option').at(1).simulate('click')
    wrapper.find('.kd-filter-body-condition').at(1).find('.kd-filter-body-condition-option').at(2).simulate('click')
    wrapper.find('.kd-filter-body-condition').at(1).find('.kd-filter-body-condition-option').at(2).simulate('click')
    wrapper.find('.kd-filter-body-condition').at(1).find('.kd-filter-body-condition-option').at(1).simulate('click')
    wrapper.find('.kd-filter-body-condition').at(1).find('.kd-filter-body-condition-option').at(3).simulate('click')
    wrapper.find('.kd-filter-body-condition').at(1).find('.kd-filter-body-condition-option').at(0).simulate('click')

    wrapper.find('.kd-filter-body-condition').at(2).find('.kd-filter-body-condition-option').at(0).simulate('click')
    wrapper.find('.kd-filter-body-condition').at(2).find('.kd-filter-body-condition-option').at(1).simulate('click')

    wrapper.find('.kd-filter-body-condition').at(3).find('.kd-filter-body-condition-option').at(5).simulate('click')
    wrapper.find('.kd-filter-body-condition').at(3).find('.kd-filter-body-condition-option').at(3).simulate('click')
    wrapper.find('.kd-filter-body-condition').at(3).find('.kd-filter-body-condition-option').at(3).simulate('click')
    expect(onChange).toHaveBeenCalledTimes(14)
  })

  it('remove the condition from the value', () => {
    const onChange = jest.fn()
    const wrapper = mount(<Filter conditions={conditions} defaultValue={defaultValue} onChange={onChange} />)
    wrapper.find('.kd-tag-closeWrapper').simulate('click')
    expect(onChange).toHaveBeenCalled()
  })

  it('select the scheme', () => {
    const onChange = jest.fn()
    const wrapper = mount(<Filter conditions={conditions} schemes={schemes} value={defaultValue} onChange={onChange} />)
    wrapper.setProps({ value: { scheme: schemes[0] } })
    wrapper.find('.kd-filter-body-tabs-item').last().simulate('click')
    wrapper.find('.kd-filter-body-scheme-item').at(0).simulate('click')
    expect(onChange).toHaveBeenCalled()
  })

  it('control the spread', () => {
    const onSpreadChange = jest.fn()
    const wrapper = mount(
      <Filter conditions={conditions} defaultValue={defaultValue} onSpreadChange={onSpreadChange} />,
    )
    wrapper.find('.kd-filter-header-handle').at(0).simulate('click')
    wrapper.setProps({ spread: true })
    expect(onSpreadChange).toHaveBeenCalled()
  })
})
