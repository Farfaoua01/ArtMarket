import { FormGroup, Form, FormControl, Button, FormLabel } from 'react-bootstrap';
import { Modal, ModalHeader } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Googleloginbutton from './Gooleloginbutton';
import './navbar.css';
import LoadingSpinner from './loadingSpinner';
const Loginmodal = ({ show, onHide }) => {
    const [navbar, setNavbar] = useState(false);
    const [showlogin, setShowlogin] = useState(false);
    const [showregister, setShowregister] = useState(false);
    const [shophover, setShophover] = useState(false);
    const [loginmail, setLoginmail] = useState('');
    const [loginpassword, setLoginpassword] = useState('');
    const [login, setLogin] = useState(false);
    const [logged, setLogged] = useState(false);
    const [click, setClick] = useState(false);
    const [cartnotification, setCartnotification] = useState(0);
    const [email, setEmail] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [password, setPassword] = useState('');
    const [enter, setEnter] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [logout, setLogout] = useState(false);
    const [sshow, setSshow] = useState(false);
    const [resetp, setResetp] = useState(false);
    const handleClose = () => setSshow(false);
    const handleShow = () => setSshow(true);
    const handleShowlogin = () => setShowlogin(true);
    const clientId = 'YOUR_CLIENT_ID'; // Replace with your actual client ID
    const [user, setUser] = useState(null);
    const [eror, setEror] = useState(null);
    const handleSuccess = (userData) => {
        setUser(userData);
        setEror(null);
    };
    const navigate = useNavigate();

    const checkUserLogging = () => {
        const logged = localStorage.getItem('userToken');
        return !!logged;
    }
    const handleLogout = () => {
        localStorage.removeItem('userToken');
        console.log('logouttt ', localStorage.getItem('userToken'));
        window.location.reload(true);
        setClick(false);
        setLogout(true);
    }
    useEffect(() => {
        setLogged(checkUserLogging());
    })

    const handleFailure = (error) => {
        console.error('Google Sign-In error:', error);
        // onFailure(error);
    }
    const handleCloselogin = () => {
        setShowlogin(false);
        setLoading(false);
        setError(false);
    }
    const handleRegisterclick = () => {
        handleShowregister();
        handleCloselogin();
    }
    const handleShowregister = () => setShowregister(true);
    const handleCloseregister = () => setShowregister(false);
    const handlelogin = async (e) => {
        setLoading(true);
        e.preventDefault();
        const logindata = {
            email: loginmail,
            password: loginpassword
        }
        try {
            const response = await fetch('http://localhost:8001/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(logindata),
            });
            console.log('after fetch');
            if (response.ok) {
                setLoading(false);
                const token = await response.json();
                setShowlogin(false);
                console.log("tttttttttttt", token.data);
                localStorage.setItem('userToken', token.data);
                const usertoken = localStorage.getItem("userToken");
                try {
                    const res = await fetch('http://localhost:8001/api/account', {
                        headers: {
                            'Authorization': `Bearer ${usertoken}`
                        }
                    });
                    if (res.ok) {
                        const resp = await res.json();
                        console.log("responnse", resp.message);
                        const decoded = jwtDecode(usertoken);
                        if (decoded.role === 'customer') {
                            navigate('/');
                        }
                        else {
                        }
                    }
                    else {
                        console.log("error in the response");
                    }
                }
                catch (e) {
                    console.log("verify token error", e);
                }
            }
            else {
                console.log(response.error);
                setError(true);
                setLoading(false);
            }
        }
        catch (error) {
            setLoading(false);
            console.log('catched login error :', error);
        }
    }

    return (
        <div >
            <Modal style={{ width: '100px', backgroundColor: 'black' }} show={show} centered onHide={onHide}
            >
                <Modal.Header className='d-flex justify-content-center align-items-center' >
                    <Modal.Title>WELCOME TO FARFAOUA's</Modal.Title>
                </Modal.Header>
                <Modal.Body className='d-flex justify-content-center align-items-center'>
                    <Form onSubmit={handlelogin}>
                        <Googleloginbutton onSuccess={handleSuccess} onFailure={handleFailure} />
                        {user && (<div>
                            <p>Signed in as: {user.name}</p>
                            <p>Email: {user.email}</p>
                            <img src={user.imageUrl} alt="User" />
                        </div>
                        )}
                        <p style={{ display: 'flex', margin: '19px' }}>OR</p>
                        <Form.Group className="mb-3" controlId="formBasicEmail" >
                            <Form.Control type="email" placeholder="Email adress"
                                className={error ? 'custom-input-error' : 'custom-input'}
                                onChange={(e) => { setLoginmail(e.target.value) }}
                                style={{ width: '360px', height: '46px', borderRadius: '0px' }} required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control type="password" placeholder="Password" className='custom-input'
                                onChange={(e) => { setLoginpassword(e.target.value) }}
                                style={{ width: '360px', height: '46px', borderRadius: '0px' }} />
                            <Form.Text className="text-muted">
                                <Link style={{ color: '#000000' }} onClick={() => {
                                    setResetp(true); setShowlogin(false)
                                }} disabled={loading}>
                                    <b className='forgotpassword'>Forgot Password ?</b>
                                </Link>
                            </Form.Text>
                        </Form.Group>
                        <div className='errormessage'>
                            {error === 'false' && <p>*Wrong email or password</p>}
                        </div>
                        <Button disabled={loading}
                            type="submit"
                            style={{ width: '360px', height: '46px', fontSize: '19px', borderRadius: '0px', backgroundColor: '#464545', marginBottom: '18px' }}>
                            {loading ? 'Loading ...' : 'Login'}
                        </Button>
                    </Form>
                    <div style={{ position: 'absolute' }}>
                        {loading && <LoadingSpinner />}
                    </div>
                </Modal.Body>
                <Modal.Footer className='d-flex justify-content-center align-items-center'>
                    Don't have an account yet ? <Link style={{ color: '#000000' }} onClick={handleRegisterclick}><b>register</b></Link>
                </Modal.Footer>
            </Modal>
            {/* {click && logged ?
                <div style={{
                    height: '190px', backgroundColor: 'light grey',
                    position: 'absolute', left: '1260px', top: '58px',
                    display: 'flex',
                    justifyContent: 'center', width: '145px'
                }} className='dropdown' >
                    <ul className='userDropdown'>
                        <li><Link className='ullink'> My Orders </Link></li>
                        <li> <Link className='ullink' to='/profile'>My account</Link></li>
                        <li onClick={handleLogout}
                            style={{
                                borderTop: '1px solid gray', marginTop: '67px', width: '100px',
                                textAlign: 'center'
                            }}><Link to={logged ? '/' : ''}> Log out </Link></li>
                    </ul>
                </div> : ''
            } */}
        </div >
    );
}
export default Loginmodal;