import { motion } from "framer-motion";

interface Props {
  nombreProyecto: string;
  onSeleccionarModelo: (modelo: "cocomo81" | "cocomoII") => void;
  onVolver: () => void;
}

const PantallaSeleccionModelo = ({ nombreProyecto, onSeleccionarModelo, onVolver }: Props) => {
  return (
    <motion.div
      className="flex flex-col h-full justify-center items-center text-center space-y-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl font-bold text-gray-800 tracking-tight">COCOMO-LAB</h1>
      <p className="text-gray-600 text-lg">Estima el costo de tu proyecto de manera rápida y fácil</p>

      <div className="space-y-2">
        <p className="text-xl font-semibold text-indigo-700">{nombreProyecto}</p>
        <p className="text-sm text-gray-600">Elige la versión que deseas usar</p>
      </div>

      <div className="flex gap-6 mt-4">
        <button
          onClick={() => onSeleccionarModelo("cocomo81")}
          className="px-6 py-3 w-40 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition font-semibold cursor-pointer"
        >
          COCOMO 81
        </button>
        <button
          onClick={() => onSeleccionarModelo("cocomoII")}
          className="px-6 py-3 w-40 bg-neutral-700 text-white rounded-xl hover:bg-neutral-800 transition font-semibold cursor-pointer"
        >
          COCOMO II
        </button>
      </div>

      <button
        onClick={onVolver}
        className="text-sm text-blue-600 hover:underline mt-4 cursor-pointer"
      >
        ⬅ Volver
      </button>
    </motion.div>
  );
};

export default PantallaSeleccionModelo;
