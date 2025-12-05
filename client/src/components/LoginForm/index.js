import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Cookies from 'js-cookie';
import { useNavigate, Link } from 'react-router-dom';
import './index.css';

const LoginSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('jwt_token');
    if (token) {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  const handleLoginSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, { expires: 30 });
    navigate('/', { replace: true });
  };

  const handleLoginFailure = message => {
    setErrorMessage(message);
  };

  const handleSubmit = async values => {
    const baseUrl = process.env.REACT_APP_API_URL;
    const url = `${baseUrl}/api/auth/login`;
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = await response.json();

      if (response.ok) {
        handleLoginSuccess(data.jwtToken);
      } else {
        handleLoginFailure(data.errMsg || 'Invalid login credentials');
      }
    } catch (error) {
      handleLoginFailure('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="login-main-container">
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
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="styled-form">
              <div className="field-wrapper">
                <Field
                  autoComplete="name"
                  name="username"
                  placeholder="Username"
                  className="styled-field"
                  aria-label="Enter your username"
                />
                {errors.username && touched.username && (
                  <div className="error-message">{errors.username}</div>
                )}
              </div>

              <div className="password-wrapper">
                <Field
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  className="styled-field"
                  aria-label="Enter your password"
                />
                <span
                  className="password-toggle-icon"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '🙈' : '👁️'}
                </span>
                {errors.password && touched.password && (
                  <div className="error-message">{errors.password}</div>
                )}
              </div>

              {errorMessage && <p className="error-message">{errorMessage}</p>}

              <div className="forgot-password-link" onClick={() => alert('OTP sent to your registered email!')}>
                Forgot Password?
              </div>

              <button type="submit" className="submit-button">
                Login
              </button>
            </Form>
          )}
        </Formik>
        <div className="register-link">
          Don't have an account? <Link to="/register">Register here</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
