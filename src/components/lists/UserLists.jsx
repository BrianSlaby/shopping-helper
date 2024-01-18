import React from "react"
import List from "./List"
import UserListItems from "./UserListItems"
import DeleteWarning from "../modals/DeleteWarning"

export default function UserLists({ children, user, lists }) {
    const [ activeList, setActiveList ] = React.useState("")
    const [ isListWarningOpen, setIsListWarningOpen ] = React.useState(false)
    const [ listWarningId, setListWarningId ] = React.useState("")

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



    const angleDownIcon = <img 
        src="/public/icons/angle-down-solid.svg"
        className="btn-img" />
    const angleUpIcon = <img 
        src="/public/icons/angle-up-solid.svg"
        className="btn-img"/>
    // Will get moved to User List Items
    const xIcon = <img 
        className="btn-img" 
        src="/public/icons/circle-xmark-regular.svg" />



    function getListsHTML(lists) {

        if (!lists || lists.length < 1 ) {
            return <p>No lists available</p>
        }

        return lists.map(list => {


            // const listItemsHTML = list.items.map(item => {
            //     return (
            //         <div className="list-item-container" key={item.name}>
            //             <input 
            //                 type="checkbox"
            //                 name={item.name}
            //             />
            //             <label
            //                 htmlFor={item.name}
            //             >{item.name}</label>
            //             <button
            //                 className="item-delete-btn"
            //                 onClick={deleteItem}
            //                 data-name={item.name}
            //             >{xIcon}</button>
            //         </div>
            //     )
            // })
            

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
                        {list.id === activeList && <UserListItems list={list}/>}
                    </div>
                    
                </div>
            )
        })
    }

    return (
        <>
            <List>
                {getListsHTML(lists)}
            </List>

            <DeleteWarning 
                isOpen={isListWarningOpen}
                closeModal={handleCloseListWarning}
                listWarningId={listWarningId}
            />
        </>
    )
}