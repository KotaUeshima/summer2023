// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDjCtb05JwD3RUHf3gO-W8Xx6nlKbODWJY',
  authDomain: 'summer2023-f0235.firebaseapp.com',
  projectId: 'summer2023-f0235',
  storageBucket: 'summer2023-f0235.appspot.com',
  messagingSenderId: '426879634451',
  appId: '1:426879634451:web:77efd2b8d03f817355c3e6',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
// Database
export const database = getFirestore(app)
// Auth
export const auth = getAuth(app)
