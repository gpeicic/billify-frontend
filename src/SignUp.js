import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; // Import Link
import { Container, TextField, Button, Typography, Paper, Box, Alert, CircularProgress } from '@mui/material';
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
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Debounce funkcija za provjeru emaila
  const checkEmail = debounce(async (email) => {
    if (email) {
      try {
        const response = await axios.get('http://localhost:8080/kupci/check', {
          params: { email }
        });
        setEmailValid(response.data);
      } catch (error) {
        console.error(error);
      }
    } else {
      setEmailValid(null);
    }
  }, 500);

  // Provjera emaila kad se promijeni
  useEffect(() => {
    checkEmail(email);
  }, [email, checkEmail]); // Dodajemo checkEmail kao zavisnost

  // Provjera valjanosti lozinke i usklađenosti lozinki
  useEffect(() => {
    setPasswordValid(password.length >= 6);
    setPasswordsMatch(password === confirmPassword);
  }, [password, confirmPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Ponovno provjeri email validaciju prije slanja zahtjeva za registraciju
    try {
      const response = await axios.get('http://localhost:8080/kupci/check', {
        params: { email }
      });
      if (!response.data) {
        setEmailValid(false);
        setMessage('Email is already registered');
        setLoading(false);
        return;
      }
    } catch (error) {
      console.error(error);
      setMessage('An error occurred while checking email');
      setLoading(false);
      return;
    }

    if (emailValid && passwordValid && passwordsMatch) {
      try {
        const kupac = {
          email: email,
          lozinka: password
        };
        await axios.post('http://localhost:8080/kupci/register', kupac, {
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
          setMessage(error.response.data);
        } else {
          setMessage('An error occurred');
        }
        setLoading(false);
      }
    } else {
      setLoading(false); // Ovdje ispravite stanje učitavanja
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        sx={{
          padding: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: 400,
          margin: 'auto',
          marginTop: 8,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit}>
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
              helperText={emailValid === false && 'Email is already registered'}
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
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            error={passwordValid === false}
            helperText={passwordValid === false && 'Password must be at least 6 characters long'}
          />
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
              sx={{ marginTop: 3 }}
              disabled={!emailValid || !passwordValid || !passwordsMatch || loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Register'}
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
            <Link to="/" style={{ color: 'green' }}>
              Login
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default SignUp;
