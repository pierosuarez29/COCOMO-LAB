import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ResultadosCasosUso } from "./ResultadosCasosUso";

// Factores técnicos y de ambiente (constantes)
const factoresTecnicos = [
  { codigo: "T1", descripcion: "Sistema Distribuido", peso: 2 },
  { codigo: "T2", descripcion: "Desempeño", peso: 1 },
  { codigo: "T3", descripcion: "Eficiencia del usuario final (en línea)", peso: 1 },
  { codigo: "T4", descripcion: "Complejidad del procesamiento interno", peso: 1 },
  { codigo: "T5", descripcion: "Reusabilidad del código", peso: 1 },
  { codigo: "T6", descripcion: "Facilidad de instalación", peso: 0.5 },
  { codigo: "T7", descripcion: "Facilidad de uso", peso: 0.5 },
  { codigo: "T8", descripcion: "Portabilidad", peso: 2 },
  { codigo: "T9", descripcion: "Facilidad de cambio", peso: 1 },
  { codigo: "T10", descripcion: "Concurrencia", peso: 1 },
  { codigo: "T11", descripcion: "Características especiales de seguridad", peso: 1 },
  { codigo: "T12", descripcion: "Provee acceso a terceros", peso: 1 },
  { codigo: "T13", descripcion: "Facilidades especiales de entrenamiento a los usuarios", peso: 1 },
];

const factoresAmbiente = [
  { codigo: "F1", descripcion: "Familiaridad con el Proceso Unificado de Rational", peso: 1.5 },
  { codigo: "F2", descripcion: "Experiencia en el desarrollo de aplicaciones", peso: 0.5 },
  { codigo: "F3", descripcion: "Experiencia en Orientación a objetos", peso: 1 },
  { codigo: "F4", descripcion: "Capacidad del jefe del proyecto", peso: 0.5 },
  { codigo: "F5", descripcion: "Motivación", peso: 1 },
  { codigo: "F6", descripcion: "Estabilidad de los requerimientos", peso: 2 },
  { codigo: "F7", descripcion: "Personal a tiempo parcial", peso: -1 },
  { codigo: "F8", descripcion: "Lenguaje de programación difícil", peso: -1 },
];

const tiposActores = [
  { tipo: "Simple", factor: 1, descripcion: "Otro sistema con una interface de programa (API)" },
  { tipo: "Medio", factor: 2, descripcion: "Otro sistema que interactúa a través de un protocolo o una persona que interactúa a través de una interface textual" },
  { tipo: "Complejo", factor: 3, descripcion: "Una persona que interactúa a través de una interfaz gráfica" },
];

const tiposCasos = [
  { tipo: "Simple", factor: 5, descripcion: "Menor o igual que 3 transacciones" },
  { tipo: "Medio", factor: 10, descripcion: "De 4 a 7 transacciones" },
  { tipo: "Complejo", factor: 15, descripcion: "Mayor que 7 transacciones" },
];

const FormularioCasosUso = () => {
  const navigate = useNavigate();
  // Estado para actores y casos de uso
  const [actores, setActores] = useState({ Simple: 0, Medio: 0, Complejo: 0 });
  const [casos, setCasos] = useState({ Simple: 0, Medio: 0, Complejo: 0 });
  // Estado para factores técnicos y de ambiente
  const [tecnicos, setTecnicos] = useState(Array(factoresTecnicos.length).fill(0));
  const [ambiente, setAmbiente] = useState(Array(factoresAmbiente.length).fill(0));

  // Cálculos
  // 1. Puntos de Caso de Uso sin Ajustar (UCP)
  const calcularUCP = () => {
    const actoresTotal = Object.entries(actores).reduce((sum, [tipo, cantidad]) => {
      const factor = tiposActores.find(t => t.tipo === tipo)?.factor || 0;
      return sum + (cantidad * factor);
    }, 0);

    const casosTotal = Object.entries(casos).reduce((sum, [tipo, cantidad]) => {
      const factor = tiposCasos.find(t => t.tipo === tipo)?.factor || 0;
      return sum + (cantidad * factor);
    }, 0);

    return actoresTotal + casosTotal;
  };

  // 2. Factor de Complejidad Técnica (TFactor)
  const calcularTFactor = () => {
    const sumaFactores = tecnicos.reduce((sum, valor, idx) => {
      return sum + (valor * factoresTecnicos[idx].peso);
    }, 0);
    return 0.6 + (0.01 * sumaFactores);
  };

  // 3. Factor de Ambiente (EFactor)
  const calcularEFactor = () => {
    const sumaFactores = ambiente.reduce((sum, valor, idx) => {
      return sum + (valor * factoresAmbiente[idx].peso);
    }, 0);
    return 1.4 + (-0.03 * sumaFactores);
  };

  // 4. Puntos de Caso de Uso Ajustados
  const calcularUCPAjustados = () => {
    return calcularUCP() * calcularTFactor() * calcularEFactor();
  };

  // 5. Esfuerzo Total (horas-hombre)
  const calcularEsfuerzoTotal = () => {
    const factorProductividad = 20; // 20 horas por UCP es un valor estándar
    return calcularUCPAjustados() * factorProductividad;
  };

  // Estado para controlar la vista
  const [mostrarResultados, setMostrarResultados] = useState(false);

  // Valores calculados
  const ucp = calcularUCP();
  const tFactor = calcularTFactor();
  const eFactor = calcularEFactor();
  const ucpAjustados = calcularUCPAjustados();
  const esfuerzoTotal = calcularEsfuerzoTotal();

  if (mostrarResultados) {
    return (
      <ResultadosCasosUso
        ucp={ucp}
        tFactor={tFactor}
        eFactor={eFactor}
        ucpAjustados={ucpAjustados}
        esfuerzoTotal={esfuerzoTotal}
        onVolver={() => setMostrarResultados(false)}
      />
    );
  }

  // Renderizado
  return (
    <motion.div className="w-full h-full p-4 md:p-6">
      <div className="flex flex-col space-y-4 mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Modelo de Puntos de Caso de Uso</h1>
          <div className="flex space-x-3">
            <button
              onClick={() => setMostrarResultados(true)}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm font-medium flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Ver Resultados
            </button>
            <button
              onClick={() => navigate("/modelo")}
              className="flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors text-sm font-medium"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Menú Principal
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 h-[calc(100%-80px)]">
              {/* Bloque 1: Actores */}
        <section className="bg-white rounded-2xl shadow-lg p-4 border border-gray-200 h-full overflow-auto">
        <h2 className="text-xl font-bold mb-4">1. Peso de los Actores (PA)</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          {tiposActores.map((item, idx) => (
            <div key={item.tipo} className="flex flex-col items-center">
              <label className="font-medium mb-1">{item.tipo}</label>
              <input
                type="number"
                min={0}
                value={actores[item.tipo as keyof typeof actores]}
                onChange={e => setActores({ ...actores, [item.tipo]: Number(e.target.value) })}
                className="w-20 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-center"
              />
              <span className="text-xs text-gray-500 mt-1">Factor: {item.factor}</span>
            </div>
          ))}
        </div>
        <div className="overflow-x-auto">
          <table className="text-xs w-full border-collapse mt-2 bg-white rounded overflow-hidden">
            <thead>
              <tr className="bg-indigo-50">
                <th className="border border-gray-200 px-3 py-2 bg-indigo-100 text-indigo-800 font-medium">Tipo de Actor</th>
                <th className="border border-gray-200 px-3 py-2 bg-indigo-100 text-indigo-800 font-medium">Descripción</th>
                <th className="border border-gray-200 px-3 py-2 bg-indigo-100 text-indigo-800 font-medium">Factor</th>
              </tr>
            </thead>
            <tbody>
              {tiposActores.map(item => (
                <tr key={item.tipo}>
                  <td className="border border-gray-200 px-3 py-1.5">{item.tipo}</td>
                  <td className="border border-gray-200 px-3 py-1.5">{item.descripcion}</td>
                  <td className="border border-gray-200 px-3 py-1.5 text-center">{item.factor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

              {/* Bloque 2: Casos de Uso */}
        <section className="bg-white rounded-2xl shadow-lg p-4 border border-gray-200 h-full overflow-auto">
        <h2 className="text-xl font-bold mb-4">2. Peso de los Casos de Uso (PCU)</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          {tiposCasos.map((item, idx) => (
            <div key={item.tipo} className="flex flex-col items-center">
              <label className="font-medium mb-1">{item.tipo}</label>
              <input
                type="number"
                min={0}
                value={casos[item.tipo as keyof typeof casos]}
                onChange={e => setCasos({ ...casos, [item.tipo]: Number(e.target.value) })}
                className="w-20 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-center"
              />
              <span className="text-xs text-gray-500 mt-1">Factor: {item.factor}</span>
            </div>
          ))}
        </div>
        <div className="overflow-x-auto">
          <table className="text-xs w-full border-collapse mt-2 bg-white rounded overflow-hidden">
            <thead>
              <tr className="bg-indigo-50">
                <th className="border border-gray-200 px-3 py-2 bg-indigo-100 text-indigo-800 font-medium">Tipo de Caso de Uso</th>
                <th className="border border-gray-200 px-3 py-2 bg-indigo-100 text-indigo-800 font-medium">Descripción</th>
                <th className="border border-gray-200 px-3 py-2 bg-indigo-100 text-indigo-800 font-medium">Factor</th>
              </tr>
            </thead>
            <tbody>
              {tiposCasos.map(item => (
                <tr key={item.tipo}>
                  <td className="border border-gray-200 px-3 py-1.5">{item.tipo}</td>
                  <td className="border border-gray-200 px-3 py-1.5">{item.descripcion}</td>
                  <td className="border border-gray-200 px-3 py-1.5 text-center">{item.factor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

              {/* Bloque 3: Factores de Complejidad Técnica */}
        <section className="bg-white rounded-2xl shadow-lg p-4 border border-gray-200 h-full overflow-auto">
        <h2 className="text-xl font-bold mb-4">3. Factores de Complejidad Técnica (FCT)</h2>
        <div className="overflow-x-auto">
          <table className="text-xs w-full border-collapse bg-white rounded overflow-hidden">
            <thead>
              <tr className="bg-indigo-50">
                <th className="border border-gray-200 px-3 py-2 bg-indigo-100 text-indigo-800 font-medium">Código</th>
                <th className="border border-gray-200 px-3 py-2 bg-indigo-100 text-indigo-800 font-medium">Descripción</th>
                <th className="border border-gray-200 px-3 py-2 bg-indigo-100 text-indigo-800 font-medium">Peso</th>
                <th className="border border-gray-200 px-3 py-2 bg-indigo-100 text-indigo-800 font-medium">Valor Asignado</th>
                <th className="border border-gray-200 px-3 py-2 bg-indigo-100 text-indigo-800 font-medium">Valor del Factor</th>
              </tr>
            </thead>
            <tbody>
              {factoresTecnicos.map((item, idx) => (
                <tr key={item.codigo}>
                  <td className="border border-gray-200 px-3 py-1.5">{item.codigo}</td>
                  <td className="border border-gray-200 px-3 py-1.5">{item.descripcion}</td>
                  <td className="border border-gray-200 px-3 py-1.5 text-center">{item.peso}</td>
                  <td className="border border-gray-200 px-3 py-1.5 text-center">
                    <input
                      type="number"
                      min={0}
                      max={5}
                      value={tecnicos[idx]}
                      onChange={e => {
                        const copia = [...tecnicos];
                        copia[idx] = Number(e.target.value);
                        setTecnicos(copia);
                      }}
                      className="w-14 p-1 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-center"
                    />
                  </td>
                  <td className="border border-gray-200 px-3 py-1.5 text-center">{(item.peso * tecnicos[idx]).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

              {/* Bloque 4: Factores de Ambiente */}
        <section className="bg-white rounded-2xl shadow-lg p-4 border border-gray-200 h-full overflow-auto">
        <h2 className="text-xl font-bold mb-4">4. Factores de Ambiente (FA)</h2>
        <div className="overflow-x-auto">
          <table className="text-xs w-full border-collapse bg-white rounded overflow-hidden">
            <thead>
              <tr className="bg-indigo-50">
                <th className="border border-gray-200 px-3 py-2 bg-indigo-100 text-indigo-800 font-medium">Código</th>
                <th className="border border-gray-200 px-3 py-2 bg-indigo-100 text-indigo-800 font-medium">Descripción</th>
                <th className="border border-gray-200 px-3 py-2 bg-indigo-100 text-indigo-800 font-medium">Peso</th>
                <th className="border border-gray-200 px-3 py-2 bg-indigo-100 text-indigo-800 font-medium">Valor Asignado</th>
                <th className="border border-gray-200 px-3 py-2 bg-indigo-100 text-indigo-800 font-medium">Valor del Factor</th>
              </tr>
            </thead>
            <tbody>
              {factoresAmbiente.map((item, idx) => (
                <tr key={item.codigo}>
                  <td className="border border-gray-200 px-3 py-1.5">{item.codigo}</td>
                  <td className="border border-gray-200 px-3 py-1.5">{item.descripcion}</td>
                  <td className="border border-gray-200 px-3 py-1.5 text-center">{item.peso}</td>
                  <td className="border border-gray-200 px-3 py-1.5 text-center">
                    <input
                      type="number"
                      min={0}
                      max={5}
                      value={ambiente[idx]}
                      onChange={e => {
                        const copia = [...ambiente];
                        copia[idx] = Number(e.target.value);
                        setAmbiente(copia);
                      }}
                      className="w-14 p-1 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-center"
                    />
                  </td>
                  <td className="border border-gray-200 px-3 py-1.5 text-center">{(item.peso * ambiente[idx]).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      </div>

      {/* Sección de Resultados */}
     

      
    </motion.div>
  );
};

export default FormularioCasosUso;
