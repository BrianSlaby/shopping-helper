import React from "react"
import { authSignOut } from "../firebase/authentication"
import { addNewListToDB } from "../firebase/firestore"
import UserLists from "../components/lists/UserLists"
import UpdateProfile from "../components/modals/UpdateProfile"

export default function Home({ children, user, lists }) {
    const [ newListName, setNewListName ] = React.useState("")
    const [ isProfileModalOpen, setIsProfileModalOpen ] = React.useState(false)

    function handleNewListName(event) {
        setNewListName(event.target.value)
    }

    function submitNewList(event) {
        event.preventDefault()
        if (newListName) {
            addNewListToDB(newListName, user)
        setNewListName("")
        }
    }

    function openProfileModal() {
        setIsProfileModalOpen(true)
    }

    function handleCloseProfileModal() {
        setIsProfileModalOpen(false)
    }

    return(
    <>
        <div className="home-container">
            <div className="home-nav-container">
                <button 
                    className="btn secondary-btn" 
                    onClick={authSignOut}
                >Sign Out</button>
                <button 
                    className="btn secondary-btn" 
                    onClick={openProfileModal}
                >Update Profile</button>
            </div>

            <form className="create-list-container">
                <input
                    className="text-input"
                    type="text"
                    placeholder="New List Name"
                    maxLength="20"
                    value={newListName} 
                    onChange={handleNewListName}
                />

                <button
                    className="btn primary-btn"
                    onClick={submitNewList}
                >Create List</button>
            </form>

            <div className="lists-container">
                <UserLists
                    lists={lists} 
                />
            </div>
        </div>

        <UpdateProfile 
            isOpen={isProfileModalOpen}
            closeModal={handleCloseProfileModal}
        />
    </>
    )
}