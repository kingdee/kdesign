import * as React from 'react'
import { useRef, useLayoutEffect } from 'react'
import classNames from 'classnames'
import { scrollTo, waitElementReady } from '../../utils'
import Context from '../../context'
import { DateType } from '../../interface'

export interface Unit {
  label: React.ReactText
  value: number
  disabled: boolean
}

export interface TimeUnitColumnProps {
  prefixCls?: string
  units?: Unit[]
  value?: number
  // active?: boolean
  selectValue?: DateType
  hideDisabledOptions?: boolean
  onSelect?: (value: number) => void
}

function TimeUnitColumn(props: TimeUnitColumnProps) {
  const { prefixCls, units, onSelect, value, hideDisabledOptions, selectValue } = props
  const cellPrefixCls = `${prefixCls}-cell`
  const { open } = React.useContext(Context)

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
    <ul
      className={classNames(`${prefixCls}-column`, {
        // [`${prefixCls}-column-active`]: active,
      })}
      ref={ulRef}
      style={{ position: 'relative' }}
    >
      {units!.map((unit) => {
        if (hideDisabledOptions && unit.disabled) {
          return null
        }

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
            <div className={`${cellPrefixCls}-inner`}>{unit.label}</div>
          </div>
        )
      })}
    </ul>
  )
}

export default TimeUnitColumn
