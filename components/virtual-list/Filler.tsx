import * as React from 'react'

interface FillerProps {
  height: number
  offset?: number
  outerStyle?: React.CSSProperties
  children: React.ReactNode
}

const Filler: React.FC<FillerProps> = ({
  height,
  offset,
  children,
  outerStyle: propsOuterStyle,
}): React.ReactElement => {
  let outerStyle: React.CSSProperties = {}

  let innerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
  }

  if (offset !== undefined) {
    outerStyle = {
      height,
      position: 'relative',
      overflow: 'hidden',
      zIndex: 0,
      ...propsOuterStyle,
    }

    innerStyle = {
      ...innerStyle,
      transform: `translateY(${offset}px)`,
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
    }
  }

  return (
    <div style={outerStyle}>
      <div style={innerStyle}>{children}</div>
    </div>
  )
}

export default Filler
