import axios from 'axios';
import React, {useEffect, useRef, useState} from 'react';
import {useFormik} from 'formik';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import routes from '../api/routes.js';
import {Navigate, useLocation, useNavigate} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setToken } from '../slices/jwt.js';
import { login } from '../slices/user.js';


export default function Login() {
    const isLoggedIn = useSelector((state) => state.user.value.isLoggedIn);
    const dispatch = useDispatch();
    let {state} = useLocation();
    const navigate = useNavigate();
    const redirectTo = state ? state.from.pathname : '/';


    const [authFailed, setAuthFailed] = useState(false);
    const userNameRef = useRef();
    const passwordRef = useRef();

    const loginFormik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        onSubmit: async (values) => {
            const authUrl = routes.loginPath();
            setAuthFailed(false);
            try {
                const response = await axios.post(authUrl, values);
                if (response.status === 200 && response.data.token) {
                    localStorage.setItem('token', response.data.token);
                    dispatch(setToken(response.data.token));
                    dispatch(login());
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

    if(isLoggedIn) {
        return <Navigate to={redirectTo} relace/>;
    }

    return <Form onSubmit={loginFormik.handleSubmit}>
        <Form.Group>
            <Form.Label htmlFor="username">Username</Form.Label>
            <Form.Control required isInvalid={authFailed} ref={userNameRef} type="text" id="username"
                          autoComplete="username" name="username" onChange={loginFormik.handleChange}
                          value={loginFormik.values.username}/>
        </Form.Group>
        <Form.Group>
            <Form.Label htmlFor="password">Password</Form.Label>
            <Form.Control required isInvalid={authFailed} ref={passwordRef} type="password" id="password"
                          autoComplete="current-password" name="password" onChange={loginFormik.handleChange}
                          value={loginFormik.values.password}/>
            <Form.Control.Feedback type="invalid">
                the username or password is incorrect
            </Form.Control.Feedback>
        </Form.Group>
        <Button type="submit">submit</Button>
    </Form>;
}
