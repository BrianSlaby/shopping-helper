import React from "react"
import { authSignOut } from "../firebase/authentication"
import { addNewListToDB, addNewListItemToDB } from "../firebase/firestore"

export default function Home({ children, user, lists }) {
    const [ newListName, setNewListName ] = React.useState("")
    const [ newListItem, setNewListItem ] = React.useState("")
    const [ activeList, setActiveList ] = React.useState("")

    function handleNewListName(event) {
        setNewListName(event.target.value)
    }

    function submitNewList() {
        addNewListToDB(newListName, user)
        setNewListName("")
    }

    function handleNewListItem(event) {
        setNewListItem(event.target.value)
    }

    function submitNewListItem(event) {
        const listID = event.target.dataset.id
        if (newListItem) {
            const newItemObj = {
                name: newListItem,
                isChecked: false
            }
            addNewListItemToDB(newItemObj, listID)
            setNewListItem("")
        }
    }

    function handleActiveList(event) {
        const listID = event.target.dataset.id 
        listID === activeList ? setActiveList("") : setActiveList(listID)
    }

    // Update profile options:
        // change name
        // change email
        // change password
        // delete account

    function getListsHTML(lists) {
        if (!lists || lists.length < 1 ) {
            return <p>No lists available</p>
        }

        return lists.map(list => {
            const listItemsHTML = list.items.map(item => {
                return (
                    <div className="list-item-container" key={item.name}>
                        <h4>{item.name}</h4>
                    </div>
                )
            })
            // listItemsHTML isn't re-rendering when I add a new list item, needs page refresh, that's weird.
            return (
                <div className="list-container" key={list.id}>
                    <div className="list-header-container">
                        <h3>{list.name}</h3>
                        <button 
                            className="list-header-btn"
                            onClick={handleActiveList}
                            data-id={list.id}
                        >V</button>
                    </div>

                    { list.id === activeList && 
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
                            data-id={list.id}
                            onClick={submitNewListItem}
                        >Add Item</button>
                    </div>
                    }

                    {list.id === activeList && listItemsHTML}
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
                        // the active list expands, displaying list items
                            // list items should use light background
                            // list items should have checkbox 

                        getListsHTML(lists)
                    }
                </div>

            </div>
        </>
    )
}