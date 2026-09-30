import React from 'react'
import { useNavigate } from 'react-router-dom';

function LandingPage() {
    const navigate = useNavigate();

    const handleLoginClick = (event) => {
      event.preventDefault();
      navigate('/login');
    };

    const handleSigninClick = (event) => {
      event.preventDefault();
      navigate('/signup');
    };

  return (
    <div style={{ display: 'flex', gap: '20px', fontFamily: 'sans-serif', padding: '20px' }}>
      <a 
        href="/login" 
        onClick={handleLoginClick} 
        style={{ color: 'blue', textDecoration: 'none', fontSize: '18px' }}>
        Login
      </a>
      
      <a 
        href="/signup" 
        onClick={handleSigninClick} 
        style={{ color: 'blue', textDecoration: 'none', fontSize: '18px' }}
      >
        Sign Up
      </a>
    </div>
  )
}

export default LandingPage