// src/utils/sessionManager.js (optional utility)
export const SessionManager = {
  // Save user session
  login: (userData) => {
    localStorage.setItem('planit-session', JSON.stringify({
      isLoggedIn: true,
      user: userData,
      loginTime: new Date().toISOString()
    }));
  },

  // Get current session
  getSession: () => {
    const session = localStorage.getItem('planit-session');
    return session ? JSON.parse(session) : null;
  },

  // Check if user is logged in
  isLoggedIn: () => {
    const session = SessionManager.getSession();
    if (!session) return false;
    
    // Optional: Check if session is expired (e.g., 7 days)
    const loginTime = new Date(session.loginTime);
    const now = new Date();
    const daysDiff = (now - loginTime) / (1000 * 60 * 60 * 24);
    
    if (daysDiff > 7) { // Session expires after 7 days
      SessionManager.logout();
      return false;
    }
    
    return session.isLoggedIn === true;
  },

  // Logout
  logout: () => {
    localStorage.removeItem('planit-session');
    localStorage.removeItem('planit-currentPage');
    // Note: We don't remove tasks so they persist
  },

  // Get user data
  getUser: () => {
    const session = SessionManager.getSession();
    return session ? session.user : null;
  }
};