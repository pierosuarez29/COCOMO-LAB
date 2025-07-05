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
  doc.text(`Proyecto: ${nombreProyecto}`, 20, 30);
  doc.text(`Modelo: ${modelo}`, 20, 36);
  doc.text(`Fecha: ${fecha}`, 20, 42);

  doc.setFont("helvetica", "bold");
  doc.text("Entradas", 20, 52);
  doc.setFont("helvetica", "normal");

  let y = 60;
  Object.entries(entradas).forEach(([key, value]) => {
    doc.text(`${key}: ${value}`, 25, y);
    y += 6;
  });

  doc.setFont("helvetica", "bold");
  doc.text("Resultados", 20, y + 6);
  doc.setFont("helvetica", "normal");

  y += 12;
  Object.entries(resultados).forEach(([key, value]) => {
    doc.text(`${key}: ${value}`, 25, y);
    y += 6;
  });

  doc.save(`estimacion_${nombreProyecto}.pdf`);
};
