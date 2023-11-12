// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyChyUxZagp7nnvm1p_6l-if9i2KeOuHVs0",
  authDomain: "mercadito-88fa1.firebaseapp.com",
  projectId: "mercadito-88fa1",
  storageBucket: "mercadito-88fa1.appspot.com",
  messagingSenderId: "1013666212856",
  appId: "1:1013666212856:web:627c226376a4e0f37d040d",
  measurementId: "G-X6CF824Q58"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default firebaseApp;