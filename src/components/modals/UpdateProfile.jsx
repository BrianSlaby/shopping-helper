import React from "react"
import Modal from "./Modal"
import ChangeEmail from "../../components/authforms/ChangeEmail"
import ChangePassword from "../../components/authforms/ChangePassword"
import DeleteAccount from "../../components/authforms/DeleteAccount"


export default function UpdateProfile({ isOpen, closeModal }) {
    const [ emailFormVis, setEmailFormVis ] = React.useState(false)
    const [ passwordFormVis, setPasswordFormVis ] = React.useState(false)
    const [ deleteAccFormVis, setDeleteAccFormVis ] = React.useState(false)

    const emailBtnText = emailFormVis ? "Close Email Form" : "Change Email"
    const passwordBtnText = passwordFormVis ? "Close Password Form" : "Change Password"
    const accountBtnText = deleteAccFormVis ? "Close Account Form" : "Delete Account"

    function handleChangeEmailClick() {
        setEmailFormVis(prevState => !prevState)
    }

    function handleChangePasswordClick() {
        setPasswordFormVis(prevState => !prevState)
    }

    function handleDeleteAccClick() {
        setDeleteAccFormVis(prevState => !prevState)
    }

    return (
        <>
            <Modal isOpen={isOpen} closeModal={closeModal}>
                <div className="update-profile-container">
                    <button 
                        className="btn primary-btn"
                        onClick={handleChangeEmailClick}
                    >{emailBtnText}</button>

                    {emailFormVis && 
                    <ChangeEmail emailFormVis={emailFormVis}/>}

                    <button
                        className="btn primary-btn"
                        onClick={handleChangePasswordClick}
                    >{passwordBtnText}</button>

                    {passwordFormVis && 
                    <ChangePassword passwordFormVis={passwordFormVis} />}

                    <button
                        className="btn primary-btn"
                        onClick={handleDeleteAccClick}
                    >{accountBtnText}</button>

                    {deleteAccFormVis && 
                    <DeleteAccount deleteAccFormVis={deleteAccFormVis} />}

                </div>
            </Modal>
        </>
    )
}