import React, { CSSProperties, FunctionComponentElement, useContext } from 'react'
import classNames from 'classnames'
import ConfigContext from '../config-provider/ConfigContext'
import { getCompProps } from '../_utils'
import { QRCodeCanvas, QRCodeSVG } from 'qrcode.react-ie'
import Spin from '../spin'
import Button from '../button'
import Icon from '../icon'
import devWarning from '../_utils/devwarning'
import { tuple } from '../_utils/type'

export type QRPropsCanvas = QRProps & React.CanvasHTMLAttributes<HTMLCanvasElement>

export type QRPropsSvg = QRProps & React.SVGAttributes<SVGSVGElement>

export const QRCodeTypes = tuple('canvas', 'svg')
export type QRCodeType = typeof QRCodeTypes[number]

export const QRCodeStatus = tuple('active', 'expired', 'loading')
export type QRCodeStatus = typeof QRCodeStatus[number]

export const QRCodeErrorLevels = tuple('L', 'M', 'Q', 'H')
export type QRCodeErrorLevel = typeof QRCodeErrorLevels[number]

interface ImageSettings {
  src: string
  height: number
  width: number
  excavate: boolean
  x?: number
  y?: number
}

export interface QRProps {
  value: string
  type?: QRCodeType
  size?: number
  style?: CSSProperties
  color?: string
  bgColor?: string
  bordered?: boolean
  imageSettings?: ImageSettings
}

export interface QRCodeProps extends QRProps {
  className?: string
  prefixCls?: string
  icon?: string
  iconSize?: number
  status?: QRCodeStatus
  errorLevel?: QRCodeErrorLevel
  children?: React.ReactNode
  onRefresh?: () => void
}

const QRCode = (props: QRCodeProps): FunctionComponentElement<QRCodeProps> => {
  const {
    getPrefixCls,
    prefixCls,
    compDefaultProps: userDefaultProps,
    locale: { getCompLangMsg },
  } = useContext(ConfigContext)
  const qrCodeProps = getCompProps('QRCode', userDefaultProps, props)

  const {
    value,
    size,
    status,
    style,
    type,
    errorLevel,
    color,
    onRefresh,
    icon,
    iconSize = 24,
    bgColor,
    bordered = true,
  } = qrCodeProps

  const { className, prefixCls: customPrefixcls } = qrCodeProps
  const qrCodePrefixCls = getPrefixCls!(prefixCls, 'qrcode', customPrefixcls)
  const qrCodeClass = classNames(qrCodePrefixCls, className, {
    [`${qrCodePrefixCls}-borderless`]: !bordered,
  })

  const qrCodeLangMsg = getCompLangMsg({ componentName: 'QRCode' })
  const gap = 8
  const containerSize = size + gap * 2 + 2

  devWarning(!value === false, 'QRCode', 'need to receive `value` props')
  devWarning(
    icon && errorLevel === 'L',
    'QRCode',
    'ErrorLevel `L` is not recommended to be used with `icon`, for scanning result would be affected by low level.',
  )

  const imageSettings: QRProps['imageSettings'] = {
    src: icon,
    x: undefined,
    y: undefined,
    height: iconSize,
    width: iconSize,
    excavate: true,
  }

  const codeProps = {
    value: value,
    size: size,
    level: errorLevel,
    fgColor: color,
    imageSettings: icon ? imageSettings : undefined,
  }
  return (
    <div
      className={qrCodeClass}
      style={{ ...style, width: `${containerSize}px`, height: `${containerSize}px`, backgroundColor: bgColor }}
    >
      {status !== 'active' && (
        <div className={`${qrCodePrefixCls}-mask`}>
          {status === 'loading' && <Spin />}
          {status === 'expired' && (
            <>
              <p className={`${qrCodePrefixCls}-expired`}>{qrCodeLangMsg.qrCodeExpired}</p>
              {onRefresh && (
                <Button icon={<Icon type="refresh" />} type="text" onClick={onRefresh} size="middle">
                  {qrCodeLangMsg.clickRefresh}
                </Button>
              )}
            </>
          )}
        </div>
      )}
      {type === 'canvas' ? <QRCodeCanvas {...codeProps} /> : <QRCodeSVG {...codeProps} />}
    </div>
  )
}

QRCode.displayName = 'QRCode'
export default QRCode
