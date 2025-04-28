"use client"

import { useState, useEffect } from "react"
import { collection, query, orderBy, onSnapshot } from "firebase/firestore"
import { signOut } from "firebase/auth"
import { db, auth } from "../firebase-config"

const Layout = ({ children }) => {
  const [fichas, setFichas] = useState([])
  const [menuOpen, setMenuOpen] = useState(true)

  useEffect(() => {
    const q = query(collection(db, "fichasCosmetologia"), orderBy("fechaCreacion", "desc"))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fichasData = []
      querySnapshot.forEach((doc) => {
        fichasData.push({ id: doc.id, ...doc.data() })
      })
      setFichas(fichasData)
    })

    return () => unsubscribe()
  }, [])

  const handleLogout = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error("Error al cerrar sesión:", error)
    }
  }

  return (
    <div className="app-layout">
      {/* Menú lateral */}
      <aside className={`sidebar ${menuOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          {menuOpen ? (
            
            <img 
              src="logo.png" 
              alt="Logo" 
              className="sidebar-logo" 
            />

          ) : (
            <div className="sidebar-toggle-icon" onClick={() => setMenuOpen(true)}>
              ☰
            </div>
          )}
        </div>

        <button className="sidebar-toggle-btn" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? "◄ " : ""}
        </button>

        {menuOpen && (
          <div className="fichas-list-container">
            <h3 className="fichas-list-title">Fichas Guardadas</h3>
            <ul className="fichas-list">
              {fichas.map((ficha) => (
                <li
                  key={ficha.id}
                  className="ficha-item"
                  onClick={() => {
                    // Aquí puedes implementar la visualización de la ficha seleccionada
                    console.log("Ficha seleccionada:", ficha.id)
                  }}
                >
                  <span className="ficha-nombre">{ficha.datosCliente?.nombreCompleto || "Sin nombre"}</span>
                  <span className="ficha-fecha">{ficha.fechaCreacion?.toDate().toLocaleDateString()}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <button className="logout-btn" onClick={handleLogout}>
          Cerrar Sesión
        </button>
      </aside>

      {/* Contenido principal */}
      <main className="main-content">{children}</main>
    </div>
  )
}

export default Layout
