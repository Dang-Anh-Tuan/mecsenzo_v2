import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  setDoc,
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
      field: 'member',
      operator: 'array-contains',
      value: member,
    },
    {
      field: 'type',
      operator: '==',
      value: 'individual',
    },
  ])

  return result
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

const getConversationByIdRealTime = function (id, callback) {
  const unsubscribe = onSnapshot(doc(db, 'conversation', id), (doc) => {
    callback(doc)
  })

  return unsubscribe
}

const updateConversation = async function (conversation) {
  const docRef = doc(db, 'conversation', conversation.id)

  await setDoc(docRef, conversation)
}

const getConversationOfUser = async function (emailUser) {
  const result = await useFirestoreQueryCondition('conversation', [
    {
      field: 'member',
      operator: 'array-contains',
      value: emailUser,
    },
  ])

  return result
}

const getConversationOfUserRealtime = function (
  currentEmail,
  callback,
  lastDoc
) {
  const unsubscribe = useFirestoreRealtimeQuery(
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

  return unsubscribe
}

const getConversationIndividualByEmail = async function (email) {
  const result = await useFirestoreQueryCondition('conversation', [
    {
      field: 'member',
      operator: 'array-contains',
      value: email,
    },
    {
      field: 'type',
      operator: '==',
      value: 'individual',
    },
  ])

  return result
}

export {
  createConversation,
  getIndividualConversationByMember,
  getConversationsSpace,
  getConversationsIndividual,
  getConversationById,
  getConversationByIdRealTime,
  updateConversation,
  getConversationOfUser,
  getConversationOfUserRealtime,
  getConversationIndividualByEmail,
}
