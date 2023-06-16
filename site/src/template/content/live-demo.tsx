import React, { useCallback, useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'
import github from 'prism-react-renderer/themes/github'
import * as kdesign from 'kdesign'
import { Icon, Message } from 'kdesign'
import lodash from 'lodash'
import copy from 'copy-to-clipboard'
import axios from 'axios'
import { Language } from 'prism-react-renderer'

import { Utils } from './article'
import Frame from './frame'
import transformer from './transformerIframeCode'
import * as dateFns from 'date-fns'
import * as KdesignIcons from '@kdcloudjs/kdesign-icons'

export type Props = {
  code: string
  title: string
  content: Array<any>
  id: string
  utils: Utils
  lang: Language
  iframe?: number
  src?: string
  style?: string
  highlightedStyle?: string
  metaId?: string
}

export type RefType = {
  current: HTMLDivElement | null | undefined
}

type Dependencie = { module: string; lib: string }

// 编辑代码错误时样式
const errorCodeStyle = {
  color: '#721c24',
  backgroundColor: '#f8d7da',
  borderColor: '#f5c6cb',
  width: '100%',
  textAlign: 'left',
  padding: '20px',
}

// react-live 需要的环境引入
const allScope: Record<string, any> = {
  ReactDOM,
  React,
  axios,
  copy,
  react: { ...React },
  '@kdcloudjs/kdesign': { ...kdesign },
  lodash: { ...lodash, _: lodash },
  'date-fns': dateFns,
  '@kdcloudjs/kdesign-icons': { ...KdesignIcons },
}

const getDependencies = (code: string, codeArr: string[]) => {
  return code.split('\n').reduce((acc, line) => {
    const matches = line.match(/import (.+?) from '(.+)'$/)
    if (matches) {
      if (matches.input!.trim().startsWith('//')) {
        return acc
      }
      let modules: string[] = []
      let lib: string
      if (matches[1]) {
        const module = matches[1].trim()
        if (module.startsWith('{')) {
          modules = module.substring(1, module.length - 1).split(',')
        } else {
          modules = [module]
        }
      }
      if (matches[2]) {
        lib = matches[2]
      }
      return [
        ...acc,
        ...modules.map((n) => ({
          lib,
          module: n.trim(),
        })),
      ]
    } else {
      line && codeArr.push(line)
    }
    return acc
  }, [] as Dependencie[])
}

function LiveDemo(props: Props) {
  const { code, title, content, id, utils, lang, iframe, src, style, highlightedStyle } = props

  const editorEl = useRef<HTMLDivElement>(null)
  const styleEl = useRef<HTMLDivElement>(null)
  const [expand, setExpand] = useState(false)
  const [height, setHeight] = useState<any>(0)
  const [liveCode, setLiveCode] = useState<string>()
  const [editCode, setEditCode] = useState<string>()
  const [scope, setScope] = useState<Record<string, any>>()
  const iframeRef = useRef<HTMLIFrameElement>(null)

  function codeExpand() {
    setExpand(!expand)
    const styleHeight = styleEl.current ? styleEl.current.offsetHeight : 0
    !expand ? setHeight(editorEl!.current!.offsetHeight + styleHeight) : setHeight(0)
  }

  function onFocus() {
    setHeight('auto')
  }

  function onBlur() {
    const styleHeight = styleEl.current ? styleEl.current.offsetHeight : 0
    setHeight(editorEl!.current!.offsetHeight + styleHeight)
  }

  function onCodeChange(code: string) {
    setLiveCode(handleCode(code))
    setEditCode(code)
  }

  const handleCode = useCallback(
    (code: string) => {
      const sourceCode = code
      const codeArr: string[] = []
      const _dependencies = getDependencies(code, codeArr)
      const scope: Record<string, any> = {}
      _dependencies.forEach((n) => {
        if (allScope[n.lib]) {
          if (allScope[n.lib][n.module]) {
            scope[n.module] = allScope[n.lib][n.module]
          } else if (n.lib === n.module) {
            scope[n.module] = allScope[n.lib]
          }
        }
      })
      if (iframe) {
        const last = codeArr[codeArr.length - 1]
        codeArr[codeArr.length - 1] = last
          .replace('ReactDOM.render', 'render')
          .replace(',', '')
          .replace('mountNode', '')
        code = codeArr.join('\n')
      } else {
        const last = codeArr[codeArr.length - 1]
        codeArr[codeArr.length - 1] = last
          .replace('ReactDOM.render', 'render')
          .replace(',', '')
          .replace('mountNode', '')
        code = codeArr.join('\n')
      }
      if (code.trim().startsWith(';')) {
        code = code.substring(1)
      }
      let iframeCode
      if (iframe) {
        scope.ReactDOM = ReactDOM
        scope.Frame = Frame
        scope.iframeRef = iframeRef
        scope.iframeSrc = src
        scope.iframeHeight = iframe
        iframeCode = transformer(sourceCode, { presets: ['env', 'react'] })
        window.IFRAME_CODES[`${src?.substring(1)}`] = iframeCode
      }
      setScope(scope)
      return iframe
        ? `<Frame>
          <iframe
            ref={iframeRef}
            // onLoad={}
            src={iframeSrc}
            height={iframeHeight}
            title="demo"
            className="iframe-demo"
          />
        </Frame>`
        : code
    },
    [iframe, src],
  )

  useEffect(() => {
    if (code) {
      setLiveCode(handleCode(code))
      setEditCode(code)
    }
  }, [code, handleCode, lang])

  useEffect(() => {
    if (iframe) {
      const iframeEl = document.getElementById(`${id}-iframe`) as HTMLIFrameElement
      if (iframeEl && iframeEl.contentWindow) {
        iframeEl.contentWindow.location.reload()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editCode, iframe])

  // console.log(scope)
  // console.log(liveCode)
  // console.log(editCode)

  return (
    <>
      <div className="preview">
        <div id={id} className="demo-title">
          {title}
        </div>
        {/* 组件demo描述 */}
        <div>{utils.toReactComponent(['div', { className: 'demo-description' }].concat(content))}</div>
        <div className="demo-content">
          {iframe ? (
            <Frame>
              <iframe
                ref={iframeRef}
                id={`${id}-iframe`}
                // onLoad={}
                src={src}
                height={iframe}
                title="demo"
                className="iframe-demo"
              ></iframe>
            </Frame>
          ) : null}
          {!iframe && style ? <style dangerouslySetInnerHTML={{ __html: style }} /> : null}
          {liveCode ? (
            <LiveProvider
              scope={{
                ...scope,
              }}
              code={liveCode}
              theme={github}
              noInline={liveCode ? liveCode.includes('render(') : false}
              language={lang}
            >
              {!iframe ? (
                <div className="demo-component">
                  <LivePreview
                    style={
                      /import { (\w{3,},\s)*(Row|Col|Layout|Filter)(,\s\w{3,})* } from '@kdcloudjs\/kdesign'/g.test(
                        code,
                      )
                        ? { width: '100%' }
                        : { width: 'auto' }
                    }
                  />
                </div>
              ) : null}
              <LiveError style={errorCodeStyle as any} />
              <div className="code-expand">
                <Icon type="code" onClick={() => codeExpand()} />
                <Icon
                  type="copy-code"
                  onClick={() => {
                    copy(editCode as any)
                    Message.success('代码拷贝成功')
                  }}
                  style={{ marginLeft: '10px' }}
                />
              </div>
              <div className="code-content" style={{ height: height }}>
                <div ref={editorEl}>
                  <LiveEditor
                    onChange={onCodeChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    code={editCode}
                    language={lang}
                  />
                </div>
                {highlightedStyle ? (
                  <div key="style" className="highlight" ref={styleEl}>
                    <pre>
                      <code className="css" dangerouslySetInnerHTML={{ __html: highlightedStyle }} />
                    </pre>
                  </div>
                ) : null}
              </div>
            </LiveProvider>
          ) : null}
        </div>
      </div>
    </>
  )
}

export default React.memo(LiveDemo)
