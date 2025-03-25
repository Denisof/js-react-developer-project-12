import { createContext, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {logout as logoutAction, login as loginAction} from '../slices/user.js';
import { setToken } from '../slices/jwt.js';


const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const isAuthenticated = !!useSelector(state => state.user.value.username);
  const dispatch = useDispatch();
  const logout = () => {
    localStorage.removeItem('userData');
    dispatch(setToken(null));
    dispatch(logoutAction());
  }
  const login = (userData) => {
    localStorage.setItem('userData', JSON.stringify(userData));
    dispatch(setToken(userData.token));
    dispatch(loginAction(userData.username));
  }
  return (
    <AuthContext.Provider value={{ isAuthenticated, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
