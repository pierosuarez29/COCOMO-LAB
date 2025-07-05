import React, { useState } from "react";
import ContenedorPrincipal from "./components/ContenedorPrincipal";
import PantallaBienvenida from "./components/PantallaBienvenida";
import PantallaNombreProyecto from "./components/PantallaNombreProyecto";
import PantallaSeleccionModelo from "./components/PantallaSeleccionModelo";
import FormularioCocomo81Elegante from "./components/FormularioCocomo81Elegante";
import FormularioCocomoII from "./components/FormularioCocomoII";


// Las demás importaciones vendrán después

function App() {
  const [pantalla, setPantalla] = useState<"inicio" | "nombre" | "modelo" | "formulario">("inicio");
  const [nombreProyecto, setNombreProyecto] = useState("");
  const [modelo, setModelo] = useState<"cocomo81" | "cocomoII" | "">("");

  return (
    <ContenedorPrincipal>
      {pantalla === "inicio" && (
        <PantallaBienvenida onContinuar={() => setPantalla("nombre")} />
      )}
      {pantalla === "nombre" && (
        <PantallaNombreProyecto
          onSiguiente={(nombre) => {
            setNombreProyecto(nombre);
            setPantalla("modelo");
          }}
          onVolver={() => setPantalla("inicio")}
        />
      )}
      {pantalla === "modelo" && (
        <PantallaSeleccionModelo
          nombreProyecto={nombreProyecto}
          onSeleccionarModelo={(modelo) => {
            setModelo(modelo);
            setPantalla("formulario");
          }}
          onVolver={() => setPantalla("nombre")}
        />
      )}{pantalla === "formulario" && modelo === "cocomo81" && (
        <FormularioCocomo81Elegante
          nombreProyecto={nombreProyecto}
          onVolver={() => setPantalla("modelo")}
        />
      )}
      {pantalla === "formulario" && modelo === "cocomoII" && (
        <FormularioCocomoII
          nombreProyecto={nombreProyecto}
          onVolver={() => setPantalla("modelo")}
        />
      )}
    </ContenedorPrincipal>
  );
}

export default App;
