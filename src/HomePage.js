import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Carousel } from '3d-react-carousal';
import cardImage from '../src/card.jpg';
import cardImage2 from '../src/card2.jpg';
import cardImage3 from '../src/card3.jpg';
import picture1 from '../src/picture3.jpg';
import picture2 from '../src/picture2.jpg';
import picture3 from '../src/picture.jpg';
let slides = [
  <img src={cardImage} alt="1" />,
  <img src={cardImage2} alt="2" />,
  <img src={cardImage3} alt="3" />,
];

const Typewriter = ({ text, onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(index));
      index++;
      
      if (index === text.length) {
        clearInterval(interval);
        setIsTyping(false);
        setTimeout(onComplete, 3000);
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
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isFirstVisible, setIsFirstVisible] = useState(false);
  const [isFirstVisibleDots, setIsFirstVisibleDots] = useState(false);
  const [isSecondVisible, setIsSecondVisible] = useState(false);
  const firstDescriptionRef = useRef(null);
  const [contentOpacity, setContentOpacity] = useState(0);
  const secondDescriptionRef = useRef(null);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (firstDescriptionRef.current) {
      const { top } = firstDescriptionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      setIsFirstVisible(top < windowHeight * 0.75 && top > 0);
      setIsFirstVisibleDots(top < windowHeight * 1.2 && top > 0);
    }

    if (secondDescriptionRef.current) {
      const { top } = secondDescriptionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      setIsSecondVisible(top < windowHeight * 0.75 && top > 0);
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
    setTimeout(() => {
      setContentOpacity(1);
    }, 1);
  };

  const handleSlideChange = (index) => {
    setCurrentSlideIndex(index);
  };

  const renderDots = () => {
    return (
      <div className={`dots-container ${isFirstVisibleDots ? 'expanded' : ''}`}>
        {slides.map((_, index) => (
          <span
            key={index}
            className={`dot ${currentSlideIndex === index ? 'active' : ''}`}
            onClick={() => handleSlideChange(index)}
          ></span>
        ))}
      </div>
    );
  };

  return (
    <div>
      {!showMainContent ? (
        <div className="intro-screen">
          <Typewriter text="H ello Customer," onComplete={handleTypewriterComplete} />
        </div>
      ) : (
        <>
          <nav className={`futuristic-navbar ${showMainContent ? 'visible' : ''}`}style={{ opacity: contentOpacity }}>
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
          <div className={`home-content ${showMainContent ? 'visible' : ''}`}style={{ opacity: contentOpacity }}>
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
                className={`billify-description ${isSecondVisible ? 'visible' : 'hidden'}`}
                ref={firstDescriptionRef}
              >
                <p className="intro">
                  <span style={{ color: "white", fontSize: "1.2rem" }}>Billify</span> allows you to automatically transfer your store bills into a <span style={{ color: "white", fontSize: "1.1rem" }}>digital format.</span>
                  With advanced tracking and real-time notifications, your bill management has never been easier.
                </p>
              </div>
              <div
                className={`billify-description2 ${isSecondVisible ? 'visible' : 'hidden'}`}
                ref={secondDescriptionRef}
              >
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
              <Carousel slides={slides} autoplay={true} interval={3000} onSlideChange={handleSlideChange}/>
              {renderDots()}
              <div className='container' style={{ marginTop: '100px' }}>
                <div
                  className={`billify-description ${isFirstVisible ? 'visible' : 'hidden'}`}
                  ref={firstDescriptionRef}
                >
                  <h1 className="intro">
                    <span style={{ color: "white", fontSize: "3rem", wordSpacing: "0px" }}>Manage your bills</span>
                  </h1>
                  <h2 className="intro">
                    <span style={{ fontSize: "1.3rem", }}>Track, save, and stay organized</span>
                  </h2>
                </div>
                <div className={`billify-description2 ${isFirstVisible ? 'visible' : 'hidden'}`}>
                  <p className="intro">
                    <span style={{ color: "white", fontSize: "1.2rem" }}>Billify</span> allows you to automatically transfer your store bills into a <span style={{ color: "white", fontSize: "1.1rem" }}>digital format.</span>
                    With advanced tracking and real-time notifications, your bill management has never been easier.
                  </p>
                </div>
              </div>
          </div>
          <div className='forth-content'>
            <p className ='forth-title'>Explore the full story.</p>
            <div className="image-container">
              <p className='forth-subtitle'>Discover the App.</p>
                <img src={picture1} alt="Centered" className="centered-image" />
            </div>
            <div className="side-by-side-container">
                <img src={picture2} alt="Side Image 1" className="side-image" />
                <img src={picture3} alt="Side Image 2" className="side-image" />
            </div>
            <div className='container' style={{ marginTop: '100px', maxWidth:'1800px'}}>
                <div
                  div className='billify-description'style={{ opacity:'1'}}>
                  <h1 className="intro">
                    <span style={{ color: "white", fontSize: "3rem", wordSpacing: "0px" }}>Manage your bills</span>
                  </h1>
                  <h2 className="intro">
                    <span style={{ fontSize: "1.3rem", }}>Track, save, and stay organized</span>
                  </h2>
                </div>
                <div className='billify-description2'style={{ opacity:'1'}}>
                  <p className="intro">
                    <span style={{ color: "white", fontSize: "1.2rem" }}>Billify</span> allows you to automatically transfer your store bills into a <span style={{ color: "white", fontSize: "1.1rem" }}>digital format.</span>
                    With advanced tracking and real-time notifications, your bill management has never been easier.
                  </p>
                </div>
              </div>
          </div>
          
          <footer className="footer">
            <div className="footer-content">
              <p>&copy; 2024 Billify. All rights reserved.</p>
              <div className="footer-links">
                <Link to="/privacy">Privacy Policy</Link>
                <Link to="/terms">Terms of Service</Link>
                <Link to="/contact">Contact Us</Link>
              </div>
              <div className="social-media">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
              </div>
            </div>
          </footer>
        </>
      )}
    </div>
  );
};

export default HomePage;
