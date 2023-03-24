/* @remove-on-es-build-begin */
// this file is not used if use https://github.com/ant-design/babel-plugin-import
const ENV = process.env.NODE_ENV
if (
  ENV !== 'production' &&
  ENV !== 'test' &&
  typeof console !== 'undefined' &&
  console.warn && // eslint-disable-line no-console
  typeof window !== 'undefined'
) {
  // eslint-disable-next-line no-console
  console.warn(
    'You are using a whole package of kdesign, please use https://www.npmjs.com/package/babel-plugin-import to reduce app bundle size.',
  )
}
/* @remove-on-es-build-end */
export { default as Alert } from './alert'

export { default as Button } from './button'

export { default as Card } from './card'

export { default as Collapse } from './collapse'

export { default as Checkbox } from './checkbox'

export { default as ConfigProvider } from './config-provider'

export { default as Carousel } from './carousel'

export { default as Cascader } from './cascader'

export { default as Dropdown } from './dropdown'

export { default as DatePicker, RangePicker } from './date-picker'

export { default as Drawer } from './drawer'

export { default as Empty } from './empty'

export { default as Filter } from './filter'

export { default as Form } from './form'

export { Row, Col } from './grid'

export { default as Input, TextArea } from './input'

export { default as InputNumber } from './input-number'

export { default as Icon } from './icon'

export { default as Image } from './image'

export { default as Layout } from './layout'

export { default as Modal } from './modal'

export { default as Menu } from './menu'

export { default as Message } from './message'

export { default as Notification } from './notification'

export { default as Pagination } from './pagination'

export { default as Progress } from './progress'

export { default as Popconfirm } from './popconfirm'

export { default as Radio } from './radio'

export { default as Rate } from './rate'

export { default as Select } from './select'

export { default as Switch } from './switch'

export { default as Steps, Step } from './steps'

export { default as Space } from './space'

export { default as SplitPanel } from './split-panel'

export { default as Spin } from './spin'

export { default as Timeline } from './timeline'

export { default as Tooltip } from './tooltip'

export { default as Tabs } from './tabs'

export { default as Transfer } from './transfer'

export { default as Tree } from './tree'

export { default as TreeNode } from './tree/treeNode'

export { default as Tag } from './tag'

export { default as Upload } from './upload'

export { default as Typography } from './typography'

export { default as Search } from './search'

export { default as Badge } from './badge'

export { default as ImageCropper } from './image-cropper'

export { default as CityPicker } from './city-picker'

export { default as Anchor } from './anchor'

export { default as Avatar } from './avatar'

export { default as Slider } from './slider'

export { default as Table } from './table'

export { default as Stepper } from './stepper'

export { default as BaseData } from './base-data'

export { default as Link } from './link'

export { default as TreeSelect } from './tree-select'

export { default as ColorPicker } from './color-picker'
