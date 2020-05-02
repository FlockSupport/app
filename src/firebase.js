import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";


  var firebaseConfig = {
    apiKey: "AIzaSyAz-IZ2d1LY-gFNjlwpl_G169h-HzKtgtI",
    authDomain: "flock-support-test.firebaseapp.com",
    databaseURL: "https://flock-support-test.firebaseio.com",
    projectId: "flock-support-test",
    storageBucket: "flock-support-test.appspot.com",
    messagingSenderId: "397148793596",
    appId: "1:397148793596:web:7865c46a123bf783e2c579",
    measurementId: "G-S9NYLY39ZL",
  };


firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.EmailAuthProvider();
