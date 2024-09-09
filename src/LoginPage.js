import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Container, TextField, Button, Typography, Paper, Box, Alert } from '@mui/material';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'
  const navigate = useNavigate();

  // Handle regular email and password login
  const handleSubmit = async (e) => {
    console.log("Login");
    e.preventDefault();

    try {
      // Send credentials tyation
      const response = await axios.post('http://localhost:8080/login',
        { email, password }, 
        { withCredentials: false });

     

      setMessage('Login successful');
      setMessageType('success');
      axios.defaults.headers.common['Authorization'] = response.headers['authorization'];
      localStorage.setItem('token', response.headers['authorization']);
      // TODO Zamijenit s providerom
      console.log(response.headers['authorization']);
      localStorage.setItem('userEmail', email);
      localStorage.setItem('id', response.data.id);
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/accounts');
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data);
        setMessageType('error');
      } else {
        setMessage('An error occurred');
        setMessageType('error');
      }
    }
  };

  // Handle Google login
  const handleGoogleSignIn = (response) => {
    const idToken = response.credential;

    axios.post('http://localhost:8080/google/googleLogin', { idToken }, {
      withCredentials: false,
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      setMessage('Login successful');
      setMessageType('success');
      localStorage.setItem('userEmail', response.data.email);
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/accounts');
    })
    .catch(error => {
      setMessage('Failed to authenticate with Google');
      setMessageType('error');
    });
  };

  return (
    <GoogleOAuthProvider clientId="389794052046-ljvdmptj2f68mpofulk1ja6nn6ok88fg.apps.googleusercontent.com"> 
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
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
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
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ marginTop: 3 }}
            >
              Login
            </Button>
            {message && (
              <Box mt={2}>
                <Alert severity={messageType}>{message}</Alert>
              </Box>
            )}
          </form>
          <Box mt={2} textAlign="center">
            <hr style={{ width: '100%', marginBottom: '1rem' }} />
            <GoogleLogin
              onSuccess={handleGoogleSignIn}
              onError={() => {
                setMessage('Login Failed');
                setMessageType('error');
              }}
            />
            <Typography variant="body2" style={{ marginTop: '1rem' }}>
              Don't have an account? <Link to="/signup" style={{ color: 'green' }}>Sign Up</Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </GoogleOAuthProvider>
  );
};

export default LoginPage;
