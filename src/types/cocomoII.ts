export interface ResultadoCocomoII {
  esfuerzo: number;
  tiempo: number;
  personas: number;
  costo: number;
}

// Niveles posibles para cada conductor de escala
export type ScaleFactorLevel = 
  | "Muy Bajo"
  | "Bajo"
  | "Nominal"
  | "Alto"
  | "Muy Alto";

// Niveles posibles para factores de coste
export type CostDriverLevel =
  | "Muy Bajo"
  | "Bajo"
  | "Nominal"
  | "Alto"
  | "Muy Alto"
  | "Extra Alto";
