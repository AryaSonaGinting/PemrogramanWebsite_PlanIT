// src/components/Dashboard.js (updated welcome screens section)
import React, { useState, useEffect } from 'react';
import TaskManager from './TaskManager';

const Dashboard = ({ onLogout, onSwitchAccount }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showMainDashboard, setShowMainDashboard] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  // Check if user has already completed onboarding
  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('planit-hasSeenOnboarding');
    if (hasSeenOnboarding === 'true') {
      setShowMainDashboard(true);
    }
  }, []);

  const welcomeMessages = [
    {
      title: "Selamat datang di PlanIT!",
      description: "Tempat kamu mengatur ide dan rencana besar hidupmu.",
      buttonText: "Next >"
    },
    {
      title: "Mulailah dengan satu tugas kecil hari ini",
      description: "Lihat dampaknya besok 😊",
      buttonText: "Get Started?"
    }
  ];

  const handleNext = () => {
    if (currentStep < welcomeMessages.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowMainDashboard(true);
      localStorage.setItem('planit-hasSeenOnboarding', 'true');
    }
  };

 if (showMainDashboard) {
  return <TaskManager onLogout={onLogout} onSwitchAccount={onSwitchAccount} />;
}

  const styles = {
    dashboard: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      padding: '2rem',
      position: 'relative'
    },
    profileButton: {
      position: 'absolute',
      top: '1rem',
      right: '1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      background: 'rgba(255, 255, 255, 0.2)',
      color: 'white',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      padding: '0.5rem 1rem',
      borderRadius: '25px',
      cursor: 'pointer',
      fontSize: '0.9rem',
      transition: 'all 0.3s ease'
    },
    avatarSmall: {
      width: '25px',
      height: '25px',
      borderRadius: '50%',
      background: 'white',
      color: '#667eea',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold',
      fontSize: '0.8rem'
    },
    welcomeContainer: {
      textAlign: 'center',
      maxWidth: '600px'
    },
    welcomeTitle: {
      fontSize: '3rem',
      marginBottom: '1.5rem',
      lineHeight: '1.2'
    },
    welcomeDescription: {
      fontSize: '1.5rem',
      marginBottom: '2.5rem',
      lineHeight: '1.5',
      opacity: '0.9'
    },
    btnPrimary: {
      background: 'white',
      color: '#667eea',
      border: 'none',
      padding: '1rem 2.5rem',
      borderRadius: '25px',
      cursor: 'pointer',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      fontSize: '1.2rem'
    }
  };

  return (
    <div style={styles.dashboard}>
      <button 
        style={styles.profileButton}
        onClick={() => setShowProfile(true)}
        onMouseEnter={(e) => {
          e.target.style.background = 'rgba(255, 255, 255, 0.3)';
        }}
        onMouseLeave={(e) => {
          e.target.style.background = 'rgba(255, 255, 255, 0.2)';
        }}
      >
        <div style={styles.avatarSmall}>
          U
        </div>
        <span>Profile</span>
      </button>
      
      <div style={styles.welcomeContainer}>
        <div style={styles.welcomeContent}>
          <h1 style={styles.welcomeTitle}>{welcomeMessages[currentStep].title}</h1>
          <p style={styles.welcomeDescription}>{welcomeMessages[currentStep].description}</p>
          <button 
            style={styles.btnPrimary}
            onClick={handleNext}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
          >
            {welcomeMessages[currentStep].buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
