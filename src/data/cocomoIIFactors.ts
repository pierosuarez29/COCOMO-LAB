export type Nivel =
  | "Muy Bajo"
  | "Bajo"
  | "Nominal"
  | "Alto"
  | "Muy Alto"
  | "Extra Alto";

export interface Factor {
  id: string;
  nombre: string;
  niveles: { nivel: Nivel; valor: number }[];
}

// 📌 Conductores de Escala (5)
export const conductoresEscala: Factor[] = [
  {
    id: "prec",
    nombre: "Precedentedness (PREC)",
    niveles: [
      { nivel: "Muy Bajo", valor: 6.20 },
      { nivel: "Bajo", valor: 4.96 },
      { nivel: "Nominal", valor: 3.72 },
      { nivel: "Alto", valor: 2.48 },
      { nivel: "Muy Alto", valor: 1.24 },
    ],
  },
  {
    id: "flex",
    nombre: "Development Flexibility (FLEX)",
    niveles: [
      { nivel: "Muy Bajo", valor: 5.07 },
      { nivel: "Bajo", valor: 4.05 },
      { nivel: "Nominal", valor: 3.04 },
      { nivel: "Alto", valor: 2.03 },
      { nivel: "Muy Alto", valor: 1.01 },
    ],
  },
  {
    id: "resl",
    nombre: "Architecture / Risk Resolution (RESL)",
    niveles: [
      { nivel: "Muy Bajo", valor: 7.07 },
      { nivel: "Bajo", valor: 5.65 },
      { nivel: "Nominal", valor: 4.24 },
      { nivel: "Alto", valor: 2.83 },
      { nivel: "Muy Alto", valor: 1.41 },
    ],
  },
  {
    id: "team",
    nombre: "Team Cohesion (TEAM)",
    niveles: [
      { nivel: "Muy Bajo", valor: 5.48 },
      { nivel: "Bajo", valor: 4.38 },
      { nivel: "Nominal", valor: 3.29 },
      { nivel: "Alto", valor: 2.19 },
      { nivel: "Muy Alto", valor: 1.10 },
    ],
  },
  {
    id: "pmat",
    nombre: "Process Maturity (PMAT)",
    niveles: [
      { nivel: "Muy Bajo", valor: 7.80 },
      { nivel: "Bajo", valor: 6.24 },
      { nivel: "Nominal", valor: 4.68 },
      { nivel: "Alto", valor: 3.12 },
      { nivel: "Muy Alto", valor: 1.56 },
    ],
  },
];

// 📌 Conductores de Coste (17)
export const conductoresCoste: Factor[] = [
  {
    id: "rely",
    nombre: "Required Software Reliability (RELY)",
    niveles: [
      { nivel: "Muy Bajo", valor: 0.82 },
      { nivel: "Bajo", valor: 0.92 },
      { nivel: "Nominal", valor: 1.00 },
      { nivel: "Alto", valor: 1.10 },
      { nivel: "Muy Alto", valor: 1.26 },
    ],
  },
  {
    id: "data",
    nombre: "Database Size (DATA)",
    niveles: [
      { nivel: "Nominal", valor: 1.00 },
      { nivel: "Alto", valor: 1.08 },
      { nivel: "Muy Alto", valor: 1.16 },
    ],
  },
  {
    id: "cplx",
    nombre: "Product Complexity (CPLX)",
    niveles: [
      { nivel: "Muy Bajo", valor: 0.73 },
      { nivel: "Bajo", valor: 0.87 },
      { nivel: "Nominal", valor: 1.00 },
      { nivel: "Alto", valor: 1.17 },
      { nivel: "Muy Alto", valor: 1.34 },
      { nivel: "Extra Alto", valor: 1.74 },
    ],
  },
  {
    id: "ruse",
    nombre: "Developed for Reusability (RUSE)",
    niveles: [
      { nivel: "Nominal", valor: 1.00 },
      { nivel: "Alto", valor: 1.07 },
      { nivel: "Muy Alto", valor: 1.15 },
      { nivel: "Extra Alto", valor: 1.24 },
    ],
  },
  {
    id: "docu",
    nombre: "Documentation match to life-cycle needs (DOCU)",
    niveles: [
      { nivel: "Muy Bajo", valor: 0.81 },
      { nivel: "Bajo", valor: 0.91 },
      { nivel: "Nominal", valor: 1.00 },
      { nivel: "Alto", valor: 1.11 },
      { nivel: "Muy Alto", valor: 1.23 },
    ],
  },
  {
    id: "time",
    nombre: "Execution Time Constraint (TIME)",
    niveles: [
      { nivel: "Nominal", valor: 1.00 },
      { nivel: "Alto", valor: 1.11 },
      { nivel: "Muy Alto", valor: 1.29 },
      { nivel: "Extra Alto", valor: 1.63 },
    ],
  },
  {
    id: "stor",
    nombre: "Main Storage Constraint (STOR)",
    niveles: [
      { nivel: "Nominal", valor: 1.00 },
      { nivel: "Alto", valor: 1.05 },
      { nivel: "Muy Alto", valor: 1.17 },
      { nivel: "Extra Alto", valor: 1.46 },
    ],
  },
  {
    id: "pvol",
    nombre: "Platform Volatility (PVOL)",
    niveles: [
      { nivel: "Bajo", valor: 0.87 },
      { nivel: "Nominal", valor: 1.00 },
      { nivel: "Alto", valor: 1.15 },
      { nivel: "Muy Alto", valor: 1.30 },
    ],
  },
  {
    id: "acap",
    nombre: "Analyst Capability (ACAP)",
    niveles: [
      { nivel: "Muy Bajo", valor: 1.42 },
      { nivel: "Bajo", valor: 1.19 },
      { nivel: "Nominal", valor: 1.00 },
      { nivel: "Alto", valor: 0.85 },
      { nivel: "Muy Alto", valor: 0.71 },
    ],
  },
  {
    id: "pcap",
    nombre: "Programmer Capability (PCAP)",
    niveles: [
      { nivel: "Muy Bajo", valor: 1.34 },
      { nivel: "Bajo", valor: 1.15 },
      { nivel: "Nominal", valor: 1.00 },
      { nivel: "Alto", valor: 0.88 },
      { nivel: "Muy Alto", valor: 0.76 },
    ],
  },
  {
    id: "pcon",
    nombre: "Personnel Continuity (PCON)",
    niveles: [
      { nivel: "Muy Bajo", valor: 1.29 },
      { nivel: "Bajo", valor: 1.12 },
      { nivel: "Nominal", valor: 1.00 },
      { nivel: "Alto", valor: 0.90 },
      { nivel: "Muy Alto", valor: 0.81 },
    ],
  },
  {
    id: "apex",
    nombre: "Applications Experience (APEX)",
    niveles: [
      { nivel: "Muy Bajo", valor: 1.22 },
      { nivel: "Bajo", valor: 1.10 },
      { nivel: "Nominal", valor: 1.00 },
      { nivel: "Alto", valor: 0.88 },
      { nivel: "Muy Alto", valor: 0.81 },
    ],
  },
  {
    id: "plex",
    nombre: "Platform Experience (PLEX)",
    niveles: [
      { nivel: "Muy Bajo", valor: 1.19 },
      { nivel: "Bajo", valor: 1.09 },
      { nivel: "Nominal", valor: 1.00 },
      { nivel: "Alto", valor: 0.91 },
      { nivel: "Muy Alto", valor: 0.85 },
    ],
  },
  {
    id: "ltel",
    nombre: "Language and Tool Experience (LTEX)",
    niveles: [
      { nivel: "Muy Bajo", valor: 1.20 },
      { nivel: "Bajo", valor: 1.09 },
      { nivel: "Nominal", valor: 1.00 },
      { nivel: "Alto", valor: 0.91 },
      { nivel: "Muy Alto", valor: 0.84 },
    ],
  },
  {
    id: "tool",
    nombre: "Use of Software Tools (TOOL)",
    niveles: [
      { nivel: "Muy Bajo", valor: 1.17 },
      { nivel: "Bajo", valor: 1.09 },
      { nivel: "Nominal", valor: 1.00 },
      { nivel: "Alto", valor: 0.90 },
      { nivel: "Muy Alto", valor: 0.78 },
    ],
  },
  {
    id: "site",
    nombre: "Multisite Development (SITE)",
    niveles: [
      { nivel: "Muy Bajo", valor: 1.22 },
      { nivel: "Bajo", valor: 1.09 },
      { nivel: "Nominal", valor: 1.00 },
      { nivel: "Alto", valor: 0.93 },
      { nivel: "Muy Alto", valor: 0.86 },
      { nivel: "Extra Alto", valor: 0.80 },
    ],
  },
  {
    id: "sced",
    nombre: "Required Development Schedule (SCED)",
    niveles: [
      { nivel: "Muy Bajo", valor: 1.43 },
      { nivel: "Bajo", valor: 1.14 },
      { nivel: "Nominal", valor: 1.00 },
      { nivel: "Alto", valor: 1.00 },
      { nivel: "Muy Alto", valor: 1.00 },
    ],
  },
];

export const gruposConductoresCoste = [
  {
    grupo: "Producto",
    factores: ["rely", "data", "cplx", "ruse", "docu"],
  },
  {
    grupo: "Plataforma",
    factores: ["time", "stor", "pvol"],
  },
  {
    grupo: "Personal",
    factores: ["acap", "pcap", "pccon", "aexp", "pexp", "ltexp"],
  },
  {
    grupo: "Proyecto",
    factores: ["tool", "site", "sced"],
  },
];
