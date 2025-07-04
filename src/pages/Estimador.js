import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import SelectorModelo from "../components/SelectorModelo";
import FormularioCocomo81 from "../components/FormularioCocomo81"; // Básico
import FormularioCocomo81Intermedio from "../components/FormularioCocomo81Intermedio"; // Intermedio
function App() {
    const [modelo, setModelo] = useState("");
    const [submodelo, setSubmodelo] = useState("");
    const handleSeleccion = (m, s) => {
        setModelo(m);
        setSubmodelo(s);
    };
    return (_jsx("main", { className: "min-h-screen w-full flex items-center justify-center bg-gray-100 p-4", children: !modelo || !submodelo ? (_jsx(SelectorModelo, { onSeleccion: handleSeleccion })) : modelo === "cocomo81" && submodelo === "basico" ? (_jsx(FormularioCocomo81, { onVolver: () => {
                setModelo("");
                setSubmodelo("");
            } })) : modelo === "cocomo81" && submodelo === "intermedio" ? (_jsx(FormularioCocomo81Intermedio, { onVolver: () => {
                setModelo("");
                setSubmodelo("");
            } })) : (_jsxs("div", { className: "text-center", children: [_jsx("p", { className: "text-gray-500", children: "Modelo a\u00FAn no implementado." }), _jsx("button", { className: "mt-4 bg-blue-500 text-white px-4 py-2 rounded", onClick: () => {
                        setModelo("");
                        setSubmodelo("");
                    }, children: "Volver" })] })) }));
}
export default App;
