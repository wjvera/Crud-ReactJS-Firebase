import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDaC-BJ5EduHKqFFIZOncqp4fCKESZWW9Y",
    authDomain: "crud-con-firebase-94271.firebaseapp.com",
    projectId: "crud-con-firebase-94271",
    storageBucket: "crud-con-firebase-94271.appspot.com",
    messagingSenderId: "912644207654",
    appId: "1:912644207654:web:c4f7ab33befea9271362e7"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


export {firebase}