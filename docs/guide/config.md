---
order: 4
title: ConfigProvider 全局化配置
---

为组件提供统一的全局化配置以及修改组件默认配置属性。

## 使用

ConfigProvider 使用 React 的 context 特性，只需在应用外围包裹一次即可全局生效。

```js
import { ConfigProvider } from '@kdcloudjs/kdesign';

// ...

const myConfig = {
  compDefaultProps: {
    Input: {
      borderType: 'bordered'
    }
  }
}

export default () => (
  <ConfigProvider value={myConfig}>
    <App />
  </ConfigProvider>
);
```

## 默认配置

```js
/**
 * 所有组件的默认属性
 */
const compDefaultProps = {
  Alert: {
    type: 'warning',
    showIcon: false,
    closable: false,
    delayOffTime: 5000,
    banner: false,
    bannerOffset: [0, 0],
  },
  Button: {
    type: 'second',
    iconPlace: 'left',
    size: 'middle',
    bordered: true,
  },
  Card: {
    hoverable: false,
    selectable: false,
  },
  Carousel: {
    autoplay: false,
    dotPosition: 'bottom',
    dots: true,
    easing: 'cubic-bezier(0.4,0,0.6,1)',
    effect: 'scrollx',
    intervalTime: 4000,
  },
  Cascader: {
    allowClear: true,
    expandTrigger: 'click',
    notFoundContent: 'No Data',
    popupPlacement: 'bottomLeft',
    dropdownRender: (menus: React.ReactNode) => menus,
    displayRender: (labels: string[]) => labels.join('/'),
    fieldNames: { label: 'label', value: 'value', children: 'children' },
  },
  Col: {},
  Collapse: {
    accordion: false,
    expandIconPosition: 'left',
    bordered: false,
  },
  CollapsePanel: {
    disabled: false,
  },
  Checkbox: {
    defaultChecked: false,
    checkboxType: 'default',
    indeterminate: false,
    disabled: false,
    size: 'middle',
  },
  CheckboxGroup: { checkboxType: 'default', disabled: false },
  Dropdown: {
    arrow: false,
    placement: 'bottomLeft',
    trigger: 'hover',
  },
  DropdownItem: {},
  DropdownMenu: {},
  DatePicker: {
    allowClear: true,
    autoFocus: false,
    borderType: 'underline',
    disabled: false,
    inputReadOnly: false,
    picker: 'date',
    popupStyle: {},
    size: 'middle',
    showToday: false,
    style: {},
    showArrow: true,
    defaultOpen: false,
    showWeeksTitle: true,
    yearItemNumber: 15,
    hourStep: 1,
    minuteStep: 1,
    secondStep: 1,
  },
  Drawer: {
    closable: true,
    destroyOnClose: false,
    forceRender: false,
    getContainer: document.body,
    height: 220,
    keyboard: true,
    mask: true,
    maskClosable: true,
    placement: 'right',
    width: 365,
    zIndex: 1050,
  },
  Empty: {},
  Filter: {
    fields: [],
    schemes: [],
    defaultTabKey: 'condition',
  },
  Form: {
    layout: 'vertical',
    labelAlign: 'left',
    size: 'middle',
  },
  Icon: {
    prefix: 'kdicon',
  },
  Input: {
    type: 'text',
    size: 'middle',
    borderType: 'underline',
  },
  Select: {
    size: 'middle',
    borderType: 'underline',
    mode: 'single',
    defaultOpen: false,
    showArrow: true,
    showSearch: false,
  },
  Image: {
    preview: true,
  },
  InputNumber: {
    type: 'text',
    size: 'middle',
    borderType: 'underline',
    minMark: '(',
    maxMark: ']',
    zeroShow: false,
    showDecimalTailZero: false,
    mask: '',
    mustInScope: false,
    mustInPrecisionScope: true,
  },
  Layout: {},
  Modal: {
    type: 'normal',
    keyboard: true,
    mask: true,
    maskClosable: true,
    closable: true,
    getContainer: document.body,
    footerBtnOrder: 'normal',
    width: 460,
    height: 340,
    focusTriggerAfterClose: true,
    destroyOnClose: false,
    draggable: true,
    cancelButtonProps: {},
    okButtonProps: {},
    showline: true,
  },
  Menu: {
    mode: 'vertical',
    inlineIndent: 50,
    forceSubMenuRender: false,
    triggerSubMenuAction: 'hover',
    theme: 'dark',
    collapsed: false,
  },
  MenuItem: {
    disabled: false,
  },
  MenuSubMenu: {
    disabled: false,
    popupOffset: [0, 0],
  },
  Message: {},
  Notice: {},
  Notification: {},
  Pagination: {
    total: 0,
    pageType: 'basic',
    defaultCurrent: 1,
    defaultPageSize: 10,
    pageSizeOptions: [10, 20, 50, 100],
    showTitle: true,
    bordered: false,
    hideOnSinglePage: false,
  },
  Popconfirm: {
    icon: false,
    placement: 'top',
    trigger: 'click',
    okType: 'primary',
  },
  Progress: {
    type: 'line',
    // width: 88,
    trailColor: '#E5E5E5',
    percent: 0,
    showInfo: true,
    infoPosition: 'right',
  },
  Radio: {
    checked: false,
    defaultChecked: false,
    disabled: false,
  },
  RadioGroup: {},
  Rate: {
    allowHalf: true,
    icon: function () {
      return <Icon type="star" />
    },
    count: 5,
    defaultValue: 0,
    disabled: false,
    size: 'middle',
  },
  RangePicker: {
    order: true,
    allowClear: true,
    autoFocus: false,
    allowEmpty: [false, false],
    borderType: 'underline',
    disabled: false,
    inputReadOnly: false,
    picker: 'date',
    separator: '~',
    popupStyle: {},
    size: 'middle',
    showArrow: true,
    defaultOpen: false,
    showWeeksTitle: true,
    hourStep: 1,
    minuteStep: 1,
    secondStep: 1,
  },
  Row: {
    align: 'top',
    gutter: 12,
    justify: 'start',
    wrap: true,
  },
  Switch: {
    size: 'small',
    defaultChecked: false,
    disabled: false,
    loading: false,
  },
  Steps: {
    direction: 'horizontal',
    initial: 0,
    labelPlacement: 'bottom',
  },
  Space: {
    direction: 'horizontal',
    size: 'small',
    align: 'center',
  },
  SplitPanel: {
    defaultSplit: 0.5,
    mode: 'horizontal',
    min: 0,
    max: 0,
    canFold: true,
  },
  Spin: {
    type: 'page',
    spinning: true,
  },
  TextArea: {
    size: 'middle',
    defaultValue: '',
    autoSize: true,
    canResize: false,
    borderType: 'underline',
    disabled: false,
    count: true,
    maxLength: 255,
  },
  Timeline: {
    reverse: false,
    mode: '',
    labelWidth: 70,
    lineHeight: 18,
  },
  TimelineItem: {
    color: 'blue',
    pending: false,
    position: '',
  },
  Tree: {
    defaultExpandAll: false,
    defaultExpandRoot: false,
    checkable: false,
    checkStrictly: false,
    disabled: false,
    draggable: false,
    virtual: true,
    switcherIcon: function () {
      return <Icon type="arrow-right-solid" />
    },
  },
  TreeNode: {},
  ToolTip: {
    placement: 'top',
    trigger: 'hover',
  },
  Tabs: {
    type: 'line',
    size: 'middle',
  },
  TabPane: {},
  Transfer: {
    dataSource: [],
    locale: {},
    showSearch: false,
    listStyle: {},
  },
  Tag: {
    type: 'status',
    closable: false,
    clickable: false,
    disabled: false,
    size: 'middle',
  },
  Upload: {
    multiple: false,
    disabled: false,
    directory: false,
    method: 'post',
    name: 'file',
    type: 'select',
    listType: 'text',
    showUploadList: true,
    withCredentials: false,
  },
  ViewContainer: {},
  Typography: {},
  Search: {
    size: 'middle',
    borderType: 'underline',
    type: 'basis',
    disabled: false,
  },
  Badge: {},
  Anchor: {
    type: 'bookmarks',
    affix: true,
  },
  Stepper: {
    size: 'middle',
    step: 1,
    borderType: 'bordered',
  },
}
```
