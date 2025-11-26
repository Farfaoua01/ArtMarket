import React, { useEffect, useState } from 'react';
import { Button, FormControl, InputGroup, Navbar, Offcanvas } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import topshoppicture from '../../assets/images/herflower.png';
import shopicture from '../../assets/images/shoptoppicture.png';
import './productpage.css';
import Topnavbar from '../../header/navbar';
import { Link, useParams } from 'react-router-dom';
import { FormGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Artworkcard from '../home/artworkcard';
import Homefooter from '../home/footer';
import Offcanvascart from '../../header/offcanvascart';
import { jwtDecode } from 'jwt-decode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faPlus as faPlusLight } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
function Productpage() {
    const [materials, setMaterials] = useState(false);
    const [artwork, setArtwork] = useState(false);
    const [materialsisplus, setMaterialsissplus] = useState(false);
    const [payementisplus, setPayementsplus] = useState(false);
    const [sizeisplus, setSizeisplus] = useState(false);
    const [shippingisplus, setShippingisplus] = useState(false);
    const [history, setHistory] = useState(false);
    const { artworkId } = useParams();
    const [quantity, setQuantity] = useState(1);
    const [category, setCategory] = useState('');
    const [cartclick, setCartclick] = useState(false);
    const [artworks, setArtworks] = useState([]);
    const [filtered, setFiletered] = useState([]);
    const [isLogged, setIsLogged] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [show, setShow] = useState(false);
    const getStoredCartItems = () => {
        const storedItems = localStorage.getItem('cartItems');
        return storedItems ? JSON.parse(storedItems) : [];
    };
    // Function to store cart items in local storage
    const storeCartItems = (items) => {
        localStorage.setItem('cartItems', JSON.stringify(items));
    };
    const handleaddcart = async () => {
        if (isLogged) {
            setCartclick(true);
            const userid = jwtDecode(localStorage.getItem('userToken'));
            const data = { artworkid: artworkId, userid: userid.userid };
            try {
                const response = await fetch('http://localhost:8001/api/addartworkcart', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'Application/json'
                    },
                    body: JSON.stringify({ data }),
                });
                if (response.ok) {
                    const res = await response.json();
                    console.log('respppp', res);
                    localStorage.removeItem('cartItems');
                }
                else {
                    console.log('error in the responses data');
                }
            }
            catch (e) {
                console.log(e);
            }
        }
        else {
            setShow(true);
            setCartclick(false);
        }
    }
    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    }
    const handleIncrement = () => {
        setQuantity(quantity + 1);
    }
    const fetchfunction = async () => {
        try {
            const response = await fetch(`http://localhost:8001/api/artworkdetails/${artworkId}`);
            if (response.ok) {
                const res = await response.json();
                setArtwork(res.artwork);
                setCategory(artwork.category);
            }
            else {
                console.log('Error in the response');
            }
        }
        catch (error) {
            console.error(error);
        }
    }
    const getartworks = async () => {
        try {
            const response = await fetch(`http://localhost:8001/api/artworkdetails/${artworkId}`);
            if (response.ok) {
                const res = await response.json();
                setArtworks(res.filteredArtworks);
                const filteredartwork = artworks.filter((item) => {
                    return item.category === artwork.category;
                });
                setFiletered(filteredartwork);
            }
            else {
                console.log('Error in the response');
            }
        }
        catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        fetchfunction();
    });
    useEffect(() => {
        getartworks();
    });
    const handlelinkClick = () => {
        window.location.reload();
    }
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    const fullFileUrl = artwork?.fileurl ? `http://localhost:8001/uploads/${artwork.fileurl}` : '';
    return (
        <motion.div initial={{ opacity: 0, x: -100 }} // Initial animation state
            animate={{ opacity: 1, x: 0 }} // Animation to play on load
            transition={{ duration: 1 }}>
            <Topnavbar apr={show} />
            <div style={{ marginLeft: '350px' }}>
                <div style={{
                    display: 'flex', justifyItems: 'start',
                    fontFamily: 'Montserrat', alignItems: 'center', fontSize: '14px', justifyContent: 'start',
                    position: 'relative', top: '30px',
                }}>
                    <p><b>Home  </b> /  Shop  / {artwork?.title}</p>
                </div>
            </div>
            <div className="productpage">
                <div className="leftpart">
                    <img src={fullFileUrl} style={{ width: '460px', height: '530px' }} />
                </div>
                <div className="rightpart">
                    <div>
                        {artwork?.category === 'Prints' ?
                            <p style={{ fontSize: '24px', fontFamily: 'Playfair Display' }}>
                                {artwork?.title} </p>
                            :
                            <p style={{ fontSize: '24px', fontFamily: 'Playfair Display' }}>
                                {artwork?.title} -Original Painting</p>}
                        <p className='price' style={{
                            fontSize: '19px',
                            position: 'relative', top: '-13px', fontFamily: 'Playfair Display'
                        }}> C$ {artwork?.price} </p>
                        {artwork?.category === 'prints' ?
                            <div><p className='lightfont' style={{
                                fontFamily: 'Playfair Display'
                                , letterSpacing: '2px'
                            }}>Size </p>
                                <Dropdown >
                                    <Dropdown.Toggle id="dropdown-button"
                                        style={{
                                            width: '340px', height: '40px',
                                            borderRadius: '0px', border: '1px solid #a0a09f',
                                            position: 'relative', top: '-14px', backgroundColor: 'white', color: 'black',
                                            justifyContent: 'left', fontFamily: 'Playfair Display', fontWeight: '400'
                                        }}>
                                        Select
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu style={{ width: '400px', borderRadius: '0px' }}>
                                        <Dropdown.Item href="#/action-1">Large</Dropdown.Item>
                                        <Dropdown.Item href="#/action-1">Medium</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown></div> : ''}
                        <div>
                            <p className='lightfont'
                                style={{ fontFamily: 'Montserrat' }}>Quantity </p>
                            <InputGroup
                                style={{
                                    border: '1px solid black', display: 'flex', padding: '0px', justifyContent: 'center',
                                    width: '100px', textAlign: 'center', marginBottom: '15px'
                                }}>
                                <Button
                                    onClick={handleDecrement}
                                    style={{
                                        backgroundColor: 'white', border: 'none', width: '19px', color: 'black',
                                        padding: '0px', margin: '0px', height: '30px', textAlign: 'center', display: 'flex'
                                    }}>-</Button>
                                <FormGroup>
                                    <FormControl type='number' value={quantity}
                                        style={{ width: '45px', height: '30px', border: 'none' }} />
                                </FormGroup>
                                <Button onClick={handleIncrement}
                                    style={{
                                        backgroundColor: 'white', border: 'none', width: '19px', color: 'black',
                                        padding: '0px', margin: '0px', height: '30px', textAlign: 'center'
                                    }}>+</Button>
                            </InputGroup>
                        </div>
                        <div className="buttons">
                            <div>
                                <Button className='addcartButton' onClick={handleaddcart}> Add to cart</Button>
                            </div>
                            <div>
                                <Button className='buynowButton'
                                >Buy now </Button>
                            </div>
                        </div>
                        <div className="artdetails" style={{ fontFamily: 'Montserrat', fontSize: '15px' }}>
                            <div className="materials" onClick={() => { setMaterialsissplus(!materialsisplus) }}
                            >
                                <p>Materials</p>
                                <p>
                                    {materialsisplus ? <FontAwesomeIcon icon={faMinus} className='custom-icon' />
                                        : <FontAwesomeIcon icon={faPlus} className='custom-icon' />}
                                </p>
                            </div>
                            {artwork?.category === 'prints' ?
                                <div className="size" onClick={() => { setSizeisplus(!sizeisplus) }}
                                    style={{ letterSpacing: '2px', display: 'flex' }}>
                                    <p className='item'>Size</p>
                                    <p className='plussign'>
                                        {sizeisplus ? <FontAwesomeIcon icon={faMinus} className='custom-icon' />
                                            : <FontAwesomeIcon icon={faPlus} className='custom-icon' />}</p>
                                </div> : ''}
                            <div className="payement" onClick={() => { setPayementsplus(!payementisplus) }}
                                style={{ fontFamily: 'Montserrat', display: 'flex', justifyContent: 'space-between' }}>
                                <p>Payement</p>
                                <p>{payementisplus ? <FontAwesomeIcon icon={faMinus} className='custom-icon' />
                                    : <FontAwesomeIcon icon={faPlus} className='custom-icon' />}</p>
                            </div>
                            <div className="shipping" onClick={() => { setShippingisplus(!shippingisplus) }}
                                style={{ fontFamily: 'Montserrat', display: 'flex', justifyContent: 'space-between' }}>
                                <p>Shipping</p>
                                <p>
                                    {shippingisplus ? <FontAwesomeIcon icon={faMinus} className='custom-icon' />
                                        : <FontAwesomeIcon icon={faPlus} className='custom-icon' />}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="history" onClick={() => { setHistory(!history) }}
                style={{
                    fontFamily: 'Montserrat',
                    textAlign: 'center', fontSize: '18px'
                }}>
                <div
                    style={{
                        fontFamily: 'Playfair Display', display: 'flex', justifyContent: 'space-between',
                        flexDirection: 'column',
                        textAlign: 'center', fontSize: '19px', width: '830px',
                        borderBottom: '1px solid #d5d5d5'
                    }}>
                    <div style={{
                        display: 'flex', justifyContent: 'space-between',
                    }}>
                        <p>History Of The Artwork</p>
                        <p style={{ cursor: 'pointer', textAlign: 'left' }}>
                            {history ? <FontAwesomeIcon icon={faMinus} className='custom-icon' /> :
                                <FontAwesomeIcon icon={faPlusLight} className='custom-icon' />}
                        </p>
                    </div>
                    <div style={{
                        display: 'flex', justifyContent: 'left', alignContent: 'left'
                    }}>
                        {history && <p style={{
                            textAlign: 'left', fontSize: '17px',
                        }}>{artwork?.history} </p>}
                    </div>
                </div>
            </div>
            <div style={{ padding: '19px 15px', fontFamily: 'Playfair Display' }}>
                <p style={{ fontSize: '31px', paddingLeft: '40px' }}>Artwork You May Also Like</p>
                <div style={{
                    display: 'flex', flexWrap: 'wrap', justifyContent: 'left',
                    paddingLeft: '10px'
                }}>
                    {filtered.map((item) => (
                        <div key={item._id} onClick={handlelinkClick}>
                            <Artworkcard artpeice={item} />
                        </div>
                    ))}
                </div>
            </div>
            {cartclick &&
                <Offcanvascart show={cartclick} hide={() => { setCartclick(false) }} placement={'end'} />
            }
            <Homefooter />
        </motion.div>
    )
}

export default Productpage;