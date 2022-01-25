import InternalUpload from './upload'
import Dragger from './dragger'
import { UploadProps } from './interface'
export * from './upload'

interface CompoundedComponent
  extends React.ForwardRefExoticComponent<React.PropsWithChildren<UploadProps> & React.RefAttributes<any>> {
  Dragger: typeof Dragger
}

const Upload = InternalUpload as CompoundedComponent

Upload.Dragger = Dragger

export default Upload
