import { addDoc, collection } from '@firebase/firestore'
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
    conversation : idConversation,
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

export { saveMessage, getMessageByConversation }
