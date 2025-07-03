import React from 'react';
import CostDriverSelect from './CostDriverSelect';
import '../styles/CostDriverGroup.css';

interface CostDriverGroupProps {
  title: string;
  drivers: { label: string; value: string; options: string[] }[];
  onChange: (idx: number, value: string) => void;
}

const CostDriverGroup: React.FC<CostDriverGroupProps> = ({ title, drivers, onChange }) => {
  return (
    <div className="cost-driver-group">
      <h4 className="cost-driver-group-header">
        {title}
      </h4>
      <div className="cost-driver-group-grid">
        {drivers.map((driver, idx) => (
          <CostDriverSelect
            key={driver.label}
            label={driver.label}
            value={driver.value}
            options={driver.options}
            onChange={val => onChange(idx, val)}
          />
        ))}
      </div>
    </div>
  );
};

export default CostDriverGroup;
