import React from 'react'
import { Link } from 'bisheng/router'
import { Icon } from 'kdesign'

export type NodeObj = {
  filename: string
  title: string
}

export type Props = {
  prev: NodeObj
  next: NodeObj
}

function getRouterPath(filename: string) {
  return filename && filename.replace(/(\/index)?\.md$/i, '')
}

const PrevAndNext = ({ prev, next }: Props) => (
  <section className="prev-next-nav">
    {prev ? (
      <Link className="prev-page" to={getRouterPath(prev.filename)}>
        <Icon type="arrow-left" />
        {prev.title}
      </Link>
    ) : null}
    {next ? (
      <Link className="next-page" to={getRouterPath(next.filename)}>
        {next.title}
        <Icon type="arrow-right" />
      </Link>
    ) : null}
  </section>
)

export default PrevAndNext
