import React from "react"

import { 
    authCreateAccountWithEmail,
    authSignInWithEmail
} from "../firebase/authentication";

export default function AuthRequired() {
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")

    function handleEmailChange(event) {
        setEmail(event.target.value)
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value)
    }

    function clearInputFields() {
        setEmail("")
        setPassword("")
    }

    function handleCreateAccountWithEmail() {
        authCreateAccountWithEmail(email, password)
        clearInputFields()
    }

    function handleSignInWithEmail() {
        authSignInWithEmail(email, password)
        clearInputFields()
    }
    
    // Refactor form as a slider button (sign in vs create account)
        // basically, I'd rather have this as a form element with submit buttons
        // right now hitting enter after typing all fields does not submit
            // if it worked that way, login and create account need to be separate forms.
    return (
        <>
            <div className="login-container">
                <button 
                    id="google-sign-in-btn"
                    className="btn"
                >Sign In With Google</button>

                <input 
                    className="text-input" 
                    id="email-input" 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={handleEmailChange} 
                />

                <input 
                    className="text-input" 
                    id="password-input" 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={handlePasswordChange} 
                />

                <button 
                    id="sign-in-btn" 
                    className="btn primary-btn"
                    onClick={handleSignInWithEmail}
                >Sign In</button>

                <button 
                    id="create-acct-btn" 
                    className="btn secondary-btn" 
                    onClick={handleCreateAccountWithEmail}
                >Create Account</button>
            </div>
        </>
    )
}