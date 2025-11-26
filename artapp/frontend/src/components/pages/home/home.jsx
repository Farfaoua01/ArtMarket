import './home.css';
import Carousel from 'react-bootstrap/Carousel';
import { FormControl, Nav, NavDropdown } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import homeCarouselFpicture from '../../assets/images/homeCarouselFpicture.png';
import homeCarouselSpicture from '../../assets/images/homecarouselspicture.png';
import homeCarousel from '../../assets/images/carouselImage.jpg';
import pic1 from '../../assets/images/image1.png';
import pic3 from '../../assets/images/image3.png';
import pic4 from '../../assets/images/image4.png';
import pic5 from '../../assets/images/image5.png';
import pic6 from '../../assets/images/image6.png';
import pic7 from '../../assets/images/image7.png';
import pic8 from '../../assets/images/image8.png';
import shomeCarousel from '../../assets/images/scarouselp.jpg';
import { CarouselItem } from 'react-bootstrap';
import { Form, Link } from 'react-router-dom';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import shopartflist from '../../assets/images/shopartflist.png';
import herflower from '../../assets/images/herflower.png';
import { useState } from 'react';
import Homeshop from './shophome';
import Homefooter from './footer';
import Topnavbar from "../../header/navbar";
import Carouselhistory from './carouselhistory';
import Homecontact from './homecontact';
import { motion } from 'framer-motion';
const Home = () => {
    const images = [{
        "image": homeCarousel
    }, { "image": shomeCarousel }];
    const [ishover, setIshover] = useState(false);
    console.log(ishover);
    return (
        <motion.div className='fdivhome'
            initial={{ opacity: 0, y: -100 }} // Initial animation state
            animate={{ opacity: 1, y: 0 }} // Animation to play on load
            transition={{ duration: 1 }} >
            <Topnavbar />
            <section>
                <Carousel className='carouselBlock' style={{ cursor: 'pointer' }}>
                    {images.map((item) => (
                        <CarouselItem>
                            <div className="dark-overlay">
                                <img src={item.image} alt='picture' className='custom-image-carousel d-block w-100 ' />
                            </div>
                            <Carousel.Caption></Carousel.Caption>
                        </CarouselItem>
                    ))
                    }
                </Carousel>
                <div className="carousel-button">
                </div>
            </section>
            <Homeshop />
            <Carouselhistory />
            <div style={{ marginTop: '60px', marginBottom: '0px' }} className='divstudio'>
                <h1 style={{
                    fontFamily: 'Playfair display', fontSize: '47px', padding: '14px',
                    display: 'flex'
                }}>In the Studio.</h1>
                <div style={{ marginTop: '19px', marginBottom: '30px' }}>
                    <Carousel>
                        <Carousel.Item >
                            <div className="d-flex justify-content-around" >
                                <img src={pic1} width='330px' alt="First slide" />
                                <img src={pic3} width='330px' alt="Second slide" />
                                <img src={pic4} width='330px' alt="Second slide" />
                                <img src={pic5} width='330px' alt="Second slide" />
                            </div>
                        </Carousel.Item>
                        <Carousel.Item style={{ paddingLeft: '50px', paddingRight: '50px' }}>
                            <div className="d-flex justify-content-around">
                                <img src={pic6} width='330px' alt="First slide" />
                                <img src={pic7} width='330px' alt="Second slide" />
                                <img src={pic8} width='330px' alt="Second slide" />
                            </div>
                        </Carousel.Item>
                    </Carousel>
                </div>
            </div>
            <Homecontact />
            <section>
                <Homefooter />
            </section>
        </motion.div>
    );
}
export default Home;