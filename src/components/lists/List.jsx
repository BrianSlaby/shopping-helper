import React from "react"
import "./list.css"

export default function List({ children, type="ul", listClass }) {
    
    return (
        <>
            {type === "ul" ? 
            <ul className={listClass}>
                {children}
            </ul> :
            <ol className={listClass}>
                {children}
            </ol>}
        </>
    )
}