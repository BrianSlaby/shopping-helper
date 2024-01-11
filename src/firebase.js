import { initializeApp } from "firebase/app";
import { 
    getFirestore
 } from "firebase/firestore";
 import { 
    getAuth,
    createUserWithEmailAndPassword 
} from "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyDZCL6mhmFGam-jht1Yh72klUYjCEDrBAg",
  authDomain: "shopping-helper-99b9d.firebaseapp.com",
  projectId: "shopping-helper-99b9d",
  storageBucket: "shopping-helper-99b9d.appspot.com",
  messagingSenderId: "233933837651",
  appId: "1:233933837651:web:f4f1d85f3e3ce5f98bbda6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);



function authCreateAccountWithEmail() {
    const email = document.getElementById("email-input").value 
    const password = document.getElementById("password-input").value

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        // utility functions to clear fields
        // do we need the user variable?
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(`${errorCode}: ${errorMessage}`)
    });

}

