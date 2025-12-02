import React, { useState, useRef, useEffect, useCallback } from 'react';
import './Profile.css';

const Profile = ({ user, onClose, onLogout, onSwitchToLogin }) => {
  const { name, email } = user;
  
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showHelpSupport, setShowHelpSupport] = useState(false);
  const [passwordData, setPasswordData] = useState({
    email: email || '',
    newPassword: '',
    reason: ''
  });

  const profileRef = useRef(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showScrollBottom, setShowScrollBottom] = useState(false);

  const checkScrollPosition = useCallback(() => {
    if (profileRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = profileRef.current;
      setShowScrollTop(scrollTop > 100);
      setShowScrollBottom(scrollHeight > clientHeight && scrollTop < scrollHeight - clientHeight - 100);
    }
  }, []);

  const scrollToTop = () => {
    profileRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    profileRef.current?.scrollTo({ top: profileRef.current.scrollHeight, behavior: 'smooth' });
  };

  useEffect(() => {
    const profileElement = profileRef.current;
    if (profileElement) {
      profileElement.addEventListener('scroll', checkScrollPosition);
      requestAnimationFrame(checkScrollPosition);
    }

    return () => {
      if (profileElement) {
        profileElement.removeEventListener('scroll', checkScrollPosition);
      }
    };
  }, [checkScrollPosition]);

  useEffect(() => {
    requestAnimationFrame(checkScrollPosition);
  }, [showChangePassword, showHelpSupport, checkScrollPosition]);

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };

  const handleChangePasswordSubmit = (e) => {
    e.preventDefault();

    if (!passwordData.email) {
      alert('Email harus diisi!');
      return;
    }
    if (!passwordData.newPassword || passwordData.newPassword.length < 6) {
      alert('Password baru minimal 6 karakter dan harus diisi!');
      return;
    }
    if (!passwordData.reason) {
      alert('Alasan perubahan password harus diisi!');
      return;
    }

    alert('Permintaan perubahan password telah dikirim! Kami akan menghubungi Anda melalui email.');

    setShowChangePassword(false);
    setPasswordData({
      email: email || '',
      newPassword: '',
      reason: ''
    });
  };

  const handleSwitchAccount = () => {
    onClose();
    onSwitchToLogin();
  };

  const menuItems = [
    { icon: '🔄', text: 'Switch Account', action: handleSwitchAccount },
    { icon: '🔒', text: 'Change Password', action: () => setShowChangePassword(prev => !prev) },
    { icon: '❓', text: 'Help & Support', action: () => setShowHelpSupport(prev => !prev) }
  ];

  return (
    <div className="profile-container" ref={profileRef} role="complementary" aria-label="User Profile and Settings">
      
      <div className="scroll-buttons-wrapper">
        {showScrollTop && (
          <button 
            className="scroll-button scroll-top"
            onClick={scrollToTop}
            aria-label="Scroll to top"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
          </button>
        )}

        {showScrollBottom && (
          <button 
            className="scroll-button scroll-bottom"
            onClick={scrollToBottom}
            aria-label="Scroll to bottom"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        )}
      </div>

      <div className="profile-header">
        <h2>Profile</h2>
        <button className="close-btn" onClick={onClose} aria-label="Close Profile Sidebar">×</button>
      </div>

      <div className="user-info">
        <div className="avatar" aria-hidden="true">
          {name ? name.charAt(0).toUpperCase() : 'U'}
        </div>
        <div className="user-details">
          <div className="user-name">{name || 'User'}</div>
          <div className="user-email">{email || 'user@example.com'}</div>
        </div>
      </div>

      <nav className="menu-list" aria-label="Profile Menu">
        {menuItems.map((item, index) => (
          <div key={index} className="menu-item" onClick={item.action} role="button" tabIndex="0">
            <div className="menu-icon" aria-hidden="true">{item.icon}</div>
            <div className="menu-text">{item.text}</div>
          </div>
        ))}
      </nav>

      {showChangePassword && (
        <div className="form-container" role="region" aria-label="Change Password Form">
          <div className="form-title">Change Password</div>
          <form onSubmit={handleChangePasswordSubmit}>
            
            <div className="form-group">
              <label htmlFor="password-email">Email</label>
              <input 
                id="password-email"
                type="email"
                name="email"
                value={passwordData.email}
                onChange={handlePasswordChange}
                required
                aria-required="true"
                readOnly
                disabled
              />
            </div>

            <div className="form-group">
              <label htmlFor="newPassword">New Password</label>
              <input 
                id="newPassword"
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                placeholder="Minimal 6 karakter"
                required
                minLength="6"
              />
            </div>

            <div className="form-group">
              <label htmlFor="reason">Reason</label>
              <textarea 
                id="reason"
                name="reason"
                value={passwordData.reason}
                onChange={handlePasswordChange}
                placeholder="Jelaskan alasan Anda..."
                required
              />
            </div>

            <div className="button-group">
              <button type="button" className="btn-secondary" onClick={() => setShowChangePassword(false)}>
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                Submit Request
              </button>
            </div>
          </form>
        </div>
      )}

      {showHelpSupport && (
        <div className="help-box" role="region" aria-label="Help and Support Contact">
          <div className="help-title">Help & Support</div>
          <div className="help-content">
            Jika Anda mengalami masalah, silakan hubungi kami:
          </div>
          
          <div className="help-contact">
            📞 Telepon: <a href="tel:082374366653">082374366653</a> <br />
            ✉️ Email: <a href="mailto:aryasgin27@gmail.com">aryasgin27@gmail.com</a>
            <br /><br />
            <small><strong>Note:</strong> Kabari kami jika anda memiliki keluhan! ~Reactify</small>
          </div>

          <div className="button-group">
            <button className="btn-secondary" onClick={() => setShowHelpSupport(false)}>
              Close
            </button>
          </div>
        </div>
      )}

      <button className="logout-btn" onClick={onLogout}>
        Log out
      </button>      
    </div>
  );
};

export default Profile;
