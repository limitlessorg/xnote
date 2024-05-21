/**
 * 判断是否是图片
 * @param file 文件名或者文件
 * @returns boolean
 */
export function isImage(file: string | File): boolean {
  const extension =
    typeof file === 'string'
      ? file.split('.').pop()
      : file.name.split('.').pop()
  if (!extension) {
    return false
  }
  const imageExtensions = [
    'jpg',
    'jpeg',
    'png',
    'gif',
    'bmp',
    'svg',
    'webp',
    'ico',
    'tif',
    'tiff',
    'jfif'
  ]
  return imageExtensions.includes(extension.toLowerCase())
}

/**
 * Base64 转 File
 * @param base64 Base64字符
 * @param filename 文件名
 * @returns
 */
export function base64ToFile(base64: string, filename: string): File {
  const byteString = atob(base64.split(',')[1])
  const mimeString = base64.split(',')[0].split(':')[1].split(';')[0]
  const arrayBuffer = new ArrayBuffer(byteString.length)
  const uint8Array = new Uint8Array(arrayBuffer)

  for (let i = 0; i < byteString.length; i++) {
    uint8Array[i] = byteString.charCodeAt(i)
  }

  return new File([arrayBuffer], filename, { type: mimeString })
}

/**
 * 判断是否是移动端
 * @returns boolean
 */
export function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
}
