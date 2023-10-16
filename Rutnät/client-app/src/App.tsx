import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './components/Home';
import { AuthProvider } from './components/auth/AuthContext/AuthContext';
import { RootComponent } from './components/auth/RootComponent';
import { RegisterPage } from './components/RegisterPage';
import { CallbackComponent } from './components/auth/CallbackComponent';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<RootComponent />} />
          <Route path="/callback" element={<CallbackComponent />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;

