import React from "react"
import Modal from "./Modal"
import { authResetPassword } from "../../firebase/authentication"

export default function PasswordReset({ isOpen, closeModal }) {
    const [resetEmail, setResetEmail] = React.useState("")
    const [errorMessage, setErrorMessage] = React.useState("")


    function handleResetEmailChange(event) {
        setResetEmail(event.target.value)
    }

    async function handleSendPasswordResetEmail() {
        try {
            await authResetPassword(resetEmail)
            setResetEmail("")
            setErrorMessage("")
        } catch (error) {
            setErrorMessage(error.message)
        }

        
    }

    return (
        <Modal isOpen={isOpen} closeModal={closeModal}>
            <div>
                <p>Do you want to recieve a password reset email?</p>
                <form className="auth-form">
                <input 
                    className="text-input" 
                    id="email-input" 
                    type="email" 
                    placeholder="Email" 
                    value={resetEmail} 
                    onChange={handleResetEmailChange} 
                />

                <button 
                    id="password-reset-btn" 
                    className="btn primary-btn"
                    onClick={handleSendPasswordResetEmail}
                >Send Email</button>
                </form>

                {errorMessage && 
                <p className="error-text"> {errorMessage} </p>}

            </div>
        </Modal>
    )
}