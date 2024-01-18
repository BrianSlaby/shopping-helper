import React from "react"
import { authSignOut } from "../firebase/authentication"
import { addNewListToDB } from "../firebase/firestore"
import UserLists from "../components/lists/UserLists"

export default function Home({ children, user, lists }) {
    const [ newListName, setNewListName ] = React.useState("")

    function handleNewListName(event) {
        setNewListName(event.target.value)
    }

    function submitNewList() {
        if (newListName) {
            addNewListToDB(newListName, user)
        setNewListName("")
        }
    }

    return(
    <>
        <div className="home-container">
            <div className="home-nav-container">
                <button className="btn" onClick={authSignOut}>Sign Out</button>
                <button className="btn" onClick={() => console.log("clicked")}>Update Profile</button>
            </div>

            <div className="create-list-container">
                <input
                    className="text-input"
                    type="text"
                    placeholder="New List Name"
                    value={newListName} 
                    onChange={handleNewListName}
                />

                <button
                    className="btn primary-btn"
                    onClick={submitNewList}
                >Create List</button>
            </div>

            <div className="lists-container">
                <UserLists
                    lists={lists} 
                />
            </div>
        </div>
    </>
    )
}

    // Update profile options:
        // change name
        // change email
        // change password
        // delete account