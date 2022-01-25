import React from 'react'

const Frame = ({ children }) => {
  console.log(children)
  return <div className="browser-mockup with-url">{children}</div>
}

export default React.memo(Frame)
