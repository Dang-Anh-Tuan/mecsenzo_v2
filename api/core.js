import {
  collection,
  orderBy,
  query,
  where,
  limit,
  getDocs,
  onSnapshot,
  startAfter,
} from 'firebase/firestore'

import { db } from '~/firebase/config'

const renderQuery = function (
  collectionName,
  conditions,
  orderby = null,
  limitValue = null,
  start = null
) {
  const collectionRef = collection(db, collectionName)
  const arr = [collectionRef]

  if (conditions) {
    conditions.forEach((condition) => {
      arr.push(where(condition.field, condition.operator, condition.value))
    })
  }

  if (orderby) {
    arr.push(orderBy(orderby.field, orderby.value))
  }
  if (start) {
    arr.push(startAfter(start))
  }

  if (limitValue) {
    arr.push(limit(limitValue))
  }

  return query(...arr)
}

const useFirestoreQueryCondition = async function (
  collectionName,
  conditions,
  orderby = null,
  limitValue = null,
  start = null
) {
  /* Condition {
    filed, --------- ex : "name", "age" , ...
    operator, ------ ex : ==, >, < ...
    value, --------- ex : "Tuan", 18
  } */
  /* Condition {
    filed, --------- ex : "name", "age" , ...
    value "asc" | "desc"
  } */
  // limit : number

  const results = []
  const q = renderQuery(collectionName, conditions, orderby, limitValue, start)
  const querySnapshot = await getDocs(q)

  querySnapshot.forEach((doc) => {
    results.push({
      ...doc.data(),
      id: doc.id,
    })
  })

  return results
}

const useFirestoreRealtimeQuery = function (
  collectionName,
  conditions,
  orderby = null,
  limitValue = null,
  start = null,
  callback
) {
  const q = renderQuery(collectionName, conditions, orderby, limitValue, start)

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const result = []
    querySnapshot.forEach((doc) => {
      result.push(doc)
    })
    callback(result)
  })

  return unsubscribe
}

export { useFirestoreQueryCondition, useFirestoreRealtimeQuery }
