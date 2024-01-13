import React from 'react'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/authentication"
import { fetchLists } from "./firebase/firestore"
import AuthRequired from "./pages/AuthRequired"
import Home from "./pages/Home"
// component imports probably getting moved to Home
import List from "./components/List"
import Item from "./components/Item"


export default function App() {
  const [ userLoggedIn, setUserLoggedIn ] = React.useState(false)
  const [ user, setUser ] = React.useState(null)
  const [ lists, setLists ] = React.useState([])

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        // user.email
        // user.displayName
        setUser(user)
        setUserLoggedIn(true)
        setLists(fetchLists(user))
      } else {
        setUserLoggedIn(false)
      }
    });
    return () => unsubscribe()
  }, [])

  return (
    <>
      <header>
        <h1>Shopping Helper</h1>
        <img src="./public/cat.png" alt=""/>
      </header>

      {userLoggedIn ? 
        <Home user={user} lists={lists}>
      
        </Home>
      : <AuthRequired />}

    </>
  )
}
