// src/App.js
import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Dashboard from './components/Dashboard';

// Global styles
const appStyles = {
  '*': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
  },
  body: {
    backgroundColor: '#f5f5f5',
    color: '#333'
  },
  '.App': {
    minHeight: '100vh'
  }
};

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage('dashboard');
  };

  const handleRegister = () => {
    setIsLoggedIn(true);
    setCurrentPage('dashboard');
  };

  if (isLoggedIn) {
    return <Dashboard />;
  }

  return (
    <div className="App">
      {currentPage === 'landing' && (
        <LandingPage onNavigate={handleNavigation} />
      )}
      {currentPage === 'login' && (
        <LoginPage 
          onNavigate={handleNavigation} 
          onLogin={handleLogin}
        />
      )}
      {currentPage === 'register' && (
        <RegisterPage 
          onNavigate={handleNavigation} 
          onRegister={handleRegister}
        />
      )}
    </div>
  );
}

export default App;