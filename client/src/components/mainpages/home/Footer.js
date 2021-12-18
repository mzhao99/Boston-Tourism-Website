import React from 'react';
import './Footer.css';
import { Button } from './Button';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer-container'>
      <section className='footer-subscription'>
        <p className='footer-subscription-heading'>
          Join the newsletter to receive our best vacation deals
        </p>
        <p className='footer-subscription-text'>
          You can unsubscribe at any time.
        </p>
        <div className='input-areas'>
          <form>
            <input
              className='footer-input'
              name='email'
              type='email'
              placeholder='Your Email'
            />
            <Button buttonStyle='btn--outline'>Subscribe</Button>
          </form>
        </div>
      </section>
      <div className='footer-links'>
        <div className='footer-link-wrapper'>
          <div className='footer-link-items'>
            <h2>About Us</h2>
            <Link to='/contactUs'>Who We Are</Link>
            <Link to='/'>Terms of Service</Link>
          </div>
          <div className='footer-link-items'>
            <h2>Contact Us</h2>
            <Link to='/contactUs'>Contact</Link>
            <Link to='/contactUs'>Support</Link>
          </div>
        </div>
        <div className='footer-link-wrapper'>
          <div className='footer-link-items'>
            <h2>Social Media</h2>
            <a href="https://www.facebook.com/" target="_blank">Facebook</a>
            <a href="https://www.instagram.com/?hl=en" target="_blank">Instagram</a>
            <a href="https://twitter.com/?lang=en" target="_blank">Twitter</a>
          </div>
        </div>
      </div>
      <section className='social-media'>
        <div className='social-media-wrap'>
          <div className='footer-logo'>
            <Link to='/' className='social-logo'>
                Boston Tourism
                <i className='fab fa-canadian-maple-leaf' />
            </Link>
          </div>
          <small className='website-rights'>INFO 6150 Project © 2021</small>
          <div className='social-icons'>
              <a className='social-icon-link facebook' href="https://www.facebook.com/" target="_blank"><i className="fab fa-facebook-f"></i></a>
              <a className='social-icon-link instagram' href="https://www.instagram.com/?hl=en" target="_blank"><i className="fab fa-instagram"></i></a>
              <a className='social-icon-link twitter' href="https://twitter.com/?lang=en" target="_blank"><i className="fab fa-twitter-square"></i></a>
              <a className='social-icon-link youtube' href="https://www.youtube.com/" target="_blank"><i className="fab fa-youtube-square"></i></a>
              <a className='social-icon-link linkedin' href="https://www.linkedin.com/" target="_blank"><i className="fab fa-linkedin"></i></a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;