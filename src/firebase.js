import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyDjmH3-W3ztrWwqvLuhhRb9w4aEjmKyDZ4",
    authDomain: "tiendavet2021.firebaseapp.com",
    projectId: "tiendavet2021",
    storageBucket: "tiendavet2021.appspot.com",
    messagingSenderId: "881421699344",
    appId: "1:881421699344:web:76b62216d41543aa62fd95"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

export { auth };
