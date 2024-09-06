import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css'; // Import CSS file

const Navbar = ({ onFilterChange }) => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <button
          onClick={() => navigate('/accounts')}
          className="nav-link"
          
        >
          Home
        </button>
        <button
          onClick={() => navigate('/about')}
          className="nav-link"
        >
          About
        </button>
        <button
          onClick={() => navigate('/contacts')}
          className="nav-link"
        >
          Contacts
        </button>
        <input
          type="text"
          className="filter-input"
          placeholder="Filter by Store"
          onChange={onFilterChange}
        />
      </div>
    </nav>
  );
};

export default Navbar;
