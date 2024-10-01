import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Container, TextField, Button, Typography, Paper, Box, Alert, Grid } from '@mui/material';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/login', { email, password }, { withCredentials: false });
      setMessage('Login successful');
      setMessageType('success');
      axios.defaults.headers.common['Authorization'] = response.headers['authorization'];
      localStorage.setItem('token', response.headers['authorization']);
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

  const handleGoogleSignIn = (response) => {
    const idToken = response.credential;

    axios.post('http://localhost:8080/google/googleLogin', { idToken }, {
      withCredentials: false,
      headers: { 'Content-Type': 'application/json' },
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
            <Grid item xs={12} sm={6}
              sx={{
                backgroundColor:'black',
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

            {/* Right Side (Login Form) */}
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
                  Login
                </Typography>
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                  <TextField
                    variant="standard"
                    margin="normal"
                    required
                    fullWidth
                    label="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    autoFocus
                    InputProps={{ sx: { borderBottom: '1px solid black' } }}
                  />
                  <TextField
                    variant="standard"
                    margin="normal"
                    required
                    fullWidth
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    InputProps={{ sx: { borderBottom: '1px solid black' } }}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                      marginTop: 3,
                      backgroundColor: 'black',
                      color: 'white',
                      borderRadius: 0,
                      '&:hover': { backgroundColor: '#333' },
                    }}
                  >
                    Login
                  </Button>
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
                  {/* Button to go back to home page */}
                  
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </GoogleOAuthProvider>
  );
};

export default LoginPage;
