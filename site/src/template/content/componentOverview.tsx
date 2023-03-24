import React from 'react'
import { categoryOrder, typeOrder } from '../../../consts'
import { getMenuItems } from '../utils'
import './componentOverview.less'

function ComponentOverview(props: any) {
  const {
    picked: { components },
  } = props
  const menuList = getMenuItems(components, categoryOrder, typeOrder)
  const itemList = menuList.slice(1).map((v) => {
    const { title, children = [] } = v
    const id = `components-overview-demo-${typeOrder[title]}`
    const cardList = children.map((child) => {
      const { subtitle, filename = '', title } = child
      const path = '/' + filename.split('/').splice(0, 2).join('/')
      let imgSrc
      try {
        imgSrc =
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          require(`../../static/image/overview/component-overview-${title}.svg`)?.default
      } catch (error) {
        imgSrc = require(`../../static/image/overview/component-overview-Button.svg`)?.default
      }

      if (title === 'VirtualList') return
      return (
        <dl className="overview-card-dl" key={subtitle}>
          <dt className="overview-card-dt">
            <a href={path} className="overview-card-link">
              <img
                /* eslint-disable-next-line */
                src={imgSrc}
                className="overview-card-img"
                alt=""
              />
            </a>
          </dt>
          <dd className="overview-card-dd">{title + ' ' + subtitle}</dd>
        </dl>
      )
    })
    return (
      <React.Fragment key={title}>
        <h2 id={id} className="overview-card-item-title">
          {title}
        </h2>
        <div className="overview-card-item">{cardList}</div>
      </React.Fragment>
    )
  })
  return (
    <article>
      <section className="markdown">
        <h1>总览</h1>
      </section>
      {itemList}
    </article>
  )
}

export default ComponentOverview
