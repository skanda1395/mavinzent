import firebase from "firebase//app"; 
import "firebase/firestore"; 

var firebaseConfig = {
  apiKey: "AIzaSyCfp72fSZtExit5D1QOHRyNH2s3iXRbcYw",
  authDomain: "todo-ninja-399f6.firebaseapp.com",
  databaseURL: "https://todo-ninja-399f6.firebaseio.com",
  projectId: "todo-ninja-399f6",
  storageBucket: "todo-ninja-399f6.appspot.com",
  messagingSenderId: "93791144315",
  appId: "1:93791144315:web:a93660712a86cc0d3f55de",
  measurementId: "G-GDZV2JWHQS"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export default db;