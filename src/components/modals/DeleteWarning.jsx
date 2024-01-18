import React from "react"
import Modal from "./Modal"
import { deleteListFromDB } from "../../firebase/firestore"

export default function DeleteWarning({ isOpen, closeModal, listWarningId }) {


    return (
        <>
            <Modal isOpen={isOpen} closeModal={closeModal}>
                <div>
                    <p>Are you sure you want to delete this list?</p>
                    <div className="warning-modal-btn-container">
                        <button
                            className="btn modal-btn delete-list-btn"
                            onClick={() => deleteListFromDB(listWarningId)}
                        >Delete List</button>
                        
                    </div>
                </div>
            </Modal>
        </>
    )
}