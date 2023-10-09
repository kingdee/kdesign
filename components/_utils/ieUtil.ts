export const isIE = (window as any)?.ActiveXObject || 'ActiveXObject' in window

export const getFileUtil = (file: any, name = '') => {
  if (file) {
    if (isIE) {
      const blob: any = new Blob([file], { type: file.type })
      blob.fileName = name || file.name
      blob.lastModifiedDate = file?.lastModifiedDate || Date.now()
      return blob
    } else {
      return new File([file], name || file.name, { type: file.type })
    }
  }

  return file
}
