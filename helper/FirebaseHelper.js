import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { serverTimestamp } from '@firebase/firestore'
import { v4 } from 'uuid'
import { storage } from '@/firebase/config'

export const addTimeStamp = function (obj) {
  return {
    ...obj,
    timestamp: serverTimestamp(),
  }
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

  const uploadTask = uploadBytesResumable(storageRef, fileImage)

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
