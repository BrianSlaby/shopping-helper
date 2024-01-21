import React from "react"
import { authUpdateEmail } from "../../firebase/authentication"

export default function ChangeEmail({ emailFormVis }) {
    const [newEmail, setNewEmail] = React.useState("")
    const [emailMsgVisible, setEmailMsgVisible] = React.useState(false)


    function handleNewEmailChange(event) {
        setNewEmail(event.target.value)
    }

    function handleUpdateEmail(event) {
        event.preventDefault()
        authUpdateEmail(newEmail)
        setNewEmail("")
        setEmailMsgVisible(true)
    }

    React.useEffect(() => {
        if (!emailFormVis) {
            setEmailMsgVisible(false)
        }
    }, [emailFormVis])

    return (
        <>
            <form className="auth-form">
            <input 
                    className="text-input"  
                    type="email" 
                    placeholder="Email" 
                    value={newEmail} 
                    onChange={handleNewEmailChange} 
                />

                <button 
                    className="btn secondary-btn"
                    onClick={handleUpdateEmail}
                >Update Email</button>

                {emailMsgVisible &&
                <p>Verification email sent.</p>}
            </form>
        </>
    )
}