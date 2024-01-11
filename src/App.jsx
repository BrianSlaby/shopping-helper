import React from 'react'
import AuthRequired from "./components/AuthRequired"


export default function App() {
  

  return (
    <>
      <header>
        <h1>Shopping Helper</h1>
        <img src="./public/cat.png" alt=""/>
      </header>

      <AuthRequired/>

    </>
  )
}
