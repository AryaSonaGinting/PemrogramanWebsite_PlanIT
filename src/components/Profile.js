// src/components/Profile.js
import React, { useState } from 'react';
import './Profile.css'; // ← IMPORT CSS

const Profile = ({ user, onClose, onLogout, onSwitchToLogin }) => {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showHelpSupport, setShowHelpSupport] = useState(false);
  const [passwordData, setPasswordData] = useState({
    email: user.email || '',
    newPassword: '',
    reason: ''
  });

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
    if (!passwordData.newPassword) {
      alert('Password baru harus diisi!');
      return;
    }
    if (passwordData.newPassword.length < 6) {
      alert('Password baru minimal 6 karakter!');
      return;
    }
    if (!passwordData.reason) {
      alert('Alasan perubahan password harus diisi!');
      return;
    }

    alert('Permintaan perubahan password telah dikirim! Kami akan menghubungi Anda melalui email.');

    setShowChangePassword(false);
    setPasswordData({
      email: user.email || '',
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
    { icon: '🔒', text: 'Change Password', action: () => setShowChangePassword(!showChangePassword) },
    { icon: '❓', text: 'Help & Support', action: () => setShowHelpSupport(!showHelpSupport) }
  ];

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>Profile</h2>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>

      <div className="user-info">
        <div className="avatar">
          {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
        </div>
        <div className="user-details">
          <div className="user-name">{user.name || 'User'}</div>
          <div className="user-email">{user.email || 'user@example.com'}</div>
        </div>
      </div>

      <div className="menu-list">
        {menuItems.map((item, index) => (
          <div key={index} className="menu-item" onClick={item.action}>
            <div className="menu-icon">{item.icon}</div>
            <div className="menu-text">{item.text}</div>
          </div>
        ))}
      </div>

      {showChangePassword && (
        <div className="form-container">
          <div className="form-title">Change Password</div>
          <form onSubmit={handleChangePasswordSubmit}>
            
            <div className="form-group">
              <label>Email</label>
              <input 
                type="email"
                name="email"
                value={passwordData.email}
                onChange={handlePasswordChange}
                required
              />
            </div>

            <div className="form-group">
              <label>New Password</label>
              <input 
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                placeholder="Minimal 6 karakter"
                required
              />
            </div>

            <div className="form-group">
              <label>Reason</label>
              <textarea 
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
        <div className="help-box">
          <div className="help-title">Help & Support</div>
          <div className="help-content">
            Jika Anda mengalami masalah, silakan hubungi kami:
          </div>
          
          <div className="help-contact">
            📞 Telepon: 082374366653 <br />
            ✉️ Email: aryasgin27@gmail.com
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
