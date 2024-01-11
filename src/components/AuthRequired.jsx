import React from "react"

export default function AuthRequired() {

    return (
        <>
            <div className="login-container">
                <button id="google-sign-in-btn" className="btn">Sign In With Google</button>

                <input className="text-input" id="email-input" type="email" placeholder="Email" />
                <input className="text-input" id="password-input" type="password" placeholder="Password" />
                <button id="sign-in-btn" className="btn primary-btn">Sign In</button>
                <button id="create-acct-btn" className="btn secondary-btn">Create Account</button>
                
            </div>
        </>
    )
}