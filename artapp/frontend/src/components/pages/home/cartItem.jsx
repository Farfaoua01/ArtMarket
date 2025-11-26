import React, { useEffect, useState } from 'react';
import './cartItem.css';
import removeicon from '../../assets/images/close.png';
import { FormGroup, FormControl, Button, InputGroup } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';
import _debounce from 'lodash/debounce';
function CartItem({ artwork, quaty }) {
    const fullFileUrl = artwork?.fileurl ? `http://localhost:8001/uploads/${artwork.fileurl}` : null;
    const [quantity, setQuantity] = useState(1);
    const [logged, setLogged] = useState(false);
    const [arrayin, setArrayin] = useState([]);
    const handleQuantityChange = async () => {
        const data = { quantity: Number(quantity), artworkid: artwork.id };
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
    /*  const handleDecrease = async () => {
         let varb;
         if (Number(quaty) > 1) {
             varb = Number(quaty) - 1;
             console.log('DECREASEEEE', varb);
             const update = async () => {
                 const data = { quantity: varb, id: artwork.id }
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
             update();
         }
     }
     const handleIncrease = async () => {
         let varb = 0;
         varb = Number(quaty) + 1;
         const increaseUpdate = async () => {
             const data = { quantity: varb, id: artwork.id }
             try {
                 const response = await fetch('http://localhost:8001/api/updateQuantity', {
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
         increaseUpdate();
     } */
    const handlequantity = async (e) => {
        // setQuantity(quantity);
        /* const data = { quantity: quantity, id: artwork._id }
        try {
            const response = await fetch('http://localhost:8001/api/updateQuantity?quntity=${quntity} ', {
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
        } */
    }
    const getStoredCartItems = () => {
        const storedItems = localStorage.getItem('cartItems');
        return storedItems ? JSON.parse(storedItems) : [];
    };
    const handleremoveclick = async () => {
        if (logged) {
            const token = localStorage.getItem('userToken');
            const decoded = jwtDecode(token).userid;
            console.log('decccode', decoded);
            try {
                console.log('hellllo', artwork._id);
                const response = await fetch(`http://localhost:8001/api/removeartwork?id=${artwork.id}&userid=${decoded} `);
                if (response.ok) {
                    const res = await response.json();
                    console.log(res.message);
                    console.log('helo');
                }
                else {
                    console.log('error in the response');
                }
            }
            catch (e) {
                console.log(e);
            }
        }
        else {
            const items = getStoredCartItems();
            const indexToRemove = items.findIndex(item => item.artworkid === artwork._id);
            if (indexToRemove !== -1) {
                items.splice(indexToRemove, 1);
                console.log('Item removed successfully');
            } else {
                console.log('Item not found');
            }
            localStorage.setItem('cartItems', JSON.stringify(items));
            console.log('remove after ', items);
        }
    }
    const handlequntity = async (e) => {
        setQuantity(e.target.value);
        /* const data = { quantity: quantity, id: artwork.id }
        console.log('datttta', data);
        try {
            const response = await fetch('http://localhost:8001/api/updateQuntity', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data }),
            });
            if (response.ok) {
                const res = await response.json();
            }
            else {
                console.log('error response');
            }
        }
        catch (e) {
            console.error(e);
        } */
    }
    const handleIncrease = async (id, quantity) => {
        const newvalue = parseInt(quantity) + 1;
        console.log('befoore ', newvalue);
        setQuantity(newvalue);
        console.log('afterr ', quantity);
        debouncedHandleQuantityChange(newvalue);
        console.log('quannntityyy ', quantity);
        console.log('rrrrrrrrrrrrrrrrrrrr', newvalue);
    }
    const handleDecrease = async () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
            debouncedHandleQuantityChange(quantity - 1);
        }
    }
    useEffect(() => {
        setQuantity(artwork.quantity);
        const token = localStorage.getItem('userToken');
        if (token) {
            setLogged(true);
        }
    }, [])
    useEffect(() => {
        console.log('Updated quantity:', quantity);
    }, []);
    return (
        <>
            <div className='container'
                style={{
                    display: 'flex',
                    flexDirection: 'row'
                }}>
                <div className='leftpartcard'>
                    <img src={fullFileUrl} alt='picture' />
                </div>
                <div className='rightpartcard'>
                    <div>
                        <h1>{artwork?.title}</h1>
                        {artwork?.category === 'Originals' &&
                            <p style={{ position: 'relative', top: '-3px', fontSize: '14px' }}>-Original Painting </p>}
                    </div>
                    <div>
                        <h1 style={{ position: 'relative', top: "-7px" }}>
                            C$ {artwork?.price}</h1>
                    </div>
                    <InputGroup
                        style={{
                            border: '1px solid black', display: 'flex', padding: '0px', justifyContent: 'center',
                            width: '90px', textAlign: 'center'
                        }}>
                        <Button onClick={handleDecrease}
                            style={{
                                backgroundColor: 'white', border: 'none', width: '19px', color: 'black',
                                padding: '6px', margin: '0px', height: '30px', textAlign: 'center'
                            }}>-</Button>
                        <FormGroup>
                            <FormControl type='number' value={quantity} onChange={(e) => { setQuantity(e.target.value) }}
                                style={{ width: '46px', height: '30px', border: '0px solid black' }} readOnly={false} />
                        </FormGroup>
                        <Button onClick={() => { handleIncrease(artwork.id, quantity) }}
                            style={{
                                backgroundColor: 'white', border: 'none', width: '19px', color: 'black',
                                padding: '0px', margin: '0px', height: '30px', textAlign: 'center'
                            }}>+</Button>
                    </InputGroup>
                </div>
                <div onClick={handleremoveclick}
                    style={{ cursor: 'pointer' }}>
                    <img src={removeicon} width='16px' height='16px' />
                </div>
            </div>
        </>
    )
}
export default CartItem;