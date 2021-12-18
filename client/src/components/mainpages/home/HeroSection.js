import React from 'react';
import './App.css';
import { Button } from './Button';
// import './HeroSection.css';
import {Link} from 'react-router-dom'

function HeroSection() {
  return (
    <div className='hero-container'>
      <video src='/videos/mymovie.mp4' autoPlay loop muted />
      <h1 data-aos='fade-down' data-aos-duration='2000' >Explore the City of Boston</h1>
      <p data-aos='fade-down' data-aos-duration='2000' data-aos-delay='200'>Adventure Awaits</p>
      {/* <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          GET STARTED
        </Button>
        <Button
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
        >
          WATCH TRAILER <i className='far fa-play-circle' />
        </Button>
      </div> */}
      <div className='hero-btns'>
      <Link to='/events' className='btn-mobile'>
        <Button className='btn-start' buttonStyle='btn--outline' buttonSize='btn--large'>
          Get Started
        </Button>
      </Link>
      </div>
    </div>
  );
}

export default HeroSection;