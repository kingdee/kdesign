import { ReactWrapper } from 'enzyme'

interface normalObjectType<P> {
  [prop: string]: P
}
function getEventType(eventName: string) {
  const eventTypeObj: normalObjectType<string[]> = {
    MouseEvent: ['mousedown', 'mousemove', 'mouseup', 'click', 'focus'],
    WheelEvent: ['mousewheel', 'DOMMouseScroll'],
    UIEvent: ['scroll', 'resize'],
    KeyboardEvent: ['keydown', 'keypress', 'keyup'],
  }
  for (const eventType in eventTypeObj) {
    const eventList = eventTypeObj[eventType]
    if (eventList.includes(eventName)) {
      return eventType
    }
  }
  return 'UIEvent'
}

export function simulateEvent(component: ReactWrapper | HTMLElement, eventName: string, eventData: any) {
  const eventType: string = getEventType(eventName)
  // 先这样绕过
  const event = new (window as any)[eventType](eventName, eventData)
  if (eventName === 'mousewheel') {
    Object.defineProperty(event, 'wheelDelta', {
      configurable: false,
      writable: false,
      value: eventData.wheelDelta || 0,
    })
  }
  if ('getDOMNode' in component) {
    component.getDOMNode().dispatchEvent(event)
  } else {
    component.dispatchEvent(event)
  }
}

export function createDragEventTarget(dom: HTMLElement | undefined, otherProps = {}) {
  // 第一个有值且不是DOM节点则将其当成是属性
  if (typeof dom === 'object' && ![1, 3, 9, 10, 11].includes(dom.nodeType)) {
    otherProps = dom
    dom = undefined
  }
  return Object.assign(
    {
      target: dom,
      currentTarget: dom,
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
      dataTransfer: {
        setData: jest.fn(),
        getData: jest.fn(),
      },
    },
    otherProps,
  )
}
