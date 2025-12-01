import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Dashboard from './components/Dashboard';

// Session Manager Utility (you can move this to a separate file later)
const SessionManager = {
  // Save user session
  login: (userData = {}) => {
    localStorage.setItem('planit-session', JSON.stringify({
      isLoggedIn: true,
      user: userData,
      loginTime: new Date().toISOString()
    }));
  },

  // Get current session
  getSession: () => {
    const session = localStorage.getItem('planit-session');
    return session ? JSON.parse(session) : null;
  },

  // Check if user is logged in
  isLoggedIn: () => {
    const session = SessionManager.getSession();
    if (!session) return false;
    
    // Optional: Check if session is expired (e.g., 7 days)
    const loginTime = new Date(session.loginTime);
    const now = new Date();
    const daysDiff = (now - loginTime) / (1000 * 60 * 60 * 24);
    
    if (daysDiff > 7) { // Session expires after 7 days
      SessionManager.logout();
      return false;
    }
    
    return session.isLoggedIn === true;
  },

  // Logout
  logout: () => {
    localStorage.removeItem('planit-session');
  },

  // Get user data
  getUser: () => {
    const session = SessionManager.getSession();
    return session ? session.user : null;
  }
};

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

  // Check if user is logged in using SessionManager
  useEffect(() => {
    if (SessionManager.isLoggedIn()) {
      setIsLoggedIn(true);
      setCurrentPage('dashboard');
    }
  }, []);

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  const handleLogin = () => {
    SessionManager.login(); // Create session
    setIsLoggedIn(true);
    setCurrentPage('dashboard');
  };

  const handleRegister = () => {
    SessionManager.login(); // Create session
    setIsLoggedIn(true);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    SessionManager.logout(); // Clear session
    setIsLoggedIn(false);
    setCurrentPage('landing');
  };

  if (isLoggedIn) {
    return <Dashboard onLogout={handleLogout} />;
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
       
