import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import './artworkmodal.css';
import { jwtDecode } from 'jwt-decode';
import topshoppicture from '../../assets/images/herflower.png';
import Offcanvascart from '../../header/offcanvascart';
import { Link } from 'react-router-dom'; import _debounce from 'lodash/debounce';
import { Button, Dropdown, DropdownMenu, DropdownToggle, FormControl, FormGroup, InputGroup } from 'react-bootstrap';
function Artworkmodal({ isopen, isclose, artwork }) {
    const [qclick, setQclick] = useState(false);
    const [click, setClick] = useState(false);
    const [close, setClose] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const handleQuantityChange = async () => {
        const userId = jwtDecode(localStorage.getItem('userToken'));
        console.log('ffffhhhhhh', userId);
        const data = { quantity: Number(quantity), artworkid: artwork._id, userId: userId.userid };
        try {
            const response = await fetch('http://localhost:8001/api/addtocart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'Application/json'
                },
                body: JSON.stringify({ data }),
            });
            if (response.ok) {
                const res = await response.json();
                console.log('respppp', res);
            }
            else {
                console.log('error in the responses data');
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    const debouncedHandleQuantityChange = _debounce(handleQuantityChange, 500);
    const handleaddcart = () => {
        isclose();
        handleQuantityChange();
        console.log('fffffffff', quantity);
    }
    const handleIncrease = () => {
        setQuantity(quantity + 1);
    }
    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    }
    useEffect(() => {
        console.log('fffffffffff', artwork._id);
    });
    const fullFileUrl = `http://localhost:8001/uploads/${artwork.fileurl}`;
    return (
        <div className='qview'>
            <Modal centered show={isopen} onHide={isclose} dialogClassName='custom-modal'
                style={{
                    borderRadius: '0px', justifyContent: 'center',
                    border: '0px', borderRadius: '0', maxHeight: '80%', alignContent: 'center'
                }}>
                <Modal.Body>
                    <div className="modalbody"
                        style={{
                            display: 'flex', flexDirection: 'row', height: '500px',
                            padding: '30px', justifyItems: 'center'
                        }}>
                        <div className="leftpart" >
                            <img src={fullFileUrl} width='390px' height='440px' />
                        </div>
                        <div className="rightpart" style={{ width: '400px' }}>
                            <div style={{
                                display: 'flex', flexDirection: 'column', justifyContent: 'left'
                                , alignItems: 'left', margin: '10px'
                            }}>
                                <p style={{
                                    fontFamily: 'Playfair Display', fontSize: '26px'
                                    , color: '#575757', fontWeight: '400'
                                }}>{artwork.title} </p>
                                <div className="">
                                    {artwork.category === 'Originals' &&
                                        <p style={{
                                            color: '#575757', fontSize: '23px',
                                            fontFamily: 'Playfair Display', position: 'relative',
                                            top: '-14px'
                                        }}> Original Painting </p>}
                                </div>
                            </div>
                            {artwork.category !== 'Originals' &&
                                <div style={{ marginTop: '-19px' }}>
                                    <div className='div'>
                                        <p>Size </p>
                                        <Dropdown className='sizedropdown'>
                                            <DropdownToggle style={{
                                                width: '340px', backgroundColor: 'white',
                                                border: '1px soild black', color: 'black', display: 'flex',
                                                justifyContent: 'space-between', alignItems: 'center'
                                            }}> Select</DropdownToggle>
                                            <DropdownMenu>Large</DropdownMenu>
                                            <DropdownMenu>Medium</DropdownMenu>
                                        </Dropdown>
                                    </div>
                                    <div className='div'>
                                        <p>Quantity </p>
                                        <InputGroup
                                            style={{
                                                border: '1px solid black', display: 'flex', padding: '0px', justifyContent: 'center',
                                                width: '80px', textAlign: 'center'
                                            }}>
                                            <Button onClick={handleDecrease} value={quantity} onChange={(e) => { setQuantity(e.target.value) }}
                                                style={{
                                                    backgroundColor: 'white', border: 'none', width: '19px', color: 'black',
                                                    padding: '0px', margin: '0px', height: '30px', textAlign: 'center'
                                                }}>-</Button>
                                            <FormGroup>
                                                <FormControl type='number' value={quantity} onChange={(e) => { setQuantity(e.target.value) }}
                                                    style={{ width: '41px', height: '30px', border: 'none' }} />
                                            </FormGroup>
                                            <Button onClick={handleIncrease} value={quantity} onChange={(e) => { setQuantity(e.target.value) }}
                                                style={{
                                                    backgroundColor: 'white', border: 'none', width: '19px', color: 'black',
                                                    padding: '0px', margin: '0px', height: '30px', textAlign: 'center'
                                                }}>+</Button>
                                        </InputGroup>
                                    </div>
                                </div>
                            }
                            {artwork.category === 'Originals' &&
                                <div style={{ marginTop: '-19px' }}>
                                    <div className='div'>
                                        <p>Quantity </p>
                                        <InputGroup
                                            style={{
                                                border: '1px solid black', display: 'flex', padding: '0px', justifyContent: 'center',
                                                width: '80px', textAlign: 'center'
                                            }}>
                                            <Button onClick={handleDecrease}
                                                style={{
                                                    backgroundColor: 'white', border: 'none', width: '19px', color: 'black',
                                                    padding: '0px', margin: '0px', height: '30px', textAlign: 'center'
                                                }}>-</Button>
                                            <FormGroup>
                                                <FormControl type='number' value={quantity} onChange={(e) => { setQuantity(e.target.value) }}
                                                    style={{ width: '41px', height: '30px', border: 'none' }} />
                                            </FormGroup>
                                            <Button onClick={handleIncrease}
                                                style={{
                                                    backgroundColor: 'white', border: 'none', width: '19px', color: 'black',
                                                    padding: '0px', margin: '0px', height: '30px', textAlign: 'center'
                                                }}>+</Button>
                                        </InputGroup>
                                    </div>
                                </div>
                            }
                            <div className="div">
                                <button onClick={handleaddcart}
                                    style={{
                                        backgroundColor: '#da3e48',
                                        width: '340px', height: '40px', border: 'none', color: 'white',
                                        justifyContent: 'end', marginTop: '15px'
                                    }}>Add cart</button>
                            </div>
                            <div>
                                <Link to={`/artworks-page/${artwork._id}`}
                                    style={{ color: 'black', margin: '10px' }}>View More Details</Link>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div >
    )
}

export default Artworkmodal;