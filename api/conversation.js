import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
} from 'firebase/firestore'
import { useFirestoreQueryCondition, useFirestoreRealtimeQuery } from './core'
import { db } from '@/firebase/config'
import { constant } from '~/constants/constant'

const collectionRef = collection(db, 'conversation')

const createConversation = async function (conversation) {
  await addDoc(collectionRef, {
    ...conversation,
    timeEnd: serverTimestamp(),
  })
}

const getIndividualConversationByMember = async function (member) {
  const result = await useFirestoreQueryCondition('conversation', [
    {
      field: 'type',
      operator: '==',
      value: 'individual',
    },
    {
      field: 'member',
      operator: 'array-contains-all',
      value: member,
    },
  ])

  return result[0]
}

const getConversationsSpace = function (currentEmail, callback, lastDoc) {
  const unsubscribe = useFirestoreRealtimeQuery(
    'conversation',
    [
      {
        field: 'member',
        operator: 'array-contains',
        value: currentEmail,
      },
      {
        field: 'type',
        operator: '==',
        value: 'group',
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

  return unsubscribe
}

const getConversationsIndividual = function (currentEmail, callback, lastDoc) {
  const unsubscribe = useFirestoreRealtimeQuery(
    'conversation',
    [
      {
        field: 'member',
        operator: 'array-contains',
        value: currentEmail,
      },
      {
        field: 'type',
        operator: '==',
        value: 'individual',
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

  return unsubscribe
}

const getConversationById = async function (id) {
  if (!id) return
  const docRef = doc(db, 'conversation', id)
  const docSnap = await getDoc(docRef)

  return { ...docSnap.data(), id: docSnap.id }
}

export {
  createConversation,
  getIndividualConversationByMember,
  getConversationsSpace,
  getConversationsIndividual,
  getConversationById,
}
