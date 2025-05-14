"use client"

const PdfFicha = ({ fichaData }) => {
  // Función para imprimir usando la API nativa del navegador
  const handlePrint = () => {
  const printWindow = window.open("", "_blank");

  if (!printWindow) {
    alert("Por favor, permite las ventanas emergentes para imprimir la ficha.");
    return;
  }

  // Evaluamos los antecedentes ginecológicos si corresponde
  const antecedentesGinecologicos = fichaData.datosCliente?.sexo === "femenino"
    ? `
      <div class="section">
        <h2>ANTECEDENTES GINECOLÓGICOS</h2>
        <div class="grid">
          <p><strong>¿Está embarazada?</strong> ${fichaData.antecedentesGinecologicos?.embarazo || "No especificado"}</p>
          <p><strong>Menopausia:</strong> ${fichaData.antecedentesGinecologicos?.menopausia || "No especificado"}</p>
          <p><strong>¿Ciclo menstrual regular?</strong> ${fichaData.antecedentesGinecologicos?.cicloMenstrual || "No especificado"}</p>
          <p><strong>¿Está en su ciclo menstrual?</strong> ${fichaData.antecedentesGinecologicos?.ciclo || "No especificado"}</p>
        </div>
      </div>
    `
    : "";

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Ficha de ${fichaData.datosCliente?.nombreCompleto || "Cliente"}</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        h1 { text-align: center; color: #9c27b0; }
        h2 { background-color: #f9f0fc; padding: 5px; }
        .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 20px; }
        .section { margin-bottom: 20px; }
        .signatures { display: flex; justify-content: space-between; margin-top: 50px; }
        .signature { width: 40%; border-top: 1px solid black; text-align: center; }
        @media print {
          button { display: none; }
        }
      </style>
    </head>
    <body>
      <button onclick="window.print()" style="position: fixed; top: 20px; right: 20px; padding: 10px; background: #9c27b0; color: white; border: none; border-radius: 4px; cursor: pointer;">Imprimir</button>
      
      <h1>FICHA DE COSMETOLOGÍA</h1>
      
      <div class="section">
        <h2>DATOS DEL CLIENTE</h2>
        <div class="grid">
          <p><strong>Nombre:</strong> ${fichaData.datosCliente?.nombreCompleto || "No especificado"}</p>
          <p><strong>Edad:</strong> ${fichaData.datosCliente?.edad || "No especificada"}</p>
          <p><strong>Teléfono:</strong> ${fichaData.datosCliente?.telefono || "No especificado"}</p>
          <p><strong>Email:</strong> ${fichaData.datosCliente?.email || "No especificado"}</p>
          <p><strong>Sexo:</strong> ${fichaData.datosCliente?.sexo === "femenino" ? "Femenino" : "Masculino"}</p>
        </div>
      </div>
      
      <div class="section">
        <h2>ANTECEDENTES PERSONALES</h2>
        <div class="grid">
          <p><strong>Motivo de consulta:</strong> ${fichaData.antecedentesPersonales?.motivoConsulta || "No especificado"}</p>
          <p><strong>Enfermedades:</strong> ${fichaData.antecedentesPersonales?.enfermedades || "No especificadas"}</p>
          <p><strong>Medicamentos:</strong> ${fichaData.antecedentesPersonales?.medicamentos || "No especificados"}</p>
          <p><strong>Alergias:</strong> ${fichaData.antecedentesPersonales?.alergias || "No especificadas"}</p>
        </div>
      </div>

      ${antecedentesGinecologicos}

      <div style="margin-top: 30px; text-align: center;">
        <p>Yo, <strong>${fichaData.consentimiento || ""}</strong>, acepto que he contestado correctamente y con la verdad esta HISTORIA CLÍNICA...</p>
      </div>
      
      <div class="signatures">
        <div class="signature">
          <p>Firma del Cliente</p>
        </div>
        <div class="signature">
          <p>Firma del Profesional</p>
        </div>
      </div>
    </body>
    </html>
  `;

  printWindow.document.open();
  printWindow.document.write(htmlContent);
  printWindow.document.close();

  printWindow.onload = () => {
    // Puedes imprimir automáticamente si lo deseas:
    // printWindow.print();
  };
};


  return (
    <div>
      <button onClick={handlePrint} className="button button-primary" style={{ backgroundColor: "#2196F3" }}>
        Descargar PDF
      </button>
    </div>
  )
}

export default PdfFicha
