import React, { useEffect } from 'react';
import './mycartItem.css';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import removeIcon from '../../assets/images/close.png';
import { FormGroup, FormControl, InputGroup } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';
import _debounce from 'lodash/debounce';
function MycartItem({ artwork }) {
    const [quantity, setQuantity] = useState(1);
    const [cartitems, setcartitems] = useState([]);
    const [click, setClick] = useState(true);
    const handleQuantityChange = async () => {
        const data = { quantity: Number(quantity), artworkid: artwork.id };
        console.log('data sent ', data);
        try {
            console.log('new valuueeeetttttttt', data)
            const response = await fetch('http://localhost:8001/api/updateincrement', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data }),
            });
            if (response.ok) {
                console.log('respooonse', response.message);
            }
            else {
                console.log('response error');
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    const debouncedHandleQuantityChange = _debounce(handleQuantityChange, 500);
    const handleDecrease = () => {
        setClick(false);
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    }
    const handleIncrease = () => {
        const newvalue = parseInt(quantity) + 1;
        setQuantity(newvalue);
        console.log('gggggg', quantity);
        debouncedHandleQuantityChange(newvalue);
    }
    const handleremoveclick = async () => {
        const token = localStorage.getItem('userToken');
        const decoded = jwtDecode(token);
        console.log('decccode', decoded);
        try {
            console.log('hellllo', artwork._id);
            const response = await fetch(`http://localhost:8001/api/removeartwork?id=${artwork._id}&userid=${decoded.userid} `);
            if (response.ok) {
                const res = await response.json();
            }
            else {
                console.log('error in the response');
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        setQuantity(artwork.quantity);
    }, []);
    const file = `http://localhost:8001/uploads/${artwork.fileurl}`;
    return (
        <div className='mycart'
            style={{
                display: 'flex', borderBottom: '1px solid #d5d5d5', padding: '30px 4px',
                fontFamily: 'Playfair Display', color: 'rgb(95, 93, 93)'
            }}>
            <div className=''
                style={{
                    display: 'flex', alignItems: 'flex-start', position: 'relative',
                    right: '40px'
                }}>
                <div className='artworkpicture'>
                    <img src={file} alt='picture' width='110px' height='140px' />
                </div>
                <div className='artworkdetails'
                    style={{
                        display: 'flex', flexDirection: 'column', marginLeft: '10px',
                        alignItems: 'flex-start'
                    }}>
                    {artwork.category === 'originals' ?
                        <div>
                            <p style={{ fontSize: '18px' }}>
                                {artwork.title}  - Original</p>
                            <p style={{ marginTop: '-13px' }}>Painting</p></div> :
                        <p style={{ fontSize: '18px' }}> {artwork.title}  </p>}
                    <p style={{ marginTop: '-14px', fontSize: '18px' }}> C$ {artwork.price} </p>
                </div>
            </div>
            <div className='quantity' style={{ marginLeft: '69px' }}>
                <InputGroup
                    style={{
                        border: '1px solid black', display: 'flex', padding: '0px', justifyContent: 'center',
                        width: '90px', textAlign: 'center'
                    }}>
                    <Button
                        onClick={handleDecrease}
                        style={{
                            backgroundColor: 'white', border: 'none', width: '19px', color: 'black',
                            padding: '0px', margin: '0px', height: '30px', textAlign: 'center'
                        }}>-</Button>
                    <FormGroup>
                        <FormControl type='number' value={quantity} onChange={(e) => { setQuantity(e.target.value) }}
                            style={{ width: '49px', height: '30px', border: 'none' }} />
                    </FormGroup>
                    <Button onClick={handleIncrease}
                        style={{

                            backgroundColor: 'white', border: 'none', width: '19px', color: 'black',
                            padding: '0px', margin: '0px', height: '30px', textAlign: 'center'
                        }}>+</Button>
                </InputGroup>
            </div>
            <div className='price' style={{ marginLeft: '19px' }}>
                <p style={{ fontSize: '18px' }}>C$ {artwork.price} </p>
            </div>
            <div className='cancel' style={{ marginLeft: '39px', cursor: 'pointer' }}
                onClick={handleremoveclick} >
                <img src={removeIcon} width='16px' height='16px' />
            </div>
        </div>

    )
}
export default MycartItem;