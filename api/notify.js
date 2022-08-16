import { addDoc, collection, doc, setDoc } from '@firebase/firestore'
import { useFirestoreQueryCondition, useFirestoreRealtimeQuery } from './core'
import { constant } from '~/constants/constant'
import { db } from '~/firebase/config'
import { addTimeStamp } from '~/helper/FirebaseHelper'

export const createNotify = async function (
  receiverEmail,
  senderFullname,
  type,
  link
) {
  const newNotify = await addDoc(
    collection(db, 'notify'),
    addTimeStamp({
      receiverEmail,
      senderFullname,
      type,
      link,
      seen: false,
    })
  )
  return newNotify
}

export const getNotify = function (currentEmail, callback, lastDocNotify) {
  useFirestoreRealtimeQuery(
    'notify',
    [
      {
        field: 'receiverEmail',
        operator: '==',
        value: currentEmail,
      },
    ],
    {
      field: 'timestamp',
      value: 'desc',
    },
    constant.SIZE_LOAD_NOTIFY,
    lastDocNotify,
    callback
  )
}

export const seenNotify = async function (notify) {
  const docRef = doc(db, 'notify', notify.id)
  await setDoc(docRef, {
    ...notify,
    seen: true,
  })
}

export const seenNotifies = async function (currentEmail) {
  const notifies = await useFirestoreQueryCondition('notify', [
    {
      field: 'receiverEmail',
      operator: '==',
      value: currentEmail,
    },
    {
      field: 'seen',
      operator: '==',
      value: false,
    },
  ])
  for (const notify of notifies) {
    await seenNotify(notify)
  }
}
