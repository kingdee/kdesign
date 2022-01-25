import compDefaultProps from '../config-provider/compDefaultProps' // kdesign提供组件默认属性
/**
 * 结合compDefaultProps、用户自定义默认属性和组件当前属性获取组件实际应用属性
 * @param {keyof typeof compDefaultProps} compName 组件名
 * @param {any} userDefaultProps 用户自定义组件默认属性
 * @param {any} compProps 组件接收到的属性
 */
export const getCompProps = (compName: keyof typeof compDefaultProps, userDefaultProps?: any, compProps?: any): any => {
  const defaultProps = compDefaultProps[compName]
  const userProps = (userDefaultProps && userDefaultProps[compName]) || {}
  return Object.assign({}, defaultProps, userProps, compProps || {})
}
