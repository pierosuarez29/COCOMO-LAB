import { CocomoInputs, CocomoResult } from "../types/cocomo81";

interface ExtendedInputs extends CocomoInputs {
  fec: number;
}

const coeficientes = {
  orgánico: { a: 2.4, b: 1.05, d: 0.38 },
  semiacoplado: { a: 3.0, b: 1.12, d: 0.35 },
  empotrado: { a: 3.6, b: 1.20, d: 0.32 },
};

export function calcularCocomo81({ kloc, mode }: CocomoInputs): CocomoResult {
  const { a, b, d } = coeficientes[mode];
  const esfuerzo = a * Math.pow(kloc, b);
  const tiempo = 2.5 * Math.pow(esfuerzo, d);
  const personas = esfuerzo / tiempo;
  const costo = esfuerzo * 3500; // Costo mensual por persona

  return {
    esfuerzo: parseFloat(esfuerzo.toFixed(2)),
    tiempo: parseFloat(tiempo.toFixed(2)),
    personas: parseFloat(personas.toFixed(2)),
    costo: Math.round(costo),
  };
}


export function calcularCocomo81Intermedio({ kloc, mode, fec }: ExtendedInputs): CocomoResult {
  const coeficientes = {
    orgánico: { a: 3.2, b: 1.05, d: 0.38 },
    semiacoplado: { a: 3.0, b: 1.12, d: 0.35 },
    empotrado: { a: 2.8, b: 1.20, d: 0.32 },
  };

  const { a, b, d } = coeficientes[mode];
  const esfuerzo = a * Math.pow(kloc, b) * fec;
  const tiempo = 2.5 * Math.pow(esfuerzo, d);
  const personas = esfuerzo / tiempo;
  const costo = esfuerzo * 3500;

  return {
    esfuerzo: parseFloat(esfuerzo.toFixed(2)),
    tiempo: parseFloat(tiempo.toFixed(2)),
    personas: parseFloat(personas.toFixed(2)),
    costo: Math.round(costo),
  };
}