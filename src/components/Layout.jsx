"use client"

import { useState } from "react"
import { signOut } from "firebase/auth"
import { auth } from "../firebase-config"
import { useNavigate } from "react-router-dom"
import "../App.css"

const Layout = ({ children }) => {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(true)

  const handleLogout = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error("Error al cerrar sesión:", error)
    }
  }

  return (
    <div className="app-layout">
      {/* Sidebar */}
      <aside className={`sidebar ${menuOpen ? "open" : "closed"} bg-opacity-50 backdrop-blur-md bg-gradient-to-b from-purple-900/50 to-purple-600/30 text-white shadow-xl`}>

        <div className="sidebar-header">
          {menuOpen ? (
            <img
              src="/logo.png"
              alt="Logo"
              className="sidebar-logo"
              onClick={() => setMenuOpen(false)}
              style={{ cursor: "pointer" }}
            />
          ) : (
            <div className="sidebar-toggle-icon" onClick={() => setMenuOpen(true)}>
              ☰
            </div>
          )}
        </div>

        {menuOpen && (
          <div className="flex flex-col gap-4">
            <button
              className="boton-personalizado"
              onClick={() => navigate("/fichas")}
            >
              Fichas Guardadas
            </button>

            <button
              className="boton-personalizado"
              onClick={() => navigate("/registrar")}
            >
              Nueva Ficha
            </button>
          </div>
        )}


        <button className="logout-btn mt-auto" onClick={handleLogout}>
          <div className="flex items-center justify-center gap-2">
            <span style={{ fontSize: "20px" }}></span>
            <span>Cerrar Sesión</span>
          </div>
        </button>
      </aside>

      <main className="main-content">{children}</main>
    </div>
  )
}

export default Layout
