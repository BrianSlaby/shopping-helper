import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDZCL6mhmFGam-jht1Yh72klUYjCEDrBAg",
  authDomain: "shopping-helper-99b9d.firebaseapp.com",
  projectId: "shopping-helper-99b9d",
  storageBucket: "shopping-helper-99b9d.appspot.com",
  messagingSenderId: "233933837651",
  appId: "1:233933837651:web:f4f1d85f3e3ce5f98bbda6"
};

const app = initializeApp(firebaseConfig);

export { 
    app
 }