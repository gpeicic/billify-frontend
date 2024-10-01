import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser as faUserIcon, faGift, faBell, faCog,faSignOutAlt  } from '@fortawesome/free-solid-svg-icons'; // Import specific icons
import './Navbar.css'; // Import CSS file

const Navbar = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeSection, setActiveSection] = useState('insights'); // Default active section
  const navigate = useNavigate();
  const indicatorRef = useRef(null); // Ref for the indicator

  useEffect(() => {
    const id = localStorage.getItem('id'); // Get the user id from localStorage

    const fetchEmail = async () => {
      try {
        const response = await fetch(`http://localhost:8080/clients/${id}/email`);
        if (response.ok) {
          const email = await response.text();
          setEmail(email); // Set the fetched email
        } else {
          setError('Failed to fetch email.');
        }
      } catch (error) {
        console.error('Error fetching email:', error);
        setError('Error fetching email.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchEmail(); // Fetch the email if id is available
    } else {
      setError('No user ID found.');
      setLoading(false);
    }
  }, []);
  const handleLogout = () => {
    // Clear local storage or any session data
    localStorage.clear();
    navigate('/login'); // Redirect to login page
  };

  useEffect(() => {
    if (indicatorRef.current) {
      const activeLink = document.querySelector('.nav-link.active');
      if (activeLink) {
        indicatorRef.current.style.width = `${activeLink.offsetWidth}px`;
        indicatorRef.current.style.left = `${activeLink.offsetLeft}px`;
      }
    }
  }, [activeSection]);

  return (
    <nav className="navbar">
      <div className="navbar-content">
        {/* Avatar using FontAwesome icon */}
        <div className="avatar">
          <FontAwesomeIcon icon={faUserIcon} style={{ color: 'white', fontSize: '24px' }} />
        </div>

        {/* Email (username) on the left */}
        <div className="navbar-username">
          {loading ? 'Loading...' : error ? error : email}
        </div>

        {/* Icons on the right */}
        <div className="navbar-icons">
          <div className="icon-buttons">
            <button className="nav-icon present-icon" onClick={() => { setActiveSection('insights'); navigate('/accounts'); }}>
              <FontAwesomeIcon icon={faGift} />
            </button>
            <button className="nav-icon notification-icon" onClick={() => { setActiveSection('progress'); navigate('/progress'); }}>
              <FontAwesomeIcon icon={faBell} />
            </button>
            <button className="nav-icon settings-icon" onClick={() => { setActiveSection('forecasting'); navigate('/forecasting'); }}>
              <FontAwesomeIcon icon={faCog} />
            </button>
            <button className="nav-icon logout-icon" onClick={handleLogout}>
              <FontAwesomeIcon icon={faSignOutAlt} />
            </button>
          </div>

          {/* Active section indicator */}
          <div className="navbar-labels">
            <button
              className={`nav-link ${activeSection === 'insights' ? 'active' : ''}`}
              onClick={() => { setActiveSection('insights'); }}>
              Insights
            </button>
            <button
              className={`nav-link ${activeSection === 'progress' ? 'active' : ''}`}
              onClick={() => { setActiveSection('progress'); }}>
              Progress
            </button>
            <button
              className={`nav-link ${activeSection === 'forecasting' ? 'active' : ''}`}
              onClick={() => { setActiveSection('forecasting'); }}>
              Forecasting
            </button>
            <div className="indicator" ref={indicatorRef}></div> {/* Custom indicator line */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
