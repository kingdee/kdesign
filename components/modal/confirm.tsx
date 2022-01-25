import React from 'react'
import ReactDOM from 'react-dom'
import Modal, { IModalProps } from './modal'

type ModalConfirmType = 'warning' | 'error' | 'confirm'

export type ModalFunc = (props: IModalProps) => void

export type ModalStaticFunctions = Record<NonNullable<ModalConfirmType>, ModalFunc>

export default function confirm({ getContainer, visible, ...restProps }: IModalProps) {
  const div = document.createElement('div')
  document.body.appendChild(div)

  function render(props: any) {
    setTimeout(() => {
      ReactDOM.render(<Modal {...props} />, div)
    })
  }

  render(restProps)
}

export function withWarning(props: IModalProps): IModalProps {
  return {
    showline: false,
    ...props,
    type: 'warning',
  }
}

export function withError(props: IModalProps): IModalProps {
  return {
    showline: false,
    ...props,
    type: 'error',
  }
}

export function withConfirm(props: IModalProps): IModalProps {
  return {
    showline: false,
    ...props,
    type: 'confirm',
  }
}
