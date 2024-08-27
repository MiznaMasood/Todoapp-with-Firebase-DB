// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "",
  authDomain: "fir-auth-a0f7c.firebaseapp.com",
  projectId: "fir-auth-a0f7c",
  storageBucket: "fir-auth-a0f7c.appspot.com",
  messagingSenderId: "543377671784",
  appId: "1:543377671784:web:2566560d68383f6fef9ddd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);

export {app,database};
