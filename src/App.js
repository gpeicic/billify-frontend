import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './LoginPage';
import AccountPage from './AccountPage'; 
import SignUp from './SignUp';
import About from './About';
import Contacts from './Contacts';

import { GoogleOAuthProvider } from '@react-oauth/google';


const App = () => {
  return (
  <GoogleOAuthProvider clientId="389794052046-ljvdmptj2f68mpofulk1ja6nn6ok88fg.apps.googleusercontent.com"> 
    <Router>
      <Routes>
      
          <Route path="/" element={<LoginPage />} />
          
               
          <Route path="/accounts" element={<AccountPage />} />
          
        
          <Route path="*" element={<Navigate to="/" />} />
        
        <Route path="/signUp" element={<SignUp />}/>
        <Route path="/about" element={<About />} />
        <Route path="/contacts" element={<Contacts />} />
      </Routes>
    </Router>
  </GoogleOAuthProvider>
  );
};

export default App;
