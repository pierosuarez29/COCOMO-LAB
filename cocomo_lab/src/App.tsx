import React, { useState } from 'react';
import './App.css';
import {
  MainContainer,
  SectionContainer,
  ProjectSizeSelector,
  FunctionPointsAdjustment,
  CostDriversSection,
  CostoPersonaMes,
  ResultadosEstimacion
} from './components';

const App: React.FC = () => {
  // Estado para el selector de tamaño de proyecto
  const [projectType, setProjectType] = useState<'KLDC' | 'Puntos de función'>('KLDC');
  const [projectValue, setProjectValue] = useState('');

  return (
    <div className="app-container" style={{
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        padding: 0,
        margin: '0 auto',
        maxWidth: '1200px',
        position: 'relative',
        left: 0,
      }}
    >
      <div className="header" style={{
        background: 'linear-gradient(90deg, #1565C0, #0D47A1)',
        color: 'white',
        textShadow: '0 1px 2px rgba(0,0,0,0.3)',
        fontWeight: 600,
      }}>
        Simply COCOMO
      </div>
      <div style={{ flex: '1 1 0', minHeight: 0, minWidth: 0, padding: '0.3rem' }}>
        <MainContainer>
          {/* Sección izquierda: 48% del ancho */}
          <SectionContainer className="section" style={{ flex: '0 0 46%', marginRight: '0.5rem' }}>
            <ProjectSizeSelector
              valueType={projectType}
              value={projectValue}
              onTypeChange={setProjectType}
              onValueChange={setProjectValue}
            />
            <FunctionPointsAdjustment />
            <CostoPersonaMes />
          </SectionContainer>
          {/* Sección derecha: 52% del ancho */}
          <SectionContainer className="section" style={{ flex: '0 0 50%', marginLeft: '0.5rem' }}>
            <div style={{ display: 'flex', height: '100%', width: '100%', overflow: 'hidden' }}>
              {/* Lado izquierdo con conductores */}
              <div style={{ flex: '0 0 50%', marginRight: '0.3rem', overflowY: 'auto', overflowX: 'hidden', width: '100%' }}>
                <CostDriversSection />
              </div>
              {/* Lado derecho con resultados */}
              <div style={{ flex: '0 0 50%', marginLeft: '0.3rem', overflowY: 'auto', overflowX: 'hidden' }}>
                <ResultadosEstimacion />
              </div>
            </div>
          </SectionContainer>
        </MainContainer>
      </div>
    </div>
  );
};

export default App;
