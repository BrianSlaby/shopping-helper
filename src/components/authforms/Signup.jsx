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
    const [errorMessage, setErrorMessage] = React.useState("")

    function handleConfirmPasswordChange(event) {
        setConfirmPassword(event.target.value)
    }

    async function handleCreateAccountWithEmail(event) {
        event.preventDefault()

        if (password === confirmPassword) {
            try {
                await authCreateAccountWithEmail(email, password)
                clearInputFields()
                setConfirmPassword("")
                setErrorMessage("")
            } catch (error) {
                setErrorMessage(error.message)
            }
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

                { errorMessage &&
                <p className="error-text">{errorMessage}</p>}

                <button 
                    id="create-acct-btn" 
                    className="btn primary-btn" 
                    onClick={handleCreateAccountWithEmail}
                >Create Account</button>
            </form>
        </div>
    )
}