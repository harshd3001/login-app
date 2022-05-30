import firebase from 'firebase/compat/app';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBvnXsurQ5b4fgwEyO7u1hPKanOnsLxryM",
    authDomain: "login-a2ffd.firebaseapp.com",
    databaseURL: "https://login-a2ffd-default-rtdb.firebaseio.com",
    projectId: "login-a2ffd",
    storageBucket: "login-a2ffd.appspot.com",
    messagingSenderId: "437487911031",
    appId: "1:437487911031:web:747f953c1f22154b5e4672"
  };

  const firebaseapp=firebase.initializeApp(firebaseConfig)
  const db =getFirestore(firebaseapp)
  export {db};