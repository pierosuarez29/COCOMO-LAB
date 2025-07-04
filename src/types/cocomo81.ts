export type ProjectMode = "orgánico" | "semiacoplado" | "empotrado";

export interface CocomoInputs {
  kloc: number;
  mode: ProjectMode;
}

export interface CocomoResult {
  esfuerzo: number;
  tiempo: number;
  personas: number;
  costo: number;
}
