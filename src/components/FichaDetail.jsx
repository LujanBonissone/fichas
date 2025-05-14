"use client"

import { useState, useEffect } from "react"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../firebase-config"
import { useParams, useNavigate } from "react-router-dom"
import PdfFicha from "./PdfFicha"

export default function FichaDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [ficha, setFicha] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchFicha = async () => {
      try {
        console.log(`Obteniendo ficha con ID: ${id}`)
        const docRef = doc(db, "fichasCosmetologia", id)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          const data = docSnap.data()
          console.log("Datos de la ficha:", data)

          // Convertir Timestamp a Date si es necesario
          if (data.fechaCreacion && typeof data.fechaCreacion.toDate === "function") {
            data.fechaCreacion = data.fechaCreacion.toDate()
          }

          setFicha({ id: docSnap.id, ...data })
        } else {
          console.log("No existe la ficha!")
          setError("La ficha solicitada no existe")
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
        <button className="button button-outline" onClick={() => navigate("/fichas")}>
          ← Volver
        </button>
        <h1 className="text-2xl font-bold text-purple-700">
          Ficha de {ficha.datosCliente?.nombreCompleto || "Cliente"}
        </h1>
        <div className="ml-auto flex gap-2">
          <button className="button button-outline" onClick={() => navigate(`/fichas/${id}/editar`)}>
            ✏️ Editar
          </button>
          {ficha && <PdfFicha fichaData={ficha} />}
        </div>
      </div>

      <div className="grid gap-6">
        {/* Datos del Cliente */}
        <div className="card">
          <div className="card-header bg-purple-50">
            <h2 className="card-title">Datos del Cliente</h2>
          </div>
          <div className="card-content pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Nombre completo</p>
                <p>{ficha.datosCliente?.nombreCompleto || "No especificado"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Edad</p>
                <p>{ficha.datosCliente?.edad || "No especificada"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Fecha de nacimiento</p>
                <p>{ficha.datosCliente?.fechaNacimiento || "No especificada"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Teléfono</p>
                <p>{ficha.datosCliente?.telefono || "No especificado"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p>{ficha.datosCliente?.email || "No especificado"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Domicilio</p>
                <p>{ficha.datosCliente?.domicilio || "No especificado"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Sexo</p>
                <p>{ficha.datosCliente?.sexo === "femenino" ? "Femenino" : "Masculino"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Antecedentes Personales */}
        <div className="card">
          <div className="card-header bg-purple-50">
            <h2 className="card-title">Antecedentes Personales</h2>
          </div>
          <div className="card-content pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Motivo de la consulta</p>
                <p>{ficha.antecedentesPersonales?.motivoConsulta || "No especificado"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Enfermedades</p>
                <p>{ficha.antecedentesPersonales?.enfermedades || "No especificadas"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Medicamentos</p>
                <p>{ficha.antecedentesPersonales?.medicamentos || "No especificados"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Alergias</p>
                <p>{ficha.antecedentesPersonales?.alergias || "No especificadas"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Tratamientos anteriores</p>
                <p>{ficha.antecedentesPersonales?.tratamientosAnteriores || "No especificados"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Antecedentes familiares</p>
                <p>{ficha.antecedentesPersonales?.antecedentesFamiliares || "No especificados"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Antecedentes Ginecológicos (solo si es mujer) */}
        {ficha.datosCliente?.sexo === "femenino" && (
          <div className="card">
            <div className="card-header bg-purple-50">
              <h2 className="card-title">Antecedentes Ginecológicos</h2>
            </div>
            <div className="card-content pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">¿Está embarazada?</p>
                  <p>{ficha.antecedentesGinecologicos?.embarazo || "No especificado"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Menopausia</p>
                  <p>{ficha.antecedentesGinecologicos?.menopausia || "No especificado"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">¿Ciclo menstrual regular?</p>
                  <p>{ficha.antecedentesGinecologicos?.cicloMenstrual || "No especificado"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">¿Está en su ciclo menstrual?</p>
                  <p>{ficha.antecedentesGinecologicos?.ciclo || "No especificado"}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Características y Tratamiento */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card">
            <div className="card-header bg-purple-50">
              <h2 className="card-title">Características</h2>
            </div>
            <div className="card-content pt-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Fototipo</p>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(ficha.fototipo || {}).map(([key, value]) =>
                      value ? (
                        <span key={key} className="badge badge-purple">
                          {key}
                        </span>
                      ) : null,
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Biotipo Cutáneo</p>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(ficha.biotipoCutaneo || {}).map(([key, value]) =>
                      value ? (
                        <span key={key} className="badge badge-purple">
                          {key}
                        </span>
                      ) : null,
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Fotoenvejecimiento</p>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(ficha.fotoenvejecimiento || {}).map(([key, value]) =>
                      value ? (
                        <span key={key} className="badge badge-purple">
                          {key}
                        </span>
                      ) : null,
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Tipo de Lesiones</p>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(ficha.tipoLesiones || {}).map(([key, value]) =>
                      value ? (
                        <span key={key} className="badge badge-purple">
                          {key}
                        </span>
                      ) : null,
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Zona a Tratar</p>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(ficha.zonaTratar || {}).map(([key, value]) =>
                      value ? (
                        <span key={key} className="badge badge-purple">
                          {key}
                        </span>
                      ) : null,
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header bg-purple-50">
              <h2 className="card-title">Tratamiento</h2>
            </div>
            <div className="card-content pt-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Tratamiento Realizado</p>
                  <p className="mt-1">{ficha.tratamientoRealizado || "No especificado"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Productos Utilizados</p>
                  <p className="mt-1">{ficha.productosUtilizados || "No especificados"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Observaciones</p>
                  <p className="mt-1">{ficha.observaciones || "No hay observaciones"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Consentimiento */}
        <div className="card">
          <div className="card-header bg-purple-50">
            <h2 className="card-title">Consentimiento</h2>
          </div>
          <div className="card-content pt-6">
            <p className="text-sm">
              Yo, <span className="font-medium">{ficha.consentimiento}</span>, acepto que he contestado correctamente y
              con la verdad esta HISTORIA CLÍNICA y que así mismo, autorizo los procedimientos cosméticos y estéticos
              que he tenido claramente las explicaciones sobre dichos tratamientos, y su aplicación y sus posibles
              efectos secundarios, por lo cual asumo la responsabilidad que YO tengo como paciente para el éxito, así
              como los cuidados que debo tener y/o fuera del lugar donde se me fue realizado el procedimiento.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
