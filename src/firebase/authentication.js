import { app } from "./config"

import { 
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail
} from "firebase/auth";

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

// I'm getting the following error on localhost:
// auth/network-request-failed: Firebase: Error (auth/network-request-failed).
// chatgpt suggested messing with cors, I'll wait to see after deployment.
function authResetPassword(email) {
    sendPasswordResetEmail(auth, email)
    .then(() => {
        console.log("Password reset email sent to ", email)
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(`${errorCode}: ${errorMessage}`)
    });
}

export {
    auth,
    authCreateAccountWithEmail,
    authSignInWithEmail,
    authSignOut,
    authResetPassword
}