"use client"

import { useState, useEffect } from "react"
import { collection, query, orderBy, getDocs } from "firebase/firestore"
import { db } from "../firebase-config"
import { useNavigate } from "react-router-dom"

export default function FichasList() {
  const navigate = useNavigate()
  const [fichas, setFichas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchFichas() {
      try {
        console.log("Iniciando carga de fichas...")
        // Usamos getDocs en lugar de onSnapshot para simplificar
        const q = query(collection(db, "fichasCosmetologia"), orderBy("fechaCreacion", "desc"))
        const querySnapshot = await getDocs(q)

        console.log(`Recibidos ${querySnapshot.size} documentos`)

        const fichasData = []
        querySnapshot.forEach((doc) => {
          const data = doc.data()
          console.log(`Documento ${doc.id}:`, data)

          // Convertir Timestamp a Date si existe
          let fechaCreacion = new Date()
          if (data.fechaCreacion) {
            if (typeof data.fechaCreacion.toDate === "function") {
              fechaCreacion = data.fechaCreacion.toDate()
            } else {
              fechaCreacion = new Date(data.fechaCreacion)
            }
          }

          fichasData.push({
            id: doc.id,
            ...data,
            fechaCreacion,
          })
        })

        setFichas(fichasData)
        console.log("Fichas cargadas:", fichasData)
      } catch (err) {
        console.error("Error al cargar fichas:", err)
        setError(`Error al cargar las fichas: ${err.message}`)
      } finally {
        setLoading(false)
      }
    }

    fetchFichas()
  }, [])

  // Función para crear una ficha de prueba
  const crearFichaPrueba = async () => {
    try {
      setLoading(true)

      // Importar addDoc de manera dinámica para evitar problemas
      const { addDoc } = await import("firebase/firestore")

      const nuevaFicha = {
        datosCliente: {
          nombreCompleto: "Cliente de Prueba",
          edad: "30",
          telefono: "123456789",
          sexo: "femenino",
        },
        antecedentesPersonales: {
          motivoConsulta: "Consulta de prueba",
        },
        fechaCreacion: new Date(),
      }

      const docRef = await addDoc(collection(db, "fichasCosmetologia"), nuevaFicha)
      console.log("Ficha de prueba creada con ID:", docRef.id)

      // Recargar la página para ver la nueva ficha
      window.location.reload()
    } catch (err) {
      console.error("Error al crear ficha de prueba:", err)
      setError(`Error al crear ficha de prueba: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="flex justify-center items-center h-64">Cargando fichas...</div>
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-800 rounded-md">
        <h2 className="text-lg font-bold mb-2">Error</h2>
        <p>{error}</p>
        <button className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md" onClick={() => window.location.reload()}>
          Reintentar
        </button>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-purple-700">Fichas Guardadas</h1>
        <div className="flex gap-2">
          <button onClick={() => navigate("/registrar")} className="button button-primary">
            Registrar Nueva Ficha
          </button>
          <button onClick={crearFichaPrueba} className="button button-outline">
            Crear Ficha de Prueba
          </button>
        </div>
      </div>

      {/* Información de depuración */}
      <div className="mb-4 p-4 bg-blue-50 rounded-md">
        <h2 className="font-bold text-blue-800">Información de depuración</h2>
        <p>Total de fichas cargadas: {fichas.length}</p>
        <p>Colección: fichasCosmetologia</p>
        <p>Ordenadas por: fechaCreacion (descendente)</p>
      </div>

      <div className="card">
        <div className="card-content p-0">
          {fichas.length === 0 ? (
            <div className="p-6 text-center">
              <p className="text-gray-500">No hay fichas guardadas</p>
              <div className="mt-4 flex justify-center gap-2">
                <button className="button button-primary" onClick={() => navigate("/registrar")}>
                  Crear tu primera ficha
                </button>
                <button className="button button-outline" onClick={crearFichaPrueba}>
                  Crear ficha de prueba
                </button>
              </div>
            </div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Nombre del Cliente</th>
                  <th>Fecha de Creación</th>
                  <th>Motivo de Consulta</th>
                  <th className="text-right">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {fichas.map((ficha) => (
                  <tr key={ficha.id}>
                    <td className="font-medium">{ficha.datosCliente?.nombreCompleto || "Sin nombre"}</td>
                    <td>
                      {ficha.fechaCreacion instanceof Date
                        ? ficha.fechaCreacion.toLocaleDateString()
                        : "Fecha desconocida"}
                    </td>
                    <td>{ficha.antecedentesPersonales?.motivoConsulta || "No especificado"}</td>
                    <td className="text-right">
                      <button className="button button-icon" title="Ver ficha">
                        👁️
                      </button>
                      <button className="button button-icon" title="Editar ficha">
                        ✏️
                      </button>
                      <button className="button button-icon text-red-500 hover:text-red-700" title="Eliminar ficha">
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}

