import React from "react"

export default function List({ children, type="ul"}) {

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