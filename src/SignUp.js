import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Container, TextField, Button, Typography, Paper, Box, Alert, CircularProgress, LinearProgress, Grid } from '@mui/material';
import { debounce } from 'lodash';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailValid, setEmailValid] = useState(null);
  const [passwordValid, setPasswordValid] = useState(null);
  const [passwordsMatch, setPasswordsMatch] = useState(null);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const navigate = useNavigate();

  // Regex for validating the email format
  const validateEmailFormat = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Debounced email check with useCallback to avoid re-creating the function
  const checkEmail = useCallback(
    debounce(async (email) => {
      if (email && validateEmailFormat(email)) {
        try {
          const response = await axios.get('http://localhost:8080/clients/check', {
            params: { email }
          });
          setEmailValid(response.data);
        } catch (error) {
          console.error(error);
          setEmailValid(false);
        }
      } else {
        setEmailValid(false); // Invalid email format or empty field
      }
    }, 500), []
  );

  // Only call the debounced email checker when the user stops typing
  useEffect(() => {
    if (email) {
      checkEmail(email);
    } else {
      setEmailValid(null);
    }
  }, [email, checkEmail]);

  // Password validation and strength check
  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const lengthValid = password.length >= 6;

    if (!password) {
      return null; // No validation if password is empty
    }

    setPasswordValid(lengthValid && hasUpperCase);

    // Password strength meter logic
    let strength = 0;
    if (lengthValid) strength += 50; // 50% strength if length is valid
    if (hasUpperCase) strength += 50; // Another 50% if it has an uppercase letter

    setPasswordStrength(strength);
  };

  useEffect(() => {
    if (passwordTouched) {
      validatePassword(password);
      setPasswordsMatch(password === confirmPassword);
    }
  }, [password, confirmPassword, passwordTouched]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Check if all validations pass before proceeding
    if (emailValid && passwordValid && passwordsMatch) {
      try {
        const client = {
          email: email,
          password: password
        };
        const response = await axios.post('http://localhost:8080/clients/register', client, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        setMessage('Registration successful!');
        setLoading(true);
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } catch (error) {
        if (error.response) {
          if (error.response.status === 400) {
            setMessage(error.response.data);
          } else {
            setMessage('An error occurred during registration');
          }
        } else {
          setMessage('An error occurred');
        }
        setLoading(false);
      }
    } else {
      setLoading(false);
      setMessage('Please fix the errors before submitting');
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <Paper
        sx={{
          display: 'flex',
          maxWidth: 800,
          margin: 'auto',
          marginTop: 8,
          boxShadow: 3,
          borderRadius: 0,
        }}
      >
        <Grid container>
          {/* Left Side (Sign Up Form) */}
          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                padding: '150px 30px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography component="h1" variant="h5">
                Sign Up
              </Typography>
              <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                <Box display="flex" alignItems="center" mb={2}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    autoFocus
                    error={emailValid === false}
                    helperText={emailValid === false && 'Invalid email format or already registered'}
                  />
                  {emailValid === true && <CheckCircleOutlineIcon color="success" />}
                  {emailValid === false && <HighlightOffIcon color="error" />}
                </Box>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setPasswordTouched(true); }}
                  autoComplete="new-password"
                  error={passwordTouched && passwordValid === false}
                  helperText={passwordTouched && passwordValid === false && 'Password must be at least 6 characters long and contain an uppercase letter'}
                />
                {passwordTouched && (
                  <Box mb={2}>
                    <Typography variant="body2">Password Strength</Typography>
                    <LinearProgress variant="determinate" value={passwordStrength} />
                  </Box>
                )}
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Confirm Password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="new-password"
                  error={passwordsMatch === false}
                  helperText={passwordsMatch === false && 'Passwords do not match'}
                />
                <Box display="flex" justifyContent="center" mt={2}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{
                      marginTop: 3,
                      backgroundColor: 'black',
                      color: 'white',
                      borderRadius: 0,
                      '&:hover': { backgroundColor: '#333' },
                    }}
                    disabled={!emailValid || !passwordValid || !passwordsMatch || loading}
                  >
                    {loading ? <CircularProgress size={24} /> : 'Register'}
                  </Button>
                </Box>
                <Box display="flex" justifyContent="center" mt={2}>
                  <Button
                    onClick={() => navigate('/')} // Navigate to home page
                    fullWidth
                    variant="contained" // Match the login button style
                    sx={{
                      marginTop: 2,
                      backgroundColor: 'black', // Same background color as login button
                      color: 'white', // Same text color as login button
                      borderRadius: 0, // Sharp corners
                      '&:hover': { backgroundColor: '#333' }, // Same hover effect
                    }}
                  >
                    Back to Home
                  </Button>
                </Box>
                {message && (
                  <Box mt={2}>
                    <Alert severity={message === 'Registration successful!' ? 'success' : 'error'}>
                      {message}
                    </Alert>
                  </Box>
                )}
              </form>
              <Box mt={2}>
                <Typography variant="body2">
                  Already have an account?{' '}
                  <Link to="/login" style={{ color: 'green' }}>
                    Login
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Right Side (Image) */}
          <Grid item xs={12} sm={6}
            sx={{
              backgroundColor: 'black',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              padding: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
            }}
          >
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default SignUp;
