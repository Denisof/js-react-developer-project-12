import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setToken } from './slices/jwt.js';
import { login } from './slices/user.js';
import Home from './components/Home';
import LoginPage from './components/LoginPage.jsx';
import NotFound from './components/NotFound';
import NavBar from './components/NavBar.jsx';
import {AuthProvider} from "./components/AuthContext.jsx";
import SignupPage from './components/SignUpPage.jsx';
import { ToastContainer } from 'react-toastify';
import ProtectedRoutesProxy from './components/ProtectedRoutesProxy';

const App = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const userData = localStorage.getItem('userData');

    if (userData !== null && userData !== undefined && userData !== "") {
      const { token, username } = JSON.parse(userData);
      dispatch(setToken(token));
      dispatch(login(username));
    }
    setIsLoading(false);
  }, [dispatch]);
  return !isLoading && (
    <div className="h-100">
        <BrowserRouter>
          <AuthProvider>
            <NavBar />
            <Container fluid="lg" id="main-content" className={'h-100'}>
              <Routes>
                <Route path="/" element={<ProtectedRoutesProxy />}>
                  <Route index element={<Home />} />
                </Route>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Container>
            <ToastContainer />
          </AuthProvider>
        </BrowserRouter>
    </div>
  );
};

export default App;
