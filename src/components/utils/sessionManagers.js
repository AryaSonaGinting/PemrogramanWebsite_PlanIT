export const SessionManager = {
  login: (userData = {}) => {

    const defaultUser = {
      name: userData.name || 'User',
      email: userData.email || 'user@example.com',
      joinedDate: userData.joinedDate || new Date().toISOString()
    };
    
    localStorage.setItem('planit-session', JSON.stringify({
      isLoggedIn: true,
      user: defaultUser,
      loginTime: new Date().toISOString()
    }));
    
    return defaultUser;
  },

  getSession: () => {
    const session = localStorage.getItem('planit-session');
    return session ? JSON.parse(session) : null;
  },

  isLoggedIn: () => {
    const session = SessionManager.getSession();
    if (!session) return false;

    const loginTime = new Date(session.loginTime);
    const now = new Date();
    const daysDiff = (now - loginTime) / (1000 * 60 * 60 * 24);
    
    if (daysDiff > 7) {
      SessionManager.logout();
      return false;
    }
    
    return session.isLoggedIn === true;
  },

  logout: () => {
    localStorage.removeItem('planit-session');
  },

  getUser: () => {
    const session = SessionManager.getSession();
    return session ? session.user : null;
  },

  updateUser: (updates) => {
    const session = SessionManager.getSession();
    if (session && session.user) {
      const updatedUser = { ...session.user, ...updates };
      session.user = updatedUser;
      localStorage.setItem('planit-session', JSON.stringify(session));
      return updatedUser;
    }
    return null;
  }
};
