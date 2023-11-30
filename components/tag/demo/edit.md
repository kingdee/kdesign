---
title: 可编辑的标签
order: 8
---

标签有三种类型：状态标签、属性标签、列表状态标签、可关闭标签

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Tag } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const demoTagStyle = { margin: '0 6px 2px 0', pointerEvents: 'none' }
  const [tags, setTags] = React.useState<Array<string>>(['tag1', 'tag2', 'tag3'])

  const editWrapperStyle = {
    borderBottom: '1px solid #ccc',
    width: '300px',
    display: 'flex',
    flexWrap: 'wrap',
    padding: '4px 0 2px 0',
  }
  const inputStyle = {
    outline: 0,
    width: '4px',
    border: 0,
    fontSize: '12px',
    flex: 1,
    padding: 0,
    height: '18px',
    lineHeight: '18px',
    marginBottom: '4px',
  }

  const textInput = React.useRef(null)
  const editWrapper = React.useRef(null)
  const tagsNode = tags.map((v, i) => (
    <Tag type="edit"closable key={i} className="customTag" style={demoTagStyle} data-id={i} onClose={(e) => handleTagRemove(e)}>
      {v}
    </Tag>
  ))

  let mouseClientX = 0;
  let mouseClientY = 0;

  function handleWrapperClick(e) {
    if (e.target !== e.currentTarget) {
      return
    }
    textInput.current.focus()
  }

  function handleWrapperMousemove(e) {
    if (tags.length === 0 || editWrapper.current.querySelector('.customTag').style.pointerEvents === 'auto') {
      return
    }
    if (mouseClientX !== e.clientX && mouseClientY !== e.clientY) {
      mouseClientX = e.clientX
      mouseClientY = e.clientY

      Array.from(editWrapper.current.querySelectorAll('.customTag')).map((dom) => {
        dom.style.pointerEvents = 'auto'
      })
    }
  }

  function handleKeyDown(e) {
    Array.from(editWrapper.current.querySelectorAll('.customTag')).map((dom) => {
      dom.style.pointerEvents = 'none'
    })
    if (e.keyCode !== 8 && e.keyCode !== 13 && e.keyCode !== 46) {
      return
    }

    if (e.keyCode === 8 || e.keyCode === 46) {
      const text = textInput.current.value
      if (!text) {
        const newV = tags.filter((v, i, self) => i !== self.length - 1)
        setTags(newV)
      }
    }

    if (e.keyCode === 13) {
      const text = textInput.current.value.trim()
      if (text) {
        addTag(text)
      }
    }
  }

  function handleTagRemove(e) {
    e.preventDefault()
    const index = +e.currentTarget.parentNode.getAttribute('data-id')
    const newV = tags.filter((v, i) => i !== index)
    setTags(newV)
  }

  function handleInputBlur(e) {
    const text = e.target.value
    if (text) {
      addTag(text)
    }
  }

  function addTag(text) {
    if (text.length > 25) {
      text = text.substring(0, 25) + '...'
    }
    const newV = tags.concat([text])
    setTags(newV)

    textInput.current.value = ''
  }

  return (
    <>
      <div
        className="editWrapper"
        style={editWrapperStyle}
        onClick={handleWrapperClick}
        ref={editWrapper}
        onMouseMove={handleWrapperMousemove}>
        {tagsNode}
        <input type="text" style={inputStyle} onKeyDown={handleKeyDown} onBlur={handleInputBlur} ref={textInput} />
      </div>
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```