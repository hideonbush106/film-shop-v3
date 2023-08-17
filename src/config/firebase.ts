// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'

import { getAuth, GoogleAuthProvider } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyApSijfXMsad6bfghE15Sn-knLCmoShlsE',
  authDomain: 'filmshopv3.firebaseapp.com',
  projectId: 'filmshopv3',
  storageBucket: 'filmshopv3.appspot.com',
  messagingSenderId: '903606744373',
  appId: '1:903606744373:web:347e091ba7f57fad30087c',
  measurementId: 'G-YVSCV9J84B'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)

export const provider = new GoogleAuthProvider()
