import jsPDF from "jspdf";

interface ExportarPDFOptions {
  nombreProyecto: string;
  modelo: string;
  entradas: Record<string, any>;
  resultados: Record<string, any>;
}

export const exportarPDF = ({ nombreProyecto, modelo, entradas, resultados }: ExportarPDFOptions) => {
  const doc = new jsPDF();

  const fecha = new Date().toLocaleDateString();

  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("Reporte de estimación - COCOMO_LAB", 20, 20);

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text(`Proyecto: ${String(nombreProyecto ?? "N/A")}`, 20, 30);
  doc.text(`Modelo: ${String(modelo ?? "N/A")}`, 20, 36);
  doc.text(`Fecha: ${String(fecha ?? "N/A")}`, 20, 42);

  doc.setFont("helvetica", "bold");
  doc.text("Entradas", 20, 52);
  doc.setFont("helvetica", "normal");

  let y = 60;

  Object.entries(entradas).forEach(([clave, valor]) => {
    if (typeof valor === "object" && valor !== null) {
      doc.setFont("helvetica", "bold");
      doc.text(`${String(clave)}:`, 25, y);
      y += 6;

      Object.entries(valor).forEach(([subClave, subValor]) => {
        doc.setFont("helvetica", "normal");
        doc.text(`• ${String(subClave)}: ${String(subValor ?? "N/A")}`, 30, y);
        y += 5;
      });
    } else {
      doc.setFont("helvetica", "bold");
      doc.text(`${String(clave)}:`, 25, y);
      doc.setFont("helvetica", "normal");
      doc.text(`${String(valor ?? "N/A")}`, 80, y);
      y += 6;
    }

    if (y > 270) {
      doc.addPage();
      y = 20;
    }
  });

  doc.setFont("helvetica", "bold");
  doc.text("Resultados", 20, y + 6);
  doc.setFont("helvetica", "normal");

  y += 12;
  Object.entries(resultados).forEach(([clave, valor]) => {
    doc.text(`${String(clave)}: ${String(valor ?? "N/A")}`, 25, y);
    y += 6;

    if (y > 280) {
      doc.addPage();
      y = 20;
    }
  });

  doc.save(`estimacion_${String(nombreProyecto ?? "proyecto")}.pdf`);
};
