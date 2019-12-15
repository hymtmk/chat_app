import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyCJHCJdCunQf7Zmglyis6ixQ-IDbXrkVsU",
    authDomain: "whatsappp-c89b3.firebaseapp.com",
    databaseURL: "https://whatsappp-c89b3.firebaseio.com",
    projectId: "whatsappp-c89b3",
    storageBucket: "whatsappp-c89b3.appspot.com",
    messagingSenderId: "875241797549",
    appId: "1:875241797549:web:b81b5930927e39e03e5324",
    measurementId: "G-5Z01J7H8ZQ"
  };

let app = firebase.initializeApp(firebaseConfig);
export const FirebaseDatabase = app.database();