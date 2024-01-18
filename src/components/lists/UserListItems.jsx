import React from "react"
import List from "./List"
import { deleteListItemFromDB } from "../../firebase/firestore"

export default function UserListItems({ list }) {
    const listItemsArray = Object.values(list.items)

    // Refactoring
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