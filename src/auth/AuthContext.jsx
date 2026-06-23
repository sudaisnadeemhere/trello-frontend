import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('trello-lite-user');
    return stored ? JSON.parse(stored) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('trello-lite-token'));
  const [isReady, setIsReady] = useState(true);

  useEffect(() => {
    if (user) localStorage.setItem('trello-lite-user', JSON.stringify(user));
    else localStorage.removeItem('trello-lite-user');
  }, [user]);

  useEffect(() => {
    if (token) localStorage.setItem('trello-lite-token', token);
    else localStorage.removeItem('trello-lite-token');
  }, [token]);

  const login = (data) => {
    const { token: newToken, user: newUser } = data;
    localStorage.setItem('trello-lite-token', newToken);
    localStorage.setItem('trello-lite-user', JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
    setIsReady(true);
  };

  const logout = () => {
    localStorage.removeItem('trello-lite-token');
    localStorage.removeItem('trello-lite-user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isReady }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
