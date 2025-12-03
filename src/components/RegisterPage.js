import React, { useState } from 'react';
import './RegisterPage.css';

const RegisterPage = ({ onNavigate, onRegister }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const styles = {
    registerPage: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem'
    },
    registerContainer: {
      background: 'white',
      borderRadius: '20px',
      padding: '3rem',
      boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
      width: '100%',
      maxWidth: '450px',
      position: 'relative'
    },
    registerHeader: {
      textAlign: 'center',
      marginBottom: '2rem'
    },
    headerTitle: {
      color: '#333',
      fontSize: '2rem'
    },
    registerForm: {
      marginBottom: '1rem'
    },
    formGroup: {
      marginBottom: '1.5rem'
    },
    input: {
      width: '100%',
      padding: '1rem',
      border: '2px solid #e1e1e1',
      borderRadius: '10px',
      fontSize: '1rem',
      transition: 'border-color 0.3s ease'
    },
    btnPrimary: {
      background: '#667eea',
      color: 'white',
      border: 'none',
      padding: '1rem 2.5rem',
      borderRadius: '25px',
      cursor: 'pointer',
      fontWeight: '600',
      transition: 'all 0.3s ease'
    },
    btnFull: {
      width: '100%',
      padding: '1rem',
      fontSize: '1rem',
      marginBottom: '1.5rem'
    },
    formFooter: {
      textAlign: 'center'
    },
    footerText: {
      color: '#666'
    },
    link: {
      color: '#667eea',
      cursor: 'pointer',
      fontWeight: '600'
    },
    btnBack: {
      position: 'absolute',
      top: '1rem',
      left: '1rem',
      background: 'transparent',
      border: 'none',
      color: '#666',
      cursor: 'pointer',
      fontSize: '0.9rem'
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
  e.preventDefault();
  console.log('Register data:', formData);
  onRegister(formData);
  };

  return (
    <div style={styles.registerPage}>
      <div style={styles.registerContainer}>
        <div style={styles.registerHeader}>
          <h1 style={styles.headerTitle}>Register Now!</h1>
        </div>
        
        <form style={styles.registerForm} onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
              style={styles.input}
              onFocus={(e) => {
                e.target.style.borderColor = '#667eea';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e1e1e1';
              }}
            />
          </div>
          
          <div style={styles.formGroup}>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              style={styles.input}
              onFocus={(e) => {
                e.target.style.borderColor = '#667eea';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e1e1e1';
              }}
            />
          </div>
          
          <div style={styles.formGroup}>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              style={styles.input}
              onFocus={(e) => {
                e.target.style.borderColor = '#667eea';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e1e1e1';
              }}
            />
          </div>
          
          <div style={styles.formGroup}>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              style={styles.input}
              onFocus={(e) => {
                e.target.style.borderColor = '#667eea';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e1e1e1';
              }}
            />
          </div>
          
          <button 
            type="submit" 
            style={{...styles.btnPrimary, ...styles.btnFull}}
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
          
          <div style={styles.formFooter}>
            <p style={styles.footerText}>
              Have an account?{' '}
              <span 
                style={styles.link} 
                onClick={() => onNavigate('login')}
                onMouseEnter={(e) => {
                  e.target.style.textDecoration = 'underline';
                }}
                onMouseLeave={(e) => {
                  e.target.style.textDecoration = 'none';
                }}
              >
                Login
              </span>
            </p>
          </div>
        </form>
        
        <button 
          style={styles.btnBack} 
          onClick={() => onNavigate('landing')}
          onMouseEnter={(e) => {
            e.target.style.color = '#333';
          }}
          onMouseLeave={(e) => {
            e.target.style.color = '#666';
          }}
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;

