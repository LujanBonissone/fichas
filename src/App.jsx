"use client"

import { useState, useEffect } from "react"
import { auth } from "./firebase-config"
import { onAuthStateChanged } from "firebase/auth"
import "./App.css"
import Login from "./Login"
import CosmetologyForm from "./components/CosmetologyForm"
import Layout from "./components/Layout"

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  if (loading) {
    return <div className="loading">Cargando...</div>
  }

  return (
    <>
      {user ? (
        <Layout>
          <CosmetologyForm />
        </Layout>
      ) : (
        <div className="pagina-login">
          <Login />
        </div>
      )}
    </>
  )
}

export default App
