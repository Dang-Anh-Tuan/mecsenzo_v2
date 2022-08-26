const createTempUrlForImageFile = function (event) {
  const fileImage = event.target.files[0]
  const urlTemp = fileImage ? URL.createObjectURL(fileImage) : undefined
  if (fileImage) {
    fileImage.preview = urlTemp
  }

  return fileImage
}

export { createTempUrlForImageFile }
