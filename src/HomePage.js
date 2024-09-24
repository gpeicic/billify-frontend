import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Paper, Typography } from '@mui/material';
import { Pie, Line, Bar, Radar, PolarArea, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  RadialLinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';

import './HomePage.css';
ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  BarElement,
  RadialLinearScale, // Register RadialLinearScale for radar chart

);


// Register the necessary components
ChartJS.register(ArcElement, CategoryScale, LinearScale, LineElement, PointElement, BarElement, Tooltip, Legend);


// Typewriter animation
const Typewriter = ({ text, onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(index));
      index++;
      if (index === text.length) {
        clearInterval(interval);
        setTimeout(onComplete, 1000); // Delay before transition
      }
    }, 100);
    return () => clearInterval(interval);
  }, [text, onComplete]);

  return <h1 className="typewriter">{displayedText}</h1>;
};

// Sample data for charts


// Sample data for charts
const pieData = {
  labels: ['Rent', ' Food', 'Utilities', 'Entertainment'],
  datasets: [
    {
      data: [400, 300, 200, 100],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
    },
  ],
};

const lineData1 = {
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
  datasets: [
    {
      label: 'Weekly Expenses',
      data: [400, 300, 500, 200],
      fill: true,
      backgroundColor: 'rgba(0, 198, 255, 0.5)',
      borderColor: '#00c6ff',
      tension: 0.4,
    },
  ],
};

const lineData2 = {
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
  datasets: [
    {
      label: 'Investment Growth',
      data: [1000, 1200, 900, 1500],
      fill: true,
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      borderColor: '#FF6384',
      tension: 0.4,
    },
  ],
};

const barData = {
  labels: ['January', 'February', 'March'],
  datasets: [
    {
      label: 'Monthly Expenses',
      data: [2400, 1398, 9800],
      backgroundColor: '#36A2EB',
    },
  ],
};

const radarData = {
  labels: ['Market Risk', 'Credit Risk', 'Liquidity Risk', 'Operational Risk', 'Reputational Risk'],
  datasets: [
    {
      label: 'Risk Assessment',
      data: [70, 60, 90, 85, 80],
      backgroundColor: 'rgba(255, 206, 86, 0.5)',
      borderColor: '#FFCE56',
      borderWidth: 1,
    },
  ],
};

const polarAreaData = {
  labels: ['Risky Investment', 'High Interest', 'Market Downturn', 'Unexpected Expenses'],
  datasets: [
    {
      label: 'Financial Risks',
      data: [60, 40, 80, 50],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
    },
  ],
};

const doughnutData = {
  labels: ['Savings', 'Investments', 'Expenses'],
  datasets: [
    {
      data: [3000, 2000, 1000],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
    },
  ],
};
const HomePage = () => {
  const [showMainContent, setShowMainContent] = useState(false);

  const handleTypewriterComplete = () => {
    setShowMainContent(true);
  };

  return (
    <div>
      {!showMainContent ? (
        <div className="intro-screen">
          <Typewriter text="H ello Customer, Welcome" onComplete={handleTypewriterComplete} />
        </div>
      ) : (
        <>
          <nav className="futuristic-navbar">
            <div className="logo">Billify</div>
            <div className="button-group">
              <Link to="/login">
                <button className="login-button">Login</button>
              </Link>
              <Link to="/signup">
                <button className="signup-button">Sign Up</button>
              </Link>
            </div>
          </nav>
          <div className="home-content">
            <p className="lorem-text">
              You Probably Don’t Want to Look Like This While Managing Your Bills…<br /><br />
              That’s Where Billify Comes In!<br /><br />
              Why stress over bills like a malfunctioning robot? Billify simplifies your financial management by helping you:
              Track all your bills effortlessly, so you can focus on what truly matters. Monitor your spending on a weekly and monthly basis, giving you clear insights into your finances. Identify your savings without the hassle, because who wants to feel like a rusty, overworked machine? Download Billify today, and take control of your bills with ease and confidence!
            </p>
          </div>
          <div className="second-content">
            <div className="tekst">
              <h1 className="lorem-text-second">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.
              </h1>
              <h2 className="lorem-text-second">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </h2>
            </div>
            {/* Cards Section */}
          
          </div>
          <div className='third-content'>
          <Grid container spacing={2} style={{ marginTop: '20px' }}>
              {/* Pie Chart Card */}
              <Grid item xs={12} sm={4}>
                <Paper
                  elevation={3}
                  sx={{
                    padding: '20px',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                    height: '300px', // Set height to make it square
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#282c34',
                    border: 'none',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
                  }}
                >
                  <Typography variant="h6" align="center" style={{ color: '#00FF00' }}>Weekly Expenses</Typography>
                  <Pie data={pieData} options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'bottom',
                        labels: {
                          color: '#ffffff',
                        },
                      },
                    },
                  }} />
                </Paper>
              </Grid>

              {/* Line Chart Card 1 */}
              <Grid item xs={12} sm={4}>
                <Paper
                  elevation={3}
                  sx={{
                    padding: '20px',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                    height: '300px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#282c34',
                    border: 'none',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
                  }}
                >
                  <Typography variant="h6" align="center" style={{ color: '#00FF00' }}>Weekly Spending Trend</Typography>
                  <Line data={lineData1} options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      x: {
                        ticks: {
                          color: '#ffffff',
                        },
                      },
                      y: {
                        ticks: {
                          color: '#ffffff',
                        },
                      },
                    },
                    plugins: {
                      legend: {
                        labels: {
                          color: '#ffffff',
                        },
                      },
                    },
                  }} />
                </Paper>
              </Grid>

              {/* Line Chart Card 2 */}
              <Grid item xs={12} sm={4}>
                <Paper
                  elevation={3}
                  sx={{
                    padding: '20px',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                    height: '300px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#282c34',
                    border: 'none',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
                  }}
                >
                  <Typography variant="h6" align="center" style={{ color: '#00FF00' }}>Investment Growth</Typography>
                  <Line data={lineData2} options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      x: {
                        ticks: {
                          color: '#ffffff',
                        },
                      },
                      y: {
                        ticks: {
                          color: '#ffffff',
                        },
                      },
                    },
                    plugins: {
                      legend: {
                        labels: {
                          color: '#ffffff',
                        },
                      },
                    },
                  }} />
                </Paper>
              </Grid>

              {/* Bar Chart Card */}
              <Grid item xs={12} sm={4}>
                <Paper
                  elevation={3}
                  sx={{
                    padding: '20px',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                    height: '300px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#282c34',
                    border: 'none',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
                  }}
                >
                  <Typography variant="h6" align="center" style={{ color: '#00FF00' }}>Monthly Expenses</Typography>
                  <Bar data={barData} options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      x: {
                        ticks: {
                          color: '#ffffff',
                        },
                      },
                      y: {
                        ticks: {
                          color: '#ffffff',
                        },
                      },
                    },
                    plugins: {
                      legend: {
                        labels: {
                          color: '#ffffff',
                        },
                      },
                    },
                  }} />
                </Paper>
              </Grid>

              {/* Radar Chart Card */}
              <Grid item xs={12} sm={4}>
                <Paper
                  elevation={3}
                  sx={{
                    padding: '20px',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                    height: '300px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#282c34',
                    border: 'none',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
                  }}
                >
                  <Typography variant="h6" align="center" style={{ color: '#00FF00' }}>Risk Assessment</Typography>
                  <Radar data={radarData} options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      r: {
                        ticks: {
                          color: '#ffffff',
                        },
                      },
                    },
                    plugins: {
                      legend: {
                        labels: {
                          color: '#ffffff',
                        },
                      },
                    },
                  }} />
                </Paper>
              </Grid>

              {/* Polar Area Chart Card */}
              <Grid item xs={12} sm={4}>
                <Paper
                  elevation={3}
                  sx={{
                    padding: '20px',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                    height: '300px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#282c34',
                    border: 'none',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
                  }}
                >
                  <Typography variant="h6" align="center" style={{ color: '#00FF00' }}>Financial Risks</Typography>
                  <PolarArea data={polarAreaData} options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        labels: {
                          color: '#ffffff',
                        },
                      },
                    },
                  }} />
                </Paper>
              </Grid>

              {/* Doughnut Chart Card */}
              <Grid item xs={12} sm={4}>
                <Paper
                  elevation={3}
                  sx={{
                    padding: '20px',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                    height: '300px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#282c34',
                    border: 'none',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
                  }}
                >
                  <Typography variant="h6" align="center" style={{ color: '#00FF00' }}>Financial Overview</Typography>
                  <Doughnut data={doughnutData} options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'bottom',
                        labels: {
                          color: '#ffffff',
                        },
                      },
                    },
                  }} />
                </Paper>
              </Grid>
            </Grid>
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;