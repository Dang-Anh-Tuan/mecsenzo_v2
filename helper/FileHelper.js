const createTempUrlForImageFile = function (fileImage) {
  const urlTemp = fileImage ? URL.createObjectURL(fileImage) : undefined
  if (fileImage) {
    fileImage.preview = urlTemp
  }

  return fileImage
}

export { createTempUrlForImageFile }
