import React, { Component } from 'react'
export class Keyboard extends Component<any> {
  constructor(props: any) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <svg viewBox="0 0 80 80" style={this.props.style}>
        <defs>
          <linearGradient x1="-30.0717213%" y1="0%" x2="120.747951%" y2="128.329918%" id="linearGradient-1">
            <stop stopColor="#5F90FF" stopOpacity="0.315696023" offset="0.0655594406%"></stop>
            <stop stopColor="#FFFFFF" stopOpacity="0.4" offset="100%"></stop>
          </linearGradient>
        </defs>
        <g id="首页" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="画板" transform="translate(-767.000000, -909.000000)">
            <g id="qwerty" transform="translate(767.000000, 909.000000)">
              <rect id="矩形" x="0" y="0" width="80" height="80"></rect>
              <g id="编组备份" transform="translate(2.000000, 10.000000)">
                <g id="keyboard">
                  <g id="编组-3" transform="translate(29.000000, 16.000000)" fill="#3863FF">
                    <path
                      d="M0,7 C0,10.8659932 3.13400675,14 7,14 C10.8659932,14 14,10.8659932 14,7 C14,3.13400675 10.8659932,0 7,0 C3.13400675,0 0,3.13400675 0,7 Z"
                      id="路径"
                    ></path>
                    <path
                      d="M17,7 C17,9.50085906 18.3341924,11.8117482 20.5,13.0621778 C22.6658075,14.3126074 25.3341925,14.3126074 27.5,13.0621778 C29.6658076,11.8117482 31,9.50085906 31,7 C31,3.13400672 27.8659932,0 24,0 C20.1340068,0 17,3.13400672 17,7 L17,7 Z"
                      id="路径"
                    ></path>
                    <path
                      d="M33,7 C33,10.8659932 36.1340068,14 40,14 C43.8659932,14 47,10.8659932 47,7 C47,3.13400675 43.8659932,0 40,0 C36.1340068,0 33,3.13400675 33,7 L33,7 Z"
                      id="路径"
                    ></path>
                    <path
                      d="M0,24 C0,27.8659932 3.13400675,31 7,31 C10.8659932,31 14,27.8659932 14,24 C14,20.1340068 10.8659932,17 7,17 C3.13400675,17 0,20.1340068 0,24 Z"
                      id="路径"
                    ></path>
                    <path
                      d="M17,24 C17,26.5008591 18.3341924,28.8117482 20.5,30.0621778 C22.6658075,31.3126074 25.3341925,31.3126074 27.5,30.0621778 C29.6658076,28.8117482 31,26.5008591 31,24 C31,20.1340067 27.8659932,17 24,17 C20.1340068,17 17,20.1340067 17,24 Z"
                      id="路径"
                    ></path>
                    <path
                      d="M40,31 C43.8659932,31 47,27.8659932 47,24 C47,20.1340068 43.8659932,17 40,17 C36.1340068,17 33,20.1340068 33,24 C33,27.8659932 36.1340068,31 40,31 Z"
                      id="路径"
                    ></path>
                  </g>
                </g>
                <rect
                  id="矩形"
                  fill="url(#linearGradient-1)"
                  fillRule="nonzero"
                  x="0"
                  y="0"
                  width="60"
                  height="60"
                ></rect>
              </g>
            </g>
          </g>
        </g>
      </svg>
    )
  }
}

export default Keyboard
