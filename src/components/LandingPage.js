// src/components/LandingPage.js
import React from 'react';

const LandingPage = ({ onNavigate }) => {
  const styles = {
    landingPage: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white'
    },
    landingHeader: {
      padding: '1.5rem 0'
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    logo: {
      fontSize: '2rem',
      fontWeight: 'bold'
    },
    navLinks: {
      display: 'flex',
      gap: '1rem'
    },
    btnLink: {
      background: 'transparent',
      border: '2px solid rgba(255, 255, 255, 0.3)',
      color: 'white',
      padding: '0.5rem 1.5rem',
      borderRadius: '25px',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    btnPrimary: {
      background: 'white',
      color: '#667eea',
      border: 'none',
      padding: '0.5rem 1.5rem',
      borderRadius: '25px',
      cursor: 'pointer',
      fontWeight: '600',
      transition: 'all 0.3s ease'
    },
    landingMain: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 'calc(100vh - 80px)',
      textAlign: 'center'
    },
    heroContent: {
      maxWidth: '800px'
    },
    heroTitle: {
      fontSize: '3rem',
      marginBottom: '2rem',
      lineHeight: '1.2'
    },
    ctaButtons: {
      display: 'flex',
      gap: '1rem',
      justifyContent: 'center',
      flexWrap: 'wrap'
    },
    btnLarge: {
      padding: '1rem 2.5rem',
      fontSize: '1.1rem'
    },
    btnSecondary: {
      background: 'transparent',
      border: '2px solid white',
      color: 'white',
      padding: '1rem 2.5rem',
      borderRadius: '25px',
      cursor: 'pointer',
      fontWeight: '600',
      transition: 'all 0.3s ease'
    }
  };

  return (
    <div style={styles.landingPage}>
      <header style={styles.landingHeader}>
        <div style={styles.container}>
          <h1 style={styles.logo}>PlanIt</h1>
          <nav style={styles.navLinks}>
            <button 
              style={styles.btnLink} 
              onClick={() => onNavigate('login')}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
              }}
            >
              Login
            </button>
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
          </nav>
        </div>
      </header>
      
      <main style={styles.landingMain}>
        <div style={styles.container}>
          <div style={styles.heroContent}>
            <h1 style={styles.heroTitle}>Aplikasi Manajemen Tugas Pintar untuk Produktivitas harian</h1>
            <div style={styles.ctaButtons}>
              <button 
                style={{...styles.btnPrimary, ...styles.btnLarge}}
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
                style={{...styles.btnSecondary, ...styles.btnLarge}}
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
        </div>
      </main>
    </div>
  );
};

export default LandingPage;