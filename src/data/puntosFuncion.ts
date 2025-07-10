// Tipos y pesos por complejidad
export type Complejidad = "Simple" | "Media" | "Compleja";

export const categoriasPF = [
  { id: "entradas", nombre: "Entradas Externas", pesos: { Simple: 3, Media: 4, Compleja: 6 } },
  { id: "salidas", nombre: "Salidas Externas", pesos: { Simple: 4, Media: 5, Compleja: 7 } },
  { id: "consultas", nombre: "Consultas Externas", pesos: { Simple: 3, Media: 4, Compleja: 6 } },
  { id: "archivos", nombre: "Archivos Lógicos Internos", pesos: { Simple: 7, Media: 10, Compleja: 15 } },
  { id: "interfaces", nombre: "Interfaces de Archivos Externos", pesos: { Simple: 5, Media: 7, Compleja: 10 } },
];

// Preguntas de ajuste de Albrecht (0 a 5)
export const factoresAjuste = [
  "¿Requiere comunicación de datos?",
  "¿Requiere procesamiento distribuido?",
  "¿Es crítico el rendimiento?",
  "¿El sistema se va a operar en un entorno complejo?",
  "¿Es alta la tasa de transacciones?",
  "¿Requiere entrada de datos interactiva?",
  "¿Las funciones son complejas internamente?",
  "¿Requiere ser reutilizado?",
  "¿Requiere facilidad de instalación?",
  "¿Requiere facilidad de uso?",
  "¿Requiere portabilidad?",
  "¿Requiere mantenimiento fácil?",
  "¿Requiere procesamiento simultáneo?",
  "¿Incluye características de seguridad o auditoría?"
];
