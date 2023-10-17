import React from 'react';
import { Link } from 'react-router-dom';
import { PageContainer } from '../layout/PageContainer';
import { loginUser } from '../../auth/authService';
import './LoginPage.css';

export const LoginPage: React.FC = () => {
  return (
    <PageContainer className="login-container">
      <div className="form-container">
      <h1 className="form-title">Welcome To Square Net!</h1>
        <div className='btn-wrapper'>
            <button className="btn-primary" onClick={loginUser}>Logga In</button>
            <Link to="/register" className="btn-link">
                <button className="btn-primary">Registrera</button>
            </Link>
        </div>
      </div>
    </PageContainer>
  );
};
