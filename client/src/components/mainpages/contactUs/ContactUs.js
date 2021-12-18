import React from 'react';
import Map from './Map';
import ContactForm from './ContactForm';
// import 'bootstrap/dist/css/bootstrap.min.css';


function ContactUs() {

    return (
        <div className="contact-container">
            {/* it is contectUs page */}
            <ContactForm />
            <Map />
        </div>
    )
}


export default ContactUs;
