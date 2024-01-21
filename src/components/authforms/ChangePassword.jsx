import React from "react"
import { authUpdatePassword } from "../../firebase/authentication"

export default function ChangePassword({ passwordFormVis }) {
    const [newPassword, setNewPassword] = React.useState("")
    const [confirmNewPassword, setConfirmNewPassword] = React.useState("")
    const [passwordSentMsgVis, setPasswordSentMsgVis] = React.useState(false)
    const [passwordMatchMsgVis, setPasswordMatchMsgVis] = React.useState(false)

    function handleNewPasswordChange(event) {
        setNewPassword(event.target.value)
    }

    function handleConfirmNewPasswordChange(event) {
        setConfirmNewPassword(event.target.value)
    }

    function handleChangePassword(event) {
        event.preventDefault()

        if (newPassword === confirmNewPassword) {
            setPasswordMatchMsgVis(false)
            authUpdatePassword(newPassword)
            setNewPassword("")
            setConfirmNewPassword("")
        } else {
            setPasswordMatchMsgVis(true)
        }
    }


    React.useEffect(() => {
        if (!passwordFormVis) {
            setPasswordSentMsgVis(false)
            setPasswordMatchMsgVis(false)
        }
    }, [passwordFormVis])

    return (
        <>
            <form className="auth-form">
                <input 
                    className="text-input"  
                    type="password" 
                    placeholder="Password" 
                    value={newPassword} 
                    onChange={handleNewPasswordChange} 
                />

                <input 
                    className="text-input" 
                    type="password" 
                    placeholder="Confirm Password" 
                    value={confirmNewPassword} 
                    onChange={handleConfirmNewPasswordChange} 
                />

                <button 
                    className="btn secondary-btn" 
                    onClick={handleChangePassword}
                >Change Password</button>

                {passwordSentMsgVis &&
                <p>Your password has been changed.</p> }

                {passwordMatchMsgVis && 
                <p className="password-warning">
                Both password fields must match!</p>}
            </form>
        </>
    )
}