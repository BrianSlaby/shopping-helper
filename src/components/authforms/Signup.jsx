import React from "react"
import { authCreateAccountWithEmail } from "../../firebase/authentication"

export default function Signup({ 
    email, 
    password, 
    handleEmailChange, 
    handlePasswordChange, 
    clearInputFields,
    signupFormClasses }) {

    const [confirmPassword, setConfirmPassword] = React.useState("")
    const [passwordWarning, setPasswordWarning] = React.useState(false)

    function handleConfirmPasswordChange(event) {
        setConfirmPassword(event.target.value)
    }

    function handleCreateAccountWithEmail(event) {
        event.preventDefault()

        if (password === confirmPassword) {
            authCreateAccountWithEmail(email, password)
            clearInputFields()
            setConfirmPassword("")
        } else {
            setPasswordWarning(true)
        }
    }

    React.useEffect(() => {
        if (password === confirmPassword) {
            setPasswordWarning(false)
        }
    }, [confirmPassword])

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

                { passwordWarning && 
                <p className="password-warning">
                Both password fields must match!</p>}

                <button 
                    id="create-acct-btn" 
                    className="btn primary-btn" 
                    onClick={handleCreateAccountWithEmail}
                >Create Account</button>
            </form>
        </div>
    )
}