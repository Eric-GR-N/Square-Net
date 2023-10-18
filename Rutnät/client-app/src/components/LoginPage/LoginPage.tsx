import React from 'react';
import { Link } from 'react-router-dom';
import { PageContainer } from '../layout/PageContainer';
import { loginUser } from '../../auth/authService';
import './LoginPage.css';

export const LoginPage: React.FC = () => {
  
  const renderColoredText = (text: string) => {
    return Array.from(text).map((letter, index) => (
      <span key={index}>{letter}</span>
    ));
  };

  return (
    <PageContainer className="login-container">
      <div className="form-container">
        <h1 className="form-title">
          {renderColoredText("Welcome To Square Net!")}
        </h1>
        <div className='btn-wrapper'>
            <button className="btn-primary" onClick={loginUser}>Log in</button>
            <Link to="/register" className="btn-link">
                <button className="btn-primary">Register</button>
            </Link>
        </div>
      </div>
    </PageContainer>
  );
};

