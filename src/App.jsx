"use client"

import { useState, useEffect } from "react"
import { auth } from "./firebase-config"
import { onAuthStateChanged } from "firebase/auth"
import "./App.css"
import Login from "./Login"
import Layout from "./components/Layout"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import CosmetologyForm from "./components/CosmetologyForm"
import FichasListSimplificado from "./components/FichasListSimplificado"
import FichaDetail from "./components/FichaDetail"
import FichaEdit from "./components/FichaEdit"

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Estado de autenticación cambiado:", currentUser ? "Usuario autenticado" : "No autenticado")
      setUser(currentUser)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  if (loading) {
    return <div className="loading">Cargando...</div>
  }

  if (!user) {
    return (
      <div className="pagina-login">
        <Login />
      </div>
    )
  }

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/fichas" />} />
          <Route path="/fichas" element={<FichasListSimplificado />} />
          <Route path="/fichas/:id" element={<FichaDetail />} />
          <Route path="/fichas/:id/editar" element={<FichaEdit />} />
          <Route path="/registrar" element={<CosmetologyForm />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
