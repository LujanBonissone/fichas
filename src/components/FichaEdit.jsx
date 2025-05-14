"use client"

import { useState, useEffect } from "react"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../firebase-config"
import { useParams, useNavigate } from "react-router-dom"
import CosmetologyForm from "./CosmetologyForm"

export default function FichaEdit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [ficha, setFicha] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchFicha = async () => {
      try {
        console.log(`Obteniendo ficha para editar con ID: ${id}`)
        const docRef = doc(db, "fichasCosmetologia", id)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          const data = docSnap.data()
          console.log("Datos de la ficha para editar:", data)
          setFicha({ id: docSnap.id, ...data })
        } else {
          console.log("No existe la ficha!")
          setError("La ficha que intentas editar no existe")
          setTimeout(() => navigate("/fichas"), 3000)
        }
      } catch (error) {
        console.error("Error al obtener la ficha:", error)
        setError(`Error al cargar la ficha: ${error.message}`)
      } finally {
        setLoading(false)
      }
    }

    fetchFicha()
  }, [id, navigate])

  if (loading) {
    return <div className="flex justify-center items-center h-64">Cargando ficha...</div>
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-800 rounded-md">
        <h2 className="text-lg font-bold mb-2">Error</h2>
        <p>{error}</p>
        <button className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md" onClick={() => navigate("/fichas")}>
          Volver a la lista
        </button>
      </div>
    )
  }

  if (!ficha) {
    return <div>La ficha no existe</div>
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <button className="button button-outline" onClick={() => navigate(`/fichas/${id}`)}>
          ← Volver
        </button>
        <h1 className="text-2xl font-bold text-purple-700">
          Editar Ficha de {ficha.datosCliente?.nombreCompleto || "Cliente"}
        </h1>
      </div>

      <CosmetologyForm fichaExistente={ficha} modo="editar" />
    </div>
  )
}
