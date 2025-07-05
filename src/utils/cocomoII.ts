import { conductoresEscala, conductoresCoste, Nivel } from "../data/cocomoIIFactors";

interface EntradasCocomoII {
  kloc: number;
  costoPersonaMes: number;
  escala: Record<string, Nivel>;
  coste: Record<string, Nivel>;
}

export interface ResultadoCocomoII {
  esfuerzo: number;
  tiempo: number;
  personas: number;
  costo: number;
}

export const calcularCocomoII = ({
  kloc,
  costoPersonaMes,
  escala,
  coste,
}: EntradasCocomoII): ResultadoCocomoII => {
  // Calcular sumatoria de factores de escala
  const sumaEscala = conductoresEscala.reduce((acc, factor) => {
    const nivel = escala[factor.id] || "Nominal";
    const valor = factor.niveles.find((n) => n.nivel === nivel)?.valor || 0;
    return acc + valor;
  }, 0);

  // Calcular exponente E y F
  const E = 0.91 + (0.01 * sumaEscala);
  const F = 0.28 + (0.2 * sumaEscala) / 100;

  // Calcular FEC (multiplicador de factores de coste)
  const FEC = conductoresCoste.reduce((acc, factor) => {
    const nivel = coste[factor.id] || "Nominal";
    const valor = factor.niveles.find((n) => n.nivel === nivel)?.valor || 1;
    return acc * valor;
  }, 1);

  // Calcular esfuerzo
  const ESF = 2.94 * FEC * Math.pow(kloc, E);

  // Calcular duración
  const TDES = 3.67 * Math.pow(ESF, F);

  // Calcular personas y costo
  const personas = ESF / TDES;
  const costo = ESF * costoPersonaMes;

  return {
    esfuerzo: parseFloat(ESF.toFixed(2)),
    tiempo: parseFloat(TDES.toFixed(2)),
    personas: Math.ceil(personas),
    costo: parseFloat(costo.toFixed(2)),
  };
};
