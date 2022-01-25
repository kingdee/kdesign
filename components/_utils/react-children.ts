import React, { ReactNode } from 'react'
export function toArray(children: ReactNode): ReactNode[] {
  const childrens: ReactNode[] = []
  React.Children.forEach(children, function each(c) {
    childrens.push(c)
  })
  return childrens
}
