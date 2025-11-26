import React, { useEffect } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import './navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import nextIcon from '../assets/images/nexticon.png';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import CartItem from '../pages/home/cartItem';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import LoadingSpinner from './loadingSpinner';
import ReactBlur from 'react-blur';
import Loginmodal from './loginmodal';
import _debounce from 'lodash/debounce';
function Offcanvascart({ show, hide, placement }) {
    const [artworkid, setArtworkid] = useState('');
    const [item, setItem] = useState('');
    const [lists, setLists] = useState([]);
    const [artworks, setArtworks] = useState([]);
    const [totalprice, setTotalprice] = useState(0);
    const [islogged, setIslogged] = useState(false);
    const [isloaded, setIsloaded] = useState(false);
    const [token, setToken] = useState('');
    const [localitems, setLocalitems] = useState([]);
    const userToken = localStorage.getItem('userToken');
    const [isUploaded, setIsUploaded] = useState(false);
    const [loaded, setLoaded] = useState(true);
    const [logged, setLogged] = useState(false);
    /* const fetchfunction = async () => {
        setArtworkid(artwork);
        try {
            const response = await fetch(`http://localhost:8001/api/findartwork/${artworkid}`);
            if (response.ok) {
                const res = await response.json();
                console.log('response', res.artworkcart);
                setItem(res.artworkcart);
            }
            else {
                console.log('error on the received response');
            }
        }
        catch (e) {
            console.log(e);
        }
    } */
    useEffect(() => {
    })
    const fetchfunction = async () => {
        try {
            const response = await fetch('http://localhost:8001/api/artworkcartlists');
            if (response.ok) {
                const res = await response.json();
                setLists(res);
            }
            else {
                console.log('error on the received response');
            }
        }
        catch (e) {
            console.log('error', e);
        }
    }
    const checkUserLogging = () => {
        const logged = localStorage.getItem('userToken');
        const token = !!logged;
        setIslogged(token);
    }
    const getStoredCartItems = () => {
        const storedItems = localStorage.getItem('cartItems');
        return storedItems ? JSON.parse(storedItems) : [];
    };
    const storeCartItems = (items) => {
        localStorage.setItem('cartItems', JSON.stringify(items));
    };
    useEffect(() => {
        checkUserLogging();
    });
    const getartworkscart = async () => {
        if (islogged) {
            const token = localStorage.getItem('userToken');
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,//Send the token in the Authorization header
                },
            };
            if (token && typeof token === 'string') {
                setLogged(true);
                const login = jwtDecode(token).userid;
                const usertoken = localStorage.getItem('userToken');
                try {
                    const response = await fetch(`http://localhost:8001/api/getcart?token=${login}`);
                    if (response.ok) {
                        const res = await response.json();
                        setArtworks(res.artworks);
                        setTotalprice(res.totalprice);
                        setLoaded(false);
                    }
                    else {
                        console.log("elsee");
                        setLoaded(false);
                    }
                }
                catch (e) {
                    console.log(e);
                }
            }
            else {
                /* const storedItems = getStoredCartItems();
                setLocalitems(storedItems);
                try {
                    const response = await fetch('http://localhost:8001/api/fetchitems', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ localitems }),
                    });
                    if (response.ok) {
                        const res = await response.json();
                        console.log('array', res.array);
                        setLists(res.array);
                        setLoaded(false);
                    }
                    else {
                        console.log("error artworks");
                    }
                }
                catch (e) {
                    console.log('artworks error', e);
                } */
            }
        }
    }
    const debounceChange = _debounce(getartworkscart, 400);
    useEffect(() => {
        getartworkscart();
    });
    useEffect(() => {
        const items = getStoredCartItems();
    })
    const gettotalprice = async () => {
        const token = localStorage.getItem('userToken');
        if (token) {
            try {
                console.log('try part');
                const response = await fetch("http://localhost:8001/api/gettotalprice");
                if (response.ok) {
                    const res = await response.json();
                    setTotalprice(res.totalPrice);
                    console.log('hhhhh', res.totalPrice);
                }
                else {
                    console.log('response error in getting the total price');
                }
            }
            catch (error) {
                console.log('get total price error', error);
            }
        }
        else {
            console.log('getiing price');
        }
    }
    useEffect(() => {
        // gettotalprice();
    });
    const updateQuantity = async (newItem, itemid) => {
        const data = { quantity: newItem, id: itemid.id };
        try {
            const response = await fetch('http://localhost:8001/api/updateQuantity',
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ data }),
                });
            if (response.ok) {
                const res = await response.json();
                console.json('');
            }
            else {
                console.log('error response');
            }
        }
        catch (e) {
            console.error(e);
        }
    }
    const handleDecrease = async (newItem, itemid) => {
        console.log('cliccccccccck');
        let varb;
        if (Number(newItem) > 1) {
            varb = Number(newItem) - 1;
            console.log('decccrese', varb);
            await updateQuantity(varb, itemid);
        }
    }
    const handleIncrease = async (newItem, itemid) => {
        console.log('cliccccccccck');
        let varb = 0;
        varb = Number(newItem) + 1;
        console.log('sooooom', varb);
        await updateQuantity(varb, itemid);
    }
    return (
        <div className='blur' style={{ filter: loaded ? 'blur(1px)' : 'none' }} >
            <Offcanvas show={show} onHide={hide} placement={placement} className='custom-offcanvas' >
                <Offcanvas.Header
                    style={{ backgroundColor: '#2f2e2e', height: '100px', color: '#ffffff', margin: '0px' }}>
                    <img src={nextIcon} className='closeIcon' onClick={() => { hide() }} />
                    <Offcanvas.Title
                        style={{
                            fontSize: '30px', position: 'relative', left: '-190px',
                            fontFamily: 'montserrat'
                        }}>Cart</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body
                    style={{
                        textAlign: 'center',
                        padding: '19px 49px'
                    }} >
                    {logged && loaded ? <LoadingSpinner /> :
                        Array.isArray(artworks) && artworks !== null ? artworks.map(item => (
                            <div className="" style={{ margin: '10px 0px' }} >
                                <CartItem artwork={item} />
                            </div>
                        )) : <p>Cart is empty</p>
                    }
                </Offcanvas.Body>
                <div className='divviewcart' style={{ textAlign: 'center' }}>
                    <div className='title' style={{
                        display: 'flex', justifyContent: 'space-between',
                        padding: '14px 40px', fontSize: '26px', fontFamily: 'Playfair Display'
                    }}>
                        <h1>Subtotal</h1>
                        <p> C$ {totalprice} </p>
                    </div>
                    <Link to={islogged ? '/cart' : '/'} className="linkmycart">
                        <Button className='viewCart'
                            style={{
                                backgroundColor: '#e9424d', cursor: 'pointer',
                                alignItems: 'center', textAlign: 'center', borderRadius: '0px',
                                border: 'none'
                            }}>View Cart</Button>
                    </Link>
                </div>
            </Offcanvas>

        </div >
    )
}


export default Offcanvascart;