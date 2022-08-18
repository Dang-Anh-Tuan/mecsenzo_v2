import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '@/firebase/config'

const collectionRef = collection(db, 'conversation')

const createConversation = async function (conversation) {
  await addDoc(collectionRef, {
    ...conversation,
    timeEnd: serverTimestamp(),
  })
}

export { createConversation }
