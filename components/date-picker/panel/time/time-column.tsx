import * as React from 'react'
import { useRef, useLayoutEffect } from 'react'
import classNames from 'classnames'
import { scrollTo, waitElementReady } from '../../utils'
import Context from '../../context'
import { DateType } from '../../interface'
import { CellRenderSubType } from '../../date-picker'

export interface Unit {
  label: React.ReactText
  value: number
  disabled: boolean
}

export interface TimeUnitColumnProps {
  prefixCls?: string
  units?: Unit[]
  value?: number
  selectValue?: DateType
  hideDisabledOptions?: boolean
  onSelect?: (value: number) => void
  subType?: CellRenderSubType
}

function TimeUnitColumn(props: TimeUnitColumnProps) {
  const { prefixCls, units, onSelect, value, hideDisabledOptions, selectValue, subType } = props
  const cellPrefixCls = `${prefixCls}-cell`
  const { open, cellRender, range } = React.useContext(Context)

  const ulRef = useRef<HTMLUListElement>(null)
  const liRefs = useRef<Map<number, HTMLElement | null>>(new Map())
  const scrollRef = useRef<() => void>()

  useLayoutEffect(() => {
    const li = liRefs.current.get(value!)
    if (li && open !== false) {
      scrollTo(ulRef.current!, li.offsetTop, 120)
    }
  }, [value, selectValue])

  useLayoutEffect(() => {
    if (open) {
      const li = liRefs.current.get(value!)
      if (li) {
        scrollRef.current = waitElementReady(li, () => {
          scrollTo(ulRef.current!, li.offsetTop, 0)
        })
      }
    }

    return () => {
      scrollRef.current?.()
    }
  }, [open])

  return (
    <ul className={classNames(`${prefixCls}-column`)} ref={ulRef} style={{ position: 'relative' }}>
      {units!.map((unit) => {
        if (hideDisabledOptions && unit.disabled) {
          return null
        }

        const originNode = <div className={`${cellPrefixCls}-inner`}>{unit.label}</div>

        return (
          <div
            key={unit.value}
            ref={(element) => {
              liRefs.current.set(unit.value, element)
            }}
            className={classNames(cellPrefixCls, {
              [`${cellPrefixCls}-disabled`]: unit.disabled,
              [`${cellPrefixCls}-selected`]: value === unit.value,
            })}
            onClick={() => {
              if (unit.disabled) {
                return
              }
              onSelect!(unit.value)
            }}
          >
            {typeof cellRender === 'function'
              ? cellRender(unit.value, { originNode, panelType: 'time', subType, range }) || originNode
              : originNode}
          </div>
        )
      })}
    </ul>
  )
}

export default TimeUnitColumn
