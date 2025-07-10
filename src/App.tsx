import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContenedorPrincipal from "./components/ContenedorPrincipal";
import PantallaBienvenida from "./components/PantallaBienvenida";
import PantallaNombreProyecto from "./components/PantallaNombreProyecto";
import PantallaSeleccionModelo from "./components/PantallaSeleccionModelo";
import TabsCocomo81 from "./components/FormularioCocomo81/TabsCocomo81";
import TabsCocomoII from "./components/FormularioCocomoII/TabsCocomoII"; // ✅ NUEVA IMPORTACIÓN
import FormularioCasosUso from "./components/FormularioCasosUso";

function AppRoutes() {
  return (
    <ContenedorPrincipal>
      <Routes>
        <Route path="/" element={<PantallaBienvenida />} />
        <Route path="/nombre" element={<PantallaNombreProyecto />} />
        <Route path="/modelo" element={<PantallaSeleccionModelo />} />
        <Route path="/cocomo81" element={<TabsCocomo81 />} />
        <Route path="/cocomoII" element={<TabsCocomoII />} /> {/* ✅ CAMBIO AQUÍ */}
        <Route path="/casos-uso" element={<FormularioCasosUso />} />
      </Routes>
    </ContenedorPrincipal>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
