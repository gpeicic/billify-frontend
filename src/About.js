import React from 'react';
import { Container, Paper, Typography, Box } from '@mui/material';
import Navbar from './Navbar'; // Import Navbar component
import './About.css'; // Import CSS file

const About = () => {
  return (
    <>
      <Navbar /> {/* Include Navbar */}
      <div className="about-background">
       
          <Paper
            elevation={5}
            className="about-paper"
            sx={{
              marginTop: '200px',
              maxWidth: '800px',
              borderRadius: '0px',
              overflow: 'hidden',
              animation: 'fadeIn 1s ease-in-out',
              transition: 'transform 0.5s ease-in-out',
              paddingBottom: '100px',
              boxShadow: '30px 30px 40px rgba(100, 100, 100, 0.15), 30px 30px 10px rgba(100, 100, 100, 0.15)'
            }}
          >
            <Box p={3} className="box">
              <Typography variant="h4" gutterBottom>
                About Our Application
              </Typography>
              <Typography variant="body1" paragraph>
                Welcome to our digital receipt management application. Our platform helps you seamlessly digitize and organize your receipts, making it easier to track your expenses and manage your finances. Say goodbye to paper clutter and hello to a more efficient and eco-friendly way of handling receipts.
              </Typography>
              <Typography variant="body1" paragraph>
                With our user-friendly interface, you can easily upload, categorize, and search for receipts. Our advanced features include automatic data extraction, real-time expense tracking, and detailed analytics to help you gain insights into your spending habits.
              </Typography>
              <Typography variant="body1" paragraph>
                Join us in transforming the way you manage your receipts and take control of your financial health with our cutting-edge digital solution.
              </Typography>
            </Box>
          </Paper>
       
      </div>
    </>
  );
};

export default About;
