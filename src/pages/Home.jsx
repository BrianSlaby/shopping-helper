import React from "react"
import { authSignOut } from "../firebase/authentication"
import {  
    addNewListToDB, 
    addNewListItemToDB,
    deleteListItemFromDB 
} from "../firebase/firestore"
import DeleteWarning from "../components/modals/DeleteWarning"

export default function Home({ children, user, lists }) {
    const [ newListName, setNewListName ] = React.useState("")
    const [ newListItem, setNewListItem ] = React.useState("")
    const [ activeList, setActiveList ] = React.useState("")
    const [ isListWarningOpen, setIsListWarningOpen ] = React.useState(false)
    const [ listWarningId, setListWarningId ] = React.useState("")

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

    function openDeleteListModal(event) {
        const listID = event.target.dataset.id
        
        setIsListWarningOpen(true)
        setListWarningId(listID)
    }

    function handleCloseListWarning() {
        setIsListWarningOpen(false)
        setListWarningId("")
    }

    function deleteItem(event) {
        const itemName = event.target.dataset.name
        const listID = event.target.dataset.id

        //deleteListItemFromDB(itemName, listID)
            // I think I need to pass the entire object to the function
            // Which means I need to get the checkbox value somehow
            // doc.getElByID(checkbox).checked   How in React?
            // lists should stay up to date if the checkbox onChange updates firebase
        console.log(`${itemName} deleted`)
    }

    // update list items from an array into next objects?
    // items: {
        // itemName: {
            //name: itemName,
            //isChecked: false
        //}
    // }

    // Update profile options:
        // change name
        // change email
        // change password
        // delete account

    function getListsHTML(lists) {
        const angleDownIcon = <img 
            src="/public/icons/angle-down-solid.svg"
            className="btn-img" />
        const angleUpIcon = <img 
            src="/public/icons/angle-up-solid.svg"
            className="btn-img"/>


        if (!lists || lists.length < 1 ) {
            return <p>No lists available</p>
        }

        return lists.map(list => {
            const listItemsHTML = list.items.map(item => {
                return (
                    <div className="list-item-container" key={item.name}>
                        <input 
                            type="checkbox"
                            name={item.name}
                        />
                        <label
                            htmlFor={item.name}
                        >{item.name}</label>
                        <button
                            className="item-delete-btn"
                            onClick={deleteItem}
                            data-name={item.name}
                        >X</button>
                    </div>
                )
            })
            
            return (
                <div className="list-container" key={list.id}>
                    <div className="list-header-container">
                        <h3 className="list-title">{list.name}</h3>
                        <button 
                            className="list-header-btn"
                            onClick={handleActiveList}
                            data-id={list.id}
                        >{list.id === activeList ? angleUpIcon : angleDownIcon}</button>
                        <button
                            className="list-delete-btn"
                            onClick={openDeleteListModal}
                            data-id={list.id}
                        >Delete</button>
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
                    <div className="list-items-container">
                        {list.id === activeList && listItemsHTML}
                    </div>
                    
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

                    { getListsHTML(lists) }

                </div>

            </div>

            <DeleteWarning 
                isOpen={isListWarningOpen}
                closeModal={handleCloseListWarning}
                listWarningId={listWarningId}
            />
        </>
    )
}