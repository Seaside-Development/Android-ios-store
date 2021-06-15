import firebase from 'firebase/app'
import "firebase/functions";
import "firebase/storage";
import React from "react";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

//FIREBASE CREDENTIALS
const firebaseConfig = {
  apiKey: "AIzaSyA6w5l4Jkmdv9EJ-ykGMyuAkOuri3WJzbw",
  authDomain: "reactstore-836e1.firebaseapp.com",
  projectId: "reactstore-836e1",
  storageBucket: "reactstore-836e1.appspot.com",
  messagingSenderId: "17091716918",
  appId: "1:17091716918:web:6173b71cf0aca62881f597",
  measurementId: "G-60WYT46HBV"
};

firebase.initializeApp(firebaseConfig);

export function login({ email, password }) {
  firebase.auth().signInWithEmailAndPassword(email, password)
      .then((value) => console.log(value))
}

export function signup({ email, password, displayName }) {
  firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userInfo) => {
        console.log(userInfo)
        userInfo.user.updateProfile({ displayName: displayName.trim() })
            .then(() => { })
      })
}

export function subscribeToAuthChanges(authStateChanged) {
  firebase.auth().onAuthStateChanged((user) => {
    authStateChanged(user);
  })
}

export function signout(onSignedOut) {
  firebase.auth().signOut()
      .then(() => {
        onSignedOut();
      })
}

export const firestore = firebase.firestore();
