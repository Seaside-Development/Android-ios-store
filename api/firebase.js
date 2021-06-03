import firestore from '@react-native-firebase/firestore';
import firebase from 'firebase/app'
// Optionally import the services that you want to use
//import "firebase/auth";
//import "firebase/database";
//import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";

// Initialize Firebase
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


//get store collections
export async function getProducts(productsRetrieved) {
  const productList = [];
  const snapshot = await firestore().collection('collections').get();
  snapshot.forEach(doc => {
    productList.push(doc.data);
  });
  productsRetrieved(productList);
}
