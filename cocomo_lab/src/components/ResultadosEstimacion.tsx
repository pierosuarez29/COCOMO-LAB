import React from 'react';
import '../styles/ResultadosEstimacion.css';

interface ResultadosEstimacionProps {
  // Puedo añadir props en el futuro para recibir los resultados calculados
}

const ResultadosEstimacion: React.FC<ResultadosEstimacionProps> = () => {
  return (
    <div className="resultados-container">
      {/* Sección de Resultados de la Estimación */}
      <div className="resultados-section">
        <h4 className="resultados-header">
          Resultado de la Estimación
        </h4>
        
        <table className="resultados-table">
          <tbody>
            <tr>
              <td className="resultados-label">Esfuerzo:</td>
              <td>
                <input 
                  type="text" 
                  readOnly 
                  className="resultados-input"
                />
              </td>
            </tr>
            <tr>
              <td className="resultados-label">Tiempo de Desarrollo:</td>
              <td>
                <input 
                  type="text" 
                  readOnly 
                  className="resultados-input" 
                />
              </td>
            </tr>
            <tr>
              <td className="resultados-label">Personal Promedio:</td>
              <td>
                <input 
                  type="text" 
                  readOnly 
                  className="resultados-input" 
                />
              </td>
            </tr>
            <tr>
              <td className="resultados-label">Productividad:</td>
              <td>
                <input 
                  type="text" 
                  readOnly 
                  className="resultados-input" 
                />
              </td>
            </tr>
            <tr>
              <td className="resultados-label">Costo Total:</td>
              <td>
                <input 
                  type="text" 
                  readOnly 
                  className="resultados-input" 
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Sección de Ecuaciones usadas */}
      <div className="resultados-section">
        <h4 className="resultados-header">
          Ecuaciones usadas
        </h4>
        
        <table className="resultados-table">
          <tbody>
            <tr>
              <td className="resultados-label">Esfuerzo:</td>
              <td>
                <input 
                  type="text" 
                  readOnly 
                  className="resultados-input" 
                />
              </td>
            </tr>
            <tr>
              <td className="resultados-label">Tiempo:</td>
              <td>
                <input 
                  type="text" 
                  readOnly 
                  className="resultados-input" 
                />
              </td>
            </tr>
            <tr>
              <td className="resultados-label">Personal:</td>
              <td>
                <input 
                  type="text" 
                  readOnly 
                  className="resultados-input" 
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultadosEstimacion;