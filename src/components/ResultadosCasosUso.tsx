import { motion } from "framer-motion";

interface ResultadosProps {
  ucp: number;
  tFactor: number;
  eFactor: number;
  ucpAjustados: number;
  esfuerzoTotal: number;
  onVolver: () => void;
}

export const ResultadosCasosUso = ({
  ucp,
  tFactor,
  eFactor,
  ucpAjustados,
  esfuerzoTotal,
  onVolver,
}: ResultadosProps) => {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center h-full p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="w-full max-w-4xl">
        <h1 className="text-2xl font-bold text-center mb-8">Resultados</h1>
        
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Métricas Principales</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Puntos de Caso de Uso sin Ajustar</p>
                  <p className="text-2xl font-bold text-indigo-600">{ucp.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Factor de Complejidad Técnica</p>
                  <p className="text-2xl font-bold text-blue-600">{tFactor.toFixed(4)}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Factor de Ambiente</p>
                  <p className="text-2xl font-bold text-purple-600">{eFactor.toFixed(4)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Puntos de Caso de Uso Ajustados</p>
                  <p className="text-2xl font-bold text-green-600">{ucpAjustados.toFixed(2)}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">Esfuerzo Total Estimado</p>
              <p className="text-3xl font-bold text-amber-600">{Math.round(esfuerzoTotal)} horas-hombre</p>
              <p className="text-xs text-gray-400 mt-1">Basado en un factor de productividad de 20 horas por UCP</p>
            </div>
          </div>
          
          <div className="flex justify-center mt-4">
            <button
              onClick={onVolver}
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
            >
              Volver al Formulario
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
