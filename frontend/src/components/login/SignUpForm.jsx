import instance from '../../api/client.js';
import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import routes from '../../api/routes.js';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useAuth } from '../AuthContext.jsx';
import { useTranslation } from 'react-i18next';

export default function LoginForm() {
  const { login, isAuthenticated } = useAuth();
  const { t } = useTranslation();

  let { state } = useLocation();
  const navigate = useNavigate();
  const redirectTo = state ? state.from.pathname : '/';

  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  const schema = yup.object().shape({
    username: yup.string().required(t('registration.form.errors.validation.usernameRequired'))
      .min(3, t('form.errors.validation.between_length', { min: 3, max: 20}))
      .max(20, t('form.errors.validation.between_length', { min: 3, max: 20})),
    password: yup.string().required(t('registration.form.errors.validation.passwordRequired'))
      .min(6, t("form.errors.validation.min_length", { count: 6 })),
    confirmPassword: yup
      .string()
      .required(t('registration.form.errors.validation.passwordConfirmationRequired'))
      .oneOf([yup.ref('password')], t('registration.form.errors.validation.passwordsMustMatch')),
  });

  const [authFailedMessage, setAuthFailedMessage] = useState('');
  const userNameRef = useRef();

  const loginFormik = useFormik({
    validationSchema: schema,
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: async (values, { setSubmitting }) => {
      const authUrl = routes.signUpPath();
      setAuthFailedMessage('');
      try {
        const response = await instance.post(authUrl, {
          username: values.username,
          password: values.password,
        });
        if (response.status === 201 && response.data.token) {
          login(response.data);
          navigate(redirectTo);
        }
      } catch (err) {
        setSubmitting(false);
        if (err.isAxiosError && err.response?.status === 409) {
          setAuthFailedMessage(t('registration.form.errors.validation.usernameAlreadyExists'));
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
    <Form noValidate onSubmit={loginFormik.handleSubmit}>
      <Form.Group>
        <Form.Control
          required
          isInvalid={loginFormik.touched.username && !!loginFormik.errors.username}
          ref={userNameRef}
          type="text"
          id="username"
          autoComplete="username"
          name="username"
          onChange={loginFormik.handleChange}
          onBlur={loginFormik.handleBlur}
          value={loginFormik.values.username}
          placeholder={t('registration.form.fields.username')}
        />
        <Form.Control.Feedback type="invalid">
          {loginFormik.errors.username}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Control
          required
          isInvalid={loginFormik.touched.password && !!loginFormik.errors.password}
          type="password"
          id="password"
          autoComplete="current-password"
          name="password"
          onChange={loginFormik.handleChange}
          onBlur={loginFormik.handleBlur}
          value={loginFormik.values.password}
          placeholder={t('registration.form.fields.password')}
        />
        <Form.Control.Feedback type="invalid">
          {loginFormik.errors.password}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Control
          required
          isInvalid={loginFormik.touched.confirmPassword && !!loginFormik.errors.confirmPassword}
          type="password"
          id="confirm-password"
          autoComplete="confirm-password"
          placeholder={t('registration.form.fields.passwordConfirmation')}
          name="confirmPassword"
          onChange={loginFormik.handleChange}
          onBlur={loginFormik.handleBlur}
          value={loginFormik.values.confirmPassword}
        />
        <Form.Control.Feedback type="invalid">
          {loginFormik.errors.confirmPassword}
        </Form.Control.Feedback>
      </Form.Group>
      {authFailedMessage && (
        <Form.Control.Feedback type="invalid" className="d-block">
          {authFailedMessage}
        </Form.Control.Feedback>
      )}
      <Button type="submit" disabled={loginFormik.isSubmitting}>{t('registration.form.buttons.submit')}</Button>
    </Form>
  );
}
