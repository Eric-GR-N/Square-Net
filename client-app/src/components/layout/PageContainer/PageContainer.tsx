import React, { ReactNode } from 'react';
import './PageContainer.css';

interface PageContainerProps{
  children: ReactNode;
}
export const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
  return (
    <div className="page-container">
      {children}
    </div>
  );
};
