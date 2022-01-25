import React, { Component } from 'react'
export class Inter extends Component<any> {
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
          <g id="画板" transform="translate(-1073.000000, -909.000000)">
            <g id="international" transform="translate(1073.000000, 909.000000)">
              <rect id="矩形" x="0" y="0" width="80" height="80"></rect>
              <g id="编组备份" transform="translate(3.000000, 9.000000)">
                <path
                  d="M57,30 C65.836556,30 73,37.163444 73,46 C73,54.836556 65.836556,62 57,62 L41,62 L41,62 L41,46 C41,37.163444 48.163444,30 57,30 Z"
                  id="矩形备份-2"
                  fill="#3863FF"
                  transform="translate(57.000000, 46.000000) scale(-1, 1) translate(-57.000000, -46.000000) "
                ></path>
                <path
                  d="M31,0 C48.1208272,-3.14504494e-15 62,13.8791728 62,31 C62,48.1208272 48.1208272,62 31,62 L0,62 L0,62 L0,31 C-2.09669663e-15,13.8791728 13.8791728,3.14504494e-15 31,0 Z"
                  id="矩形"
                  fill="url(#linearGradient-1)"
                  fillRule="nonzero"
                ></path>
                <g id="inter">
                  <path
                    d="M41.2016184,25.2510163 C43.5450803,27.5944782 43.5450803,31.3939806 41.2016184,33.7374424 L31.4999998,43.439061 L21.7983812,33.7374424 C19.4549193,31.3939806 19.4549193,27.5944782 21.7983812,25.2510163 C24.1418431,22.9075544 27.9413455,22.9075544 30.2848073,25.2510163 L31.4999998,26.465102 L32.7151923,25.2510163 C35.0586541,22.9075544 38.8581565,22.9075544 41.2016184,25.2510163 Z"
                    id="路径"
                    stroke="#3863FF"
                    strokeWidth="6"
                  ></path>
                </g>
              </g>
            </g>
          </g>
        </g>
      </svg>
    )
  }
}

export default Inter
