import React from "react"
import List from "./List"
import { 
    deleteListItemFromDB, 
    updateListItemChecked 
} from "../../firebase/firestore"

export default function UserListItems({ list, activeList }) {
    const listItemsArray = Object.values(list.items)

    function handleCheckbox(event) {
        const itemName = event.target.dataset.name
        const listID = activeList

        if (event.target.checked) {
            updateListItemChecked(itemName, true, listID)
        } else {
            updateListItemChecked(itemName, false, listID)
        }
    }

    function deleteItem(event) {
        const itemName = event.target.dataset.name
        const listID = activeList

        deleteListItemFromDB(itemName, listID)
    }

    const xIcon = <img 
        className="btn-img" 
        src="/public/icons/circle-xmark-regular.svg" />

    return (
        <List listClass="user-list">
        {   listItemsArray.length < 1 ?
            <p>This list does not contain any items</p> :
            listItemsArray.map(item => {
                return (
                    <div className="list-item-container" key={item.name}>
                        <input 
                            type="checkbox"
                            name={item.name}
                            onChange={handleCheckbox}
                            data-name={item.name}
                        />
                        <label
                            htmlFor={item.name}
                        >{item.name}</label>
                        <button
                            className="item-delete-btn"
                            onClick={deleteItem}
                            data-name={item.name}
                        >{xIcon}</button>
                    </div>
                )
            })
        }
        </List>
    )
}