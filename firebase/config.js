import { getFirestore } from '@firebase/firestore'
import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyAG4LxJnpv5afNK5ndQBUTmHvNI1gLdwkU',
  authDomain: 'mecsenzo.firebaseapp.com',
  databaseURL:
    'https://mecsenzo-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'mecsenzo',
  storageBucket: 'mecsenzo.appspot.com',
  messagingSenderId: '603652109463',
  appId: '1:603652109463:web:511c4984483b6fc0e365d2',
}

const app = initializeApp(firebaseConfig)

const db = getFirestore(app)
const storage = getStorage(app)
// connectFirestoreEmulator(db, 'localhost', 8080)

export { storage, db }
