import * as firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyB6-uVkUwypmwSZzkXNghj3HxT9TNAOGLw",
  authDomain: "instagram-clone-4fbbb.firebaseapp.com",
  databaseURL: "https://instagram-clone-4fbbb.firebaseio.com",
  projectId: "instagram-clone-4fbbb",
  storageBucket: "instagram-clone-4fbbb.appspot.com",
  messagingSenderId: "726780716595",
  appId: "1:726780716595:web:4ef8fecc8d2af6138f2546",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
const firestore = firebase.firestore();
const auth = firebase.auth();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;
export { storage, firestore, timestamp, auth };
