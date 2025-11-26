import { Link } from 'react-router-dom';
import './navbar.css';
import './CustomModal.css';
import { useEffect, useState } from 'react';
//import { GoogleLogin } from 'react-google-login';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import nextIcon from '../assets/images/nexticon.png';
import photo from '../assets/images/homecarouselspicture.png';
import hearticon from '../assets/images/hearticon.png';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { Button, FormControl, FormGroup, FormLabel, ModalBody, ModalHeader } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import Offcanvascart from './offcanvascart';
import LoadingSpinner from './loadingSpinner';
import ResetPassword from './resetPassword';
import Favoritsoffcanvas from './favoritsoffcanvas';
import Googleloginbutton from './Gooleloginbutton';
import picture from '../assets/images/aboutpicture.png';
import Loginmodal from './loginmodal';
const Topnavbar = ({ apr }) => {
  const [navbar, setNavbar] = useState(false);
  const [show, setShow] = useState(false);
  const [showlogin, setShowlogin] = useState(false);
  const [showregister, setShowregister] = useState(false);
  const [shophover, setShophover] = useState(false);
  const [loginmail, setLoginmail] = useState('');
  const [loginpassword, setLoginpassword] = useState('');
  const [login, setLogin] = useState(false);
  const [logged, setLogged] = useState(false);
  const [click, setClick] = useState(false);
  const [cartnotification, setCartnotification] = useState(0);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShowlogin = () => setShowlogin(true);
  const handleCloselogin = () => {
    setShowlogin(false);
    setLoading(false);
    setError(false);
  }
  const handleShowregister = () => setShowregister(true);
  const handleCloseregister = () => setShowregister(false);
  const navigate = useNavigate();

  const setFixed = () => {
    if (window.scrollY >= 30) {
      setNavbar(true);
    }
    else {
      setNavbar(false);
    }
  }
  const handleLoginclick = () => {
    handleCloseregister();
    handleShowlogin();
    if (logged) {
      setLogin(true);
    }
    console.log('hdhhdh');
  }
  const handleClick = () => {
    if (!logged) {
      setShowlogin(true);
    }
    else {
      setClick(!click);
      setShowlogin(false);
    }
  }
  const handleRegisterclick = () => {
    handleShowregister();
    handleCloselogin();
  }
  const handleshopOver = () => {
    setShophover(true);
  }
  const [email, setEmail] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [password, setPassword] = useState('');
  const [emailerror, setEmailerror] = useState(false);
  const [firstnameerror, setFirstnameerror] = useState('');
  const [lastnameerror, setLastnameerror] = useState('');
  const [passworderror, setPassworderror] = useState(false);
  const [enter, setEnter] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [logout, setLogout] = useState(false);
  const [resetp, setResetp] = useState(false);
  const [favoritsclick, setFavoritsclick] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [load, setLoad] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('white');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === '' || password === '' || firstname === '' || lastname === '') {
      setEmailerror(true);
      setFirstnameerror(true);
      setLastnameerror(true);
      setPassworderror(true);
    }
    else {
      setLoad(true);
      const registerdata = {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password
      }
      try {
        console.log('fetch call triggered');
        console.log(registerdata);
        const response = await fetch('http://localhost:8001/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(registerdata),
        });
        console.log('after fetch');
        if (response.ok) {
          const data = await response.json();
          setShowlogin(true);
          setClicked(false);
          setShowregister(false);
          setLoad(false)
        }
        else {
          console.log('error');
        }
      }
      catch (error) {
        console.log('fetch error:', error);
      }
    }
  }
  const handlelogin = async (e) => {
    e.preventDefault();
    if (!loginmail || !loginpassword) {
      setEmailerror(true);
      setPassworderror(true);
    }
    else {
      try {
        const logindata = {
          email: loginmail,
          password: loginpassword
        }
        setLoading(true);
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
        }
      }
      catch (error) {
        setLoginerror(true);
        console.log('catched login error :', error);
      }
    }
  }
  const handleshow = () => {
    setShow(true);
    console.log('shoooow', show);
  }
  const handlehide = () => {
    setShow(false);
    window.location.reload();
  }
  window.addEventListener('scroll', setFixed);
  const getartwork = async () => {
    try {
      console.log('try part');
      const token = localStorage.getItem("userToken");
      if (token) {
        const decoded = jwtDecode(token).userid;
        const response = await fetch(`http://localhost:8001/api/getcart?token=${decoded}`);
        if (response.ok) {
          const res = await response.json();
          console.log("leeenght", res.cartlength);
          setCartnotification(res.cartlength);
        }
        else {
          console.log('response error');
        }
      }
    }
    catch (error) {
      console.log(error);
    }
  }
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
    getartwork();
    setLogged(checkUserLogging());
  })

  const clientId = 'YOUR_CLIENT_ID'; // Replace with your actual client ID
  const [user, setUser] = useState(null);
  const [eror, setEror] = useState(null);
  const [loginerror, setLoginerror] = useState(false);
  const handleSuccess = async () => {
    try {
      // Send token to backend for verification
      const res = await fetch('/api/auth/google');
      // Handle successful authentication on the server
      console.log(res.data);
    } catch (error) {
      console.error('Google sign-in error:', error);
    }
  };
  const handleFailure = async (error) => {
    console.error('Google sign-in failed:', error)
  }
  const handlecartclick = () => {
    if (logged) {
      setShow(true);
    }
    else { setShowlogin(true); }
  }
  const [fpasswordmail, setFpasswordmail] = useState('');
  const [fpasswordmailempty, setFpasswordmailempty] = useState(false);
  const [isvalid, setIsvalid] = useState(true);
  const [mailsent, setMailsent] = useState(false);
  const testvalid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  const handleForgottenpass = (e) => {
    const { value } = e.target;
    setFpasswordmail(value);
    setIsvalid(testvalid(e.target.value));
  }
  const handleresetpassword = async (e) => {
    e.preventDefault();
    const usermail = { email: fpasswordmail }
    try {
      if (isvalid && fpasswordmail !== '') {
        const response = await fetch('http://localhost:8001/api/forgotpassword', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(usermail),
        });
        if (response.ok) {
          const res = await response.json();
          console.log(res.message);
          setMailsent(true);
          setResetp(false);
        }
        else {
          console.log('ellllllllse');
        }
      }
      else {
        console.log('invalid mail');
      }
    }
    catch (e) {
      console.log(e);
    }
  }
  const resetfModal = () => {
    setFpasswordmail('');
  }

  return (
    <>
      <nav className={navbar ? 'navbar fixed' : 'navbar'}>
        <div className="navbar-container">
          <ul>
            <li className='nav-item'>
              <Link to='/' className='nav-links'>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-links' onMouseEnter={handleshopOver}
                onMouseLeave={() => { setShophover(false) }}
                style={{ paddingBottom: '100px' }}>
                Shop
              </Link>
            </li>
            <div className="dropdownShop" onMouseEnter={() => { setShophover(true) }}
              onMouseLeave={() => { setShophover(false) }}
            >
              {shophover && <div className='dropdown' style={{
                display: 'flex',
                height: '50px', width: '100%'
              }}>
                {/* <div>
                  <img src={photo} style={{ width: '300px', height: '199px', position: 'relative', top: '22px', left: '-15px' }} />
                </div>
                <div style={{ display: 'flex' }}>
                  <div className='dropdown-menu-colomn'
                    style={{
                      textAlign: 'left', display: 'flex', flexDirection: 'column', margin: '19px',
                    }}>
                    <h1 style={{
                      fontSize: '21px',
                      fontFamily: 'Playfair Display', fontWeight: '600',
                    }}>Painting</h1>
                    <Link to='/shop' className='link' > All </Link>
                    <Link to='/shop' className='link'> Prints</Link>
                    <Link to='/shop' className='link'> Originals</Link>
                  </div>
                  <div className='dropdown-menu-colomn'
                    style={{
                      display: 'flex', flexDirection: 'column',
                      margin: '10px 19px', textAlign: 'left'
                    }}>
                    <h1 style={{ fontSize: '21px', fontFamily: 'Playfair Display', fontWeight: '600' }}>Artwar</h1>
                    <Link to='/shop' className='link'> All </Link>
                    <Link to='/shop' className='link'> All</Link>
                    <Link to='/shop' className='link'> All </Link>
                  </div>
                </div> */}
                <div className='shoplinks'>
                  <Link to='/shop' className='link' > All </Link>
                  <Link to='/shop' className='link'> Prints</Link>
                  <Link to='/shop' className='link'> Originals</Link>
                  <Link to='/shop' className='link'> Artwar</Link>
                  <Link to='/shop' className='link'> Originals</Link>
                </div>
              </div>}
            </div>
            <li className='nav-item'>
              <Link to='/contact' className='nav-links'>
                Contact
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/about' className='nav-links'>
                About
              </Link>
            </li>
            <ul className="navbar-rightpart">
              <li className='navbar-icon'>
                <FontAwesomeIcon icon={faCartShopping} style={{ fontSize: '21px', color: 'white' }}
                  onClick={handlecartclick} />
              </li>
              <li className='navbar-icon'>
                <FontAwesomeIcon icon={enter ? faHeartSolid : faHeartRegular}
                  style={{ fontSize: '21px', color: 'white' }}
                  className='custom-icon'
                  onMouseEnter={() => { setEnter(true) }}
                  onMouseLeave={() => { setEnter(false) }}
                  onClick={() => setFavoritsclick(true)} />
              </li>
              <li className='navbar-icon'>
                <FontAwesomeIcon icon={faUser} style={{ fontSize: '21px', color: 'white' }}
                  onClick={() => { handleShowlogin(); handleClick(); }} />
              </li>
              <li className='navbar-icon'>
                <FontAwesomeIcon icon={faGlobe} style={{ fontSize: '21px', color: 'white' }} />
                <p style={{ color: 'white' }}>English</p>
              </li>
            </ul>
          </ul>
        </div >
        <div className="offcanvaspart" >
          <Offcanvascart show={show} hide={handlehide} placement={"end"} />
        </div>
        <div className="loginmodal" style={{ display: 'flex', justifyContent: 'center' }}>
          <Modal show={showlogin}
            centered onHide={() => { setShowlogin(false); }} dialogClassName='custom-modal'
            style={{
              borderRadius: '0px', justifyContent: 'center',
              border: '0px', borderRadius: '0', maxHeight: '80%', maxWidth: '70%', marginLeft: '200px'
            }}>
            <Modal.Header className='d-flex justify-content-center align-items-center' >
              <Modal.Title>WELCOME TO FARFAOUA's</Modal.Title>
            </Modal.Header>
            <Modal.Body className='d-flex justify-content-center align-items-center'
              style={{ width: '100%', display: 'flex', justifyContent: 'spaceBetween', padding: '19px' }}>
              <div>
                <img src={picture} alt='picture' style={{
                  width: '300px', height: '370px', marginRight: '10px',
                  filter: 'brightness(70%)'
                }} />
              </div>
              <div>
                <Form onSubmit={handlelogin}>
                  <Googleloginbutton onSuccess={handleSuccess} onFailure={handleFailure} />
                  <p style={{ display: 'flex', margin: '19px' }}>OR</p>
                  <Form.Group className="mb-3" controlId="formBasicEmail" >
                    <Form.Control type="email" placeholder="Email adress"
                      className={error ? 'custom-input-error' : 'custom-input'}
                      onChange={(e) => { setLoginmail(e.target.value) }}
                      style={{ width: '360px', height: '46px', borderRadius: '0px' }} required />
                    {emailerror && <p style={{ color: 'red' }}>*Input is invalid</p>}
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control type="password" placeholder="Password" className='custom-input'
                      onChange={(e) => { setLoginpassword(e.target.value) }}
                      style={{ width: '360px', height: '46px', borderRadius: '0px' }} />
                    {passworderror && <p style={{ color: 'red' }}>*Input is invalid</p>}
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
                    {loginerror && <p>*FAILED</p>}
                  </div>
                  <Button disabled={loading}
                    type="submit"
                    style={{ width: '360px', height: '46px', fontSize: '19px', borderRadius: '0px', backgroundColor: '#464545', marginBottom: '18px' }}>
                    {loading ? 'Loading ...' : 'Login'}
                  </Button>
                </Form>
              </div>
              <div style={{ position: 'absolute' }}>
                {loading && <LoadingSpinner />}
              </div>
            </Modal.Body>
            <Modal.Footer className='d-flex justify-content-center align-items-center'>
              Don't have an account yet ? <Link style={{ color: '#000000' }} onClick={handleRegisterclick}><b>register</b></Link>
            </Modal.Footer>
          </Modal>
          {click && logged ?
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
          }
        </div >
        <div className="registremodal">
          <Modal show={showregister} centered onHide={handleCloseregister}
            style={{ borderRadius: '0px', justifyContent: 'center', border: 'none' }}>
            <Modal.Header className='d-flex justify-content-center align-items-center'>
              <Modal.Title>WELCOME TO FARFAOUA's</Modal.Title>
            </Modal.Header>
            <Modal.Body className='d-flex justify-content-center align-items-center'>
              <Form onSubmit={handleSubmit}>
                <Googleloginbutton onSuccess={handleSuccess} onFailure={handleFailure} />
                <p style={{ display: 'flex', margin: '10px' }}>OR</p>
                <Form.Group className="mb-3" controlId="formBasicEmail" >
                  <Form.Control type="text" placeholder="First Name"
                    onChange={(e) => { setFirstname(e.target.value) }}
                    style={{ width: '360px', height: '46px', borderRadius: '0px' }} />
                  {firstnameerror && <p style={{ color: 'red' }}>Input is invalid</p>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Control type="text" placeholder="Last Name"
                    onChange={(e) => { setLastname(e.target.value) }}
                    style={{ width: '360px', height: '46px', borderRadius: '0px' }} />
                  {lastnameerror && <p style={{ color: 'red' }}>Input is invalid</p>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Control type="text" placeholder="Email adress"
                    onChange={(e) => { setEmail(e.target.value) }}
                    style={{ width: '360px', height: '46px', borderRadius: '0px' }} />
                  {firstnameerror && <p style={{ color: 'red' }}>Input is invalid</p>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Control type="Password" placeholder="Create Password"
                    onChange={(e) => { setPassword(e.target.value) }}
                    style={{ width: '360px', height: '46px', borderRadius: '0px' }} />
                  {passworderror && <p style={{ color: 'red' }}>Input is invalid</p>}
                </Form.Group>
                <Button
                  type="submit" style={{ width: '360px', height: '46px', borderRadius: '0px', backgroundColor: '#464545', marginBottom: '18px' }}
                  onClick={() => { setClicked(true) }}>
                  {clicked && load ? 'Loading...' : 'Register'}
                </Button>
              </Form>
              {clicked && load && <LoadingSpinner />}
            </Modal.Body>
            <Modal.Footer className='d-flex justify-content-center align-items-center'>
              Already a member ? <Link style={{ color: '#000000' }} onClick={handleLoginclick}><b>log in</b></Link>
            </Modal.Footer>
          </Modal>
        </div>
        <div
          style={{
            width: '20px', height: '20px', backgroundColor: '#eedecb', borderRadius: '30px'
            , position: 'relative', top: '-67px', left: '1270px', color: 'black', display: 'center',
            textAlign: 'center'
          }}>
          <p style={{ position: 'relative', top: '-3px' }}>{cartnotification} </p>
        </div>
        <Modal show={logout} onHide={() => { setLogout(false) }} backdrop='static'>
          <Modal.Body >
            <div style={{ padding: '10px', fontSize: '19px', fontFamily: 'Playfair Display' }}>
              Log out ! You're succefully log out from your account .
            </div>
          </Modal.Body>
          <Modal.Footer>
          </Modal.Footer>
        </Modal>
      </nav >
      <div className='resetpawwordiv'>
        <Modal show={resetp} onHide={() => { setResetp(false) }}
          style={{ maxWidth: '100%', maxHeight: '100%', width: '1000px', marginLeft: '270px' }}>
          <ModalHeader>
            <h1 style={{
              fontFamily: 'montserrat', textAlign: 'center',
              alignItems: 'center', fontSize: '30px'
            }}>Reset Password</h1>
          </ModalHeader>
          <Modal.Body >
            <div style={{
              padding: '10px', fontSize: '19px', fontFamily: 'Montserrat',
              display: 'flex', justifyContent: 'center'
            }}>
              <p style={{ textAlign: 'center', alignItems: 'center', fontSize: '17px' }}>Enter your login mail and we'll send you a link to reset your password.</p>
            </div>
            <div className='formcontainer'>
              <Form onSubmit={handleresetpassword}>
                <FormGroup>
                  <FormLabel>Email</FormLabel>
                  <FormControl type='email' className="custom-input" placeholder='Input your email'
                    onChange={handleForgottenpass} value={fpasswordmail} />
                </FormGroup>
                {!isvalid && <p style={{ color: 'red' }}>Invalid email format</p>}
                {fpasswordmailempty && <p style={{ color: 'red' }}>Input the email</p>}
                <Button type='submit' className='custom-button'> Reset Password</Button>
              </Form>
            </div>
          </Modal.Body>
        </Modal>
      </div>
      {favoritsclick && <Favoritsoffcanvas show={favoritsclick}
        onHide={() => { setFavoritsclick(false) }} placement={'start'} />}
      {mailsent && <Modal show={mailsent} onHide={() => { setMailsent(false) }}>
        <ModalHeader style={{ padding: '0px' }}>
          <p style={{ fontSize: '21px', fontFamily: 'Montserrat', paddingLeft: '15px' }}>Reset email sent</p>
        </ModalHeader>
        <ModalBody>
          <p>The email to reset your password was sent , check your box email </p>
          <Button style={{ backgroundColor: 'green', border: 'none' }}
            onClick={() => { setMailsent(false); resetfModal(); }}> OK</Button>
        </ModalBody>
      </Modal>}

    </>
  );
}
export default Topnavbar;