import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Filler,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import './AccountPage.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Filler,
  Tooltip,
  Legend,
  ArcElement
);

const AccountPage = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filteredAccounts, setFilteredAccounts] = useState({});
  const [chartData, setChartData] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    const id = localStorage.getItem('id');

    const fetchAccounts = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/clients/${id}/accounts`);
        const groupedAccounts = groupAccountsByDate(response.data);
        setAccounts(groupedAccounts);
        setFilteredAccounts(groupedAccounts);
        setChartData(generateChartData(groupedAccounts));
      } catch (err) {
        console.error('Error fetching accounts:', err);
        setError('Failed to fetch accounts.');
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  const groupAccountsByDate = (accounts) => {
    return accounts.reduce((acc, account) => {
      const date = new Date(account.date).toLocaleDateString();
      if (!acc[date]) acc[date] = [];
      acc[date].push(account);
      return acc;
    }, {});
  };

  const generateChartData = (groupedAccounts) => {
    return Object.keys(groupedAccounts).map(date => {
      const totalExpenditure = groupedAccounts[date].reduce((sum, account) => {
        return sum + (account.totalPrice || 0);
      }, 0);
      return { date, expenditure: totalExpenditure };
    });
  };

  const handleFilterChange = (event) => {
    const value = event.target.value;
    if (value) {
      const filtered = Object.keys(accounts).reduce((acc, date) => {
        const filteredAccounts = accounts[date].filter(account =>
          account.store?.storeName.toLowerCase().includes(value.toLowerCase())
        );
        if (filteredAccounts.length) acc[date] = filteredAccounts;
        return acc;
      }, {});
      setFilteredAccounts(filtered);
    } else {
      setFilteredAccounts(accounts);
    }
  };

  const lineChartData = {
    labels: chartData.map(item => item.date),
    datasets: [
      {
        label: 'Expenditure',
        data: chartData.map(item => item.expenditure),
        fill: true,
        backgroundColor: 'rgba(135, 6, 250, 0.3)',
        borderColor: 'rgba(135, 106, 250, 1)',
        borderWidth: 2,
      },
    ],
  };

  const pieChartData = {
    labels: ['Food', 'Rent', 'Gas', 'School'],
    datasets: [
      {
        data: [40, 30, 20, 10],
        backgroundColor: [
          'rgba(135, 6, 250,1)',
          '#53c8ca',
          'rgb(252,82,149)',
          'rgba(135, 106, 250,1)'
        ],
        borderColor: [
          'rgba(135, 6, 250,1)',
          '#53c8ca',
          'rgba(252,82,149,1)',
          'rgba(135, 106, 250,1)'
        ],
        borderWidth: [4, 2, 1, 1],
        hoverOffset: 10,
      },
    ],
  };

  const gradientLineChartData = {
    labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
    datasets: [
      {
        label: 'Spending',
        data: [50, 20, 30, 60, 80, 120, 150, 200, 180, 170, 110, 90, 50, 30, 20, 60, 70, 120, 150, 130, 100, 60, 40, 20],
        fill: true,
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
  
          if (!chartArea) return null;
  
          const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.left);
          gradient.addColorStop(0, 'rgba(28, 250, 250, 0.6)');
          gradient.addColorStop(1, 'rgba(250, 6, 135, 0.6)');
  
          return gradient;
        },
        borderColor: 'rgba(250, 6, 135, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'white',
      },
    ],
  };

  const gradientLineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time (Hours)',
          color: 'gray',
        },
        ticks: {
          color: 'gray',
        },
        grid: {
          color: 'rgba(128, 128, 128, 0.25)',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Spending (€)',
          color: 'gray',
        },
        ticks: {
          color: 'gray',
        },
        grid: {
          color: 'rgba(128, 128, 128, 0.25)',
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: 'gray',
        },
      },
    },
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '60%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: 'gray',
        },
      },
    },
    elements: {
      arc: {
        borderAlign: 'inner',
        borderRadius: (context) => {
          const index = context.dataIndex;
          const value = pieChartData.datasets[0].data[index];
          const maxValue = Math.max(...pieChartData.datasets[0].data);
          const minValue = Math.min(...pieChartData.datasets[0].data);
          
          return ((value - minValue) / (maxValue - minValue)) * 10 + 5;
        },
      },
    },
  };
  
  const handleExpandClick = (date) => {
    setSelectedDate(date);
    setIsExpanded(true);
  };

  const handleClose = () => {
    setIsExpanded(false);
    setSelectedDate('');
  };

  return (
    <div className="prvi">
      <Navbar onFilterChange={handleFilterChange} />
      <div className="page-container">
        {loading && <p className="loading">Loading...</p>}
        {error && <p className="error">{error}</p>}

        <div className={`cards-container-1`}>
          {Object.keys(filteredAccounts).length === 0 ? (
            <p>No accounts found</p>
          ) : (
            Object.keys(filteredAccounts).map(date => (
              <div key={date} className="date-group">
                <h3 className="date-header">{new Date(date).toLocaleDateString()}</h3>
                {filteredAccounts[date].slice(0, 2).map((account) => (
                  <div key={account.id} className="account-card">
                    <div className="card-header">
                      <img
                        src={'default-logo.png'}
                        alt="Store Logo"
                        className="store-logo"
                      />
                      <h2 className="card-title">{account.store?.storeName || 'N/A'}</h2>
                      <span className="total-amount">€{account.totalPrice ? account.totalPrice.toFixed(2) : '0.00'}</span>
                    </div>
                    <div className="card-details">
                      <p className="card-info">Date:</p>
                      <p>{new Date(account.date).toLocaleDateString()}</p>
                      <p className="card-info">Time:</p>
                      <p>{new Date(account.date).toLocaleTimeString()}</p>
                    </div>
                  </div>
                ))}
                <button className="expand-button" onClick={() => handleExpandClick(date)}>
                  Expand
                </button>
              </div>
            ))
          )}
        </div>

        {isExpanded && (
          <div className="modal">
            <div className="modal-content">
              <h2>Receipts for {selectedDate}</h2>
              {filteredAccounts[selectedDate]?.map((account) => (
                <div key={account.id} className="account-card expanded">
                  <div className="card-header">
                    <img
                      src={'default-logo.png'}
                      alt="Store Logo"
                      className="store-logo"
                    />
                    <h2 className="card-title">{account.store?.storeName || 'N/A'}</h2>
                    <span className="total-amount">€{account.totalPrice ? account.totalPrice.toFixed(2) : '0.00'}</span>
                  </div>
                  <div className="card-details">
                    <p className="card-info">Date:</p>
                    <p>{new Date(account.date).toLocaleDateString()}</p>
                    <p className="card-info">Time:</p>
                    <p>{new Date(account.date).toLocaleTimeString()}</p>
                  </div>
                </div>
              ))}
              <button className="close-button" onClick={handleClose}>
                Close
              </button>
            </div>
          </div>
        )}

        <div className="cards-container-2">
          <h3>Daily Expenditure</h3>
          <Line data={lineChartData} />
        </div>

        <div className="cards-container-3">
          <h3>Spending by Category</h3>
          <Doughnut data={pieChartData} options={pieChartOptions} />
        </div>

        <div className="cards-container-4">
          <h3>Spending Over 24 Hours</h3>
          <Line data={gradientLineChartData} options={gradientLineChartOptions} />
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
