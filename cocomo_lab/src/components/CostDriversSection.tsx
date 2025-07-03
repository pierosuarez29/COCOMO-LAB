import React, { useState } from 'react';
import CostDriverGroup from './CostDriverGroup';
import '../styles/CostDriversSection.css';

const costDriverOptions = [
  'Muy Bajo', 'Bajo', 'Nominal', 'Alto', 'Muy Alto', 'Extra Alto'
];

const initialGroups = [
  {
    title: 'Producto',
    drivers: ['RDS', 'TBD', 'CPR', 'RUSE', 'DOC'],
  },
  {
    title: 'Personal',
    drivers: ['CAN', 'EAPL', 'CPRO', 'CPER', 'EPLA', 'ELP'],
  },
  {
    title: 'Plataforma',
    drivers: ['RIE', 'RMP', 'VMC'],
  },
  {
    title: 'Proyecto',
    drivers: ['UHS', 'RPL', 'DMS'],
  },
  {
    title: 'Conductores de escala',
    drivers: ['PREC', 'FLEX', 'RESL', 'TEAM', 'PMAT'],
  },
];

const CostDriversSection: React.FC = () => {
  const [groups, setGroups] = useState(
    initialGroups.map(g => ({
      title: g.title,
      drivers: g.drivers.map(label => ({
        label,
        value: 'Nominal',
        options: costDriverOptions,
      })),
    }))
  );

  const handleGroupChange = (groupIdx: number, driverIdx: number, value: string) => {
    const newGroups = [...groups];
    newGroups[groupIdx].drivers[driverIdx].value = value;
    setGroups(newGroups);
  };

  return (
    <div className="cost-drivers-section">
      <div className="cost-drivers-content">
        {groups.map((group, idx) => (
          <CostDriverGroup
            key={group.title}
            title={group.title}
            drivers={group.drivers}
            onChange={(driverIdx, value) => handleGroupChange(idx, driverIdx, value)}
          />
        ))}
      </div>
      <div className="cost-drivers-button-container">
        <button type="button" className="cost-drivers-save-button">Guardar</button>
      </div>
    </div>
  );
};

export default CostDriversSection;
