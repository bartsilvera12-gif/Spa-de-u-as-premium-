// Convierte un archivo de imagen a un data URL JPEG comprimido (redimensionado).
// Permite subir imágenes desde el dispositivo sin depender de un storage externo:
// la imagen queda embebida (comprimida) en el campo imagen_url.
export function fileToDataUrl(file, { maxSize = 1000, quality = 0.8 } = {}) {
  return new Promise((resolve, reject) => {
    if (!file || !file.type?.startsWith('image/')) {
      reject(new Error('El archivo no es una imagen'))
      return
    }
    const reader = new FileReader()
    reader.onerror = () => reject(new Error('No se pudo leer el archivo'))
    reader.onload = () => {
      const img = new Image()
      img.onerror = () => reject(new Error('No se pudo cargar la imagen'))
      img.onload = () => {
        let { width, height } = img
        const long = Math.max(width, height)
        if (long > maxSize) {
          const scale = maxSize / long
          width = Math.round(width * scale)
          height = Math.round(height * scale)
        }
        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, width, height)
        resolve(canvas.toDataURL('image/jpeg', quality))
      }
      img.src = reader.result
    }
    reader.readAsDataURL(file)
  })
}
