import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { useFirestoreRealtimeQuery } from './core'
import { db } from '@/firebase/config'
import { constant } from '~/constants/constant'

const collectionRef = collection(db, 'conversation')

const createConversation = async function (conversation) {
  await addDoc(collectionRef, {
    ...conversation,
    timeEnd: serverTimestamp(),
  })
}

const getConversationsSpace = function (currentEmail, callback, lastDoc) {
  useFirestoreRealtimeQuery(
    'conversation',
    [
      {
        field: 'member',
        operator: 'array-contains',
        value: currentEmail,
      },
    ],
    {
      field: 'timeEnd',
      value: 'desc',
    },
    constant.SIZE_LOAD_CONVERSATION_SPACE,
    lastDoc,
    callback
  )
}

export { createConversation, getConversationsSpace }
