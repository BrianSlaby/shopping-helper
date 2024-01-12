import { initializeApp } from "firebase/app";
import { 
    getFirestore
 } from "firebase/firestore";
 import { 
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
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

function authCreateAccountWithEmail(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;   
        // do we need the user variable?
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(`${errorCode}: ${errorMessage}`)
    });
}

function authSignInWithEmail(email, password) {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        // do we need the user variable?
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(`${errorCode}: ${errorMessage}`)
    });
}

function authSignOut() {
    signOut(auth).then(() => {
        // Sign-out successful.
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(`${errorCode}: ${errorMessage}`)
      });
}

export { 
    auth,
    authCreateAccountWithEmail,
    authSignInWithEmail,
    authSignOut
 }