"use client"

import React, { useState } from "react"
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from "@react-pdf/renderer"

// Estilos para el PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Helvetica",
    fontSize: 10,
  },
  title: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 12,
    marginTop: 10,
    marginBottom: 5,
    fontWeight: "bold",
    backgroundColor: "#f0f0f0",
    padding: 5,
  },
  row: {
    flexDirection: "row",
    marginBottom: 5,
  },
  column: {
    flexDirection: "column",
    marginBottom: 5,
    flex: 1,
  },
  label: {
    fontWeight: "bold",
    marginRight: 5,
    flex: 1,
  },
  value: {
    flex: 2,
  },
  checkboxRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 5,
  },
  checkboxItem: {
    flexDirection: "row",
    width: "33%",
    marginBottom: 3,
  },
  checkbox: {
    width: 10,
    height: 10,
    border: "1px solid black",
    marginRight: 5,
  },
  checkedBox: {
    width: 10,
    height: 10,
    border: "1px solid black",
    backgroundColor: "black",
    marginRight: 5,
  },
  textArea: {
    marginBottom: 10,
    border: "1px solid #ccc",
    padding: 5,
    minHeight: 40,
  },
  consent: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 9,
  },
  signatures: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  signature: {
    width: "40%",
    borderTop: "1px solid black",
    paddingTop: 5,
    textAlign: "center",
  },
})

// Componente para mostrar checkboxes
const CheckboxField = ({ label, checked }) => (
  <View style={styles.checkboxItem}>
    <View style={checked ? styles.checkedBox : styles.checkbox} />
    <Text>{label}</Text>
  </View>
)

// Componente del documento PDF
const FichaPDF = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>FICHA DE COSMETOLOGÍA</Text>

      {/* DATOS DEL CLIENTE */}
      <Text style={styles.subtitle}>DATOS DEL CLIENTE</Text>
      <View style={styles.row}>
        <View style={styles.column}>
          <View style={styles.row}>
            <Text style={styles.label}>Nombre completo:</Text>
            <Text style={styles.value}>{data.datosCliente.nombreCompleto}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Edad:</Text>
            <Text style={styles.value}>{data.datosCliente.edad}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Fecha de nacimiento:</Text>
            <Text style={styles.value}>{data.datosCliente.fechaNacimiento}</Text>
          </View>
        </View>
        <View style={styles.column}>
          <View style={styles.row}>
            <Text style={styles.label}>Teléfono:</Text>
            <Text style={styles.value}>{data.datosCliente.telefono}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{data.datosCliente.email}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Domicilio:</Text>
            <Text style={styles.value}>{data.datosCliente.domicilio}</Text>
          </View>
        </View>
      </View>

      {/* ANTECEDENTES PERSONALES */}
      <Text style={styles.subtitle}>ANTECEDENTES PERSONALES</Text>
      <View style={styles.row}>
        <View style={styles.column}>
          <View style={styles.row}>
            <Text style={styles.label}>Motivo de consulta:</Text>
            <Text style={styles.value}>{data.antecedentesPersonales.motivoConsulta}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Enfermedades:</Text>
            <Text style={styles.value}>{data.antecedentesPersonales.enfermedades}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Medicamentos:</Text>
            <Text style={styles.value}>{data.antecedentesPersonales.medicamentos}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Alergias:</Text>
            <Text style={styles.value}>{data.antecedentesPersonales.alergias}</Text>
          </View>
        </View>
        <View style={styles.column}>
          <View style={styles.row}>
            <Text style={styles.label}>Tratamientos anteriores:</Text>
            <Text style={styles.value}>{data.antecedentesPersonales.tratamientosAnteriores}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Antecedentes familiares:</Text>
            <Text style={styles.value}>{data.antecedentesPersonales.antecedentesFamiliares}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Controles médicos:</Text>
            <Text style={styles.value}>{data.antecedentesPersonales.controlesMedicos}</Text>
          </View>
        </View>
      </View>

      {/* ANTECEDENTES GINECOLÓGICOS */}
      <Text style={styles.subtitle}>ANTECEDENTES GINECOLÓGICOS</Text>
      <View style={styles.row}>
        <View style={styles.column}>
          <View style={styles.row}>
            <Text style={styles.label}>¿Está embarazada?</Text>
            <Text style={styles.value}>{data.antecedentesGinecologicos.embarazo}</Text>
          </View>
        </View>
        <View style={styles.column}>
          <View style={styles.row}>
            <Text style={styles.label}>Menopausia:</Text>
            <Text style={styles.value}>{data.antecedentesGinecologicos.menopausia}</Text>
          </View>
        </View>
        <View style={styles.column}>
          <View style={styles.row}>
            <Text style={styles.label}>¿Ciclo menstrual regular?</Text>
            <Text style={styles.value}>{data.antecedentesGinecologicos.cicloMenstrual}</Text>
          </View>
        </View>
      </View>

      {/* FOTOTIPO */}
      <Text style={styles.subtitle}>FOTOTIPO SEGÚN FITZPATRICK</Text>
      <View style={styles.checkboxRow}>
        {Object.entries(data.fototipo).map(([key, value]) => (
          <CheckboxField key={key} label={key} checked={value} />
        ))}
      </View>

      {/* BIOTIPO CUTÁNEO */}
      <Text style={styles.subtitle}>BIOTIPO CUTÁNEO</Text>
      <View style={styles.checkboxRow}>
        {Object.entries(data.biotipoCutaneo).map(([key, value]) => (
          <CheckboxField key={key} label={key} checked={value} />
        ))}
      </View>

      {/* FOTOENVEJECIMIENTO */}
      <Text style={styles.subtitle}>FOTOENVEJECIMIENTO</Text>
      <View style={styles.checkboxRow}>
        {Object.entries(data.fotoenvejecimiento).map(([key, value]) => (
          <CheckboxField key={key} label={key} checked={value} />
        ))}
      </View>

      {/* TIPO DE LESIONES */}
      <Text style={styles.subtitle}>TIPO DE LESIONES</Text>
      <View style={styles.checkboxRow}>
        {Object.entries(data.tipoLesiones).map(([key, value]) => (
          <CheckboxField key={key} label={key} checked={value} />
        ))}
      </View>

      {/* ZONA A TRATAR */}
      <Text style={styles.subtitle}>ZONA A TRATAR</Text>
      <View style={styles.checkboxRow}>
        {Object.entries(data.zonaTratar).map(([key, value]) => (
          <CheckboxField key={key} label={key} checked={value} />
        ))}
      </View>

      {/* TRATAMIENTO REALIZADO */}
      <Text style={styles.subtitle}>TRATAMIENTO REALIZADO</Text>
      <View style={styles.textArea}>
        <Text>{data.tratamientoRealizado}</Text>
      </View>

      {/* PRODUCTOS UTILIZADOS */}
      <Text style={styles.subtitle}>PRODUCTOS UTILIZADOS</Text>
      <View style={styles.textArea}>
        <Text>{data.productosUtilizados}</Text>
      </View>

      {/* OBSERVACIONES */}
      <Text style={styles.subtitle}>OBSERVACIONES</Text>
      <View style={styles.textArea}>
        <Text>{data.observaciones}</Text>
      </View>

      {/* CONSENTIMIENTO */}
      <View style={styles.consent}>
        <Text>
          Yo, {data.consentimiento}, acepto que he contestado correctamente y con la verdad esta HISTORIA CLÍNICA y que
          así mismo, autorizo los procedimientos cosméticos y estéticos que he tenido claramente las explicaciones sobre
          dichos tratamientos, y su aplicación y sus posibles efectos secundarios, por lo cual asumo la responsabilidad
          que YO tengo como paciente para el éxito, así como los cuidados que debo tener y/o fuera del lugar donde se me
          fue realizado el procedimiento.
        </Text>
      </View>

      {/* FIRMAS */}
      <View style={styles.signatures}>
        <View style={styles.signature}>
          <Text>Firma del Cliente</Text>
        </View>
        <View style={styles.signature}>
          <Text>Firma del Profesional</Text>
        </View>
      </View>
    </Page>
  </Document>
)

// Componente principal que muestra el botón de descarga
const PdfFicha = ({ fichaData }) => {
  const [isClient, setIsClient] = useState(false)

  // Asegurarse de que el componente solo se renderice en el cliente
  React.useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return <div>Cargando...</div>
  }

  return (
    <div className="pdf-download-container">
      <PDFDownloadLink
        document={<FichaPDF data={fichaData} />}
        fileName={`ficha-cosmetologia-${fichaData.datosCliente.nombreCompleto.replace(/\s+/g, "-")}.pdf`}
        style={{
          textDecoration: "none",
          padding: "10px 20px",
          color: "#fff",
          backgroundColor: "#9c27b0",
          borderRadius: "30px",
          cursor: "pointer",
          display: "inline-block",
          marginTop: "20px",
          marginBottom: "20px",
          fontWeight: "bold",
          boxShadow: "0 4px 6px rgba(156, 39, 176, 0.2)",
        }}
      >
        {({ blob, url, loading, error }) => (loading ? "Generando.." : "Descargar Ficha")}
      </PDFDownloadLink>
    </div>
  )
}

export default PdfFicha
