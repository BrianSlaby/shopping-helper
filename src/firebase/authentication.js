import { app } from "./config"

import { 
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
    updateEmail,
    sendEmailVerification,
    updatePassword,
    reauthenticateWithCredential
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

// auth/operation-not-allowed: Firebase: Please verify the new email before changing email. (auth/operation-not-allowed).
function authUpdateEmail(newEmail) {
    updateEmail(auth.currentUser, newEmail).then(() => {
        console.log("email updated to ", newEmail)

        // I don't think I can nest this here
        // email needs to be verified BEFORE updateEmail called
        sendEmailVerification(auth.currentUser)
            .then(() => {
                // Email verification sent!
                // ...
            });
        // Email updated!
        // ...
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(`${errorCode}: ${errorMessage}`)
      });
}

function authUpdatePassword(newPassword) {
    updatePassword(auth.currentUser, newPassword).then(() => {
        console.log("password updated")
        // Update successful.
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
    authSignOut,
    authResetPassword,
    authUpdateEmail,
    authUpdatePassword
}