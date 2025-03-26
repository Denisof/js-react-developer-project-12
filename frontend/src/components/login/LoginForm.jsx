import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import routes from '../../api/routes.js';
import { useAuth } from '../AuthContext.jsx';
import instance from '../../api/client';

const LoginForm = () => {
  const { login } = useAuth();
  const { t } = useTranslation();
  const { state } = useLocation();
  const navigate = useNavigate();
  const redirectTo = state ? state.from.pathname : '/';
  const [authFailed, setAuthFailed] = useState(false);
  const userNameRef = useRef();
  const passwordRef = useRef();

  const loginFormik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      const authUrl = routes.loginPath();
      setAuthFailed(false);
      try {
        const response = await instance.post(authUrl, values);
        if (response.status === 200 && response.data.token) {
          login(response.data);
          navigate(redirectTo);
        }
      } catch (err) {
        loginFormik.setSubmitting(false);
        if (err.isAxiosError && err.response.status === 401) {
          setAuthFailed(true);
          userNameRef.current.select();
          return;
        }
        throw err;
      }
    },
  });
  useEffect(() => {
    if (userNameRef.current) {
      userNameRef.current.focus();
    }
  }, []);

  return (
    <Form onSubmit={loginFormik.handleSubmit}>
      <Form.Group>
        <Form.Label htmlFor="username">{t('login.fields.username')}</Form.Label>
        <Form.Control
          required
          isInvalid={authFailed}
          ref={userNameRef}
          type="text"
          id="username"
          autoComplete="username"
          name="username"
          onChange={loginFormik.handleChange}
          value={loginFormik.values.username}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="password">{t('login.fields.password')}</Form.Label>
        <Form.Control
          required
          isInvalid={authFailed}
          ref={passwordRef}
          type="password"
          id="password"
          autoComplete="current-password"
          name="password"
          onChange={loginFormik.handleChange}
          value={loginFormik.values.password}
        />
        <Form.Control.Feedback
          type="invalid"
          isInvalid={authFailed}
        >
          {t('login.login_error')}
        </Form.Control.Feedback>
      </Form.Group>
      <Button type="submit">{t('login.login')}</Button>
    </Form>
  );
};

export default LoginForm;
