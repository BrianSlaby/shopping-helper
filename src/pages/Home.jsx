import React from "react"
import { authSignOut } from "../firebase/authentication"
import { addNewListToDB } from "../firebase/firestore"

export default function Home({ children, user }) {
    const [ newListName, setNewListName ] = React.useState("")
    const [ newListItem, setNewListItem ] = React.useState("")

    function handleNewListName(event) {
        setNewListName(event.target.value)
    }

    function submitNewList() {
        addNewListToDB(newListName, user)
        setNewListName("")
    }

    // easier to handle db logic here, or render everything as children from App?

    // Update profile options:
        // change name
        // change email
        // change password
        // delete account

    return(
        <>
            <div className="home-container">
                <div className="home-nav-container">
                    <button className="btn" onClick={authSignOut}>Sign Out</button>
                    <button className="btn" onClick={() => console.log("clicked")}>Update Profile</button>
                </div>
                <h2>Welcome!</h2>

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

            </div>
        </>
    )
}