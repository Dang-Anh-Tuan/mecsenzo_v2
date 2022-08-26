import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from 'firebase/storage'
import { serverTimestamp } from '@firebase/firestore'
import { v4 } from 'uuid'
import { storage } from '@/firebase/config'

export const addTimeStamp = function (obj) {
  return {
    ...obj,
    timestamp: serverTimestamp(),
  }
}

const uploadFile = function (
  storageRef,
  file,
  handleUploadComplete,
  handleLoading = null,
  handleError = null
) {
  const uploadTask = uploadBytesResumable(storageRef, file)

  uploadTask.on(
    'state_changed',
    (snapshot) => {
      if (handleLoading) {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        handleLoading(progress)
      }
    },
    (error) => {
      if (handleError) handleError(error)
    },
    async () => {
      const urlNewImage = await getDownloadURL(uploadTask.snapshot.ref)
      handleUploadComplete(urlNewImage)
    }
  )
}

export const uploadImage = function (
  folder,
  fileImage,
  handleUploadComplete,
  handleLoading = null,
  handleError = null
) {
  if (!fileImage) return

  const storageRef = ref(storage, `${folder}/${fileImage.name}${v4()}`)

  uploadFile(
    storageRef,
    fileImage,
    handleUploadComplete,
    handleLoading,
    handleError
  )
}

export const uploadByBlobUrl = function (
  folder,
  blobFile,
  fileName,
  handleUploadComplete,
  handleError = null
) {
  const storageRef = ref(storage, `${folder}/${fileName}${v4()}`)

  uploadBytes(storageRef, blobFile)
    .then(async () => {
      const urlNewImage = await getDownloadURL(storageRef)
      handleUploadComplete(urlNewImage)
    })
    .catch((e) => {
      if (handleError) handleError(e)
    })
}
