/**
 * 获取元素的内容
 * @param {HTMLElement} element
 * @return {string}
 */
const getElementValue = (element: HTMLElement): string => {
  let selectedText

  if (element.nodeName === 'SELECT') {
    selectedText = (element as HTMLSelectElement).value
  } else if (element.nodeName === 'INPUT') {
    selectedText = (element as HTMLInputElement).value
  } else if (element.nodeName === 'TEXTAREA') {
    selectedText = (element as HTMLTextAreaElement).value
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
    selectedText = selection.toString()

    // 获取到文本后，就可以清空选中范围了
    selection.removeAllRanges()
  }

  return selectedText
}

/**
 * 清空元素的内容
 * @param {HTMLElement} element
 */
const clearElementValue = (element: HTMLElement): void => {
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
 * 复制值
 * @param {string} value
 */
const copyValue = (value: string): void => {
  if (value === '') {
    // 如果值为空字符串，则不写入剪贴板
    return
  }
  navigator.clipboard.writeText(value).then(null, () => {
    throw new Error(`failed to copy to clipboard of value '${value}'`)
  })
}

/**
 * 通过元素来复制
 * @param {HTMLElement} element
 * @return {string}
 */
const copyByElement = (element: HTMLElement): string => {
  // 获取元素的文本
  const copiedValue = getElementValue(element)
  // 复制文本
  copyValue(copiedValue)

  return copiedValue
}

/**
 * 通过值来剪切
 * @param {HTMLElement} element
 * @return {string}
 */
const cutByValue = (element: HTMLElement): string => {
  // 获取元素的值
  const cutValue = getElementValue(element)
  // 复制元素的值
  copyValue(cutValue)
  // 手动清除元素的值
  clearElementValue(element)

  return cutValue
}

/**
 * 通过元素来剪切
 * @param {HTMLElement} element
 * @return {string}
 */
const cutByElement = (element: HTMLElement): string => {
  // 选中克隆的 element，并返回其文本
  const cutValue = getElementValue(element)
  // 选中元素
  if (element.nodeName === 'SELECT') {
    ;(element as HTMLSelectElement).focus()
  } else if (element.nodeName === 'INPUT') {
    ;(element as HTMLInputElement).select()
  } else if (element.nodeName === 'TEXTAREA') {
    ;(element as HTMLTextAreaElement).select()
  }
  // 剪切选中内容
  document.execCommand('cut')
  return cutValue
}

/**
 * 剪贴板复制操作
 * @param {string | HTMLElement} target
 * @return {string}
 */
const onClipboardCopy = (target: string | HTMLElement): string => {
  let copiedValue
  if (typeof target === 'string') {
    // 如果传的是字符串，直接复制值
    copiedValue = target
    copyValue(target)
  } else {
    // 通过元素来复制
    copiedValue = copyByElement(target)
  }
  return copiedValue
}

/**
 * 剪贴板剪切操作
 * @param {HTMLElement} target
 * @return {string}
 */
const onClipboardCut = (target: HTMLElement): string => {
  let cutValue
  if (target.nodeName === 'SELECT' || target.nodeName === 'INPUT' || target.nodeName === 'TEXTAREA') {
    // 对于输入框，通过 document.execCommand('cut') 来剪切
    // 防止受控的输入框无法清空内容
    cutValue = cutByElement(target)
  } else {
    // 对于其他标签的元素，通过 navigator 写入剪贴板，并手动清空内容
    // 防止其他标签无法清空内容
    cutValue = cutByValue(target)
  }
  return cutValue
}

export { onClipboardCopy, onClipboardCut }
