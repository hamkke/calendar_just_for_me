// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyASBQsTviSRLzGRuxJN3cq4WRr3syvjkUo',
  authDomain: 'mycalendar-bcbdc.firebaseapp.com',
  projectId: 'mycalendar-bcbdc',
  storageBucket: 'mycalendar-bcbdc.appspot.com',
  messagingSenderId: '391269396653',
  appId: '1:391269396653:web:b384aa3bbce7fbed585624',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// App에서도 사용할 수 있게 export
export const db = getFirestore(app)
