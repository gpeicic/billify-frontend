import React from 'react';
import { Container, Paper, Typography, Box, Link } from '@mui/material';
import Navbar from './Navbar'; // Import Navbar component
import './Contacts.css'; // Import CSS file

const Contacts = () => {
  return (
    <>
      <Navbar /> {/* Include Navbar */}
      <div className="contacts-background">
      
          <Paper elevation={5} className="contacts-paper" sx={{
          
            boxShadow: '20px 20px 10px rgba(100, 100, 100, 0.35),10px 20px 10px rgba(100, 100, 100, 0.35)'
          }}>
            <Box p={3} className="box">
              <Typography variant="h4" gutterBottom>
                Contact Us
              </Typography>
              <Typography variant="body1" paragraph>
                We'd love to hear from you! Whether you have a question about features, pricing, or anything else, our team is ready to answer all your questions.
              </Typography>
              <Typography variant="body1" paragraph>
                Email us at: <Link href="mailto:info@digitalreceipts.com">info@digitalreceipts.com</Link>
              </Typography>
              <Typography variant="body1" paragraph>
                Call us at: <Link href="tel:+1234567890">+123 456 7890</Link>
              </Typography>
              <Typography variant="body1" paragraph>
                Visit us at: Ulica Augusta Šenoe 45, 10290 Zaprešić, Croatia
              </Typography>
              <div className="map-container">
                <iframe
                  title="Google Maps"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2781.178190876703!2d15.80735941556861!3d45.85689217910664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4765d5c3c1c30bbd%3A0x400ad50862bd5f0!2sUlica%20Augusta%20%C5%A0enoe%2045%2C%2010290%20Zapre%C5%A1i%C4%87%2C%20Croatia!5e0!3m2!1sen!2sus!4v1633038936840!5m2!1sen!2sus"
                  width="600"
                  height="450"
                  
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </Box>
          </Paper>
       
      </div>
    </>
  );
};

export default Contacts;
