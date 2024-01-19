import React from "react"
import { authSignInWithEmail } from "../../firebase/authentication"

export default function Login({ 
    email, 
    password, 
    handleEmailChange, 
    handlePasswordChange, 
    clearInputFields,
    loginFormClasses }) {
    
    function handleSignInWithEmail(event) {
        event.preventDefault()
        authSignInWithEmail(email, password)
        clearInputFields()
    }


    return (
        <div className={`login-form-container ${loginFormClasses}`}>
            <form className="auth-form">
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


            </form>
            <div className="login-options-container">
                <button 
                    id="google-sign-in-btn"
                    className="btn secondary-btn"
                >Sign In With Google</button>
            </div>
        </div>
    )
}