import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { calcularCocomo81 } from "../utils/cocomo81";
const FormularioCocomo81 = ({ onVolver }) => {
    const [inputs, setInputs] = useState({ kloc: 0, mode: "orgánico" });
    const [resultado, setResultado] = useState(null);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs((prev) => ({
            ...prev,
            [name]: name === "kloc" ? parseFloat(value) : value,
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const res = calcularCocomo81(inputs);
        setResultado(res);
    };
    return (_jsxs("div", { className: "max-w-md w-full bg-white p-6 rounded-2xl shadow-lg space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h2", { className: "text-2xl font-semibold text-gray-800", children: "COCOMO 81 - B\u00E1sico" }), _jsx("button", { onClick: onVolver, className: "text-sm text-blue-600 hover:underline", children: "\u2B05 Volver" })] }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block mb-1 text-sm font-medium", children: "Tama\u00F1o del proyecto (KLOC)" }), _jsx("input", { type: "number", name: "kloc", min: "0", step: "0.01", className: "w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring focus:ring-blue-300", value: inputs.kloc, onChange: handleChange, required: true })] }), _jsxs("div", { children: [_jsx("label", { className: "block mb-1 text-sm font-medium", children: "Modo del proyecto" }), _jsxs("select", { name: "mode", className: "w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring focus:ring-blue-300", value: inputs.mode, onChange: handleChange, children: [_jsx("option", { value: "org\u00E1nico", children: "Org\u00E1nico" }), _jsx("option", { value: "semiacoplado", children: "Semiacoplado" }), _jsx("option", { value: "empotrado", children: "Empotrado" })] })] }), _jsx("button", { type: "submit", className: "w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition", children: "Calcular estimaci\u00F3n" })] }), resultado && (_jsxs("div", { className: "bg-gray-100 p-4 rounded-xl text-sm text-gray-700 space-y-1", children: [_jsxs("p", { children: [_jsx("strong", { children: "Esfuerzo:" }), " ", resultado.esfuerzo, " personas-mes"] }), _jsxs("p", { children: [_jsx("strong", { children: "Duraci\u00F3n:" }), " ", resultado.tiempo, " meses"] }), _jsxs("p", { children: [_jsx("strong", { children: "Personas necesarias:" }), " ", resultado.personas] }), _jsxs("p", { children: [_jsx("strong", { children: "Costo estimado:" }), " S/. ", resultado.costo] })] }))] }));
};
export default FormularioCocomo81;
