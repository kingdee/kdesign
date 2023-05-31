import React, { useContext } from 'react'
import ConfigContext from '../config-provider/ConfigContext'
import uniqueId from 'lodash/uniqueId'

function DefaultEmptyImg(props: any) {
  const { getPrefixCls, prefixCls } = useContext(ConfigContext)
  const emptyPrefixCls = getPrefixCls!(prefixCls, 'empty')
  const linearGradientId = uniqueId(emptyPrefixCls + '-default-linearGradient')
  return (
    <svg
      className={`${emptyPrefixCls}-image`}
      width="168px"
      height="96px"
      viewBox="0 0 168 96"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      style={props.style}
    >
      <title>编组</title>
      <defs>
        <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id={linearGradientId}>
          <stop stopColor="#D6DCE7" offset="0%"></stop>
          <stop stopColor="#D6DCE7" stopOpacity="0" offset="100%"></stop>
        </linearGradient>
      </defs>
      <g id="页面-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="编组">
          <g transform="translate(36.000000, 0.000000)" id="编组">
            <path
              d="M63,9 L63,24 L78,24 L78,84 C78,85.6568542 76.6568542,87 75,87 L21,87 C19.3431458,87 18,85.6568542 18,84 L18,12 C18,10.3431458 19.3431458,9 21,9 L63,9 Z"
              id="路径"
              fill="#E2E8F3"
            ></path>
            <rect id="矩形" fill="#CAD0DB" x="24" y="24" width="9" height="9"></rect>
            <polygon id="矩形" fill="#EEF4FF" points="63 9 78 24 63 24"></polygon>
            <rect id="矩形" fill="#CAD0DB" x="24" y="39" width="48" height="6"></rect>
            <rect id="矩形" fill="#CAD0DB" x="24" y="51" width="24" height="6"></rect>
          </g>
          <g
            transform="translate(108.000000, 40.000000)"
            fill={`url(#${linearGradientId})`}
            id="背景/云"
            opacity="0.300000012"
          >
            <g id="形状结合">
              <path d="M3,39 L3,24 C3,15.7157288 9.71572875,9 18,9 C25.4616776,9 31.6508469,14.4482558 32.8063948,21.5836543 C33.797875,21.2064779 34.8748247,21 36,21 C40.9705627,21 45,25.0294373 45,30 L45,39 L3,39 Z"></path>
            </g>
          </g>
          <g
            transform="translate(12.000000, 32.000000)"
            fill={`url(#${linearGradientId})`}
            id="背景/云"
            opacity="0.300000012"
          >
            <g
              transform="translate(24.000000, 24.000000) scale(-1, 1) translate(-24.000000, -24.000000) "
              id="形状结合"
            >
              <path d="M3,39 L3,24 C3,15.7157288 9.71572875,9 18,9 C25.4616776,9 31.6508469,14.4482558 32.8063948,21.5836543 C33.797875,21.2064779 34.8748247,21 36,21 C40.9705627,21 45,25.0294373 45,30 L45,39 L3,39 Z"></path>
            </g>
          </g>
        </g>
      </g>
    </svg>
  )
}

export default DefaultEmptyImg
