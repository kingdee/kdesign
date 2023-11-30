import React, { ReactElement } from 'react'
import { getChildren } from 'jsonml.js/lib/utils'
import { Language } from 'prism-react-renderer'
import LiveDemo from './live-demo'
import ComponentOverview from './componentOverview'

export type Meta = {
  title: string
  subtitle: string
}

export type DemoMeta = {
  title: string
  filename: string
  order: number
  id?: string
  iframe?: number
}

export type Utils = {
  toReactComponent(T: Array<any>): ReactElement
}

export type Demo = {
  code: string
  jsCode: string
  content: Array<any>
  meta: DemoMeta
  lang: Language
  style?: string
  highlightedStyle?: string
  src?: string
}

export type LocalizedPageData = {
  meta: Meta
  content: Array<any>
  api: Array<any>
}

export type Props = {
  localizedPageData: LocalizedPageData
  demos: Record<string, Demo>
  utils: Utils
  location: {
    pathname: string
  }
}

// 渲染文章主体内容
function renderArticle(props: Props) {
  const { localizedPageData, utils, demos, location } = props
  const {
    meta: { title, subtitle },
    content,
    api,
  } = localizedPageData
  // 总览页面使用自定义渲染
  if (location.pathname.indexOf('components/overview') > -1) {
    return <ComponentOverview {...props} />
  }
  return (
    <article>
      <section className="markdown">
        <h1>
          {title}
          <div className="md-subtitle">{subtitle}</div>
        </h1>
      </section>
      {/* 组件入口 md 文档内容 */}
      {utils.toReactComponent(['section', { className: 'markdown' }].concat(getChildren(content)))}
      {/* 组件demo渲染 */}
      {demos && <div className="markdown-demo">{renderDemo(demos, utils)}</div>}
      {/* 组件入口 md API 内容 */}
      {utils.toReactComponent(
        [
          'section',
          {
            className: 'markdown api-container',
          },
        ].concat(getChildren(api || ['placeholder'])),
      )}
    </article>
  )
}

// 渲染 组件demo
function renderDemo(demos: Record<string, Demo>, utils: Utils) {
  const demoValues = Object.keys(demos).map((key) => demos[key])
  return (
    demoValues
      // 根据 order 排序
      .sort((a, b) => a.meta.order - b.meta.order)
      .map((demo) => {
        const {
          meta: { title, filename, iframe },
          content,
          code: es6Code,
          jsCode,
          lang,
          src,
          style: styleCode,
          highlightedStyle: highlightedStyleCode,
        } = demo
        // console.log(demo)
        // id（锚点）即文件名
        const id = filename.replace(/\.md$/, '').replace(/\//g, '-')
        // console.log(codeText)
        const code = es6Code.trim().replace(/>;$/, '>')

        return (
          <div key={filename} className="demo">
            <LiveDemo
              code={code}
              jsCode={jsCode}
              content={content}
              id={id}
              utils={utils}
              title={title}
              lang={lang}
              iframe={iframe}
              src={src}
              style={styleCode}
              highlightedStyle={highlightedStyleCode}
            />
          </div>
        )
      })
  )
}

function Article(props: Props) {
  return <>{renderArticle(props)}</>
}

export default Article
