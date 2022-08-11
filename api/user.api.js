/* eslint-disable no-console */
import { addDoc, collection, doc, onSnapshot, setDoc } from 'firebase/firestore'
import { db } from '@/firebase/config'
import { useFirestoreQueryCondition } from '~/api/core'
import { addTimeStamp } from '~/helper/FirebaseHelper'

const collectionRef = collection(db, 'users')

export const createUser = async function (user) {
  await addDoc(collectionRef, addTimeStamp(user))
}

export const getAllUser = function () {
  const users = []
  onSnapshot(collectionRef, (snapshort) => {
    snapshort.docs.map((doc) => users.push(doc.data()))
  })
  return users
}

export const getUserByEmail = async function (email) {
  const data = await useFirestoreQueryCondition(
    'users',
    [
      {
        field: 'email',
        operator: '==',
        value: email,
      },
    ],
    null,
    1
  )

  const user = data[0]

  return user
}

export const setActiveUser = async function (valueActive) {
  const currentEmail = localStorage.getItem('email')
  const currentUser = await getUserByEmail(currentEmail)

  const docRef = doc(db, 'users', currentUser.id)

  setDoc(docRef, { ...currentUser, isActive: valueActive })
}

export const setAvatarUser = async function (avatarUrl) {
  const currentEmail = localStorage.getItem('email')
  const currentUser = await getUserByEmail(currentEmail)

  const docRef = doc(db, 'users', currentUser.id)

  const newUser = { ...currentUser, avatar: avatarUrl }
  localStorage.setItem('user', JSON.stringify(newUser))
  console.log(newUser)
  setDoc(docRef, newUser)
}

export const updateUser = function (user) {
  const docRef = doc(db, 'users', user.id)

  setDoc(docRef, user)
}
