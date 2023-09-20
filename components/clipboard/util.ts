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
  return container
}

/**
 * 选中 Element，并返回其选中的文本内容
 * @param {HTMLElement} element
 * @return {string}
 */
const selectElement = (element: HTMLElement): string => {
  let selectedText

  if (element.nodeName === 'SELECT') {
    element.focus()

    selectedText = (element as HTMLSelectElement).value
  } else if (element.nodeName === 'INPUT' || element.nodeName === 'TEXTAREA') {
    const isReadOnly = element.hasAttribute('readonly')

    if (!isReadOnly) {
      element.setAttribute('readonly', '')
    }

    if (element.nodeName === 'INPUT') {
      ;(element as HTMLInputElement).select()
      ;(element as HTMLInputElement).setSelectionRange(0, (element as HTMLInputElement).value.length)
      selectedText = (element as HTMLInputElement).value
    } else {
      ;(element as HTMLTextAreaElement).select()
      ;(element as HTMLTextAreaElement).setSelectionRange(0, (element as HTMLTextAreaElement).value.length)
      selectedText = (element as HTMLTextAreaElement).value
    }

    if (!isReadOnly) {
      element.removeAttribute('readonly')
    }
  } else {
    if (element.hasAttribute('contenteditable')) {
      element.focus()
    }

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
  }

  return selectedText
}

/**
 * 通过值来复制
 * @param {string} value
 * @return {string}
 */
const copyByValue = (value: string): string => {
  // 以 value 作为文本内容创建一个 HTMLTextAreaElement 临时容器
  const container: HTMLTextAreaElement = createContainer(value)
  // 将临时容器拼接到 body
  document.body.appendChild(container)
  // 选中临时容器，并返回其文本
  const selectedText = selectElement(container)
  try {
    document.execCommand('copy')
  } catch (error) {
    // 不支持 document.execCommand 时的替补方式
    navigator.clipboard.writeText(value).then(null, () => {
      throw new Error(`failed to copy to clipboard of value '${value}'`)
    })
  } finally {
    // 取消焦点
    container.blur()
    // 移除临时容器
    document.body.removeChild(container)
  }
  return selectedText
}

/**
 * 通过元素来复制
 * @param {HTMLElement} element
 * @return {string}
 */
const copyByElement = (element: HTMLElement): string => {
  // 克隆原 element 来进行操作，避免 document.body.contains(element) 返回 false 的情况
  // 在 target.md 中，target 参数用 document.getElementById('div-to-copy') 传参时就会出现返回 false 的情况
  const clonedElement = element.cloneNode(true) as HTMLElement
  // 将克隆出来的 element 拼接到 body 上
  document.body.appendChild(clonedElement)
  // 选中克隆的 element，并返回其文本
  const selectedText = selectElement(clonedElement)
  try {
    document.execCommand('copy')
  } catch (error) {
    // 不支持 document.execCommand 时的替补方式
    navigator.clipboard.writeText(selectedText).then(null, () => {
      throw new Error(`failed to copy to clipboard of element '${element}'`)
    })
  } finally {
    // 取消焦点
    clonedElement.blur()
    // 移除 document.body.contains 返回 false 时临时创建的 element
    document.body.removeChild(clonedElement)
  }
  return selectedText
}

/**
 * 剪贴板复制操作
 * @param {string | HTMLElement} target
 * @return {string}
 */
const onClipboardCopy = (target: string | HTMLElement): string => {
  let selectedText = ''
  if (typeof target === 'string') {
    // 如果传的是字符串，直接通过值来复制
    selectedText = copyByValue(target)
  } else if (
    target instanceof HTMLInputElement &&
    !['text', 'search', 'url', 'tel', 'password'].includes(target.type)
  ) {
    // 如果传的是 input 标签的某些类型，通过值来复制
    selectedText = copyByValue(target.value)
  } else {
    // 其他情况均通过元素来复制
    selectedText = copyByElement(target)
  }
  return selectedText
}

/**
 * 剪贴板剪切操作
 * @param {HTMLElement} target
 * @return {string}
 */
const onClipboardCut = (target: HTMLElement): string => {
  // 选中元素，并返回其文本
  const selectedText = selectElement(target)
  try {
    document.execCommand('cut')
  } catch (error) {
    // 不支持 document.execCommand 时的替补方式
    navigator.clipboard.writeText(selectedText).then(null, () => {
      throw new Error(`failed to copy to clipboard of value '${selectedText}'`)
    })
  } finally {
    // 取消焦点
    target.blur()
  }
  return selectedText
}

export { onClipboardCopy, onClipboardCut }
