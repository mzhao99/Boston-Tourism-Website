import React from 'react'



export default function () {
    return (
        <div className='contact-map-container'>

            <h1>About us</h1>
            <ul>
                <li>
                  <span >Location:</span>
                  <br/>
                  <span>360 Huntington Ave, Boston, MA 02115</span>
                </li>
                <li>
                  <span>Phone:</span>
                  <br/>
                  <span> (233) 233-6666</span> 
                </li>
            </ul>
            <div >
                <iframe id="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1761.8170370324306!2d-71.08972487812274!3d42.33981933789204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e37a1999cf5ce1%3A0xc97b00e66522b98c!2sNortheastern%20University!5e0!3m2!1sen!2sus!4v1634226003689!5m2!1sen!2sus" 
                 className="contactMap">
                </iframe>
            </div>
        </div>
    )
}
