"use client"

import { useState } from "react"
import PdfFicha from "./PdfFicha"

// Importaciones de Firebase
import { initializeApp } from "firebase/app"
import { getFirestore, collection, addDoc } from "firebase/firestore"
import { getAnalytics } from "firebase/analytics"

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAngH_5g79dJ89jnUKnVpTxOwcNSmD8tsc",
  authDomain: "ficha-5dada.firebaseapp.com",
  projectId: "ficha-5dada",
  storageBucket: "ficha-5dada.firebasestorage.app",
  messagingSenderId: "970164715726",
  appId: "1:970164715726:web:9780925080fe27dc2c109f",
  measurementId: "G-1MC3P9465F",
}

// Inicializar Firebase
const app = initializeApp(firebaseConfig)
const analytics = typeof window !== "undefined" ? getAnalytics(app) : null
const db = getFirestore(app)

// Estilos CSS en línea para evitar dependencias externas
const styles = {
  ficha: {
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "1.5rem",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
    textAlign: "left",
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
  },
  tituloSeccion: {
    color: "#9c27b0",
    backgroundColor: "#f9f0fc",
    borderBottom: "2px solid #e1bee7",
    paddingBottom: "0.5rem",
    marginTop: "1.2rem",
    marginBottom: "0.5rem",
    fontSize: "1.1rem",
    fontWeight: "600",
  },
  gridDatos: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "0.5rem",
    marginBottom: "0.8rem",
  },
  label: {
    display: "flex",
    flexDirection: "column",
    fontSize: "0.9rem",
    color: "#555",
    fontWeight: "500",
    marginBottom: "-0.2rem",
  },
  input: {
    marginTop: "0.2rem",
    padding: "0.5rem",
    border: "1px solid #ddd",
    borderRadius: "6px",
    fontSize: "0.85rem",
    transition: "border-color 0.3s, box-shadow 0.3s",
  },
  checkboxGroup: {
    display: "flex",
    flexWrap: "wrap",
    gap: "1rem",
    marginBottom: "0.8rem",
    justifyContent: "flex-start",
  },
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    fontSize: "0.85rem",
    color: "#555",
    cursor: "pointer",
    marginRight: "1rem",
    whiteSpace: "nowrap",
  },
  textarea: {
    width: "100%",
    padding: "0.5rem",
    border: "1px solid #ddd",
    borderRadius: "6px",
    fontSize: "0.85rem",
    marginBottom: "0.8rem",
    resize: "vertical",
    fontFamily: "inherit",
  },
  firmas: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "1rem",
    marginTop: "1.5rem",
  },
  firma: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  firmaHr: {
    width: "100%",
    border: "none",
    borderTop: "1px solid #999",
    marginBottom: "0.5rem",
  },
  firmaSpan: {
    fontSize: "0.85rem",
    color: "#666",
  },
  consent: {
    margin: "1rem 0",
    padding: "0.7rem",
    backgroundColor: "#f9f0fc",
    borderRadius: "8px",
    fontSize: "0.85rem",
    lineHeight: "1.5",
    color: "#555",
  },
  consentInput: {
    width: "200px",
    border: "none",
    borderBottom: "1px solid #9c27b0",
    backgroundColor: "transparent",
    padding: "0.2rem",
    margin: "0 0.5rem",
    fontStyle: "italic",
  },
  botonContainer: {
    textAlign: "center",
    marginTop: "2rem",
  },
  botonGuardar: {
    backgroundColor: "#9c27b0",
    color: "white",
    border: "none",
    borderRadius: "30px",
    padding: "0.8rem 2.5rem",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.3s, transform 0.2s",
    boxShadow: "0 4px 6px rgba(156, 39, 176, 0.2)",
  },
  botonPdf: {
    marginLeft: "10px",
    padding: "0.8rem 2.5rem",
    backgroundColor: "#2196F3",
    color: "white",
    border: "none",
    borderRadius: "30px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "600",
    boxShadow: "0 4px 6px rgba(33, 150, 243, 0.2)",
  },
  mensaje: {
    padding: "1rem",
    marginBottom: "1.5rem",
    borderRadius: "8px",
    fontWeight: "500",
    textAlign: "center",
  },
  mensajeSuccess: {
    backgroundColor: "#e8f5e9",
    color: "#2e7d32",
    border: "1px solid #a5d6a7",
  },
  mensajeError: {
    backgroundColor: "#ffebee",
    color: "#c62828",
    border: "1px solid #ef9a9a",
  },
  flex: {
    display: "flex",
    alignItems: "center",
  },
  gap2: {
    gap: "0.5rem",
  },
  pdfSection: {
    marginTop: "30px",
    textAlign: "center",
  },
  fichaTitle: {
    textAlign: "center",
    fontSize: "1.8rem",
    fontWeight: "700",
    color: "#9c27b0",
    marginBottom: "1rem",
    paddingBottom: "0.5rem",
    borderBottom: "3px double #e1bee7",
  },
}

const FichaCosmetologia = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState({ text: "", type: "" })
  const [fichaGuardada, setFichaGuardada] = useState(null)

  // Estado para datos del cliente
  const [datosCliente, setDatosCliente] = useState({
    nombreCompleto: "",
    edad: "",
    fechaNacimiento: "",
    telefono: "",
    email: "",
    domicilio: "",
    fechaHoy: new Date().toISOString().split("T")[0],
    sexo: "",
  })

  // Estado para antecedentes personales
  const [antecedentesPersonales, setAntecedentesPersonales] = useState({
    motivoConsulta: "",
    enfermedades: "",
    medicamentos: "",
    alergias: "",
    tratamientosAnteriores: "",
    antecedentesFamiliares: "",
    controlesMedicos: "",
  })

  // Estado para antecedentes ginecológicos
  const [antecedentesGinecologicos, setAntecedentesGinecologicos] = useState({
    embarazo: "",
    menopausia: "",
    cicloMenstrual: "",
  })

  // Estado para checkboxes
  const [fototipo, setFototipo] = useState({
    I: false,
    II: false,
    III: false,
    IV: false,
    V: false,
    VI: false,
  })

  const [biotipoCutaneo, setBiotipoCutaneo] = useState({
    Seca: false,
    Normal: false,
    Mixta: false,
    Grasa: false,
  })

  const [fotoenvejecimiento, setFotoenvejecimiento] = useState({
    "Grado I": false,
    "Grado II": false,
    "Grado III": false,
    "Grado IV": false,
  })

  const [tipoLesiones, setTipoLesiones] = useState({
    "Comedones abiertos": false,
    "Comedones cerrados": false,
    Pústulas: false,
    Pápulas: false,
    Quistes: false,
    Máculas: false,
    Cicatrices: false,
  })

  const [zonaTratar, setZonaTratar] = useState({
    Facial: false,
    Escote: false,
    Brazos: false,
    Piernas: false,
    Espalda: false,
    Abdomen: false,
  })

  // Estado para áreas de texto
  const [tratamientoRealizado, setTratamientoRealizado] = useState("")
  const [productosUtilizados, setProductosUtilizados] = useState("")
  const [observaciones, setObservaciones] = useState("")
  const [consentimiento, setConsentimiento] = useState("")

  // Manejadores para cambios en inputs
  const handleDatosClienteChange = (e) => {
    const { name, value } = e.target
    setDatosCliente((prev) => ({ ...prev, [name]: value }))
  }

  const handleAntecedentesPersonalesChange = (e) => {
    const { name, value } = e.target
    setAntecedentesPersonales((prev) => ({ ...prev, [name]: value }))
  }

  const handleAntecedentesGinecologicosChange = (e) => {
    const { name, value } = e.target
    setAntecedentesGinecologicos((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (setter, key) => (e) => {
    setter((prev) => ({ ...prev, [key]: e.target.checked }))
  }

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage({ text: "", type: "" })

    try {
      // Crear objeto con todos los datos del formulario
      const fichaData = {
        datosCliente,
        antecedentesPersonales,
        antecedentesGinecologicos,
        fototipo,
        biotipoCutaneo,
        fotoenvejecimiento,
        tipoLesiones,
        zonaTratar,
        tratamientoRealizado,
        productosUtilizados,
        observaciones,
        consentimiento,
        fechaCreacion: new Date(),
      }

      // Guardar en Firestore
      const docRef = await addDoc(collection(db, "fichasCosmetologia"), fichaData)

      setMessage({
        text: `Ficha guardada exitosamente con ID: ${docRef.id}`,
        type: "success",
      })

      // Guardar la ficha para poder descargarla como PDF
      setFichaGuardada(fichaData)

      // Opcional: resetear el formulario o redirigir
      // resetForm();
    } catch (error) {
      console.error("Error al guardar la ficha:", error)
      setMessage({
        text: `Error al guardar la ficha: ${error.message}`,
        type: "error",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Función para generar PDF sin guardar en Firebase
  const handleGenerarPdf = () => {
    // Crear objeto con todos los datos del formulario actual
    const fichaData = {
      datosCliente,
      antecedentesPersonales,
      antecedentesGinecologicos,
      fototipo,
      biotipoCutaneo,
      fotoenvejecimiento,
      tipoLesiones,
      zonaTratar,
      tratamientoRealizado,
      productosUtilizados,
      observaciones,
      consentimiento,
      fechaCreacion: new Date(),
    }

    setFichaGuardada(fichaData)
  }

  return (
    <div>
      <form style={styles.ficha} onSubmit={handleSubmit}>
        <div style={styles.fichaTitle}>Ficha de Cosmetología</div>

        {message.text && (
          <div
            style={{
              ...styles.mensaje,
              ...(message.type === "success" ? styles.mensajeSuccess : styles.mensajeError),
            }}
          >
            {message.text}
          </div>
        )}

        <h2 style={styles.tituloSeccion}>DATOS DEL CLIENTE</h2>
        <div style={styles.gridDatos}>
          <label style={styles.label}>
            Nombre completo
            <input
              type="text"
              style={styles.input}
              name="nombreCompleto"
              value={datosCliente.nombreCompleto}
              onChange={handleDatosClienteChange}
              required
            />
          </label>
          <label style={styles.label}>
            Edad
            <input
              type="text"
              style={styles.input}
              name="edad"
              value={datosCliente.edad}
              onChange={handleDatosClienteChange}
            />
          </label>
          <label style={styles.label}>
            Fecha de nacimiento
            <input
              type="date"
              style={styles.input}
              name="fechaNacimiento"
              value={datosCliente.fechaNacimiento}
              onChange={handleDatosClienteChange}
            />
          </label>
          <label style={styles.label}>
            Teléfono
            <input
              type="tel"
              style={styles.input}
              name="telefono"
              value={datosCliente.telefono}
              onChange={handleDatosClienteChange}
              required
            />
          </label>
          <label style={styles.label}>
            Email
            <input
              type="email"
              style={styles.input}
              name="email"
              value={datosCliente.email}
              onChange={handleDatosClienteChange}
            />
          </label>
          <label style={styles.label}>
            Domicilio
            <input
              type="text"
              style={styles.input}
              name="domicilio"
              value={datosCliente.domicilio}
              onChange={handleDatosClienteChange}
            />
          </label>
          <label style={styles.label}>
            Fecha hoy
            <input
              type="date"
              style={styles.input}
              name="fechaHoy"
              value={datosCliente.fechaHoy}
              onChange={handleDatosClienteChange}
            />
          </label>
          
          <label style={styles.label}>
            Sexo
            <div style={{ ...styles.flex, ...styles.gap2 }}>
              <label style={styles.checkboxLabel}>
                <input
                  type="radio"
                  name="sexo"
                  value="femenino"
                  checked={datosCliente.sexo === "femenino"}
                  onChange={handleDatosClienteChange}
                />
                F
              </label>
              <label style={styles.checkboxLabel}>
                <input
                  type="radio"
                  name="sexo"
                  value="masculino"
                  checked={datosCliente.sexo === "masculino"}
                  onChange={handleDatosClienteChange}
                />
                M
              </label>
            </div>
          </label>

        </div>

        <h2 style={styles.tituloSeccion}>ANTECEDENTES PERSONALES</h2>
        <div style={styles.gridDatos}>
          <label style={styles.label}>
            Motivo de la consulta
            <input
              type="text"
              style={styles.input}
              name="motivoConsulta"
              value={antecedentesPersonales.motivoConsulta}
              onChange={handleAntecedentesPersonalesChange}
              required
            />
          </label>
          <label style={styles.label}>
            Enfermedades actuales o anteriores
            <input
              type="text"
              style={styles.input}
              name="enfermedades"
              value={antecedentesPersonales.enfermedades}
              onChange={handleAntecedentesPersonalesChange}
            />
          </label>
          <label style={styles.label}>
            Uso de medicamentos
            <input
              type="text"
              style={styles.input}
              name="medicamentos"
              value={antecedentesPersonales.medicamentos}
              onChange={handleAntecedentesPersonalesChange}
            />
          </label>
          <label style={styles.label}>
            Alergias
            <input
              type="text"
              style={styles.input}
              name="alergias"
              value={antecedentesPersonales.alergias}
              onChange={handleAntecedentesPersonalesChange}
            />
          </label>
          <label style={styles.label}>
            Tratamientos estéticos anteriores
            <input
              type="text"
              style={styles.input}
              name="tratamientosAnteriores"
              value={antecedentesPersonales.tratamientosAnteriores}
              onChange={handleAntecedentesPersonalesChange}
            />
          </label>
          <label style={styles.label}>
            Antecedentes familiares
            <input
              type="text"
              style={styles.input}
              name="antecedentesFamiliares"
              value={antecedentesPersonales.antecedentesFamiliares}
              onChange={handleAntecedentesPersonalesChange}
            />
          </label>
          <label style={styles.label}>
            ¿Realiza controles médicos periódicos?
            <input
              type="text"
              style={styles.input}
              name="controlesMedicos"
              value={antecedentesPersonales.controlesMedicos}
              onChange={handleAntecedentesPersonalesChange}
            />
          </label>
        </div>

        <h2 style={styles.tituloSeccion}>ANTECEDENTES GINECOLÓGICOS</h2>
        <div style={styles.gridDatos}>
          <label style={styles.label}>
            ¿Está embarazada?
            <div style={{ ...styles.flex, ...styles.gap2 }}>
              <label style={styles.checkboxLabel}>
                <input
                  type="radio"
                  name="embarazo"
                  value="sí"
                  checked={antecedentesGinecologicos.embarazo === "sí"}
                  onChange={handleAntecedentesGinecologicosChange}
                />
                Sí
              </label>
              <label style={styles.checkboxLabel}>
                <input
                  type="radio"
                  name="embarazo"
                  value="no"
                  checked={antecedentesGinecologicos.embarazo === "no"}
                  onChange={handleAntecedentesGinecologicosChange}
                />
                No
              </label>
            </div>
          </label>

          <label style={styles.label}>
            Menopausia
            <div style={{ ...styles.flex, ...styles.gap2 }}>
              <label style={styles.checkboxLabel}>
                <input
                  type="radio"
                  name="menopausia"
                  value="sí"
                  checked={antecedentesGinecologicos.menopausia === "sí"}
                  onChange={handleAntecedentesGinecologicosChange}
                />
                Sí
              </label>
              <label style={styles.checkboxLabel}>
                <input
                  type="radio"
                  name="menopausia"
                  value="no"
                  checked={antecedentesGinecologicos.menopausia === "no"}
                  onChange={handleAntecedentesGinecologicosChange}
                />
                No
              </label>
            </div>
          </label>

          <label style={styles.label}>
            ¿Ciclo menstrual regular?
            <div style={{ ...styles.flex, ...styles.gap2 }}>
              <label style={styles.checkboxLabel}>
                <input
                  type="radio"
                  name="cicloMenstrual"
                  value="sí"
                  checked={antecedentesGinecologicos.cicloMenstrual === "sí"}
                  onChange={handleAntecedentesGinecologicosChange}
                />
                Sí
              </label>
              <label style={styles.checkboxLabel}>
                <input
                  type="radio"
                  name="cicloMenstrual"
                  value="no"
                  checked={antecedentesGinecologicos.cicloMenstrual === "no"}
                  onChange={handleAntecedentesGinecologicosChange}
                />
                No
              </label>
            </div>
          </label>
        </div>

        <h2 style={styles.tituloSeccion}>FOTOTIPO SEGÚN FITZPATRICK</h2>
        <div style={styles.checkboxGroup}>
          {Object.keys(fototipo).map((tipo) => (
            <label key={tipo} style={styles.checkboxLabel}>
              <input type="checkbox" checked={fototipo[tipo]} onChange={handleCheckboxChange(setFototipo, tipo)} />{" "}
              {tipo}
            </label>
          ))}
        </div>

        <h2 style={styles.tituloSeccion}>BIOTIPO CUTÁNEO</h2>
        <div style={styles.checkboxGroup}>
          {Object.keys(biotipoCutaneo).map((tipo) => (
            <label key={tipo} style={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={biotipoCutaneo[tipo]}
                onChange={handleCheckboxChange(setBiotipoCutaneo, tipo)}
              />{" "}
              {tipo}
            </label>
          ))}
        </div>

        <h2 style={styles.tituloSeccion}>FOTOENVEJECIMIENTO</h2>
        <div style={styles.checkboxGroup}>
          {Object.keys(fotoenvejecimiento).map((grado) => (
            <label key={grado} style={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={fotoenvejecimiento[grado]}
                onChange={handleCheckboxChange(setFotoenvejecimiento, grado)}
              />{" "}
              {grado}
            </label>
          ))}
        </div>

        <h2 style={styles.tituloSeccion}>TIPO DE LESIONES</h2>
        <div style={styles.checkboxGroup}>
          {Object.keys(tipoLesiones).map((tipo) => (
            <label key={tipo} style={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={tipoLesiones[tipo]}
                onChange={handleCheckboxChange(setTipoLesiones, tipo)}
              />{" "}
              {tipo}
            </label>
          ))}
        </div>

        <h2 style={styles.tituloSeccion}>ZONA A TRATAR</h2>
        <div style={styles.checkboxGroup}>
          {Object.keys(zonaTratar).map((zona) => (
            <label key={zona} style={styles.checkboxLabel}>
              <input type="checkbox" checked={zonaTratar[zona]} onChange={handleCheckboxChange(setZonaTratar, zona)} />{" "}
              {zona}
            </label>
          ))}
        </div>

        <h2 style={styles.tituloSeccion}>TRATAMIENTO REALIZADO</h2>
        <textarea
          rows="4"
          style={styles.textarea}
          placeholder="Describa el tratamiento realizado..."
          value={tratamientoRealizado}
          onChange={(e) => setTratamientoRealizado(e.target.value)}
        ></textarea>

        <h2 style={styles.tituloSeccion}>PRODUCTOS UTILIZADOS</h2>
        <textarea
          rows="4"
          style={styles.textarea}
          placeholder="Liste los productos utilizados..."
          value={productosUtilizados}
          onChange={(e) => setProductosUtilizados(e.target.value)}
        ></textarea>

        <h2 style={styles.tituloSeccion}>OBSERVACIONES</h2>
        <textarea
          rows="4"
          style={styles.textarea}
          placeholder="Observaciones adicionales..."
          value={observaciones}
          onChange={(e) => setObservaciones(e.target.value)}
        ></textarea>

        <div style={styles.consent}>
          Yo,{" "}
          <input
            type="text"
            style={styles.consentInput}
            value={consentimiento}
            onChange={(e) => setConsentimiento(e.target.value)}
          />
          , acepto que he contestado correctamente y con la verdad esta HISTORIA CLÍNICA y que así mismo, autorizo los
          procedimientos cosméticos y estéticos que he tenido claramente las explicaciones sobre dichos tratamientos, y
          su aplicación y sus posibles efectos secundarios, por lo cual asumo la responsabilidad que YO tengo como
          paciente para el éxito, así como los cuidados que debo tener y/o fuera del lugar del lugar donde se me fue
          realizado el procedimiento.
        </div>

        <div style={styles.firmas}>
          <div style={styles.firma}>
            <hr style={styles.firmaHr} />
            <span style={styles.firmaSpan}>Firma del Cliente</span>
          </div>
          <div style={styles.firma}>
            <hr style={styles.firmaHr} />
            <span style={styles.firmaSpan}>Firma del Profesional</span>
          </div>
        </div>

        <div style={styles.botonContainer}>
          <button type="submit" style={styles.botonGuardar} disabled={isLoading}>
            {isLoading ? "Guardando..." : "Guardar Ficha"}
          </button>
          <button type="button" style={styles.botonPdf} onClick={handleGenerarPdf}>
            Descargar
          </button>
        </div>
      </form>

      {fichaGuardada && (
        <div style={styles.pdfSection}>
          <h2 style={styles.tituloSeccion}>DESCARGAR FICHA</h2>
          
          <PdfFicha fichaData={fichaGuardada} />
        </div>
      )}
    </div>
  )
}

export default FichaCosmetologia
