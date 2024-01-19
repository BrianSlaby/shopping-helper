import React from "react"
import Login from "../components/authforms/Login"
import Signup from "../components/authforms/Signup"

import { 
    authCreateAccountWithEmail,
    authSignInWithEmail
} from "../firebase/authentication";

export default function AuthRequired() {
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [isSliderLogin, setIsSliderLogin] = React.useState(true)
    const [loginFormClasses, setLoginFormClasses] = React.useState("")
    const [signupFormClasses, setSignupFormClasses] = React.useState("hidden")

    const moveSlider = isSliderLogin ? "" : "move-slider"

    function handleSlider(event) {
        if (event.target.dataset.position === "login") {
            setIsSliderLogin(true)
            setLoginFormClasses("fade-in")
            setSignupFormClasses("fade-out")
            setTimeout(() => {
                setSignupFormClasses("hidden")
                setLoginFormClasses("")}, 800)
        }
        if (event.target.dataset.position === "signup") {
            setIsSliderLogin(false)
            setSignupFormClasses("fade-in")
            setLoginFormClasses("fade-out")
            setTimeout(() => {
                setLoginFormClasses("hidden")
                setSignupFormClasses("")}, 800)
        }
    }

    function handleEmailChange(event) {
        setEmail(event.target.value)
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value)
    }

    function clearInputFields() {
        setEmail("")
        setPassword("")
    }

    return (
        <>
            <div className="slider-container">
                <div className={`slider ${moveSlider}`}>
                </div>
                <div className="slider-btn">
                    <button 
                        className="slider-option"
                        data-position="login"
                        onClick={handleSlider}
                    >Log In</button>
                    <button 
                        className="slider-option"
                        data-position="signup"
                        onClick={handleSlider}
                    >Sign Up</button>
                </div>
            </div>
            
            <div className={`form-container`}>
                <Login 
                    email={email}
                    password={password}
                    handleEmailChange={handleEmailChange}
                    handlePasswordChange={handlePasswordChange}
                    clearInputFields={clearInputFields}
                    loginFormClasses={loginFormClasses}
                />
                
                <Signup 
                    email={email}
                    password={password}
                    handleEmailChange={handleEmailChange}
                    handlePasswordChange={handlePasswordChange}
                    clearInputFields={clearInputFields}
                    signupFormClasses={signupFormClasses}
                />
            </div>






            {/* OLD HTML */}
            {/* <div className="login-container">
                <button 
                    id="google-sign-in-btn"
                    className="btn"
                >Sign In With Google</button>

                <input 
                    className="text-input" 
                    id="email-input" 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={handleEmailChange} 
                />

                <input 
                    className="text-input" 
                    id="password-input" 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={handlePasswordChange} 
                />

                <button 
                    id="sign-in-btn" 
                    className="btn primary-btn"
                    onClick={handleSignInWithEmail}
                >Sign In</button>

                <button 
                    id="create-acct-btn" 
                    className="btn secondary-btn" 
                    onClick={handleCreateAccountWithEmail}
                >Create Account</button>
            </div> */}
        </>
    )
}