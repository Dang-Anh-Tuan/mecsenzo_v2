const createTempUrlForImageFile = function (event) {
  const fileImage = event.target.files[0]
  const urlTemp = fileImage ? URL.createObjectURL(fileImage) : undefined
  fileImage.preview = urlTemp

  return fileImage
}

export { createTempUrlForImageFile }
