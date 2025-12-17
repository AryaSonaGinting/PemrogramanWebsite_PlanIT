import React, { useState, useEffect } from 'react';

import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Dashboard from './components/Dashboard';

// Session Manager Utility
const SessionManager = {
  // Save user session
  login: (userData = {}) => {
    const defaultUser = {
      name: userData.name || 'User',
      email: userData.email || 'user@example.com',
      joinedDate: userData.joinedDate || new Date().toISOString()
    };

    localStorage.setItem(
      'planit-session',
      JSON.stringify({
        isLoggedIn: true,
        user: defaultUser,
        loginTime: new Date().toISOString()
      })
    );

    return defaultUser;
  },

  getSession: () => {
    const session = localStorage.getItem('planit-session');
    return session ? JSON.parse(session) : null;
  },

  isLoggedIn: () => {
    const session = SessionManager.getSession();
    if (!session) return false;

    const loginTime = new Date(session.loginTime);
    const now = new Date();
    const daysDiff = (now - loginTime) / (1000 * 60 * 60 * 24);

    if (daysDiff > 7) {
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
  },

  updateUser: (updates) => {
    const session = SessionManager.getSession();
    if (session && session.user) {
      const updatedUser = { ...session.user, ...updates };
      session.user = updatedUser;
      localStorage.setItem('planit-session', JSON.stringify(session));
      return updatedUser;
    }
    return null;
  }
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

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

// 1. Perbaiki handleLogin agar menyimpan ID dari backend
  const handleLogin = (userDataFromBackend) => {
    const userData = {
      id: userDataFromBackend.id, // <--- SANGAT PENTING: Ambil ID dari database
      name: userDataFromBackend.username, 
      email: userDataFromBackend.email,
      joinedDate: new Date().toISOString()
    };
    
    SessionManager.login(userData);
    setIsLoggedIn(true);
    setCurrentPage('dashboard');
  };

  // 2. Perbaiki bagian pengecekan login (Baris 114)
  if (isLoggedIn) {
    return (
      <Dashboard
        onLogout={handleLogout}
        onSwitchAccount={handleSwitchAccount}
        user={SessionManager.getUser()} // <--- TAMBAHKAN PROP USER DI SINI
      />
    );
  }
  const handleRegister = (formData) => {
    const userData = {
      name: formData.username || formData.name || 'User',
      email: formData.email || 'user@example.com',
      joinedDate: new Date().toISOString()
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

  const handleSwitchAccount = () => {
    SessionManager.logout();
    setIsLoggedIn(false);
    setCurrentPage('login');
  };

  if (isLoggedIn) {
    return (
      <Dashboard
        onLogout={handleLogout}
        onSwitchAccount={handleSwitchAccount}
      />
    );
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
