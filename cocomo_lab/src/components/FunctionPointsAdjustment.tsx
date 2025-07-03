import React, { useState } from 'react';

const functionTypes = [
  'Entradas Externas',
  'Salidas Externas',
  'Consultas Externas',
  'Archivos Lógicos Internos',
  'Archivos de Interfaz Externa',
];

const FunctionPointsAdjustment: React.FC = () => {
  const [language, setLanguage] = useState('');
  const [otherLang, setOtherLang] = useState('');
  const [isOther, setIsOther] = useState(false);
  const [multiplier, setMultiplier] = useState('');
  const [table, setTable] = useState(
    functionTypes.map(() => ({ Baja: '', Media: '', Alta: '' }))
  );
  const [equiv, setEquiv] = useState({ puntos: '', sloc: '' });

  const handleTableChange = (row: number, col: 'Baja' | 'Media' | 'Alta', value: string) => {
    const newTable = [...table];
    newTable[row][col] = value;
    setTable(newTable);
  };

  return (
    <div style={{ flex: 1, overflow: 'hidden', fontSize: '0.85rem' }}>
      <h3 style={{ fontSize: '1rem', marginBottom: '0.3rem' }}>Ajuste por Puntos de Función</h3>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <label style={{ fontSize: '0.85rem', whiteSpace: 'nowrap' }}>Lenguaje:
            <select
              className="compact-select"
              value={isOther ? '' : language}
              onChange={e => { setIsOther(false); setLanguage(e.target.value); }}
              disabled={isOther}
              style={{ marginLeft: '0.3rem', padding: '2px', maxWidth: '80px' }}
            >
              <option value="">Seleccionar</option>
              <option value="Java">Java</option>
              <option value="Python">Python</option>
              <option value="C#">C#</option>
              <option value="C++">C++</option>
            </select>
          </label>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', fontSize: '0.85rem' }}>
            <input
              type="checkbox"
              checked={isOther}
              onChange={e => setIsOther(e.target.checked)}
              style={{ marginRight: '0.2rem' }}
            /> Otro
          </label>
          
          {isOther && (
            <input
              type="text"
              className="compact-input"
              placeholder="Otro"
              value={otherLang}
              onChange={e => setOtherLang(e.target.value)}
              style={{ width: '70px', padding: '2px' }}
            />
          )}
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <label style={{ fontSize: '0.85rem', whiteSpace: 'nowrap' }}>
            Multiplicador:
            <input
              type="text"
              className="compact-input"
              value={multiplier}
              onChange={e => setMultiplier(e.target.value)}
              style={{ width: '40px', marginLeft: '0.3rem', padding: '2px' }}
            />
          </label>
        </div>
      </div>
      
      <table className="compact-table" style={{ width: '100%', marginBottom: '0.5rem', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
        <thead>
          <tr>
            <th style={{ padding: '2px', fontSize: '0.8rem' }}>Tipos de Función</th>
            <th style={{ padding: '2px', width: '50px' }}>Baja</th>
            <th style={{ padding: '2px', width: '50px' }}>Media</th>
            <th style={{ padding: '2px', width: '50px' }}>Alta</th>
          </tr>
        </thead>
        <tbody>
          {functionTypes.map((type, rowIdx) => (
            <tr key={type} style={{ height: '20px' }}>
              <td style={{ padding: '1px 2px', fontSize: '0.75rem' }}>{type}</td>
              {(['Baja', 'Media', 'Alta'] as const).map(col => (
                <td key={col} style={{ padding: '1px' }}>
                  <input
                    type="number"
                    min="0"
                    className="compact-input"
                    value={table[rowIdx][col]}
                    onChange={e => handleTableChange(rowIdx, col, e.target.value)}
                    style={{ width: '35px', padding: '1px', margin: 0, textAlign: 'center' }}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
        <label style={{ whiteSpace: 'nowrap', fontSize: '0.8rem' }}>
          Puntos función total:
          <input
            type="text"
            className="compact-input"
            value={equiv.puntos}
            onChange={e => setEquiv({ ...equiv, puntos: e.target.value })}
            style={{ width: '50px', marginLeft: '0.3rem', padding: '2px' }}
          />
        </label>
        
        <label style={{ whiteSpace: 'nowrap', fontSize: '0.8rem' }}>
          SLOC:
          <input
            type="text"
            className="compact-input"
            value={equiv.sloc}
            onChange={e => setEquiv({ ...equiv, sloc: e.target.value })}
            style={{ width: '50px', marginLeft: '0.3rem', padding: '2px' }}
          />
        </label>
      </div>
      
      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-start' }}>
        <button type="button" style={{ padding: '3px 10px', fontSize: '0.8rem' }}>Calcular</button>
        <button type="button" style={{ padding: '3px 10px', fontSize: '0.8rem' }}>Limpiar</button>
      </div>
    </div>
  );
};

export default FunctionPointsAdjustment;
