import React, { useRef, useState } from 'react'
import emailjs from 'emailjs-com';

// import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Form, Alert, Row, Col} from 'react-bootstrap';

const Result = ()=>{
    return (
        <div>
            {/* <Alert variant="success">
                Thank you for your message. We will contact you soon!
            </Alert> */}
            <p className="form-send">
                Thank you for your message. We will contact you soon!
            </p>
        </div>
    )
}

export default function ContactForm() {

    const [result, showResult] = useState(false);
    const form = useRef();
    const sendEmail = (e) => {
        e.preventDefault();
    
        emailjs.sendForm('service_o3vm61e', 'template_3n7i55h', form.current, 'user_fASEUwV5cnvGmom3SskSv')
          .then((result) => {
              console.log(result.text);
          }, (error) => {
              console.log(error.text);
          });
          e.target.reset();
          showResult(true);

          setTimeout(()=>{
            showResult(false);
        }, 5000)
    };

    return (
        <div>
            {/* <h1>Contact Form</h1> */}
            
            <div className='form-container'>
                <h1>Contact Form</h1>
                <form ref={form} onSubmit={sendEmail}>
                    <label className="form-label">Full Name</label>
                    <input className="form-input" type="text" name="fullName" placeholder="Enter Full Name" required/>
                    <br />
                    <label className="form-label">Phone Number</label>
                    <input className="form-input" type="phone" name="phone" placeholder="Enter Phone Number" required/>
                    <br />
                    <label className="form-label">Email</label>
                    <input className="form-input" type="email" name="email" placeholder="Enter Email" required/>
                    <br />
                    <label className="form-label">Message</label>
                    <textarea className="form-textarea" name="message" placeholder="Enter Message" required/>
                    <br />
                    <input className="form-button" type="submit" value="Send" />
                    <div>
                        {result ? <Result /> : null}
                    </div>
                </form>

                {/* <Form ref={form} onSubmit={sendEmail}>
                    
                    <Form.Group className="mb-3" controlId="formBasicFullName">
                        <Form.Label>Full name</Form.Label>
                        <Form.Control type="text" placeholder="Enter fullname" name="fullName" required/>
                    </Form.Group>
                    
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" name="email" required/>
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPhone">
                        <Form.Label>Phone number</Form.Label>
                        <Form.Control type="phone" placeholder="Enter Phone number" name="phone" required/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label> Message</Form.Label>
                        <Form.Control as="textarea" rows={3} name="message" required/>
                    </Form.Group>

                    <Row>
                        <Col>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Col>
                        <Col>
                            {result ? <Result /> : null}
                        </Col>
                    </Row>
                    
                </Form> */}

                
                
            </div>
        </div>
    )
}
