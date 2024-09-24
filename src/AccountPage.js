import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import './AccountPage.css';

const AccountPage = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filteredAccounts, setFilteredAccounts] = useState({});

  useEffect(() => {
    const id = localStorage.getItem('id');

    const fetchAccounts = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/clients/${id}/accounts`);
        console.log(response.data);
        const groupedAccounts = groupAccountsByDate(response.data);
        setAccounts(groupedAccounts);
        console.log(groupedAccounts)
        setFilteredAccounts(groupedAccounts);
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

  return (
    <div>
      <Navbar onFilterChange={handleFilterChange} />
      <div className="page-container">
        {loading && <p className="loading">Loading...</p>}
        {error && <p className="error">{error}</p>}

        <div className="cards-container">
          {Object.keys(filteredAccounts).length === 0 ? (
            <p>No accounts found</p>
          ) : (
            Object.keys(filteredAccounts).map(date => (
              <div key={date} className="date-group">
                <h3 className="date-header"> {new Date(date).toLocaleDateString()}</h3>
                {filteredAccounts[date].map((account) => (
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
                      <p>Date: {new Date(account.date).toLocaleDateString()}</p>
                      <p>Address: {account.store?.address || 'N/A'}</p>
                      <p>Products:</p>
                      <ul>
                        {account.boughtItems && account.boughtItems.length ? (
                          account.boughtItems.map((item) => (
                            <li key={item.item.id}>
                              {item.item.itemName} - Quantity: {item.amount} | Price per unit: €{item.item.price} | Total: €{(item.item.price * item.amount).toFixed(2)}
                            </li>
                          ))
                        ) : (
                          <p>No products found</p>
                        )}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountPage;