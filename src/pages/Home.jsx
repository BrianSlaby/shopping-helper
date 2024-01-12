import React from "react"
import { authSignOut } from "../firebase/authentication"

export default function Home({ children }) {

    // easier to handle db logic here, or render everything as children from App?

    // Update profile options:
        // change name
        // change email
        // change password
        // delete account

    return(
        <>
            <div className="home-container">
                <div className="home-nav-container">
                    <button className="btn" onClick={authSignOut}>Sign Out</button>
                    <button className="btn" onClick={console.log("clicked")}>Update Profile</button>
                </div>
                <h2>Welcome!</h2>

            </div>
        </>
    )
}