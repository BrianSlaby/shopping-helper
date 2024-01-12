import React from "react"

export default function List({ children, type="ul"}) {
    // prop to determine list styling; lists collection will contain a list of each named list, and each named list will have a nested array of list item objects styled as checkboxes.
    return (
        <>
            {type === "ul" ? 
            <ul>
                {children}
            </ul> :
            <ol>
                {children}
            </ol>}
        </>
    )
}