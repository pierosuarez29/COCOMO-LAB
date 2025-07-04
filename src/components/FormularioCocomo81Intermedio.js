import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { calcularCocomo81Intermedio } from "../utils/cocomo81";
import { cocomo81CostDrivers } from "../data/cocomo81Factors";
const niveles = ["Muy Bajo", "Bajo", "Nominal", "Alto", "Muy Alto", "Extra Alto"];
const FormularioCocomo81Intermedio = ({ onVolver }) => {
    const [inputs, setInputs] = useState({ kloc: 0, mode: "orgánico" });
    const [factores, setFactores] = useState({});
    const [resultado, setResultado] = useState(null);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs((prev) => ({
            ...prev,
            [name]: name === "kloc" ? parseFloat(value) : value,
        }));
    };
    const handleFactorChange = (id, value) => {
        setFactores((prev) => ({ ...prev, [id]: value }));
    };
    const calcularFEC = () => {
        return cocomo81CostDrivers.reduce((acc, factor) => {
            const seleccion = factores[factor.id] || "Nominal";
            const multiplicador = factor.niveles.find((n) => n.nivel === seleccion)?.valor || 1;
            return acc * multiplicador;
        }, 1);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const fec = calcularFEC();
        const res = calcularCocomo81Intermedio({ ...inputs, fec });
        setResultado(res);
    };
    return (_jsxs("div", { className: "max-w-3xl w-full bg-white p-6 rounded-2xl shadow-lg space-y-6 overflow-hidden", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h2", { className: "text-2xl font-semibold text-gray-800", children: "COCOMO 81 - Intermedio" }), _jsx("button", { onClick: onVolver, className: "text-sm text-blue-600 hover:underline", children: "\u2B05 Volver" })] }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4 max-h-[70vh] overflow-auto pr-2", children: [_jsxs("div", { className: "flex gap-4", children: [_jsxs("div", { className: "w-1/2", children: [_jsx("label", { className: "block mb-1 text-sm font-medium", children: "Tama\u00F1o del proyecto (KLOC)" }), _jsx("input", { type: "number", name: "kloc", min: "0", step: "0.01", className: "w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring", value: inputs.kloc, onChange: handleChange, required: true })] }), _jsxs("div", { className: "w-1/2", children: [_jsx("label", { className: "block mb-1 text-sm font-medium", children: "Modo del proyecto" }), _jsxs("select", { name: "mode", className: "w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring", value: inputs.mode, onChange: handleChange, children: [_jsx("option", { value: "org\u00E1nico", children: "Org\u00E1nico" }), _jsx("option", { value: "semiacoplado", children: "Semiacoplado" }), _jsx("option", { value: "empotrado", children: "Empotrado" })] })] })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: cocomo81CostDrivers.map((factor) => (_jsxs("div", { children: [_jsx("label", { className: "block mb-1 text-sm font-medium", children: factor.nombre }), _jsx("select", { className: "w-full px-3 py-2 border rounded-xl focus:outline-none", value: factores[factor.id] || "Nominal", onChange: (e) => handleFactorChange(factor.id, e.target.value), children: factor.niveles.map((n) => (_jsxs("option", { value: n.nivel, children: [n.nivel, " (", n.valor, ")"] }, n.nivel))) })] }, factor.id))) }), _jsx("button", { type: "submit", className: "w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition", children: "Calcular estimaci\u00F3n" })] }), resultado && (_jsxs("div", { className: "bg-gray-100 p-4 rounded-xl text-sm text-gray-700 space-y-1", children: [_jsxs("p", { children: [_jsx("strong", { children: "Esfuerzo:" }), " ", resultado.esfuerzo, " personas-mes"] }), _jsxs("p", { children: [_jsx("strong", { children: "Duraci\u00F3n:" }), " ", resultado.tiempo, " meses"] }), _jsxs("p", { children: [_jsx("strong", { children: "Personas necesarias:" }), " ", resultado.personas] }), _jsxs("p", { children: [_jsx("strong", { children: "Costo estimado:" }), " S/. ", resultado.costo] })] }))] }));
};
export default FormularioCocomo81Intermedio;
