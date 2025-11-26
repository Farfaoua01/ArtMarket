import React, { useState } from 'react';
import './cart.css';
import Topnavbar from '../../header/navbar';
import MycartItem from './mycartItem';
import { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import LoadingSpinner from '../../header/loadingSpinner';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';
import Homefooter from '../home/footer';
function Cart() {
    const [cartlist, setCartlist] = useState([]);
    const [totalprice, setTotalprice] = useState('');
    const [loading, setLoading] = useState(true);
    const [cartitems, setCartitems] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [priceloading, setPriceloading] = useState(false);
    const fetchfunction = async () => {
        try {
            const token = localStorage.getItem('userToken');
            const tokenId = jwtDecode(token);
            const response = await fetch(`http://localhost:8001/api/viewcart?tokenId=${tokenId.userid}`);
            if (response.ok) {
                const res = await response.json();
                setCartlist(res.artworks);
                setLoading(false);
                setTotalprice(res.totalprice);
                setCartitems(res.cartitems);
                setQuantity(res.cartitems.quantity);
            }
            else {
                console.log('error response ');
                setLoading(false);
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    const gettotalprice = async () => {
        setPriceloading(true);
        try {
            console.log('try part');
            const response = await fetch("http://localhost:8001/api/gettotalprice");
            if (response.ok) {
                const res = await response.json();
                setTotalprice(res.totalPrice);
                setPriceloading(false);
            }
            else {
                console.log('response error');
            }
        }
        catch (error) {
            console.log('get total price error', error);
        }
    }
    useEffect(() => {
        fetchfunction();
    });
    useEffect(() => {
        //gettotalprice();
    }, []);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div style={{
            margin: '0px', padding: '0px', height: '100vh'
        }}>
            <div style={{ borderBottom: '1px solid #d5d5d5' }}>
                <Topnavbar />
            </div>
            <div className='cart'>
                <div className='leftpart'>
                    <p className='mycartTitle'>My Cart </p>
                    <div>
                        {loading ? <LoadingSpinner /> : cartlist !== 'null' ?
                            cartlist?.map(item => (
                                <div key={item._id}>
                                    <MycartItem artwork={item} />
                                </div>
                            )) : <p>Cart is empty</p>
                        }
                    </div>
                </div>
                <div className='rightpart'>
                    <p className='mycartTitle'>Order summary</p>
                    <div style={{
                        borderBottom: '1px solid #d5d5d5', paddingBottom: '19px',
                        paddingTop: '17px'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px' }}>
                            <p >Subtotal </p>
                            <p style={{ fontSize: '18px', display: 'flex' }}>C$
                                {priceloading ? <LoadingSpinner /> : <p> {totalprice}</p>}
                            </p>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px' }}>
                            <p>Delivery</p>
                            <p>C$</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', padding: '10px 0px', justifyContent: 'space-between' }}>
                        <p style={{ fontSize: '22px' }}>Total</p>
                        <p style={{ fontSize: '22px', display: 'flex' }}> C$
                            {priceloading ? <LoadingSpinner /> : <p> {totalprice}</p>}</p>
                    </div>
                    <div>
                        <Link to='/checkout'><Button className='checkoutButton'
                            style={{
                                backgroundColor: '#e9424d', color: 'white', width: '316px',
                                borderRadius: '0px', border: '0px'
                            }}
                        >Checkout </Button></Link>
                        <Link to='/checkout'><Button className='checkoutButton'
                            style={{
                                backgroundColor: '#ffc439', color: 'black', width: '316px',
                                borderRadius: '0px', border: '0px', marginTop: '10px'
                            }}
                        >Pay pal </Button></Link>
                    </div>
                </div>
            </div >
            <div style={{ margin: '0px', padding: '0px' }}>
                <Homefooter />
            </div>
        </div >
    )
}

export default Cart;