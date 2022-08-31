import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  setDoc,
} from '@firebase/firestore'
import { useFirestoreRealtimeQuery } from './core'
import { constant } from '~/constants/constant'
import { db } from '~/firebase/config'

const saveMessage = async function (
  idConversation,
  user,
  content,
  reply,
  type
) {
  const newMessage = {
    conversation: idConversation,
    user,
    content,
    reply,
    type,
    timestamp: new Date(),
  }

  const responseMsg = await addDoc(collection(db, 'message'), newMessage)
  return { id: responseMsg.id, ...newMessage }
}

const getMessageByConversation = function (
  idConversation,
  callback,
  lastDocMessage
) {
  if (!idConversation) return
  const unsubscribe = useFirestoreRealtimeQuery(
    'message',
    [
      {
        field: 'conversation',
        operator: '==',
        value: idConversation,
      },
    ],
    {
      field: 'timestamp',
      value: 'desc',
    },
    constant.SIZE_LOAD_MESSAGE,
    lastDocMessage,
    callback
  )

  return unsubscribe
}

const saveMessageVideoCall = async function (
  idConversation,
  user,
  roomVideoCall
) {
  const newMessage = {
    conversation: idConversation,
    user,
    content: roomVideoCall,
    type: 'videoCall',
    status: 'pending',
    emailJoin: [],
    reply: null,
    timestamp: new Date(),
  }

  const responseMsg = await addDoc(collection(db, 'message'), newMessage)
  return { id: responseMsg.id, ...newMessage }
}

const updateMessageVideoCall = async function (messageVideoCall) {
  const docRef = doc(db, 'message', messageVideoCall.id)
  const result = await setDoc(docRef, messageVideoCall)

  return result
}

const getMessageRealtime = function (idMessage, callback) {
  const unsubscribe = onSnapshot(doc(db, 'message', idMessage), (doc) => {
    const user = {
      id: doc.id,
      ...doc.data(),
    }
    callback(user)
  })

  return unsubscribe
}

export {
  saveMessage,
  getMessageByConversation,
  saveMessageVideoCall,
  updateMessageVideoCall,
  getMessageRealtime,
}
