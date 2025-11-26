import React, { useEffect, useRef, useState } from 'react';
import './artwork.css';
import { FormControl, FormGroup, FormLabel, ModalBody, Table, Toast } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { InputGroup } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Dialogaddartwork from './dialogaddartwork';
import { Link } from 'react-router-dom';
function Artwork() {
    const [addclick, setAddclick] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [quantity, setQuantity] = useState('');
    const [stock, setStock] = useState('');
    const [medium, setMedium] = useState('');
    const [price, setPrice] = useState('0');
    const [selectedfiles, setSelectedfiles] = useState([]);
    const [picture, setPicture] = useState('');
    const [toast, setToast] = useState(false);
    const [click, setClick] = useState(false);
    const [show, setShow] = useState(false);
    const [history, setHistory] = useState('');
    const [artworks, setArtworks] = useState(['']);
    const fileInputRef = useRef(null);
    const ButtonClicked = () => {
        fileInputRef.current.click();
    }
    const handlesubmit = async (e) => {
        e.preventDefault();
       formData.append("file", selectedfiles[0]);
        formData.append('title', title);
        formData.append('category', category);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('quantity', quantity);
        formData.append('history', history);
        console.log('form data', formData);
        console.log('title', title);
        console.log('category', category);

        /*  const artworkdata = {
             title: title,
             description: description,
             price: price,
             category: category,
             quantity: quantity,
             medium: medium,
             stock: stock,
             formdata: formData
         } */
        console.log('formm data', formData);
        try {
            const response = await fetch('http://localhost:8001/api/addartwork', {
                method: 'POST',
                body: formData,
            });
            if (response.ok) {
                const res = await response.json();
                console.log('res', res);
                console.log('pictureee', picture);/*
                setPrice('');
                setDescription('');
                setQuantity('');
                setCategory('');
                setTitle('');
                setSelectedfiles(null);
                setToast(true); */
                console.log('tttt', toast);
                setShow(true);
                setAddclick(false);
            }
            else {
                console.log('Error no responses ');
            }
        }
        catch (error) {
            console.log('error', error);
        }

    }
    const handleDecrement = () => {
        if (price > 0) {
            setPrice(price - 1);
        }
    }
    function formatDateAndTime(timestamp) {
        const dateObject = new Date(timestamp);
        return {
            date: dateObject.toLocaleDateString(),
            time: dateObject.toLocaleTimeString(),
        };
    }
    const handleClick = () => {
        setClick(!click);
    }
    const handleIncrement = () => {
        setPrice(price + 1);
    }
   const handlefilechange = (event) => {
    const file = event.target.files[0];
    setSelectedfiles([file]);
};

    const fetchartworks = async () => {
        try {
            const response = await fetch('http://localhost:8001/api/getartworks');
            if (response.ok) {
                const res = await response.json();
                setArtworks(res.artworks);
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
        fetchartworks();
    }, []);
    const file = 'http://localhost:8001/uploads/';
    return (
        <>
            <section>
                <div className="artworkcontainer">
                    <div className="title">
                        <div>
                            <h1>Artworks</h1>
                        </div>
                        <div className="form">
                            <Form>
                                <FormControl placeholder='Search artwork'
                                    type='text' className='searchcontrol'
                                >
                                </FormControl>
                            </Form>
                        </div>
                        <div className="button">
                            <Button className='addbutton'
                                onClick={() => { setAddclick(!addclick) }}
                                style={{
                                    backgroundColor: ' rgb(123, 181, 238)', color: 'black', border: 'none'
                                    , justifyContent: 'center',
                                    fontSize: '13px', marginLeft: '16px', display: 'flex'
                                }}>+ Add artwork</Button>
                        </div>
                    </div>
                    <div className="addartwork">
                        {addclick &&
                            <div className=''>
                                <div className='flextitle'>
                                    <div>
                                        <Button className='backbutton'
                                            onClick={() => { setAddclick(false) }}
                                            style={{
                                                width: '50px', height: '50px', backgroundColor: 'white',
                                                border: '1px solid #888b92'
                                            }}></Button>
                                    </div>
                                    <div className="rowflextitle">
                                        <div className="">
                                            <p>Back to artwork list</p>
                                        </div>
                                        <div className="">
                                            <h1>Add New Artwork</h1>
                                        </div>
                                    </div>
                                </div>
                                <div className='formbackground'>
                                    <Form onSubmit={handlesubmit}>
                                        <div className="artworklist">
                                            <div className="leftpartaddwork">
                                                <div>
                                                    <h1>Description</h1>
                                                    <div className="description">
                                                        <FormGroup>
                                                            <FormLabel> Artwork Name</FormLabel>
                                                            <FormControl type='text' value={title} className='custom-input'
                                                                onChange={(e) => { setTitle(e.target.value) }} style={{ width: '400px' }} />
                                                        </FormGroup>
                                                        <FormGroup>
                                                            <FormLabel> Artwork Description</FormLabel>
                                                            <FormControl type='text' as='textarea' rows={5}
                                                                value={description}
                                                                onChange={(e) => { setDescription(e.target.value) }}
                                                                style={{ width: '400px' }} />
                                                        </FormGroup>
                                                    </div>
                                                </div>
                                                <div>
                                                    <h1>History</h1>
                                                    <div className="description">
                                                        <FormGroup>
                                                            <FormLabel> Artwork History</FormLabel>
                                                            <FormControl type='text' as='textarea' rows={5}
                                                                value={history} className='custom-input'
                                                                onChange={(e) => { setHistory(e.target.value) }}
                                                                style={{ width: '400px' }} />
                                                        </FormGroup>
                                                    </div>
                                                </div>
                                                <div>
                                                    <h1>Category</h1>
                                                    <div className="description">
                                                        <FormGroup>
                                                            <FormLabel> Artwork Category</FormLabel>
                                                            <FormControl as='select' value={category} className='custom-input'
                                                                onChange={(e) => { setCategory(e.target.value) }}
                                                                style={{ width: '400px' }} >
                                                                <option></option>
                                                                <option>Prints </option>
                                                                <option>Originals </option>
                                                                <option>Artwar</option>
                                                            </FormControl>
                                                        </FormGroup>
                                                    </div>
                                                </div>
                                                <div>
                                                    <h1>Invotory</h1>
                                                    <div className="description">
                                                        <FormGroup>
                                                            <FormLabel> Quantity</FormLabel>
                                                            <FormControl type='text' style={{ width: '90px' }}
                                                                value={quantity} className='custom-input'
                                                                onChange={(e) => { setQuantity(e.target.value) }}
                                                            />
                                                        </FormGroup>
                                                    </div>
                                                </div>                                            </div>
                                            <div className="rightpartaddwork">
                                                <div className="rightpartaddwork">
                                                    <h1>Artwork Images</h1>
                                                    <div className="description">
                                                        <FormGroup>
                                                            <FormControl type='file' name='files' accept='image/*'
                                                                onChange={handlefilechange}
                                                                style={{ display: 'none' }}
                                                                multiple
                                                                ref={fileInputRef} />
                                                            <div style={{ display: 'flex', }}>
                                                                <div>
                                                                    <Button onClick={ButtonClicked}
                                                                        style={{
                                                                            width: '170px', height: '170px',
                                                                            backgroundColor: 'white', color: 'gray'
                                                                        }}>
                                                                        <Link>  Click to upload </Link></Button>
                                                                </div>
                                                                <div style={{ width: '300px', height: '170px', backgroundColor: 'gray' }}>
                                                                    {selectedfiles.map((file, index) => (
                                                                        <div key={index} style={{ display: 'flex' }}>
                                                                            <div>
                                                                                <img src={URL.createObjectURL(file)}
                                                                                    style={{ width: '40px', height: '80px' }} />
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </FormGroup>
                                                    </div>
                                                    <div>
                                                        <h1>Pricing </h1>
                                                        <div className="description">
                                                            <FormLabel>Price</FormLabel>
                                                            <InputGroup className="mb-3" style={{ width: '190px' }}>
                                                                <InputGroup.Text id="basic-addon1">
                                                                    $
                                                                </InputGroup.Text>
                                                                <FormControl
                                                                    value={price}
                                                                    onChange={(e) => setPrice(e.target.value)}
                                                                />
                                                            </InputGroup>
                                                        </div>
                                                    </div>
                                                    <div className='buttonspart'>
                                                        <div className="discartbutton">
                                                            <Button style={{
                                                                width: '100px', color: 'black', border: '1px solid black',
                                                                backgroundColor: 'white', fontSize: '14px'
                                                            }}>Discart</Button>
                                                        </div>
                                                        <div className="submitbutton">
                                                            <Button style={{
                                                                width: '150px',
                                                                backgroundColor: ' rgb(123, 181, 238)', color: 'black', border: 'none',
                                                                fontSize: '14px'
                                                            }} type='submit'>Add Artwork</Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Form>
                                </div>
                            </div>
                        }
                    </div>
                    <div className='displayarworks'>
                        <Table>
                            <thead style={{
                                fontFamily: 'montserrat', fontSize: '13px',
                                color: '', fontWeight: 'lighter'
                            }}>
                                <tr>
                                    <th> #</th>
                                    <th>Artwork ID</th>
                                    <th> Title</th>
                                    <th> Price</th>
                                    <th> Creation Date</th>
                                    <th> </th>
                                </tr>
                            </thead>
                            <tbody style={{ fontSize: '14px' }}>
                                {artworks.map(artwork => (
                                    <tr key={artwork._id} >
                                        <td><img src={`http://localhost:8001/uploads/${artwork.fileurl}`}
                                            style={{ width: '43px', height: '43px' }} /></td>
                                        <td>{artwork._id}</td>
                                        <td>{artwork.title}</td>
                                        <td>{artwork.price}</td>
                                        <td>{(() => {
                                            const { date, time } = formatDateAndTime(artwork.created_at);
                                            return <div>{date} - {time}</div>;
                                        })()} </td>
                                        <td>
                                            <Button onClick={handleClick}
                                                style={{
                                                    width: '30px',
                                                    backgroundColor: 'gray', border: 'none'
                                                }}> D</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </div >
            </section >

        </>
    )
}

export default Artwork