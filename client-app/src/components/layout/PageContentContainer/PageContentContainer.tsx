import React, { ReactNode } from 'react';
import './PageContentContainer.css';

interface PageContainerProps{
  children: ReactNode;
}
export const PageContentContainer: React.FC<PageContainerProps> = ({ children }) => {
  return (
    <div className="page-content-container">
      {children}
    </div>
  );
};