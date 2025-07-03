import React from 'react';
import '../styles/CostDriverSelect.css';

interface CostDriverSelectProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

const CostDriverSelect: React.FC<CostDriverSelectProps> = ({ label, value, options, onChange }) => {
  return (
    <div className="cost-driver-select-container">
      <span className="cost-driver-select-label">
        {label}:
      </span>
      <select 
        className="cost-driver-select-dropdown compact-select"
        value={value} 
        onChange={e => onChange(e.target.value)}
      >
        {options.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
};

export default CostDriverSelect;
