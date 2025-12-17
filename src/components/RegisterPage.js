import React, { useState } from 'react';
import axios from 'axios';
import './RegisterPage.css';

const RegisterPage = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

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
    headerTitle: {
      color: '#333',
      marginBottom: '0.5rem',
      fontSize: '2rem',
      textAlign: 'center'
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
      boxSizing: 'border-box' // Ditambahkan agar padding tidak merusak lebar
    },
    btnPrimary: {
      background: '#667eea',
      color: 'white',
      border: 'none',
      padding: '1rem',
      borderRadius: '25px',
      cursor: 'pointer',
      width: '100%',
      fontWeight: '600',
      opacity: loading ? 0.7 : 1
    },
    errorMessage: {
      color: 'red',
      textAlign: 'center',
      marginBottom: '1rem'
    },
    successMessage: {
      color: 'green',
      textAlign: 'center',
      marginBottom: '1rem'
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 1. Validasi di Frontend (Opsional tapi bagus)
    if (formData.password.trim() !== formData.confirmPassword.trim()) {
      return setError('Password tidak cocok!');
    }

    setLoading(true);
    setError('');

    try {
      // --- PERBAIKAN: Mengirim confirmPassword agar diterima Backend ---
      const response = await axios.post('https://planit-backend-two.vercel.app/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword // INI YANG TADI KURANG
      });

      console.log('Registrasi Berhasil:', response.data);
      setSuccess(true);
      
      setTimeout(() => {
        onNavigate('login');
      }, 2000);

    } catch (err) {
      console.error('Registrasi Gagal:', err);
      // Menampilkan pesan error asli dari Backend kamu di Auth.js
      setError(err.response?.data?.msg || 'Registrasi gagal, coba email lain.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.registerPage}>
      <div style={styles.registerContainer}>
        <h1 style={styles.headerTitle}>Create Account</h1>
        
        {error && <p style={styles.errorMessage}>{error}</p>}
        {success && <p style={styles.successMessage}>Akun berhasil dibuat! Mengalihkan ke Login...</p>}

        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
              style={styles.input}
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
            />
          </div>
          
          <button type="submit" disabled={loading} style={styles.btnPrimary}>
            {loading ? 'Processing...' : 'Register Now'}
          </button>
        </form>

        <p style={{textAlign: 'center', marginTop: '1rem'}}>
          Already have an account?{' '}
          <span style={{color: '#667eea', cursor: 'pointer', fontWeight: 'bold'}} onClick={() => onNavigate('login')}>
            Login here
          </span>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;