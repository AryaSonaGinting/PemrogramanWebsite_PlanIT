import React, { useState } from 'react';
import axios from 'axios'; // <--- Kita panggil kurirnya
import './LoginPage.css';

const LoginPage = ({ onNavigate, onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // State untuk menangani pesan error/loading
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const styles = {
    loginPage: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem'
    },
    loginContainer: {
      background: 'white',
      borderRadius: '20px',
      padding: '3rem',
      boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
      width: '100%',
      maxWidth: '450px',
      position: 'relative'
    },
    loginHeader: {
      textAlign: 'center',
      marginBottom: '2rem'
    },
    headerTitle: {
      color: '#333',
      marginBottom: '0.5rem',
      fontSize: '2rem'
    },
    headerSubtitle: {
      color: '#666',
      fontSize: '0.9rem'
    },
    loginForm: {
      marginBottom: '1rem'
    },
    formTitle: {
      color: '#333',
      marginBottom: '1.5rem',
      textAlign: 'center',
      fontSize: '1.5rem'
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
      transition: 'all 0.3s ease',
      opacity: loading ? 0.7 : 1 // Efek transparan kalau loading
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
    },
    errorMessage: {
      color: 'red',
      textAlign: 'center',
      marginBottom: '1rem',
      fontSize: '0.9rem'
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Hapus pesan error saat user mengetik ulang
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Mulai loading
    setError('');

    try {
      // --- INI BAGIAN KONEKSI KE VERCEL ---
      const response = await axios.post('https://planit-backend-two.vercel.app/login', {
        email: formData.email,
        password: formData.password
      });

      console.log('Login Berhasil:', response.data);
      
      // Kirim data user yang asli ke App.js
      onLogin(response.data); 
      
      // Opsional: Langsung pindah halaman (kalau onLogin tidak handle navigasi)
      // onNavigate('dashboard'); 

    } catch (err) {
      console.error('Login Gagal:', err);
      // Tampilkan pesan error dari backend atau pesan default
      setError(err.response?.data?.msg || 'Email atau Password salah!');
    } finally {
      setLoading(false); // Selesai loading
    }
  };

  return (
    <div style={styles.loginPage}>
      <div style={styles.loginContainer}>
        <div style={styles.loginHeader}>
          <h1 style={styles.headerTitle}>Welcome Back!</h1>
          <p style={styles.headerSubtitle}>Please login to your account</p>
        </div>
        
        <form style={styles.loginForm} onSubmit={handleSubmit}>
          <h2 style={styles.formTitle}>Login</h2>

          {/* Menampilkan Error jika ada */}
          {error && <p style={styles.errorMessage}>{error}</p>}
          
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
          
          <button 
            type="submit" 
            disabled={loading} // Tombol mati saat loading
            style={{...styles.btnPrimary, ...styles.btnFull}}
            onMouseEnter={(e) => {
              if(!loading) {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
              }
            }}
            onMouseLeave={(e) => {
              if(!loading) {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }
            }}
          >
            {loading ? 'Loading...' : 'Login'}
          </button>
          
          <div style={styles.formFooter}>
            <p style={styles.footerText}>
              Don't have an account?{' '}
              <span 
                style={styles.link} 
                onClick={() => onNavigate('register')}
                onMouseEnter={(e) => {
                  e.target.style.textDecoration = 'underline';
                }}
                onMouseLeave={(e) => {
                  e.target.style.textDecoration = 'none';
                }}
              >
                Register
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

export default LoginPage;