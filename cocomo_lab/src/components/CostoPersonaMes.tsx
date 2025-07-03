import React from 'react';

interface CostoPersonaMesProps {
  value?: string;
  onChange?: (value: string) => void;
}

const CostoPersonaMes: React.FC<CostoPersonaMesProps> = ({ value = '', onChange = () => {} }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div style={{ 
      marginBottom: '0.6rem', 
      border: '1px solid #90CAF9', 
      borderRadius: '6px', 
      padding: '0.5rem',
      background: 'rgba(187, 222, 251, 0.7)',
      boxShadow: '0 2px 4px rgba(0, 50, 100, 0.1)'
    }}>
      <h4 style={{ 
        margin: 0, 
        marginBottom: '0.3rem', 
        fontSize: '0.9rem', 
        borderBottom: '1px solid #64B5F6',
        paddingBottom: '0.2rem',
        color: '#01579B',
        fontWeight: 600
      }}>
        Costos
      </h4>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '0.5rem' 
      }}>
        <span style={{ 
          fontSize: '0.8rem', 
          fontWeight: 600,
          color: '#0b3b6b',
          textShadow: '0 1px 1px rgba(255,255,255,0.5)'
        }}>
          Costo Persona-Mes:
        </span>
        <input
          type="number"
          value={value}
          onChange={handleChange}
          style={{ 
            fontSize: '0.8rem', 
            padding: '2px 5px',
            width: '80px',
            background: '#E3F2FD',
            border: '1px solid #64B5F6',
            color: '#01579B',
            fontWeight: 500,
            borderRadius: '3px'
          }}
        />
      </div>
    </div>
  );
};

export default CostoPersonaMes;
