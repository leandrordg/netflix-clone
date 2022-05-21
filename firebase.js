import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyC_8FycS_t-t9507Z73PsFk8arnh7baIKg',
  authDomain: 'netflix-clone-8c453.firebaseapp.com',
  projectId: 'netflix-clone-8c453',
  storageBucket: 'netflix-clone-8c453.appspot.com',
  messagingSenderId: '321542165812',
  appId: '1:321542165812:web:168cbf19a34817a9228161',
}

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app
export { auth, db }
