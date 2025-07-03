import React from 'react';
import '../styles/MainContainer.css';

interface MainContainerProps {
  children: React.ReactNode;
  className?: string;
}

const MainContainer: React.FC<MainContainerProps> = ({ children, className }) => {
  return (
    <div
      className={`main-container ${className || ''}`}
    >
      {children}
    </div>
  );
};

export default MainContainer;
