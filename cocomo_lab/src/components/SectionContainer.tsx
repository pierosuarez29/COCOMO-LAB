import React from 'react';
import '../styles/SectionContainer.css';

interface SectionContainerProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

const SectionContainer: React.FC<SectionContainerProps> = ({ children, style, className }) => {
  return (
    <div
      className={`section-container ${className || ''}`}
      style={{...style}}
    >
      {children}
    </div>
  );
};

export default SectionContainer;
