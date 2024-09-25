import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import './HomePage.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Typewriter = ({ text, onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true); // State to track typing status

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(index));
      index++;
      if (index === text.length) {
        clearInterval(interval);
        setIsTyping(false); // Set typing to false when done
        setTimeout(onComplete, 1000); // Delay before transition
      }
    }, 100);
    
    return () => clearInterval(interval);
  }, [text, onComplete]);

  return (
    <h1 className={`typewriter ${isTyping ? 'typing' : ''}`}>
      {displayedText}
    </h1>
  );
};
const HomePage = () => {
  const [showMainContent, setShowMainContent] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollDirection, setScrollDirection] = useState("down");
  const descriptionRef = useRef(null);
  const lastScrollY = useRef(0);

  const slides = [
    { text: "Slide 1: Learn to manage your bills efficiently with Billify.", img: "/path/to/image1.jpg" },
    { text: "Slide 2: Track your expenses effortlessly.", img: "/path/to/image2.jpg" },
    { text: "Slide 3: Receive real-time notifications.", img: "/path/to/image3.jpg" },
    { text: "Slide 4: Gain insights into your spending habits.", img: "/path/to/image4.jpg" },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    // Determine scroll direction
    if (currentScrollY < lastScrollY.current) {
      setScrollDirection("up");
    } else {
      setScrollDirection("down");
    }
    lastScrollY.current = currentScrollY;

    // Check visibility of description
    if (descriptionRef.current) {
      const { top } = descriptionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Check if element is partially visible
      if (top < windowHeight * 0.75 && top > 0) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
                Welcome to Billify
              </h1>
              <h2 className="lorem-text-second2">
                <span style={{ color: "gray", fontSize: "1.5rem" }}>Your Ultimate Solution for Smart Bill Management and Savings!</span>
              </h2>
            </div>

            <div className="phone-frame-wrapper">
              <img src="/phoneFrame.png" alt="Phone Frame" className="phone-frame" />
              <video
                src="/phoneFrameVideo.mp4"
                className="phone-video"
                autoPlay
                loop
                muted
              ></video>
            </div>
            <div className='container'>
              <div
                className={`billify-description ${isVisible ? 'visible' : 'hidden'} ${scrollDirection === "up" ? 'fade-out' : ''}`}
                ref={descriptionRef}
              >
                <p className="intro">
                  <span style={{ color: "white", fontSize: "1.2rem" }}>Billify</span> allows you to automatically transfer your store bills into a <span style={{ color: "white", fontSize: "1.1rem" }}>digital format.</span>
                  With advanced tracking and real-time notifications, your bill management has never been easier.
                </p>
                <p className="intro">
                  With <span style={{ color: "white", fontSize: "1.1rem" }}>Billify</span>, stay on top of your financial transactions in one easy-to-use app.
                  Monitor expenses across multiple stores, generate insights, and streamline your bill management.
                </p>
              </div>
              <div className={`billify-description2 ${isVisible ? 'visible' : 'hidden'} ${scrollDirection === "up" ? 'fade-out' : ''}`}>
                <h1 className="intro">
                  <span style={{ color: "white", fontSize: "3rem", wordSpacing: "0px" }}>Manage your bills</span>
                </h1>
                <h2 className="intro">
                  <span style={{ fontSize: "1.3rem", }}>Track, save, and stay organized</span>
                </h2>
              </div>
            </div>
          </div>
          <div className="third-content">
              <p className='naslov'>Check out the highlighted features.</p>
              <div className="card">
                  <p>Ovdje ce ici opis kartice.</p>
              </div>
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
