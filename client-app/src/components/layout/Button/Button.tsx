import React, { FC } from 'react';
import './Button.css';

type ButtonProps = {
    text: string;
    onClick?: () => void;
    className?: string;
    style?: React.CSSProperties;
}

export const Button: FC<ButtonProps> = ({ text, onClick, className, style }) => {
    return (
        <button 
            className={`custom-button ${className}`} 
            onClick={onClick}
            style={style}
        >
            {text}
        </button>
    );
}
