import React from 'react'
import './home.css';
import { Form } from 'react-router-dom';
import { Button, FormControl, FormGroup } from 'react-bootstrap';
import bpicture from '../../assets/images/joinpicture.png';
import profilepic from '../../assets/images/profilepicture.png'
function Homecontact() {
    return (
        <div className='maindiv'>
            <div className='backimage'>
                <img src={bpicture} alt='picture' />
            </div>
            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', top: '-290px' }}>
                <img src={profilepic} style={{ width: '100px', height: '100px', borderRadius: '80px', border: '2px solid white' }} />
                <p style={{ color: 'white', fontSize: '24px', marginTop: '19px', fontFamily: 'Montserrat' }}>
                    Join us to receive the exclusive news about the  latest artworks.</p>
                <FormGroup>
                    <div style={{ display: 'flex' }}>
                        <FormControl type='text' placeholder='Your mail' style={{
                            width: '350px', margin: '0 13px 0 0',
                            height: '40px'
                        }} />
                        <Button style={{ width: '140px', border: 'none', backgroundColor: '#eedecb', color: 'black' }}>Join</Button></div>
                </FormGroup>
            </div>
        </div>
    )
}

export default Homecontact;