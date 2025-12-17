import React, { useState, useEffect } from 'react';
import TaskManager from './TaskManager';

const Dashboard = ({ onLogout, onSwitchAccount, user }) => {
  const [showMainDashboard, setShowMainDashboard] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('planit-hasSeenOnboarding');
    if (hasSeenOnboarding === 'true') setShowMainDashboard(true);
  }, []);

  const welcomeMessages = [
    { title: "Selamat datang di PlanIT!", description: "Tempat mengatur ide besar hidupmu.", buttonText: "Next >" },
    { title: "Mulailah satu tugas kecil", description: "Lihat dampaknya besok 😊", buttonText: "Get Started?" }
  ];

  const handleNext = () => {
    if (currentStep < welcomeMessages.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowMainDashboard(true);
      localStorage.setItem('planit-hasSeenOnboarding', 'true');
    }
  };

  // MENGIRIM DATA USER KE TASKMANAGER
  if (showMainDashboard) {
    return <TaskManager onLogout={onLogout} user={user} />;
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', textAlign: 'center' }}>
      <div>
        <h1>{welcomeMessages[currentStep].title}</h1>
        <p>{welcomeMessages[currentStep].description}</p>
        <button onClick={handleNext} style={{ padding: '10px 20px', borderRadius: '20px', border: 'none', cursor: 'pointer' }}>
          {welcomeMessages[currentStep].buttonText}
        </button>
      </div>
    </div>
  );
};

export default Dashboard;