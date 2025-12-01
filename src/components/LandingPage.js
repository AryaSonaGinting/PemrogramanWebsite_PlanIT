import React from 'react';

const LandingPage = ({ onNavigate }) => {
  const styles = {
    landingPage: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #18181aff 100%)',
      color: 'Black',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center'
    },
    logo: {
      fontSize: '4rem',
      fontWeight: 'bold',
      marginBottom: '1rem'
    },
    subtitle: {
      fontSize: '1.5rem',
      opacity: 0.9,
      marginBottom: '3rem',
      maxWidth: '800px',
      lineHeight: '1.5'
    },
    ctaButtons: {
      display: 'flex',
      gap: '1rem',
      justifyContent: 'center',
      flexWrap: 'wrap'
    },
    btnPrimary: {
      background: 'white',
      color: '#090a0cff',
      border: 'none',
      padding: '1rem 2.5rem',
      borderRadius: '25px',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '1.1rem',
      transition: 'all 0.3s ease'
    },
    btnSecondary: {
      background: 'transparent',
      border: '2px solid white',
      color: 'white',
      padding: '1rem 2.5rem',
      borderRadius: '25px',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '1.1rem',
      transition: 'all 0.3s ease'
    }
  };

  return (
    <div style={styles.landingPage}>
      <h1 style={styles.logo}>PlanIT</h1>
      <p style={styles.subtitle}>Smart Task Management Application for Daily Productivity</p>
      
      <div style={styles.ctaButtons}>
        <button 
          style={styles.btnPrimary}
          onClick={() => onNavigate('register')}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = 'none';
          }}
        >
          Register
        </button>
        <button 
          style={styles.btnSecondary}
          onClick={() => onNavigate('login')}
          onMouseEnter={(e) => {
            e.target.style.background = 'white';
            e.target.style.color = '#667eea';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'transparent';
            e.target.style.color = 'white';
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
