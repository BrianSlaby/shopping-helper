import React from 'react'
import { onAuthStateChanged } from "firebase/auth";
import {  
  doc,
  collection,
  query,
  where,
  onSnapshot
} from "firebase/firestore"
import { auth } from "./firebase/authentication"
import { db, fetchLists } from "./firebase/firestore"
import { sortItems } from "./utils/functions"
import AuthRequired from "./pages/AuthRequired"
import Home from "./pages/Home"

export default function App() {
  const [ userLoggedIn, setUserLoggedIn ] = React.useState(false)
  const [ user, setUser ] = React.useState(null)
  const [ lists, setLists ] = React.useState([])
  

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        // user.email
        // user.displayName
        setUser(user)
        setUserLoggedIn(true)
        const listsData = await fetchLists(user)
        setLists(listsData)
      } else {
        setUserLoggedIn(false)
        setUser(null)
        setLists([])
      }
    });
    return () => unsubscribe();
  }, [])

  React.useEffect(() => {
    if (user) {
      const q = query(collection(db, "lists"), where("uid", "==", user.uid));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const listsData = []
        querySnapshot.forEach((doc) => {
          const data = doc.data()
          const id = doc.id
          const sortedItems = sortItems(data.items)

          listsData.push({ ...data, id, items: sortedItems })
        });
        setLists(listsData)
      },
      (error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(`${errorCode}: ${errorMessage}`)
      });
      return () => unsubscribe()
    }
  }, [user])

  return (
    <>
      <header>
        <h1>Shopping Helper</h1>
        <img src="/cat.png" alt=""/>
      </header>

      {userLoggedIn ? 
        <Home 
          user={user} 
          lists={lists}
        />
      : <AuthRequired />}
    </>
  )
}
