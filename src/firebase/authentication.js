import { app } from "./config"

import { 
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail
} from "firebase/auth";

const auth = getAuth(app);

async function authCreateAccountWithEmail(email, password) {
    try {
        await createUserWithEmailAndPassword(auth, email, password)
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(`${errorCode}: ${errorMessage}`)
        throw error
    }
}

async function authSignInWithEmail(email, password) {
    try {
        await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(`${errorCode}: ${errorMessage}`)
        throw error
    }
}

async function authSignOut() {
    try {
        await signOut(auth)
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(`${errorCode}: ${errorMessage}`)
        throw error
    }
}

// I'm getting the following error on localhost:
// auth/network-request-failed: Firebase: Error (auth/network-request-failed).
// chatgpt suggested messing with cors, I'll wait to see after deployment.

// ACTUALLY maybe changing to async functions will help

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