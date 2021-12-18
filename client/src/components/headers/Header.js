import React, {useContext, useState, useEffect} from 'react'
import {GlobalState} from '../../GlobalState'
import Menu from './icon/menu.svg'
import Close from './icon/close.svg'
import Cart from './icon/cart.svg'
import {Link, useLocation} from 'react-router-dom'
import axios from 'axios'
import styled, { css } from 'styled-components/macro'

function Header() {
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin
    const [cart] = state.userAPI.cart
    const [menu, setMenu] = useState(false)

    const [navbar, setNavbar] = useState(false);
    const location = useLocation();
  
    const changeBackground = () => {
      if (window.pageYOffset >= 60) {
        setNavbar(true);
      } else {
        setNavbar(false);
      }
    };
  
    useEffect(() => {
      const watchScroll = () => {
        window.addEventListener('scroll', changeBackground);
      };
  
      watchScroll();
  
      return () => {
        window.removeEventListener('scroll', changeBackground);
      };
    }, []);
  
    let style = {
      backgroundColor:
        navbar || location.pathname !== '/' ? '#242424' : 'transparent',
      transition: '0.4s',
      position: 
        location.pathname !== '/' ? 'relative' : 'fixed',
    };

    const logoutUser = async () =>{
        await axios.get('/user/logout')
        
        localStorage.removeItem('firstLogin')
        
        window.location.href = "/";
    }

    const adminRouter = () =>{
        return(
            <>
                <li><Link to="/create_product">Create Product</Link></li>
                {/* update here */}
                <li><Link to="/create_event">Create Event</Link></li>
                {/* update end */}
                <li><Link to="/category">Categories</Link></li>
            </>
        )
    }

    const loggedRouter = () =>{
        return(
            <>
                <li><Link to="/history">History</Link></li>
                <li><Link to="/" onClick={logoutUser}>Logout</Link></li>
            </>
        )
    }


    const styleMenu = {
        left: menu ? 0 : "-100%"
    }

    return (
        <header style={style}>
            <div className="menu" onClick={() => setMenu(!menu)}>
                {/* <img src={Menu} alt="" width="30" /> */}
                <i className="fas fa-bars fa-2x"></i>
            </div>

            <div className="logo">
                <h1>
                    <Link to="/">{isAdmin ? 'Admin' : 'Boston Tourism'}</Link>
                </h1>
            </div>

            <ul style={styleMenu}>
                <li><Link to="/products">{isAdmin ? 'Products' : 'Shop'}</Link></li>
                <li><Link to="/events">Events</Link></li>
                {isAdmin && adminRouter()}

                {
                    isLogged ? loggedRouter() : <li><Link to="/login">Login ✥ Register</Link></li>
                }

                <li>
                    <Link to="/contactUs">Contact Us</Link>
                </li>
                
                <li onClick={() => setMenu(!menu)}>
                    <img src={Close} alt="" width="30" className="menu" />
                </li>
                
            </ul>

            {
                isAdmin ? '' 
                :<div className="cart-icon">
                    <span>{cart.length}</span>
                    <Link to="/cart">
                        {/* <img src={Cart} alt="" width="30" /> */}
                        <i className="fas fa-shopping-cart fa-2x"></i>
                    </Link>
                </div>
            }
            
        </header>
    )
}

export default Header
