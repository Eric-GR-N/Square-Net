import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './components/Home';
import { AuthProvider } from './components/auth/AuthContext/AuthContext';
import { RootComponent } from './components/auth/RootComponent/RootComponent';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<RootComponent />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;

