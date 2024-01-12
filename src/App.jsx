import React from 'react'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/authentication"
import AuthRequired from "./pages/AuthRequired"
import Home from "./pages/Home"
// component imports probably getting moved to Home
import List from "./components/List"
import Item from "./components/Item"


export default function App() {
  const [userLoggedIn, setUserLoggedIn] = React.useState(false)

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      console.log(user.email)
      setUserLoggedIn(true)
      // FETCH SAVED LISTS
    } else {
      setUserLoggedIn(false)
    }
  });

  return (
    <>
      <header>
        <h1>Shopping Helper</h1>
        <img src="./public/cat.png" alt=""/>
      </header>

      {userLoggedIn ? 
        <Home>
          
        </Home>
      : <AuthRequired />}

    </>
  )
}
