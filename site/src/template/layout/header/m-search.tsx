import React, { useEffect, useRef, useState, useMemo } from 'react'
import algoliasearch, { SearchIndex } from 'algoliasearch'
import debounce from 'lodash/debounce'
import { Input, Icon } from 'kdesign'
import './msearch.less'

function MDocsSearch({
  appId,
  indexName,
  apiKey,
  hideModal,
}: {
  appId: any
  indexName: any
  apiKey: any
  hideModal: any
}) {
  const docsearchRef = useRef<HTMLInputElement>(null)
  const [kuiIndex, setKuiIndex] = useState<SearchIndex>()
  const [fetch, setfetch] = useState(false)
  const [searchVal, setSearchVal] = useState('')
  const [resList, setResList] = useState<Array<any>>([])
  let inputObj: any
  // const [hitsPerPage, setHitsPerPage] = useState(0)
  // const [nbPages, setNbPages] = useState(0)
  // const [page, setPage] = useState(0)

  useEffect(() => {
    const client = algoliasearch(appId, apiKey)
    setKuiIndex(client.initIndex(indexName))
    inputObj && inputObj.focus()
  }, [appId, docsearchRef, indexName, apiKey, setKuiIndex]) // eslint-disable-line react-hooks/exhaustive-deps

  const querySearchDebounce = useMemo(
    () =>
      debounce((nextValue: string) => {
        function querySearch(value: string) {
          setfetch(true)
          kuiIndex!
            .search(value, { hitsPerPage: 6 })
            .then((res) => {
              const {
                hits,
                nbHits,
                // hitsPerPage,
                // nbPages,
                // page
              } = res
              if (nbHits !== 0) {
                if (hits.length === 0) {
                  setResList([])
                  return
                }
                // setHitsPerPage(hitsPerPage)
                // setNbPages(nbPages)
                // setPage(page)
                setResList(hits)
              } else {
                setResList([])
              }
              setfetch(false)
            })
            .catch((err) => {
              console.error(err)
            })
        }
        return querySearch(nextValue)
      }, 300),
    [kuiIndex],
  )

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchVal(value)
    if (!value) {
      setResList([])
      return
    }
    setfetch(true)
    querySearchDebounce(value)
  }

  return (
    <div className="search-wapper">
      <div id="kdm-modal-container">
        <div className="kdm-modal-mask"></div>
        <div className="kdm-modal-wrap kdm-modal-wrap-popup" onClick={hideModal}>
          <div role="document" className="kdm-modal kdm-modal-popup kdm-modal-popup-slide-up">
            <div className="kdm-modal-content">
              <div className="kdm-modal-body">
                <div
                  className="kdm-list popup-list"
                  onClick={(e) => {
                    e.stopPropagation()
                  }}
                >
                  <div className="kdm-list-header"></div>
                  <div className="kdm-list-body">
                    <Input
                      prefix={<Icon type="search" />}
                      style={{ color: '#666666' }}
                      borderType="bordered"
                      allowClear
                      value={searchVal}
                      onChange={onChange}
                      placeholder="输入搜索内容"
                      ref={(input: any) => (inputObj = input)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {searchVal && (!fetch || resList.length) > 0 ? (
        <div className="res-wapper">
          {resList.length > 0 || fetch ? (
            <ul>
              {resList.map((n) => {
                const { _highlightResult, url, objectID } = n
                const { hierarchy_camel: hierarchyCamel, content } = _highlightResult
                // console.log(_hierarchy)
                const _hierarchyCamel = hierarchyCamel[0]
                let matched, category
                let breadcrumbs: string[] = []
                if (content) {
                  const { value, matchLevel } = content
                  if (matchLevel === 'full') {
                    if (!matched) {
                      matched = value.replace(/jdc_/g, '')
                    }
                  }
                }
                for (const key in _hierarchyCamel) {
                  // console.log(_hierarchy[key])
                  const { value, matchLevel } = _hierarchyCamel[key]
                  if (key === 'lvl0') {
                    category = value
                  }
                  if (value && !breadcrumbs.includes(value)) {
                    breadcrumbs.push(value)
                  }
                  if (matchLevel === 'full') {
                    if (!matched) {
                      matched = value
                    }
                  }
                }
                breadcrumbs = breadcrumbs
                  .map((n) => {
                    return n === '组件' ? '' : n
                  })
                  .filter((n) => n)
                return (
                  <li className="res-item" key={objectID}>
                    <a href={url}>
                      <div className="item-left text-ellipsis">
                        <div
                          className="category text-ellipsis"
                          title={category}
                          dangerouslySetInnerHTML={{ __html: category }}
                        ></div>
                        <div
                          className="details text-ellipsis"
                          dangerouslySetInnerHTML={{ __html: matched }}
                          title={matched}
                        ></div>
                      </div>
                      <div
                        className="item-right text-ellipsis "
                        dangerouslySetInnerHTML={{ __html: breadcrumbs.join('/') }}
                        title={breadcrumbs.join('/')}
                      ></div>
                    </a>
                  </li>
                )
              })}
            </ul>
          ) : (
            <div className="no-res">没有匹配结果</div>
          )}
        </div>
      ) : null}
    </div>
  )
}

export default MDocsSearch
