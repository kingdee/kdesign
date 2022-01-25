import Big from 'big.js'
const HIDDEN_TEXTAREA_STYLE = `
  min-height:0 !important;
	max-height:none !important;
	height:0 !important;
	visibility:hidden !important;
  position:absolute !important;
  overflow:hidden !important;
  z-index:-1000 !important;
  top:0 !important;
  right:0 !important;
`

const SIZING_STYLE = [
  'letter-spacing',
  'line-height',
  'padding-top',
  'padding-bottom',
  'font-family',
  'font-weight',
  'font-size',
  'font-variant',
  'text-rendering',
  'text-transform',
  'width',
  'text-indent',
  'padding-left',
  'padding-right',
  'border-width',
  'box-sizing',
  'word-break',
]

export interface NodeType {
  sizingStyle: string
  paddingSize: number
  borderSize: number
  boxSizing: string
}

let hiddenTextarea: HTMLTextAreaElement

export function calculateNodeStyling(node: HTMLElement) {
  const style = window.getComputedStyle(node)

  const boxSizing =
    style.getPropertyValue('box-sizing') ||
    style.getPropertyValue('-moz-box-sizing') ||
    style.getPropertyValue('-webkit-box-sizing')

  const paddingSize = parseFloat(
    new Big(parseFloat(style.getPropertyValue('padding-bottom')) || 0)
      .plus(parseFloat(style.getPropertyValue('padding-top')) || 0)
      .valueOf(),
  )

  const borderSize = parseFloat(
    new Big(parseFloat(style.getPropertyValue('border-bottom-width')) || 0)
      .plus(parseFloat(style.getPropertyValue('border-top-width')) || 0)
      .valueOf(),
  )

  const sizingStyle = SIZING_STYLE.map((name) => `${name}:${style.getPropertyValue(name)}`).join(';')

  const nodeInfo: NodeType = {
    sizingStyle,
    paddingSize,
    borderSize,
    boxSizing,
  }

  return nodeInfo
}

export default function calculateNodeHeight(
  uiTextNode: HTMLTextAreaElement,
  minRows: number | null = null,
  maxRows: number | null = null,
) {
  if (!hiddenTextarea) {
    hiddenTextarea = document.createElement('textarea')
    hiddenTextarea.setAttribute('tab-index', '-1')
    hiddenTextarea.setAttribute('aria-hidden', 'true')
    document.body.appendChild(hiddenTextarea)
  }

  if (uiTextNode.getAttribute('wrap')) {
    hiddenTextarea.setAttribute('wrap', uiTextNode.getAttribute('wrap') as string)
  } else {
    hiddenTextarea.removeAttribute('wrap')
  }

  const { paddingSize, borderSize, boxSizing, sizingStyle } = calculateNodeStyling(uiTextNode)

  hiddenTextarea.setAttribute('style', `${sizingStyle};${HIDDEN_TEXTAREA_STYLE}`)
  hiddenTextarea.value = uiTextNode.value || uiTextNode.placeholder || ''

  let minHeight = Number.MIN_SAFE_INTEGER
  let maxHeight = Number.MAX_SAFE_INTEGER
  let height = parseFloat(new Big(hiddenTextarea.scrollHeight).valueOf())

  if (boxSizing === 'border-box') {
    height = parseFloat(new Big(height).plus(borderSize).valueOf()) // height += borderSize
  } else if (boxSizing === 'content-box') {
    height = parseFloat(new Big(height).minus(paddingSize).valueOf()) // height -= paddingSize
  }

  if (minRows !== null || maxRows !== null) {
    hiddenTextarea.value = ' '
    const bigSingleRowHeight = new Big(hiddenTextarea.scrollHeight).minus(paddingSize)
    if (minRows !== null) {
      minHeight = parseFloat(bigSingleRowHeight.times(minRows).valueOf())
      if (boxSizing === 'border-box') {
        minHeight = parseFloat(new Big(minHeight).plus(paddingSize).plus(borderSize).valueOf()) // minHeight + paddingSize + borderSize
      }
      height = new Big(minHeight).gt(height) ? minHeight : height // Math.max(minHeight, height)
    }
    if (maxRows !== null) {
      maxHeight = parseFloat(bigSingleRowHeight.times(maxRows).valueOf())
      if (boxSizing === 'border-box') {
        maxHeight = parseFloat(new Big(maxHeight).plus(paddingSize).plus(borderSize).valueOf()) // maxHeight + paddingSize + borderSize
      }
      height = new Big(maxHeight).lt(height) ? maxHeight : height //  Math.min(maxHeight, height)
    }
  }
  const overflowY = new Big(height).lt(maxHeight) ? 'hidden' : ''
  return { height, minHeight, maxHeight, overflowY }
}
