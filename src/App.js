import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Dashboard from './components/Dashboard';

// Session Manager tetap sama, pastikan data 'id' ikut tersimpan
const SessionManager = {
  login: (userData) => {
    localStorage.setItem('planit-session', JSON.stringify({
      isLoggedIn: true,
      user: userData,
      loginTime: new Date().toISOString()
    }));
  },
  getSession: () => JSON.parse(localStorage.getItem('planit-session')),
  isLoggedIn: () => {
    const session = SessionManager.getSession();
    return session ? session.isLoggedIn : false;
  },
  logout: () => localStorage.removeItem('planit-session'),
  getUser: () => SessionManager.getSession()?.user || null
};

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (SessionManager.isLoggedIn()) {
      setIsLoggedIn(true);
      setCurrentPage('dashboard');
    }
  }, []);

  const handleLogin = (userDataFromBackend) => {
    // MENYIMPAN ID DARI NEON
    const userData = {
      id: userDataFromBackend.id, 
      name: userDataFromBackend.username,
      email: userDataFromBackend.email
    };
    SessionManager.login(userData);
    setIsLoggedIn(true);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    SessionManager.logout();
    setIsLoggedIn(false);
    setCurrentPage('landing');
  };

  if (isLoggedIn) {
    return <Dashboard onLogout={handleLogout} user={SessionManager.getUser()} />;
  }

  return (
    <div className="App">
      {currentPage === 'landing' && <LandingPage onNavigate={setCurrentPage} />}
      {currentPage === 'login' && <LoginPage onNavigate={setCurrentPage} onLogin={handleLogin} />}
      {currentPage === 'register' && <RegisterPage onNavigate={setCurrentPage} onRegister={handleLogin} />}
    </div>
  );
}

export default App;