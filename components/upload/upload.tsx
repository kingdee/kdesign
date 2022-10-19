import * as React from 'react'
import classNames from 'classnames'
import ConfigContext from '../config-provider/ConfigContext'
import { UploadProps, UploadProgressEvent, UploadRequestError, UploadFile, Action } from './interface'
import { getCompProps } from '../_utils'
import Icon from '../icon'
import request from './request'
import verifyFile from './verify-file'
import scanFiles from './scan-files'
import { getBase64, getFileSize } from './utils'
import Image from '../image'
import Progress from '../progress'

const getUid = (
  (index, now) => () =>
    `kd-upload-${now}-${++index}`
)(0, +new Date())

const reqs: any = {}

function abort(file?: UploadFile) {
  if (file) {
    const { uid } = file
    if (reqs[uid] && reqs[uid].abort) {
      reqs[uid].abort()
    }
    delete reqs[uid]
  } else {
    Object.keys(reqs).forEach((uid) => {
      if (reqs[uid] && reqs[uid].abort) {
        reqs[uid].abort()
      }
      delete reqs[uid]
    })
  }
}

const InternalUpload: React.ForwardRefRenderFunction<unknown, UploadProps> = (props, ref) => {
  const { getPrefixCls, prefixCls: pkgPrefixCls, compDefaultProps: userDefaultProps } = React.useContext(ConfigContext)
  const innerRef = React.useRef<HTMLInputElement>()
  const mergedRef = (ref as any) || innerRef

  const allProps = getCompProps('Upload', userDefaultProps, props) // 属性需要合并一遍用户定义的默认属性

  const {
    type,
    style,
    accept,
    children,
    disabled,
    multiple,
    listType,
    onRemove,
    directory,
    className,
    itemRender,
    showUploadList,
    prefixCls: customPrefixcls,
  } = allProps

  const [fileList, setFileList] = React.useState<Array<UploadFile>>(props.fileList || props.defaultFileList || [])
  React.useEffect(() => {
    props.fileList && setFileList(props.fileList)
  }, [props.fileList])

  React.useEffect(() => {
    return abort
  }, [])

  const onClick = (e: React.MouseEvent) => {
    allProps.onClick && allProps.onClick(e)
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files: Array<UploadFile> = Array.prototype.slice.call(e.target.files)
    e.target.value = ''
    uploadFiles(files)
  }

  const onFileListChange = (file: UploadFile, fileList: Array<UploadFile>, event?: UploadProgressEvent) => {
    props.fileList === undefined && setFileList(fileList)
    props.onChange && props.onChange({ file, fileList, event })
  }

  const uploadFiles = (files: Array<UploadFile>) => {
    files.forEach((file: UploadFile) => {
      file.originFileObj = new File([file], file.type)
      file.uid = getUid()
      file.status = 'notStart'
      file.fileName = allProps.name || file.name
    })
    const newFileList: Array<UploadFile> = [...fileList, ...files]
    files.forEach((file: UploadFile) => {
      props.fileList === undefined && setFileList(fileList)
      upload(file, newFileList)
    })
  }

  const upload = (file: UploadFile, fileList: Array<UploadFile>) => {
    if (props.beforeUpload) {
      const before = props.beforeUpload(file, fileList)
      if (before && typeof before !== 'boolean' && before.then) {
        before
          .then((processedFile: UploadFile) => {
            const processedFileType = Object.prototype.toString.call(processedFile)
            if (processedFileType === '[object File]' || processedFileType === '[object Blob]') {
              post(processedFile, fileList)
            } else {
              post(file, fileList)
            }
          })
          .catch((e: Error) => {
            console.log(e)
          })
      } else if (before !== false) {
        Promise.resolve().then(() => {
          post(file, fileList)
        })
      }
    } else {
      Promise.resolve().then(() => {
        post(file, fileList)
      })
    }
  }

  const post = (file: UploadFile, fileList: Array<UploadFile>) => {
    const {
      action,
      method,
      headers,
      onError,
      onStart,
      onSuccess,
      onProgress,
      withCredentials,
      transformFile = (originFile: UploadFile) => originFile,
    } = allProps

    file.percent = 0
    file.status = 'uploading'
    onFileListChange(file, fileList)

    new Promise((resolve) => {
      let actionRet: Action | PromiseLike<string> = action
      if (typeof actionRet === 'function') {
        actionRet = actionRet(file)
      }
      return resolve(actionRet)
    }).then((action: string) => {
      const { uid } = file
      const transform = Promise.resolve(transformFile(file))
        .then((transformedFile) => {
          let { data } = props
          if (typeof data === 'function') {
            data = data(transformedFile)
          }
          return Promise.all([transformedFile, data])
        })
        .catch((e) => {
          console.error(e)
        })
      transform.then(([transformedFile, data]: [UploadFile, Record<string, unknown>]) => {
        const requestOptions = {
          data,
          action,
          method,
          headers,
          withCredentials,
          file: transformedFile,
          filename: file.fileName,
          onProgress: (event: UploadProgressEvent) => {
            file.status = 'uploading'
            file.percent = event.percent
            onProgress && onProgress(event, file)

            fileList = fileList.map((fileItem: UploadFile) => (fileItem.uid === file.uid ? file : fileItem))
            onFileListChange(file, fileList, event)
          },
          onError: (event: UploadRequestError | ProgressEvent, ret: Record<string, unknown>) => {
            file.status = 'error'
            file.error = event

            delete reqs[uid]
            onError && onError(event, ret, file)

            fileList = fileList.map((fileItem: UploadFile) => (fileItem.uid === file.uid ? file : fileItem))
            onFileListChange(file, fileList)
          },
          onSuccess: async (response: UploadFile, xhr: XMLHttpRequest) => {
            file.status = 'done'
            file.response = response
            file.xhr = xhr
            if (/image/.test(file.type) && !file.url) {
              const url: any = await getBase64(file)
              file.url = url
            }

            delete reqs[uid]
            onSuccess && onSuccess(response, file, xhr)

            fileList = fileList.map((fileItem: UploadFile) => (fileItem.uid === file.uid ? file : fileItem))
            onFileListChange(file, fileList)
          },
        }

        onStart && onStart(file)
        reqs[uid] = request(requestOptions)
      })
    })
  }

  const handleRemove = (file: UploadFile, e: React.MouseEvent) => {
    e.preventDefault()
    const files = fileList.filter((fileItem: UploadFile) => fileItem.uid !== file.uid)
    if (onRemove) {
      const remove = onRemove(file)
      if (remove && typeof remove !== 'boolean' && remove.then) {
        remove
          .then((flag: boolean) => {
            if (flag) {
              onFileListChange(file, files)
              abort(file)
            }
          })
          .catch((e: Error) => {
            console.log(e)
          })
      } else if (remove !== false) {
        onFileListChange(file, files)
        abort(file)
      }
    } else {
      onFileListChange(file, files)
      abort(file)
    }
  }

  const handleReUpload = (file: UploadFile, e: React.MouseEvent) => {
    e.preventDefault()
    file.percent = 0
    file.status = 'uploading'
    const files = fileList.map((fileItem: UploadFile) => (fileItem.uid === file.uid ? file : fileItem))
    onFileListChange(file, files)
    upload(file, files)
  }

  const prefixCls = getPrefixCls!(pkgPrefixCls, 'upload', customPrefixcls)

  const inputFileProps = {
    accept,
    onClick,
    onChange,
    disabled,
    multiple,
    directory: directory ? 'directory' : undefined,
    webkitdirectory: directory ? 'webkitdirectory' : undefined,
  }

  const dragEvents: Record<string, unknown> = {}
  const [hover, setHover] = React.useState(false)

  if (type === 'drag') {
    const onFileDrop = (e: React.DragEvent<HTMLElement>) => {
      e.preventDefault()
      setHover(false)
      if (directory) {
        scanFiles(
          Array.prototype.slice.call(e.dataTransfer.items),
          (file: UploadFile) => verifyFile(file, accept),
          (file: UploadFile) => {
            file.originFileObj = new File([file], file.type)
            file.uid = getUid()
            file.status = 'notStart'
            file.fileName = allProps.name || file.name
            fileList.push(file)
            props.fileList === undefined && setFileList(fileList)
            upload(file, fileList)
          },
        )
      } else {
        let files = Array.prototype.slice
          .call(e.dataTransfer.files)
          .filter((file: UploadFile) => verifyFile(file, accept))

        if (multiple === false) {
          files = files.slice(0, 1)
        }

        uploadFiles(files)
      }
    }
    const onFileLeave = function (e: React.DragEvent<HTMLElement>) {
      e.preventDefault()
      e.type === 'dragover' ? setHover(true) : setHover(false)
    }
    dragEvents.onDrop = onFileDrop
    dragEvents.onDragOver = onFileLeave
    dragEvents.onDragLeave = onFileLeave
  }

  React.useEffect(() => {
    if (type === 'drag') {
      const stopDrop = (e: MouseEvent) => e.preventDefault()
      document.addEventListener('drop', stopDrop)
      document.addEventListener('dragover', stopDrop)

      return () => {
        document.removeEventListener('drop', stopDrop)
        document.removeEventListener('dragover', stopDrop)
      }
    }
  }, [type])

  return (
    <div className={classNames(prefixCls, { disabled }, className)} style={style}>
      {listType === 'text' && (
        <label className={classNames({ [`${prefixCls}-${type}`]: true, hover })} {...dragEvents}>
          <span className={`${prefixCls}-handle`}>{children}</span>
          <span className={`${prefixCls}-input`}>
            <input title="" type="file" {...inputFileProps} ref={mergedRef} />
          </span>
        </label>
      )}
      {(listType === 'picture' || !(listType === 'text' && (!showUploadList || !fileList.length))) && (
        <ul className={`${prefixCls}-${listType}-list`}>
          {listType === 'picture' && children && (
            <li className={classNames(`${prefixCls}-${listType}-list-item`)}>
              <label className={`${prefixCls}-select`}>
                <span className={`${prefixCls}-handle`}>{children}</span>
                <span className={`${prefixCls}-input`}>
                  <input title="" type="file" {...inputFileProps} ref={mergedRef} />
                </span>
              </label>
            </li>
          )}
          {showUploadList &&
            fileList.map((file: UploadFile) =>
              itemRender ? (
                itemRender(<Item {...{ file, prefixCls, listType, handleReUpload, handleRemove }} />, file, setFileList)
              ) : (
                <Item {...{ file, prefixCls, listType, handleReUpload, handleRemove }} />
              ),
            )}
        </ul>
      )}
    </div>
  )
}

interface IItem {
  file: UploadFile
  prefixCls: string
  listType: string
  handleReUpload: (file: UploadFile, e: React.MouseEvent) => void
  handleRemove: (file: UploadFile, e: React.MouseEvent) => void
}
const Item: React.FC<IItem> = ({ file, prefixCls, listType, handleReUpload, handleRemove }) => {
  const mapStatus: Record<string, string> = {
    uploading: 'loadding',
    error: 'warning-solid',
    done: 'attachment',
    success: 'attachment',
    notStart: 'attachment',
  }
  return (
    <li key={file.uid} className={classNames(`${prefixCls}-${listType}-list-item`, { error: file.status === 'error' })}>
      {listType === 'text' ? (
        <>
          <span className={`${prefixCls}-${listType}-list-item-icon`}>
            <Icon spin={file.status === 'uploading'} type={mapStatus[file.status as string]} />
          </span>
          <span className={`${prefixCls}-${listType}-list-item-name`} title={file.name}>
            {file.name}
          </span>
          <span className={`${prefixCls}-${listType}-list-item-size`}>({getFileSize(file.size)})</span>
          <div className={`${prefixCls}-${listType}-list-item-action`}>
            {file.status === 'error' && (
              <a
                href="true"
                className={`${prefixCls}-${listType}-list-item-reupload`}
                onClick={handleReUpload.bind(this, file)}
              >
                重新上传
              </a>
            )}
            <a
              href="true"
              className={`${prefixCls}-${listType}-list-item-delete`}
              onClick={handleRemove.bind(this, file)}
            >
              删除
            </a>
          </div>
        </>
      ) : file.status === 'uploading' ? (
        <div className={`${prefixCls}-${listType}-list-item-loading`}>
          <Progress percent={file.percent} textMap={['文件上传中']} showInfo={false} />
        </div>
      ) : file.status === 'error' ? (
        <div className={`${prefixCls}-${listType}-list-item-error`}>
          <div className={`${prefixCls}-${listType}-list-item-error-text`}>
            <Icon type={mapStatus[file.status as string]} style={{ verticalAlign: 'top' }} />
            上传失败
          </div>
          <div className={`${prefixCls}-${listType}-list-item-action`}>
            <a
              href="true"
              className={`${prefixCls}-${listType}-list-item-reupload`}
              onClick={handleReUpload.bind(this, file)}
            >
              重新上传
            </a>
            <a
              href="true"
              className={`${prefixCls}-${listType}-list-item-delete`}
              onClick={handleRemove.bind(this, file)}
            >
              删除
            </a>
          </div>
        </div>
      ) : (
        <Image
          previewType="upload"
          name={file.name}
          size={getFileSize(file.size)}
          src={file.thumbUrl || file.url}
          style={{ width: '100%', height: '100%' }}
          operations={[<Icon key="1" type="delete" onClick={handleRemove.bind(this, file)} />]}
        />
      )}
    </li>
  )
}

const Upload = React.forwardRef<unknown, UploadProps>(InternalUpload)
Upload.displayName = 'Upload'

export default Upload
