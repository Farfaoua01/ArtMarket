import React from 'react';
import { Navbar } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Topnavbar from "../../header/navbar";
function Contact() {
    return (
        <div>
            <Topnavbar />
            <section className='d-flex justify-content-center align-items-center'
                style={{ margin: '69px 4px' }}
            >
                <Form >
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Control type="text" placeholder="name"
                            style={{ border: '1px solid black', borderRadius: '0px', height: '35px', width: '490px', fontWeight: 'lighter' }} />
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Control type="email" placeholder="email adress"
                            style={{ border: '1px solid black', borderRadius: '0px', height: '35px', width: '490px', fontWeight: 'lighter' }} />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Control type="text" placeholder="Subject"
                            style={{
                                border: '1px solid black', borderRadius: '0px',
                                height: '35px', width: '490px', fontWeight: 'lighter'
                            }} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Control as="textarea" rows={3} placeholder="Write your message"
                            style={{ border: '1px solid black', borderRadius: '0px', marginTop: '9px', width: '490px', fontWeight: 'lighter' }} />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Control type="submit" placeholder="Subject"
                            style={{ backgroundColor: 'black', color: 'white', borderRadius: '0px', height: '35px', width: '100px', fontWeight: 'lighter' }} />
                    </Form.Group>
                </Form>
            </section>
        </div>
    )
}

export default Contact;