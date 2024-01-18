import React from "react"
import List from "./List"
import UserListItems from "./UserListItems"
import DeleteWarning from "../modals/DeleteWarning"
import { addNewListItemToDB } from "../../firebase/firestore"

export default function UserLists({ lists }) {
    const [ activeList, setActiveList ] = React.useState("")
    const [ isListWarningOpen, setIsListWarningOpen ] = React.useState(false)
    const [ listWarningId, setListWarningId ] = React.useState("")
    const [ newListItem, setNewListItem ] = React.useState("")

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
            addNewListItemToDB(newItemObj, newListItem, listID)
            setNewListItem("")
        }
    }

    const angleDownIcon = <img 
        src="/public/icons/angle-down-solid.svg"
        className="btn-img" />
    const angleUpIcon = <img 
        src="/public/icons/angle-up-solid.svg"
        className="btn-img"/>

    return (
    <>
        <List listClass="user-list">
        { lists.length < 1 && <p>No lists available</p> }
        
        { lists.length > 0 && lists.map(list => {
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
                        {list.id === activeList && 
                        <UserListItems 
                            list={list}
                            activeList={activeList}
                        />
                        }
                    </div>
                </div>
            )})
        }
        </List>

        <DeleteWarning 
            isOpen={isListWarningOpen}
            closeModal={handleCloseListWarning}
            listWarningId={listWarningId}
        />
    </>
    )
}