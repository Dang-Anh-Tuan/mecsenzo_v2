import {
  doc,
  deleteDoc,
  addDoc,
  collection,
  getDoc,
  setDoc,
} from '@firebase/firestore'
import { getUsersByEmails } from './user.api'
import { useFirestoreQueryCondition } from '~/api/core'
import { db } from '~/firebase/config'
import { addTimeStamp } from '~/helper/FirebaseHelper'
import { mapInvitationUser } from '~/helper/mapInvitationUser'

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

export const getAcceptInvitation = async function (email) {
  const invitationSent = await useFirestoreQueryCondition('friend', [
    {
      field: 'senderEmail',
      operator: '==',
      value: email,
    },
    {
      field: 'status',
      operator: '==',
      value: 'accept',
    },
  ])

  const emailReceiverInvitation = invitationSent.map(
    (invitation) => invitation.receiverEmail
  )
  if (emailReceiverInvitation.length > 0) {
    const receiverInvitation = await getUsersByEmails(emailReceiverInvitation)

    mapInvitationUser(invitationSent, receiverInvitation)
  }

  const invitationReceived = await useFirestoreQueryCondition('friend', [
    {
      field: 'receiverEmail',
      operator: '==',
      value: email,
    },
    {
      field: 'status',
      operator: '==',
      value: 'accept',
    },
  ])

  const emailSenderInvitation = invitationReceived.map(
    (invitation) => invitation.senderEmail
  )
  if (emailSenderInvitation.length > 0) {
    const senderInvitation = await getUsersByEmails(emailSenderInvitation)

    mapInvitationUser(invitationReceived, senderInvitation)
  }

  const result = [...invitationSent, ...invitationReceived]

  return result
}
