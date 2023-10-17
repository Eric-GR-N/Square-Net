import React, { ReactNode } from 'react';

interface PageContainerProps{
  children: ReactNode;
  style?: React.CSSProperties;
}
export const PageContentContainer: React.FC<PageContainerProps> = ({ children, style }) => {
  return (
    <div style={style}>
      {children}
    </div>
  );
};