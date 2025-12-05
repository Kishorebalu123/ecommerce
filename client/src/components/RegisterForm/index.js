import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import './index.css';

const RegisterSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().min(4, 'Password is too short').required('Password is required'),
});

const RegisterForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [serverMessage, setServerMessage] = useState({ text: '', type: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleResponse = (message, isSuccess) => {
        setServerMessage({ text: message, type: isSuccess ? 'success' : 'error' });

        if (isSuccess) {
            setTimeout(() => {
                setServerMessage({ text: '', type: '' });
                navigate('/login', { replace: true });
            }, 2000);
        }
    };

    const handleSubmit = async (values, { resetForm }) => {
        setIsSubmitting(true);
        try {
            const { username, password } = values;
            const baseUrl = process.env.REACT_APP_API_URL;
            const url = `${baseUrl}/api/auth/register`;

            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();
            if (response.ok) {
                handleResponse(data.message || 'Registration successful!', true);
                resetForm();
            } else {
                handleResponse(data.message || 'Registration failed. Please try again.', false);
            }
        } catch (error) {
            handleResponse('An unexpected error occurred. Please try again later.', false);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="register-main-container">
            <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
                className="login-image"
                alt="website login"
            />
            <div className="form-container">
                <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
                    className="login-website-logo"
                    alt="website logo"
                />

                <Formik
                    initialValues={{ username: '', password: '' }}
                    validationSchema={RegisterSchema}
                    onSubmit={handleSubmit}
                >
                    {({ errors, touched }) => (
                        <Form className="styled-form">
                            <Field name="username" placeholder="Username" className="styled-field" />
                            {errors.username && touched.username && (
                                <div className="error-msg">{errors.username}</div>
                            )}

                            <div className="password-wrapper">
                                <Field
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Password"
                                    className="styled-field"
                                />
                                <button
                                    type="button"
                                    className="password-toggle-icon"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? '🙈' : '👁️'}
                                </button>
                            </div>
                            {errors.password && touched.password && (
                                <div className="error-msg">{errors.password}</div>
                            )}

                            {serverMessage.text && (
                                <p className={serverMessage.type === 'success' ? 'success-msg' : 'error-msg'}>
                                    {serverMessage.text}
                                </p>
                            )}

                            <button type="submit" className="submit-button" disabled={isSubmitting}>
                                {isSubmitting ? 'Registering...' : 'Register'}
                            </button>
                        </Form>
                    )}
                </Formik>

                <div>
                    Already have an account? <Link to="/login">Login here</Link>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
