import React from "react"
import { authSignOut } from "../firebase/authentication"
import { addNewListToDB } from "../firebase/firestore"
import UserLists from "../components/lists/UserLists"

export default function Home({ user, lists }) {
    const [ newListName, setNewListName ] = React.useState("")

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

    return(
    <>
        <div className="home-container">
            <div className="home-nav-container">
                <button 
                    className="btn secondary-btn" 
                    onClick={authSignOut}
                >Sign Out</button>
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

    </>
    )
}