import React from 'react';

interface ProjectSizeSelectorProps {
  valueType: 'KLDC' | 'Puntos de función';
  value: string;
  onTypeChange: (type: 'KLDC' | 'Puntos de función') => void;
  onValueChange: (value: string) => void;
}

const ProjectSizeSelector: React.FC<ProjectSizeSelectorProps> = ({
  valueType,
  value,
  onTypeChange,
  onValueChange,
}) => {
  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <h3>Tamaño del proyecto</h3>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <label>
          <input
            type="radio"
            name="projectSizeType"
            checked={valueType === 'KLDC'}
            onChange={() => onTypeChange('KLDC')}
          />{' '}
          KLDC
        </label>
        <label>
          <input
            type="radio"
            name="projectSizeType"
            checked={valueType === 'Puntos de función'}
            onChange={() => onTypeChange('Puntos de función')}
          />{' '}
          Puntos de función
        </label>
        <input
          type="text"
          value={value}
          onChange={e => onValueChange(e.target.value)}
          placeholder={valueType === 'KLDC' ? 'KLDC' : 'Puntos de función'}
          style={{ marginLeft: '1rem', width: '120px' }}
        />
      </div>
    </div>
  );
};

export default ProjectSizeSelector;
