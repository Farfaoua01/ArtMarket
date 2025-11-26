import React, { useEffect, useState } from 'react';
import './home.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link, json } from 'react-router-dom';
import shopartflist from '../../assets/images/shopartflist.png';
import herflower from '../../assets/images/herflower.png';
import Artworkmodule from './artworkmodal';
import Artworkmodal from './artworkmodal';
import Offcanvascart from '../../header/offcanvascart';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { jwtDecode } from 'jwt-decode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CardText } from 'react-bootstrap';
function Artworkcard({ artpeice, cartstatus }) {
    const [ishover, setIshover] = useState(false);
    const [qclicked, setQclicked] = useState(false);
    const [artworkid, setArtworkid] = useState('');
    const [hoverbutton, setHoverbutton] = useState(false);
    const [cartclick, setCartclick] = useState(false);
    const [open, setOpen] = useState(false);
    const [show, setShow] = useState(false);
    const [favorits, setFavorits] = useState(false);
    const [isLogged, setIsLogged] = useState(false);
    const [showcart, setShowcart] = useState(false);
    const [Items, setItems] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const quickclicked = (event) => {
        // Prevent the default behavior of the link
        event.preventDefault();
        setQclicked(true);
        console.log('click', qclicked);
    }
    const getStoredCartItems = () => {
        const storedItems = localStorage.getItem('cartItems');
        return storedItems ? JSON.parse(storedItems) : [];
    };
    // Function to store cart items in local storage
    const storeCartItems = (items) => {
        localStorage.setItem('cartItems', JSON.stringify(items));
    };
    const [cartItem, setCartItem] = useState([]);
    const addcartclick = async (event) => {
        // Prevent the default behavior of the link
        event.preventDefault();
        setCartclick(true);
        setArtworkid(artpeice._id);
        if (isLogged) {
            console.log('logged test', isLogged);
            const userid = jwtDecode(localStorage.getItem('userToken'));
            const data = { artworkid: artpeice._id, userid: userid.userid };
            const items = getStoredCartItems();
            console.log("eeeeelse");
            console.log("useeeerid", data);
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
                    console.log('respppp', res.message);
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
            setShowcart(cartstatus);
        }
    }
    const handleisclose = () => {
        setQclicked(false);
    }
    const handleisopen = () => {
        setOpen(true);
    }
    const checkUserLogging = () => {
        const logged = localStorage.getItem('userToken');
        return !!logged;
    }
    const handlelinkClick = (path) => {
        window.location.href = path;
    }
    useEffect(() => {
        setIsLogged(checkUserLogging());
        //localStorage.removeItem('cartItems');
    })
    useEffect(() => {
    })
    const addToFavorits = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('userToken');
        const tokenId = jwtDecode(token).userid;
        console.log('tttttokrn', artpeice._id);
        try {
            const response = await
                fetch(`http://localhost:8001/api/addToFatorits?id=${artpeice._id}&userid=${tokenId}`);
            if (response.ok) {
                const res = await response.json();
            }
            else {

            }
        }
        catch (e) {

        }
    }
    const title = artpeice.title;
    const fullFileUrl = `http://localhost:8001/uploads/${artpeice.fileurl}`;
    return (
        <div>
            <Link to={`/artworks-page/${artpeice._id}`} style={{ textDecoration: 'none' }} >
                <Card className='paintingcard'
                    onMouseEnter={() => { setIshover(true); }}
                    onMouseLeave={() => { setIshover(false) }}
                    style={{
                        width: '21rem', borderRadius: '0px'
                        , margin: '13px 19px', height: '550px', border: 'none', backgroundColor: 'transparent '
                    }}>
                    <div className="pictureholder">
                        <Card.Img className='artpicture' alt='picture'
                            variant="top" src={fullFileUrl}
                            style={{
                                borderRadius: '0px', height: '400px'
                            }} />
                    </div>
                    {ishover &&
                        <Button style={{
                            backgroundColor: 'rgba(125, 125, 125, 0.4)',
                            width: '21rem', height: '50px', borderRadius: '0px',
                            padding: '0px', margin: '0px', position: 'absolute', top: '350px',
                            border: 'none', color: 'white'
                        }} onClick={quickclicked}>Quick view</Button>}
                    <Card.Body style={{ backgroundColor: 'transparent' }}>
                        <Card.Text
                            style={{
                                fontFamily: 'Crimson Text', fontWeight: '400px',
                                display: 'flex', justifyContent: 'left'
                            }}>
                            <div style={{ display: 'flex', fontSize: '19px', color: '#4a4a4a', marginLeft: '-11px' }}>
                                <p style={{ fontSize: '19px' }}> <b>{title}</b> </p>
                                {artpeice.category === 'Originals' &&
                                    <p> -Original Painting </p>}
                            </div>
                        </Card.Text>
                        <div style={{
                            position: 'relative', top: '-45px', display: 'flex', color: '#4a4a4a',
                            justifyContent: 'space-between'
                        }}>
                            <Card.Text style={{
                                fontSize: '20px', position: 'relative', top: '13px',
                                marginLeft: '-11px'
                            }}>
                                C$ {artpeice.price}
                            </Card.Text>
                            {ishover &&
                                <FontAwesomeIcon icon={faHeartSolid} className='custom-icon'
                                    onClick={addToFavorits} style={{
                                        position: 'relative',
                                        top: '10px'
                                    }} />
                            }
                        </div>
                    </Card.Body>
                    {ishover &&
                        <Button onClick={addcartclick}
                            style={{
                                backgroundColor: '#2f2e2e',
                                width: '21rem', height: '40px', borderRadius: '0px', border: 'none',
                                position: 'absolute', top: '493px', margin: '0px'
                            }}>Add to Cart</Button>}
                </Card>
            </Link>
            {
                qclicked &&
                <Artworkmodal isclose={handleisclose} isopen={handleisopen} artwork={artpeice} />
            }
            {
                cartclick && isLogged &&
                <Offcanvascart show={cartclick} hide={() => { setCartclick(false) }}
                    placement={'end'} artwork={artpeice._id} />
            }
        </div >
    )
}
export default Artworkcard;