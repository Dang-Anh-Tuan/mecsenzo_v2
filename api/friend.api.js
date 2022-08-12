import {
  doc,
  deleteDoc,
  addDoc,
  collection,
  getDoc,
  setDoc,
} from '@firebase/firestore'
import { useFirestoreQueryCondition } from '~/api/core'
import { db } from '~/firebase/config'
import { addTimeStamp } from '~/helper/FirebaseHelper'

export const getPendingInvitationSent = async function (email) {
  const result = await useFirestoreQueryCondition('friend', [
    {
      field: 'senderEmail',
      operator: '==',
      value: email,
    },
    {
      field: 'status',
      operator: '==',
      value: 'pending',
    },
  ])

  return result
}

export const getPendingInvitationReceived = async function (email) {
  const result = await useFirestoreQueryCondition('friend', [
    {
      field: 'receiverEmail',
      operator: '==',
      value: email,
    },
    {
      field: 'status',
      operator: '==',
      value: 'pending',
    },
  ])

  return result
}

export const getPendingInvitationBySenderReceiver = async function (
  sender,
  receiver
) {
  const result = await useFirestoreQueryCondition('friend', [
    {
      field: 'receiverEmail',
      operator: '==',
      value: receiver,
    },
    {
      field: 'status',
      operator: '==',
      value: 'pending',
    },
    {
      field: 'senderEmail',
      operator: '==',
      value: sender,
    },
  ])

  return result[0]
}

export const deleteInvitation = async function (id) {
  const docRef = doc(db, 'friend', id)
  await deleteDoc(docRef)
}

export const createInvitation = async function (sender, receiver) {
  const newInvitation = await addDoc(
    collection(db, 'friend'),
    addTimeStamp({
      senderEmail: sender,
      receiverEmail: receiver,
      status: 'pending',
    })
  )
  return newInvitation
}

export const getInvitationById = async function (id) {
  const docRef = doc(db, 'friend', id)
  const docSnap = await getDoc(docRef)

  return docSnap.data()
}

export const acceptInvitation = function (invitation) {
  const docRef = doc(db, 'friend', invitation.id)
  setDoc(docRef, {
    ...invitation,
    status: 'accept',
  })
}
