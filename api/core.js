import {
  collection,
  orderBy,
  query,
  where,
  limit,
  getDocs,
} from 'firebase/firestore'

import { db } from '~/firebase/config'

const useFirestoreQueryCondition = async function (
  collectionName,
  conditions,
  orderby = null,
  limitValue = null
) {
  const collectionRef = collection(db, collectionName)
  const results = []

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
  const arr = [collectionRef]

  if (conditions) {
    conditions.forEach((condition) => {
      arr.push(where(condition.field, condition.operator, condition.value))
    })
  }

  if (orderby) {
    arr.push(orderBy(orderby.field, orderby.value))
  }
  if (limit) {
    arr.push(limit(limitValue))
  }

  const q = query(...arr)

  const querySnapshot = await getDocs(q)

  querySnapshot.forEach((doc) => {
    results.push({
      ...doc.data(),
      id: doc.id,
    })
  })

  return results
}

export { useFirestoreQueryCondition }
