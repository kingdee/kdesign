/**
 * 获取元素的内容
 * @param {HTMLElement} element
 * @return {string}
 */
const getContent = (element: HTMLElement): string => {
  let content: string

  if (element.nodeName === 'SELECT') {
    content = (element as HTMLSelectElement).value
  } else if (element.nodeName === 'INPUT') {
    content = (element as HTMLInputElement).value
  } else if (element.nodeName === 'TEXTAREA') {
    content = (element as HTMLTextAreaElement).value
  } else {
    // 其他类型通过 select 与 range 来获取文本

    // 获取 select
    const selection = window.getSelection()!
    // 创建 range
    const range = document.createRange()

    // 设置 range 的元素
    range.selectNodeContents(element)
    // 重置 select
    selection.removeAllRanges()
    // 设置 select 的 range
    selection.addRange(range)
    // 获取选中的文本
    content = selection.toString()

    // 获取到文本后清空选中范围
    selection.removeAllRanges()
  }

  return content
}

/**
 * 清空元素的内容
 * @param {HTMLElement} element
 */
const clearElement = (element: HTMLElement): void => {
  if (element.nodeName === 'SELECT') {
    ;(element as HTMLSelectElement).value = ''
  } else if (element.nodeName === 'INPUT') {
    ;(element as HTMLInputElement).value = ''
  } else if (element.nodeName === 'TEXTAREA') {
    ;(element as HTMLTextAreaElement).value = ''
  } else {
    element.innerHTML = ''
  }
}

/**
 * 由将被复制的文本为 value 创建一个 HTMLTextAreaElement 容器
 * @param {String} value
 * @return {HTMLTextAreaElement}
 */
const createContainer = (value: string): HTMLTextAreaElement => {
  const isRTL = document.documentElement.getAttribute('dir') === 'rtl'
  const container = document.createElement('textarea')
  // 防止在 ios 上缩放
  container.style.fontSize = '12pt'
  // 重置样式
  container.style.border = '0'
  container.style.padding = '0'
  container.style.margin = '0'
  // 把元素定位在视窗外
  container.style.position = 'absolute'
  container.style[isRTL ? 'right' : 'left'] = '-9999px'
  const yPosition = window.pageYOffset || document.documentElement.scrollTop
  container.style.top = `${yPosition}px`
  // 设置为只读
  container.setAttribute('readonly', '')
  // 将文本赋值给元素
  container.value = value
  document.body.appendChild(container)
  return container
}

/**
 * 删除元素
 * @param {HTMLElement} container
 */
const removeContainer = (container: Element): void => {
  document.body.removeChild(container)
}

/**
 * 添加选中状态
 * @param {HTMLElement} element
 */
const addSelection = (element: Element): void => {
  // 在 Firefox, Edge (非 Chromium 版本) 及 Internet Explorer 中，getSelection() 对 <textarea> 及 <input> 元素不起作用
  // 使用 select 对 <textarea> 及 <input> 单独处理
  if (element.nodeName === 'INPUT') {
    ;(element as HTMLInputElement).select()
  } else if (element.nodeName === 'TEXTAREA') {
    ;(element as HTMLTextAreaElement).select()
  } else {
    const selection = window.getSelection()!
    const range = document.createRange()
    range.selectNodeContents(element)
    selection.removeAllRanges()
    selection.addRange(range)
  }
}

/**
 * 移除选中状态
 * @param {HTMLElement} element
 */
const removeSelection = (element: Element): void => {
  // 在 Firefox, Edge (非 Chromium 版本) 及 Internet Explorer 中，getSelection() 对 <textarea> 及 <input> 元素不起作用
  // 使用 setSelectRange 对 <textarea> 及 <input> 单独处理
  if (element.nodeName === 'INPUT') {
    ;(element as HTMLInputElement).setSelectionRange(0, 0)
  } else if (element.nodeName === 'TEXTAREA') {
    ;(element as HTMLTextAreaElement).setSelectionRange(0, 0)
  } else {
    window.getSelection()?.removeAllRanges()
  }
}

/**
 * 剪贴板复制操作
 * @param {string | HTMLElement} target
 * @return {string}
 */
const onClipboardCopy = (target: string | HTMLElement): string => {
  let copiedValue: string
  if (typeof target === 'string') {
    // 如果传的是字符串，直接复制值
    copiedValue = target
    if (navigator.clipboard) {
      // navigator.clipboard api 存在时，优先使用其进行复制操作
      if (copiedValue !== '') {
        navigator.clipboard.writeText(copiedValue).then(null, () => {
          throw new Error(`failed to copy to clipboard of value '${copiedValue}'`)
        })
      }
    } else {
      const container = createContainer(copiedValue)
      addSelection(container)
      document.execCommand('copy')
      removeSelection(container)
      removeContainer(container)
    }
  } else {
    // 通过元素来复制
    copiedValue = getContent(target)
    if (navigator.clipboard) {
      if (copiedValue !== '') {
        navigator.clipboard.writeText(copiedValue).then(null, () => {
          throw new Error(`failed to copy to clipboard of value '${copiedValue}'`)
        })
      }
    } else {
      addSelection(target)
      document.execCommand('copy')
      removeSelection(target)
    }
  }
  return copiedValue
}

/**
 * 剪贴板剪切操作
 * @param {HTMLElement} target
 * @return {string}
 */
const onClipboardCut = (target: HTMLElement): string => {
  const cutValue: string = getContent(target)
  if (target.nodeName === 'SELECT' || target.nodeName === 'INPUT' || target.nodeName === 'TEXTAREA') {
    // 对于输入框，使用 document.execCommand('cut') 来剪切，防止受控的输入框无法清空内容
    if (document.execCommand) {
      addSelection(target)
      document.execCommand('cut')
      removeSelection(target)
    } else {
      // document.execCommand 命令不兼容，则抛出异常，因为受控的输入框无法清空元素内容
      throw new Error(`failed to cut to clipboard through unavailable api "document.execCommand"`)
    }
  } else {
    // 对于其他标签的元素，使用 navigator 写入剪贴板，并手动清空内容，防止其他标签无法清空内容
    if (navigator.clipboard) {
      if (cutValue !== '') {
        navigator.clipboard.writeText(cutValue).then(null, () => {
          throw new Error(`failed to cut to clipboard of value '${cutValue}'`)
        })
      }
      clearElement(target)
    } else {
      // navigator.clipboard 命令不兼容，则抛出异常，因为非输入框无法适用 document.execCommand('cut')
      throw new Error(`failed to cut to clipboard through unavailable api "navigator.clipboard"`)
    }
  }
  return cutValue
}

export { onClipboardCopy, onClipboardCut }
