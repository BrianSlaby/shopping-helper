import React from "react"
import "./modal.css"

export default function Modal({ children, isOpen, closeModal }) {
    const [ isModalOpen, setIsModalOpen ] = React.useState(isOpen)
    const modalRef = React.useRef(null)

    function handleCloseModal() {
        if (closeModal) {
            closeModal()
        }
        setIsModalOpen(false)
    }

    function handleKeydown(event) {
        if (event.key === "Escape") {
            handleCloseModal()
        }
    }

    React.useEffect(() => {
        setIsModalOpen(isOpen)
    }, [isOpen])
    
    React.useEffect(() => {
        const modalEl = modalRef.current
        
        if (modalEl) {
            if (isModalOpen) {
                modalEl.showModal()
            } else {
                modalEl.close()
            }
        }
    }, [isModalOpen])

    return (
        <dialog 
            className="modal" 
            onKeyDown={handleKeydown}
            ref={modalRef}
        >

            { children }

            <div className="close-modal-btn-container">
                <button
                    className="btn modal-btn close-modal-btn"
                    onClick={handleCloseModal}
                >Close</button>
            </div>
        </dialog>
    )
}