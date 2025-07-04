export type FactorNivel =
  | "Muy Bajo"
  | "Bajo"
  | "Nominal"
  | "Alto"
  | "Muy Alto"
  | "Extra Alto";

export interface CostFactor {
  id: string;
  nombre: string;
  niveles: { nivel: FactorNivel; valor: number }[];
}

export const cocomo81CostDrivers: CostFactor[] = [
  {
    id: "rss",
    nombre: "Requerimientos de confiabilidad del software",
    niveles: [
      { nivel: "Muy Bajo", valor: 0.75 },
      { nivel: "Bajo", valor: 0.88 },
      { nivel: "Nominal", valor: 1.0 },
      { nivel: "Alto", valor: 1.15 },
      { nivel: "Muy Alto", valor: 1.4 },
    ],
  },
  {
    id: "tbd",
    nombre: "Tamaño de la base de datos",
    niveles: [
      { nivel: "Bajo", valor: 0.94 },
      { nivel: "Nominal", valor: 1.0 },
      { nivel: "Alto", valor: 1.08 },
      { nivel: "Muy Alto", valor: 1.16 },
    ],
  },
  {
    id: "cpr",
    nombre: "Complejidad del producto",
    niveles: [
      { nivel: "Muy Bajo", valor: 0.7 },
      { nivel: "Bajo", valor: 0.85 },
      { nivel: "Nominal", valor: 1.0 },
      { nivel: "Alto", valor: 1.15 },
      { nivel: "Muy Alto", valor: 1.3 },
      { nivel: "Extra Alto", valor: 1.65 },
    ],
  },
  {
    id: "rte",
    nombre: "Restricciones de tiempo de ejecución",
    niveles: [
      { nivel: "Nominal", valor: 1.0 },
      { nivel: "Alto", valor: 1.11 },
      { nivel: "Muy Alto", valor: 1.3 },
      { nivel: "Extra Alto", valor: 1.66 },
    ],
  },
  {
    id: "rmp",
    nombre: "Restricciones de memoria principal",
    niveles: [
      { nivel: "Nominal", valor: 1.0 },
      { nivel: "Alto", valor: 1.06 },
      { nivel: "Muy Alto", valor: 1.3 },
      { nivel: "Extra Alto", valor: 1.58 },
    ],
  },
  {
    id: "vmc",
    nombre: "Velocidad de cambio de los medios de cómputo",
    niveles: [
      { nivel: "Bajo", valor: 0.87 },
      { nivel: "Nominal", valor: 1.0 },
      { nivel: "Alto", valor: 1.15 },
      { nivel: "Muy Alto", valor: 1.3 },
    ],
  },
  {
    id: "trc",
    nombre: "Tiempo de respuesta del computador",
    niveles: [
      { nivel: "Bajo", valor: 0.87 },
      { nivel: "Nominal", valor: 1.0 },
      { nivel: "Alto", valor: 1.07 },
      { nivel: "Muy Alto", valor: 1.15 },
    ],
  },
  {
    id: "can",
    nombre: "Capacidad de los analistas",
    niveles: [
      { nivel: "Muy Bajo", valor: 1.46 },
      { nivel: "Bajo", valor: 1.19 },
      { nivel: "Nominal", valor: 1.0 },
      { nivel: "Alto", valor: 0.86 },
      { nivel: "Muy Alto", valor: 0.71 },
    ],
  },
  {
    id: "ean",
    nombre: "Experiencia de los analistas",
    niveles: [
      { nivel: "Muy Bajo", valor: 1.29 },
      { nivel: "Bajo", valor: 1.13 },
      { nivel: "Nominal", valor: 1.0 },
      { nivel: "Alto", valor: 0.91 },
      { nivel: "Muy Alto", valor: 0.82 },
    ],
  },
  {
    id: "cpro",
    nombre: "Capacidad de los programadores",
    niveles: [
      { nivel: "Muy Bajo", valor: 1.42 },
      { nivel: "Bajo", valor: 1.17 },
      { nivel: "Nominal", valor: 1.0 },
      { nivel: "Alto", valor: 0.86 },
      { nivel: "Muy Alto", valor: 0.7 },
    ],
  },
  {
    id: "eso",
    nombre: "Experiencia en el sistema operativo",
    niveles: [
      { nivel: "Muy Bajo", valor: 1.21 },
      { nivel: "Bajo", valor: 1.12 },
      { nivel: "Nominal", valor: 1.0 },
      { nivel: "Alto", valor: 0.96 },
    ],
  },
  {
    id: "elp",
    nombre: "Experiencia en el lenguaje de programación",
    niveles: [
      { nivel: "Muy Bajo", valor: 1.14 },
      { nivel: "Bajo", valor: 1.1 },
      { nivel: "Nominal", valor: 1.0 },
      { nivel: "Alto", valor: 0.95 },
    ],
  },
  {
    id: "utp",
    nombre: "Uso de técnicas modernas de programación",
    niveles: [
      { nivel: "Muy Bajo", valor: 1.24 },
      { nivel: "Bajo", valor: 1.1 },
      { nivel: "Nominal", valor: 1.0 },
      { nivel: "Alto", valor: 0.91 },
      { nivel: "Muy Alto", valor: 0.82 },
    ],
  },
  {
    id: "uhs",
    nombre: "Uso de herramientas de software",
    niveles: [
      { nivel: "Muy Bajo", valor: 1.24 },
      { nivel: "Bajo", valor: 1.1 },
      { nivel: "Nominal", valor: 1.0 },
      { nivel: "Alto", valor: 0.91 },
      { nivel: "Muy Alto", valor: 0.83 },
      { nivel: "Extra Alto", valor: 0.7 },
    ],
  },
  {
    id: "rpl",
    nombre: "Requisitos de planificación",
    niveles: [
      { nivel: "Muy Bajo", valor: 1.23 },
      { nivel: "Bajo", valor: 1.08 },
      { nivel: "Nominal", valor: 1.0 },
      { nivel: "Alto", valor: 1.04 },
      { nivel: "Muy Alto", valor: 1.1 },
    ],
  },
];
