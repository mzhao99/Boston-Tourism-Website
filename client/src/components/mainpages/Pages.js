import React, {useContext, useEffect} from 'react'
import {Switch, Route} from 'react-router-dom'
import Products from './products/Products'
import Events from './events/Events'
import DetailEvent from './events/DetailEvent'
import DetailProduct from './detailProduct/DetailProduct'
import Login from './auth/Login'
import Register from './auth/Register'
import OrderHistory from './history/OrderHistory'
import OrderDetails from './history/OrderDetails'
import Cart from './cart/Cart'
import NotFound from './utils/not_found/NotFound'
import Categories from './categories/Categories'
import CreateProduct from './createProduct/CreateProduct'
import Home from './home/Home'
import {GlobalState} from '../../GlobalState'
import CreateEvent from './createEvent/CreateEvent'
import ContactUs from './contactUs/ContactUs'
import Aos from 'aos';
import 'aos/dist/aos.css';


function Pages() {
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin

    useEffect(() => {
        Aos.init({})
    }, []);

    return (
        <Switch>
            
            {/* update start here */}
            {/* original: <Route path="/" exact component={Products} /> */}
            {/* after we have home comp: <Route path="/" exact component={Home} /> */}
            <Route path='/' exact component={Home} />
            <Route path="/contactUs" component={ContactUs} />
            <Route path="/products" exact component={Products} />
            <Route path="/events" exact component={Events} />
            <Route path="/eventDetail/:id" exact component={DetailEvent} />
            <Route path="/create_event" exact component={isAdmin ? CreateEvent : NotFound} />
            <Route path="/edit_event/:id" exact component={isAdmin ? CreateEvent : NotFound} />
            {/* end */}

            <Route path="/detail/:id" exact component={DetailProduct} />

            <Route path="/login" exact component={isLogged ? NotFound : Login} />
            <Route path="/register" exact component={isLogged ? NotFound : Register} />

            <Route path="/category" exact component={isAdmin ? Categories : NotFound} />
            <Route path="/create_product" exact component={isAdmin ? CreateProduct : NotFound} />
            <Route path="/edit_product/:id" exact component={isAdmin ? CreateProduct : NotFound} />

            <Route path="/history" exact component={isLogged ? OrderHistory : NotFound} />
            <Route path="/history/:id" exact component={isLogged ? OrderDetails : NotFound} />

            <Route path="/cart" exact component={Cart} />


            <Route path="*" exact component={NotFound} />
        </Switch>
    )
}

export default Pages
