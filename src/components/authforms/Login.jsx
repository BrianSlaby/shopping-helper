import React from "react"
import PasswordReset from "../modals/PasswordReset"
import { authSignInWithEmail } from "../../firebase/authentication"

export default function Login({ 
    email, 
    password, 
    handleEmailChange, 
    handlePasswordChange, 
    clearInputFields,
    loginFormClasses }) {

    const [isPasswordResetOpen, setIsPasswordResetOpen] = React.useState(false)
    
    function openPasswordResetModal() {
        setIsPasswordResetOpen(true)
    }

    function handleClosePasswordReset() {
        setIsPasswordResetOpen(false)
    }

    function handleSignInWithEmail(event) {
        event.preventDefault()
        authSignInWithEmail(email, password)
        clearInputFields()
    }


    return (
        <>
        <div className={`login-form-container ${loginFormClasses}`}>
            <form className="auth-form">
                <input 
                    className="text-input" 
                    id="login-email-input" 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={handleEmailChange} 
                />

                <input 
                    className="text-input" 
                    id="login-password-input" 
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
                    className="btn ghost-btn"
                    onClick={openPasswordResetModal}
                >Forgot Password?</button>
            </div>
        </div>

        <PasswordReset 
            isOpen={isPasswordResetOpen}
            closeModal={handleClosePasswordReset}
        />
        </>
    )
}