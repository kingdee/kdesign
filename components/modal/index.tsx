import OriginModal, { IModalProps } from './modal'
import confirm, { ModalStaticFunctions, withWarning, withError, withConfirm } from './confirm'
export * from './modal'

export type ModalProps = typeof OriginModal & ModalStaticFunctions

const Modal = OriginModal as ModalProps

Modal.warning = function infoFn(props: IModalProps) {
  return confirm(withWarning(props))
}

Modal.error = function infoFn(props: IModalProps) {
  return confirm(withError(props))
}

Modal.confirm = function infoFn(props: IModalProps) {
  return confirm(withConfirm(props))
}

export default Modal
