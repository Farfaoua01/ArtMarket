import React, { useEffect, useRef, useState } from 'react'
import Topnavbar from '../../header/navbar';
import './profile.css';
import Form from 'react-bootstrap/Form';
import { Button, FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';
import { Link, useNavigate } from 'react-router-dom';
function Profile() {
    const [selectedItem, setSelectedItem] = useState('account');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [usertoken, setUsertoken] = useState('');
    const getuser = async () => {
        try {
            const token = localStorage.getItem('userToken');
            if (token) {
                const tokenid = jwtDecode(token);
                const response = await fetch(`http://localhost:8001/api/getuserinfo?userid=${tokenid.userid}`);
                if (response.ok) {
                    const res = await response.json();
                    console.log("responnse", res.user);
                    setEmail(res.user.email);
                    setFirstname(res.user.firstname);
                    setLastname(res.user.lastname);
                    setPhone(res.user.phone);
                }
                else {
                    console.log('errorrrrrrrrrrrrr');
                }
            }
        }
        catch (e) {
            console.error('errorrrrrrrrrr', e);
        }

    }
    const handleSubmit = async () => {
        const data = {
            firstname: firstname,
            lastname: lastname,
            email: email,
            phone: phone,
            pictureurl: image
        };
        const id = usertoken.userid;
        try {
            const response = await fetch(`http://localhost:8001/api/userupdate?token=${id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'Application/json'
                },
                body: JSON.stringify({ data }),
            });
            if (response.ok) {
                const res = await response.json();
            }
            else {
                console.log('error');
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    const handlediscart = () => {
        window.location.reload(true);
    }
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('userToken');
        if (token) {
            const tokenid = jwtDecode(token);
            setUsertoken(tokenid);
        }
    }, []);
    useEffect(() => {
        getuser();
        window.scrollTo(0, 0);
    }, []);
    const fileInputRef = useRef(null);
    const [image, setImage] = useState(null);
    const handleButtonClick = () => {
        fileInputRef.current.click();
    };
    const handleFileChange = (e) => {
        // Handle file change
        if (e.target.files[0]) {
            let img = e.target.files[0];
            setImage(URL.createObjectURL(img));
            console.log('imgg', image);
        }
        console.log(e.target.files[0]);
    }
    return (
        <div style={{ height: '100vh', margin: '0px', padding: '0px' }}>
            {usertoken ?
                <div >
                    <div style={{ marginBottom: '10px' }}>
                        <Topnavbar />
                    </div>
                    <div className='personalspace' style={{
                        display: 'flex', fontFamily: 'montserrat',
                        marginTop: '59px'
                    }}>
                        <div className='leftpart'
                            style={{
                                display: 'flex', flexDirection: 'column', justifyContent: 'right',

                            }}>
                            <div className='userpicture'>
                                <div style={{
                                    fontSize: '14px', display: 'flex',
                                    flexDirection: 'column', justifyContent: 'center', padding: '10px'
                                }}>
                                    <div className='updatepicture' style={{
                                        width: '150px', height: '150px', textAlign: 'center'
                                    }}>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={handleFileChange}
                                            style={{ display: 'none' }} // Hide the default input
                                            accept="image/*"
                                        />
                                        <Link onClick={handleButtonClick} className=""
                                            style={{
                                                width: '130px', backgroundColor: 'white',
                                                color: 'black', padding: '0px', fontSize: '13px'
                                            }}>
                                            Choose Picture
                                        </Link>
                                    </div>

                                </div>
                            </div>
                            <div className='userselections'>
                                <ul style={{ listStyle: 'none', fontSize: '16px' }}>
                                    <li onClick={() => { setSelectedItem('orders') }}> My orders </li>
                                    <li onClick={() => { setSelectedItem('account') }}> My Account </li>
                                </ul>
                            </div>
                        </div>

                        <div className='rightpart'>
                            {selectedItem === 'orders' &&
                                <div>
                                    <div style={{
                                        borderBottom: '1px solid lightgray', margin: '19px 15px',
                                        paddingBottom: '15px'
                                    }}>
                                        <h1 style={{ fontFamily: 'Montserrat', fontSize: '30px' }}>My Order</h1>
                                        <p> View your order history and check the status of your recent orders</p>

                                    </div>
                                </div>}
                            {selectedItem === 'account' &&
                                <div>
                                    <div style={{
                                        borderBottom: '1px solid lightgray', margin: '19px 15px',
                                        paddingBottom: '15px'
                                    }}>
                                        <h1 style={{ fontFamily: 'Montserrat', fontSize: '30px' }}>My account</h1>
                                        <p> View and Edit your personnal information</p>
                                    </div>
                                    <div style={{ marginLeft: '33px', fontSize: '13px' }}>
                                        <p>Your adress mail :</p>
                                        <p>The mail field can't be changed .</p>
                                    </div>
                                    <div className='account'>
                                        <Form onSubmit={handleSubmit}>
                                            <div>
                                                <div style={{ display: 'flex', justifyContent: 'left' }}>
                                                    <div className='formleftpart'
                                                        style={{ margin: '10px 10px' }}>
                                                        <div>
                                                            <FormGroup>
                                                                <FormLabel> First name :</FormLabel>
                                                                <FormControl type='text' value={firstname}
                                                                    onChange={(e) => { setFirstname(e.target.value) }}
                                                                    style={{ fontSize: '14px' }} />
                                                            </FormGroup>
                                                        </div>
                                                        <div>
                                                            <FormGroup>
                                                                <FormLabel> Email:</FormLabel>
                                                                <FormControl type='text' value={email}
                                                                    style={{ fontSize: '14px' }}
                                                                    readOnly />
                                                            </FormGroup>
                                                        </div>
                                                    </div>
                                                    <div className='formrightpart'
                                                        style={{ margin: '10px 10px' }}>
                                                        <div>
                                                            <FormGroup>
                                                                <FormLabel> Last name :</FormLabel>
                                                                <FormControl type='text' value={lastname}
                                                                    style={{ fontSize: '14px' }} onChange={(e) => { setLastname(e.target.value) }} />
                                                            </FormGroup></div>
                                                        <div>
                                                            <FormGroup>
                                                                <FormLabel>Phone :</FormLabel>
                                                                <FormControl type='text' value={phone}
                                                                    style={{ fontSize: '15px' }} onChange={(e) => { setPhone(e.target.value) }} />
                                                            </FormGroup></div>
                                                    </div>
                                                </div>

                                                <div className='accountsbutton' style={{ marginLeft: '111px' }}>
                                                    <Button className='discartbutton' onClick={handlediscart}
                                                    > Discart
                                                    </Button>
                                                    <Button className='updatebutton' type='submit'> Update</Button>
                                                </div>
                                            </div>
                                        </Form>
                                    </div>
                                </div>}

                        </div>
                    </div>
                </div> : navigate('/')}
        </div>
    )
}

export default Profile;