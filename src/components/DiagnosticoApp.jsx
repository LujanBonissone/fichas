"use client"

import { useState, useEffect } from "react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../firebase-config"

export default function DiagnosticoApp() {
  const [mostrarDiagnostico, setMostrarDiagnostico] = useState(false)
  const [estadoFirebase, setEstadoFirebase] = useState("Verificando conexión...")
  const [colecciones, setColecciones] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    if (mostrarDiagnostico) {
      verificarFirebase()
    }
  }, [mostrarDiagnostico])

  async function verificarFirebase() {
    try {
      // Verificar si db está definido
      if (!db) {
        setError("La instancia de Firestore no está disponible")
        return
      }

      setEstadoFirebase("Conectando a Firestore...")

      // Intentar listar colecciones
      const coleccionesSnapshot = await getDocs(collection(db, "fichasCosmetologia"))

      setEstadoFirebase("Conexión exitosa")
      setColecciones([
        {
          nombre: "fichasCosmetologia",
          documentos: coleccionesSnapshot.size,
        },
      ])
    } catch (err) {
      console.error("Error al verificar Firebase:", err)
      setError(`Error: ${err.message}`)
    }
  }

  return (
    <div className="mb-4">
      <button
        onClick={() => setMostrarDiagnostico(!mostrarDiagnostico)}
        className="px-4 py-2 bg-blue-600 text-white rounded-md mb-2"
      >
        {mostrarDiagnostico ? "Ocultar diagnóstico" : "Mostrar diagnóstico"}
      </button>

      {mostrarDiagnostico && (
        <div className="p-4 border border-blue-200 rounded-md">
          <h2 className="text-xl font-bold mb-4">Diagnóstico de la aplicación</h2>

          {/* Diagnóstico de Firebase integrado */}
          <div className="p-4 bg-gray-100 rounded-md mb-4">
            <h2 className="text-lg font-bold mb-2">Diagnóstico de Firebase</h2>

            <div className="mb-2">
              <span className="font-medium">Estado: </span>
              <span className={error ? "text-red-600" : "text-green-600"}>{error ? "Error" : estadoFirebase}</span>
            </div>

            {error && <div className="p-2 bg-red-50 text-red-800 rounded mb-2">{error}</div>}

            {colecciones.length > 0 && (
              <div>
                <h3 className="font-medium mb-1">Colecciones detectadas:</h3>
                <ul className="list-disc pl-5">
                  {colecciones.map((col, index) => (
                    <li key={index}>
                      {col.nombre}: {col.documentos} documentos
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-2 text-sm text-gray-600">
              <p>Configuración de Firebase cargada desde: src/firebase-config.js</p>
              <p>Proyecto: {db?.app?.options?.projectId || "No disponible"}</p>
            </div>
          </div>

          <div className="p-4 bg-gray-100 rounded-md mb-4">
            <h3 className="font-bold mb-2">Información del entorno</h3>
            <ul className="list-disc pl-5">
              <li>URL: {window.location.href}</li>
              <li>Navegador: {navigator.userAgent}</li>
              <li>React Router: {window.location.pathname}</li>
            </ul>
          </div>

          <div className="p-4 bg-gray-100 rounded-md">
            <h3 className="font-bold mb-2">Solución de problemas comunes</h3>
            <ul className="list-disc pl-5">
              <li>Verifica que la colección "fichasCosmetologia" exista en Firestore</li>
              <li>Asegúrate de que las reglas de seguridad permitan leer la colección</li>
              <li>Comprueba que el usuario esté autenticado correctamente</li>
              <li>Revisa la consola del navegador para ver errores</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
