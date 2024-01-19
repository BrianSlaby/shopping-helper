import React from "react"
import { authCreateAccountWithEmail } from "../../firebase/authentication"

export default function Signup({ 
    email, 
    password, 
    handleEmailChange, 
    handlePasswordChange, 
    clearInputFields,
    signupFormClasses }) {

    const [displayName, setDisplayName] = React.useState("")
    const [confirmPassword, setConfirmPassword] = React.useState("")

    function handleDisplayNameChange(event) {
        setDisplayName(event.target.value)
    }

    function handleConfirmPasswordChange(event) {
        setConfirmPassword(event.target.value)
    }

    function handleCreateAccountWithEmail(event) {
        event.preventDefault()
        authCreateAccountWithEmail(email, password)
        clearInputFields()
    }

    return (
        <div className={`signup-form-container ${signupFormClasses}`}>
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

                <input 
                    className="text-input" 
                    id="confirm-password-input" 
                    type="password" 
                    placeholder="Confirm Password" 
                    value={confirmPassword} 
                    onChange={handleConfirmPasswordChange} 
                />

                <input 
                    className="text-input" 
                    id="display-name-input" 
                    type="text" 
                    placeholder="Display Name" 
                    value={displayName} 
                    onChange={handleDisplayNameChange} 
                />

                <button 
                    id="create-acct-btn" 
                    className="btn primary-btn" 
                    onClick={handleCreateAccountWithEmail}
                >Create Account</button>
            </form>
        </div>
    )
}