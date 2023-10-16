import React, { FC } from 'react';
import './Button.css';

type ButtonProps = {
    text: string;
    type?: 'submit' | 'button';
    onClick?: () => void;
    className?: string;
    style?: React.CSSProperties;
}

export const Button: FC<ButtonProps> = ({ text, onClick, className, style, type }) => {
    return (
        <button 
            className={`custom-button ${className}`} 
            onClick={onClick}
            style={style}
            type={type}
        >
            {text}
        </button>
    );
}
