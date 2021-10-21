import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCodcFU5NUn_-EoMxs1Pvdv8l7ODbxImEs",
    authDomain: "chat-app-e5950.firebaseapp.com",
    projectId: "chat-app-e5950",
    storageBucket: "chat-app-e5950.appspot.com",
    messagingSenderId: "661498271106",
    appId: "1:661498271106:web:984313f905910432dceb9b"
  };

  let app;

  if (firebase.apps.length === 0){
    app=firebase.initializeApp(firebaseConfig);

  }else {
    app=firebase.app();
  }

  const db = app.firestore();
  const auth = firebase.auth();

  export { db, auth };