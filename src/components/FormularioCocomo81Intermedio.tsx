import { useState } from "react";
import { calcularCocomo81Intermedio } from "../utils/cocomo81";
import { CocomoResult, CocomoInputs } from "../types/cocomo81";
import { cocomo81CostDrivers, FactorNivel } from "../data/cocomo81Factors";

interface FormularioCocomo81IntermedioProps {
  onVolver: () => void;
}

const niveles: FactorNivel[] = ["Muy Bajo", "Bajo", "Nominal", "Alto", "Muy Alto", "Extra Alto"];

const FormularioCocomo81Intermedio = ({ onVolver }: FormularioCocomo81IntermedioProps) => {
  const [inputs, setInputs] = useState<CocomoInputs>({ kloc: 0, mode: "orgánico" });
  const [factores, setFactores] = useState<Record<string, FactorNivel>>({});
  const [resultado, setResultado] = useState<CocomoResult | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: name === "kloc" ? parseFloat(value) : value,
    }));
  };

  const handleFactorChange = (id: string, value: FactorNivel) => {
    setFactores((prev) => ({ ...prev, [id]: value }));
  };

  const calcularFEC = () => {
    return cocomo81CostDrivers.reduce((acc, factor) => {
      const seleccion = factores[factor.id] || "Nominal";
      const multiplicador = factor.niveles.find((n) => n.nivel === seleccion)?.valor || 1;
      return acc * multiplicador;
    }, 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fec = calcularFEC();
    const res = calcularCocomo81Intermedio({ ...inputs, fec });
    setResultado(res);
  };

  return (
    <div className="max-w-3xl w-full bg-white p-6 rounded-2xl shadow-lg space-y-6 overflow-hidden">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-800">COCOMO 81 - Intermedio</h2>
        <button
          onClick={onVolver}
          className="text-sm text-blue-600 hover:underline"
        >
          ⬅ Volver
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-auto pr-2">
        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block mb-1 text-sm font-medium">Tamaño del proyecto (KLOC)</label>
            <input
              type="number"
              name="kloc"
              min="0"
              step="0.01"
              className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring"
              value={inputs.kloc}
              onChange={handleChange}
              required
            />
          </div>
          <div className="w-1/2">
            <label className="block mb-1 text-sm font-medium">Modo del proyecto</label>
            <select
              name="mode"
              className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring"
              value={inputs.mode}
              onChange={handleChange}
            >
              <option value="orgánico">Orgánico</option>
              <option value="semiacoplado">Semiacoplado</option>
              <option value="empotrado">Empotrado</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {cocomo81CostDrivers.map((factor) => (
                <div key={factor.id}>
                <label className="block mb-1 text-sm font-medium">{factor.nombre}</label>
                <select
                    className="w-full px-3 py-2 border rounded-xl focus:outline-none"
                    value={factores[factor.id] || "Nominal"}
                    onChange={(e) => handleFactorChange(factor.id, e.target.value as FactorNivel)}
                >
                    {factor.niveles.map((n) => (
                    <option key={n.nivel} value={n.nivel}>
                        {n.nivel} ({n.valor})
                    </option>
                    ))}
                </select>
                </div>
            ))}
        </div>


        <button
          type="submit"
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition"
        >
          Calcular estimación
        </button>
      </form>

      {resultado && (
        <div className="bg-gray-100 p-4 rounded-xl text-sm text-gray-700 space-y-1">
          <p><strong>Esfuerzo:</strong> {resultado.esfuerzo} personas-mes</p>
          <p><strong>Duración:</strong> {resultado.tiempo} meses</p>
          <p><strong>Personas necesarias:</strong> {resultado.personas}</p>
          <p><strong>Costo estimado:</strong> S/. {resultado.costo}</p>
        </div>
      )}
    </div>
  );
};

export default FormularioCocomo81Intermedio;
