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

export const getUsersByEmails = async function (emails) {
  const data = await useFirestoreQueryCondition('users', [
    {
      field: 'email',
      operator: 'in',
      value: emails,
    },
  ])

  return data
}

export const getUserByEmailAndFullname = async function (keyword) {
  const usersGetByEmail = await useFirestoreQueryCondition('users', [
    {
      field: 'email',
      operator: '==',
      value: keyword,
    },
  ])

  const usersGetByEFullname = await useFirestoreQueryCondition('users', [
    {
      field: 'fullName',
      operator: '==',
      value: keyword,
    },
  ])

  return [...usersGetByEmail, ...usersGetByEFullname]
}

export const setActiveUser = async function (valueActive) {
  const currentEmail = localStorage.getItem('email')
  const currentUser = await getUserByEmail(currentEmail)

  const docRef = doc(db, 'users', currentUser.id)

  await setDoc(docRef, { ...currentUser, isActive: valueActive })
}

export const setAvatarUser = async function (avatarUrl) {
  const currentEmail = localStorage.getItem('email')
  const currentUser = await getUserByEmail(currentEmail)

  const docRef = doc(db, 'users', currentUser.id)

  const newUser = { ...currentUser, avatar: avatarUrl }
  localStorage.setItem('user', JSON.stringify(newUser))
  await setDoc(docRef, newUser)
}

export const updateUser = async function (user) {
  const docRef = doc(db, 'users', user.id)

  await setDoc(docRef, user)
}

export const addNewFriend = async function (user, email) {
  const docRef = doc(db, 'users', user.id)

  user.friend = user.friend ? user.friend : []

  const newUser = {
    ...user,
    friend: [...user.friend, email],
  }

  await setDoc(docRef, newUser)
}

export const unfriend = async function (user, email) {
  const docRef = doc(db, 'users', user.id)

  const newArrFriend = user.friend.filter((item) => item !== email)

  const newUser = {
    ...user,
    friend: newArrFriend,
  }

  await setDoc(docRef, newUser)
}
