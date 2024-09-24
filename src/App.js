import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Dodaj Navigate ovdje
import LoginPage from './LoginPage';
import AccountPage from './AccountPage'; 
import HomePage from './HomePage';
import SignUp from './SignUp';
import About from './About';
import Contacts from './Contacts';
import ProtectedRoute from './ProtectedRoute';
import { GoogleOAuthProvider } from '@react-oauth/google';

const App = () => {
  return (
    <GoogleOAuthProvider clientId="389794052046-ljvdmptj2f68mpofulk1ja6nn6ok88fg.apps.googleusercontent.com"> 
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/about" element={<ProtectedRoute element={<About />} />} />
          <Route path="/contacts" element={<ProtectedRoute element={<Contacts />} />} />
          <Route path="/accounts" element={<ProtectedRoute element={<AccountPage />} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
};

export default App;
