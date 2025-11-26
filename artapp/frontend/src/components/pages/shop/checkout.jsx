import React, { useEffect } from 'react';
import './checkout.css';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useState } from 'react';
import Checkoutitem from './checkoutitem';
import LoadingSpinner from '../../header/loadingSpinner';
import { CardElement } from '@stripe/react-stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { Button, Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import PayementForm from './payementForm';
import { loadStripe } from '@stripe/stripe-js';
import { motion } from 'framer-motion';
const stripePromise = loadStripe('pk_test_51OX0iOKVBIGXnrZztgqaIvqth0A5DSTlveal8w46bxA2W98beZVhySRJHKmTNdRJIZM6XoFaYig6aonedGJdecbf00m7FC042S');
function Checkout() {
    const [cartlist, setCartlist] = useState([]);
    const [totalprice, setTotalprice] = useState(0);
    const [loading, setLoading] = useState(true);
    const [login, setLogin] = useState('');
    const [clicked, setClicked] = useState(false);
    const [dclicked, setDclicked] = useState(false);
    const [user, setUser] = useState({});
    const [edit, setEdit] = useState(false);
    const [all, setAll] = useState(true);
    const [load, setLoad] = useState(true);
    const fetchfunction = async () => {
        const token = localStorage.getItem('userToken');
        const tokenId = jwtDecode(token).userid;
        setLogin(tokenId);
        try {
            const response = await fetch(`http://localhost:8001/api/viewcart?tokenId=${tokenId}`);
            if (response.ok) {
                const res = await response.json();
                setCartlist(res.artworks);
                setTotalprice(res.totalprice);
                setLoading(false);
            }
            else {
                console.log('error response ');
                setLoading(false);
            }
        }
        catch (error) {
            console.log(error);
        }
        if (login) {
            try {
                const response = await fetch(`http://localhost:8001/api/getuserinfo?userid=${tokenId}`);
                if (response.ok) {
                    const res = await response.json();
                    setUser(res.user);
                    setLoad(false);
                }
                else {
                    console.log('response error');
                }
            }
            catch (e) {
                console.log(e);
            }
        }
    }
    useEffect(() => {
        fetchfunction();
        if (login === null) {
            setAll(true);
        }
    })
    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div className='topbarcheckout'>
                    <div style={{ display: 'flex', justifyContent: 'left', fontSize: '19px' }}>
                        <p style={{ fontFamily: 'Playfair Display', fontSize: '25px' }}>FARFAOUA' </p>
                        <p >s Checkout</p>
                    </div>
                    <div>
                        <Link to='/cart' style={{ color: 'black' }}>
                            <p>Continue Browsing</p>
                        </Link>
                    </div>
                </div>
                <div className='content'>
                    <div className='leftpart'>
                        <div className='logindiv'>
                            {login !== 'null' ? <div style={{
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}> <div><p>logged in as {login.email}</p></div>
                                <Link style={{ color: 'black' }} >Log out </Link></div> : <p> Already have an account ,Log in for a simple checkout?<Link>Login</Link></p>}
                        </div>
                        <div>
                            {login && all === false &&
                                <div className='userinfopart' style={{
                                    display: 'flex', width: '100%', marginTop: '15px',
                                    justifyContent: 'space-between', borderBottom: '1px solid gray ', marginBottom: '15px'
                                }}>
                                    <div>
                                        <h3 style={{
                                            fontSize: '27px', fontFamily: 'Montserrat', padding: '0px',
                                            margin: '0px', margin: '19px 0px 19px 0px'
                                        }}>Custom details</h3>
                                        {load && <LoadingSpinner />}
                                        <div style={{ marginLeft: '18px' }}>
                                            <div style={{ display: 'flex', justifyContent: 'left', fontSize: '15px' }}>
                                                <p>{user.firstname} </p><p>{user.lastname}</p>
                                            </div>
                                            <p>{user.email} </p>
                                        </div>
                                    </div>
                                    <div>
                                        <Link style={{ color: 'black' }}
                                            onClick={() => { setEdit(true); setAll(true); setClicked(false); setDclicked(true) }}> Edit</Link>
                                    </div>
                                </div>
                            }
                        </div>
                        {!login ? (<div>
                            <div style={{ marginTop: '27px', marginBottom: '19px' }} className='custom-details'>
                                <h3 style={{ fontSize: '19px', fontFamily: 'Montserrat', fontStyle: 'bold', margin: '19px 0px 19px 0px' }}>
                                    Custom Details</h3>
                                {clicked === false ? (
                                    <Form>
                                        <FormGroup>
                                            <FormLabel>First name *</FormLabel>
                                            <FormControl className='custom-input' value='' onChange={(e) => { }} />
                                        </FormGroup>
                                        <FormGroup>
                                            <FormLabel>Last name</FormLabel>
                                            <FormControl className='custom-input'></FormControl>
                                        </FormGroup>
                                        <FormGroup>
                                            <FormLabel>Phone Number</FormLabel>
                                            <FormControl className='custom-input'></FormControl>
                                        </FormGroup>
                                        <FormGroup>
                                            <FormLabel>Email Adress*</FormLabel>
                                            <FormControl className='custom-input'></FormControl>
                                        </FormGroup>
                                        <Button type='submit' onClick={() => { setClicked(true); setDclicked(false) }} style={{
                                            width: '100%',
                                            backgroundColor: 'black', border: 'none', marginTop: '19px'
                                        }}>Continue</Button>
                                    </Form>
                                ) : (
                                    <div style={{ width: '100%', borderBottom: '1px solid gray' }}> </div>
                                )
                                }
                            </div>
                            <div style={{ marginTop: '27px', marginTop: '19px', marginBottom: '15px' }} className='delivery-details'>
                                <h3 style={{ fontSize: '19px', fontFamily: 'Montserrat', fontStyle: 'bold', margin: '19px 0px 19px 0px' }}>
                                    Delivery Details</h3>
                                {dclicked === false ? (
                                    <Form>
                                        <FormGroup >
                                            <FormLabel>Country/region *</FormLabel>
                                            <FormControl className='custom-input' value='' onChange={(e) => { }} />
                                        </FormGroup>
                                        <FormGroup>
                                            <FormLabel>Adress *</FormLabel>
                                            <FormControl className='custom-input'></FormControl>
                                        </FormGroup>
                                        <FormGroup>
                                            <FormLabel >Adress line *</FormLabel>
                                            <FormControl className='custom-input'></FormControl>
                                        </FormGroup>
                                        <FormGroup>
                                            <FormLabel >City *</FormLabel>
                                            <FormControl className='custom-input'></FormControl>
                                        </FormGroup>
                                        <FormGroup>
                                            <FormLabel >Zip/code postale *</FormLabel>
                                            <FormControl className='custom-input'></FormControl>
                                        </FormGroup>
                                        <Button type='submit' onClick={() => {
                                            setDclicked(true); setAll(false);
                                        }}
                                            style={{
                                                width: '100%', height: '50px',
                                                backgroundColor: 'black', border: 'none', marginTop: '19px'
                                            }}>Continue</Button>
                                    </Form>) : (
                                    <div style={{ width: '100%', borderBottom: '1px solid gray' }}> </div>
                                )}
                            </div>
                        </div>) : (
                            <div style={{ marginTop: '27px', marginTop: '19px', marginBottom: '15px' }} className='delivery-details'>
                                <h3 style={{ fontSize: '19px', fontFamily: 'Montserrat', fontStyle: 'bold', margin: '19px 0px 19px 0px' }}>
                                    Delivery Details</h3>
                                {dclicked === false ? (
                                    <Form>
                                        <FormGroup >
                                            <FormLabel>Country/region *</FormLabel>
                                            <FormControl className='custom-input' value='' onChange={(e) => { }} />
                                        </FormGroup>
                                        <FormGroup>
                                            <FormLabel>Adress *</FormLabel>
                                            <FormControl className='custom-input'></FormControl>
                                        </FormGroup>
                                        <FormGroup>
                                            <FormLabel >Adress line *</FormLabel>
                                            <FormControl className='custom-input'></FormControl>
                                        </FormGroup>
                                        <FormGroup>
                                            <FormLabel >City *</FormLabel>
                                            <FormControl className='custom-input'></FormControl>
                                        </FormGroup>
                                        <FormGroup>
                                            <FormLabel >Zip/code postale *</FormLabel>
                                            <FormControl className='custom-input'></FormControl>
                                        </FormGroup>
                                        <Button type='submit' onClick={() => {
                                            setDclicked(true); setAll(false);
                                        }}
                                            style={{
                                                width: '100%', height: '50px',
                                                backgroundColor: 'black', border: 'none', marginTop: '19px'
                                            }}>Continue</Button>
                                    </Form>) : (
                                    <div style={{ width: '100%', borderBottom: '1px solid gray' }}> </div>
                                )}
                            </div>
                        )}
                        <div>
                            <h3 style={{
                                fontSize: '27px',
                                fontFamily: 'Montserrat', margin: '19px 0px 19px 0px'
                            }}>Payement </h3>
                            {dclicked ? (<div className='payement-details'>
                                <Elements stripe={stripePromise}>
                                    <PayementForm price={totalprice} />
                                </Elements>
                            </div>) :
                                (<div style={{ width: '100%', borderBottom: '1px solid gray' }}> </div>)}


                        </div>
                    </div>
                    <motion.div className='rightpart'
                        initial={{ opacity: 0, x: 100 }} // Initial animation state
                        animate={{ opacity: 1, x: 0 }} // Animation to play on load
                        transition={{ duration: 1 }}>
                        <div>
                            <div className='title'
                                style={{
                                    display: 'flex', justifyContent: 'space-between'
                                    , alignItems: 'center'
                                }}>
                                <p style={{ fontSize: '22px' }}> Order Summary</p>
                                <Link to='/cart' style={{ color: 'black' }}><p>Edit Cart</p></Link>
                            </div>
                            <div style={{
                                overflow: 'auto', width: '380px', height: '190px',
                                textAlign: 'center', padding: '1px 10px'
                            }}>
                                {loading ? <LoadingSpinner /> : cartlist && cartlist.map(item => (
                                    <div style={{ margin: '14px 19px' }}>
                                        <Checkoutitem artwork={item} />
                                    </div>
                                ))}
                            </div>
                            <div style={{
                                marginTop: '39px',
                                borderTop: '1px solid #787777',
                                borderBottom: '1px solid #787777', padding: '19px 6px'
                            }}>
                                <div
                                    style={{
                                        display: 'flex', justifyContent: 'space-between',
                                        fontSize: '19px'
                                    }}>
                                    <p> Subtotal</p>
                                    <p> C$ {totalprice} </p>
                                </div>
                                <div
                                    style={{
                                        display: 'flex', justifyContent: 'space-between',
                                        fontSize: '19px'
                                    }}>
                                    <p> Delivery</p>
                                    <p> 0 C$ </p>
                                </div>
                            </div>
                            <div
                                style={{
                                    display: 'flex', justifyContent: 'space-between',
                                    fontSize: '22px', padding: '19px 10px'
                                }}>
                                <p> Total</p>
                                <p> C$ {totalprice}  </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div >
    )
}

export default Checkout;