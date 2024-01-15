import React from "react"
import { authSignOut } from "../firebase/authentication"
import { addNewListToDB } from "../firebase/firestore"

export default function Home({ children, user, lists }) {
    const [ newListName, setNewListName ] = React.useState("")
    const [ newListItem, setNewListItem ] = React.useState("")
    const [ activeList, setActiveList ] = React.useState(null)

    // NEED to find a way to get Firebase List ID in order to setActiveList

    function handleNewListName(event) {
        setNewListName(event.target.value)
    }

    function submitNewList() {
        addNewListToDB(newListName, user)
        setNewListName("")
    }

    function handleNewListItem(event) {
        // add conditional logic to target correct list ID.
        setNewListItem(event.target.value)
    }

    function submitNewListItem() {
        addNewListItemToDB(newListItem, user, id)
        setNewListName("")
    }

    // Update profile options:
        // change name
        // change email
        // change password
        // delete account
console.log(lists)

    function getListsHTML(lists) {
        console.log(lists.id)
        // lists.id is undefined, why are we not getting the Firebase ID?
            // key and ternary both rely on this
        return lists.map(list => {
            const listItemsHTML = list.items.map(item => {
                return (
                    <div className="list-item-container" key={item.name}>
                        <h4>{item.name}</h4>
                    </div>
                )
            })
            return (
                <div className="list-container" key={list.id}>
                    <div className="list-header-container">
                        <h3>{list.name}</h3>
                        <button>V</button>
                    </div>
                    <div className="create-item-container">
                    <input
                        className="text-input"
                        type="text"
                        placeholder="New Item Name"
                        value={newListItem} 
                        onChange={handleNewListItem}
                    />

                    <button
                        className="btn primary-btn"
                        onClick={submitNewListItem}
                    >Add Item</button>
                    </div>
                    {list.id === activeList ? listItemsHTML : ""}
                </div>
            )
        })
    }

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

                <div className="lists-container">
                    {
                        // Each list will default to inactive
                        // list name in a box the width of the container
                            // use primary color for list name
                        // clicking on a list marks it active
                            // down arrow to expand instead?
                        // the active list expands, displaying list items
                            // list items should use light background
                            // list items should have checkbox 

                            // getting the error about needing a key prop...
                        getListsHTML(lists)
                    }
                </div>

            </div>
        </>
    )
}