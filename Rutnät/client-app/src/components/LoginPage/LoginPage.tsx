import React from 'react';
import { Link } from 'react-router-dom';
import { colorPalette } from '../../styles/colorPalette';
import { PageContainer } from '../layout/PageContainer';
import { loginUser } from '../../auth/authService';

export const LoginPage: React.FC = () => {

const inputStyle: React.CSSProperties = {
    display: 'inline-block',
    fontSize: 20,
    width: '100%',
    marginTop: 20,
    borderRadius: '25px',
    border: 'none',
    outline: 'none',
    textAlign: 'center',
    fontFamily: 'Dancing Script, cursive',
    padding: 5,
};

const inputTextStyle: React.CSSProperties = {
    display: 'inline-block',
    padding: '10px 30px',
    cursor: 'pointer',
    color: '#fff',
    fontFamily: 'Dancing Script, cursive',
    fontSize: 30,
    maxWidth: 'fit-content',
    marginTop: 20,
    letterSpacing: '0.05em', 
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
};

const buttonStyle: React.CSSProperties = {
    display: 'inline-block',
    padding: '10px 30px',
    cursor: 'pointer',
    backgroundColor: colorPalette.red,
    color: '#fff',
    borderRadius: '25px',
    border: 'none',
    outline: 'none',
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
    transition: 'background-color 0.2s ease',
    fontFamily: 'Dancing Script, cursive',
    fontSize: 25,
    marginTop: 40
};

  return (
    <PageContainer>
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '30%',
            width: '60%'
            }}>
        <button style={buttonStyle} onClick={loginUser}>
            Logga In
        </button>
        <Link to="/register">
        <button style={buttonStyle}>
            Registrera
        </button>
        </Link>
      </div>
    </PageContainer>
  );
};
