import {
  createContext,
  useContext,
  useMemo,
  useCallback,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout as logoutAction, login as loginAction } from '../slices/user.js';
import { setToken } from '../slices/jwt.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const isAuthenticated = !!useSelector((state) => state.user.value.username);
  const dispatch = useDispatch();
  const logout = useCallback(() => {
    localStorage.removeItem('userData');
    dispatch(setToken(null));
    dispatch(logoutAction());
  }, [dispatch]);

  const login = useCallback((userData) => {
    localStorage.setItem('userData', JSON.stringify(userData));
    dispatch(setToken(userData.token));
    dispatch(loginAction(userData.username));
  }, [dispatch]);
  const contextValue = useMemo(() => ({
    isAuthenticated,
    logout,
    login,
  }), [isAuthenticated, login, logout]);
  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
