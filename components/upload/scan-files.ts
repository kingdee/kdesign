import { UploadFile } from './interface'

interface InternalDataTransferItem extends DataTransferItem {
  isFile: boolean
  file: (cd: (file: UploadFile & { webkitRelativePath?: string }) => void) => void
  createReader: () => any
  fullPath: string
  isDirectory: boolean
  name: string
  path: string
}

function loopFiles(item: InternalDataTransferItem, callback: (fileList: Array<InternalDataTransferItem>) => void) {
  const dirReader = item.createReader()
  let fileList: Array<InternalDataTransferItem> = []

  function sequence() {
    dirReader.readEntries((entries: Array<InternalDataTransferItem>) => {
      const entryList = Array.prototype.slice.apply(entries)
      fileList = fileList.concat(entryList)

      // Check if all the file has been viewed
      const isFinished = !entryList.length

      if (isFinished) {
        callback(fileList)
      } else {
        sequence()
      }
    })
  }

  return sequence()
}

const scanFiles = (
  files: Array<InternalDataTransferItem>,
  isAccepted: (file: UploadFile) => boolean,
  callback: (file: UploadFile) => void,
) => {
  const _traverseFileTree = (item: InternalDataTransferItem, path?: string) => {
    item.path = path || ''
    if (item.isFile) {
      item.file((file: UploadFile) => {
        if (isAccepted(file)) {
          if (item.fullPath && !file.webkitRelativePath) {
            Object.defineProperties(file, {
              webkitRelativePath: {
                writable: true,
              },
            })
            file.webkitRelativePath = item.fullPath.replace(/^\//, '')
            Object.defineProperties(file, {
              webkitRelativePath: {
                writable: false,
              },
            })
          }
          callback(file)
        }
      })
    } else if (item.isDirectory) {
      loopFiles(item, (entries: Array<InternalDataTransferItem>) => {
        entries.forEach((entryItem: InternalDataTransferItem) => {
          _traverseFileTree(entryItem, `${path}${item.name}/`)
        })
      })
    }
  }
  files.forEach((file: InternalDataTransferItem) => {
    _traverseFileTree(file.webkitGetAsEntry())
  })
}

export default scanFiles
