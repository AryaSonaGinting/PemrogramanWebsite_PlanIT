// src/components/Dashboard.js
import React, { useState } from 'react';

const Dashboard = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const welcomeMessages = [
    {
      title: "Selamat datang di Planit",
      description: "Tempat kamu mengatur ide dan rencana besar hidupmu.",
      buttonText: "Next"
    },
    {
      title: "Mulailah dengan satu tugas kecil hari ini",
      description: "Lihat dampaknya besok 😊",
      buttonText: "Get Started"
    }
  ];

  const styles = {
    dashboard: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      padding: '2rem'
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

  const handleNext = () => {
    if (currentStep < welcomeMessages.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      console.log("Navigate to main dashboard");
    }
  };

  return (
    <div style={styles.dashboard}>
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