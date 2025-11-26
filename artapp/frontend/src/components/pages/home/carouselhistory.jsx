import React, { useEffect, useState, useRef } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import homeCarouselFpicture from '../../assets/images/homeCarouselFpicture.png';
import homeCarouselSpicture from '../../assets/images/homecarouselspicture.png';
import homeCarousel from '../../assets/images/carouselImage.jpg';
import { Button, CarouselItem } from 'react-bootstrap';
import './home.css';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer'

function Carouselhistory() {
    const images = [{
        "image": homeCarousel,
    }, {
        "image": homeCarouselFpicture,
    }];
    const [artworks, setArtworks] = useState([]);
    const fetchartworks = async () => {
        try {
            const response = await fetch('http://localhost:8001/api/fetchartworks');
            if (response.ok) {
                const res = await response.json();
                setArtworks(res.artworks);
            }
            else {
                console.log('error in the response');
            }
        }
        catch (e) {

        }
    }
    const [ref, inView] = useInView({
        triggerOnce: true, // Only trigger once
        threshold: 0.5, // Trigger animation when 50% of the element is in view
    })
    useEffect(() => {
        fetchartworks();
    });
    const fileurl = 'http://localhost:8001/uploads'
    return (
        <div ref={ref}>
            <motion.div className='carouseldiv'
                initial={{ opacity: 0, x: 100 }} // Initial animation state (invisible, moved down)
                animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : 100 }} // Animate opacity and position based on visibility
                transition={{ duration: 1 }} >
                <div style={{ display: 'flex' }}>
                    <h1 style={{ fontFamily: 'Playfair display', fontSize: '47px', padding: '14px' }}>Artworks History.</h1>
                </div>
                <div>
                    <Carousel className="custom-carousel" style={{ cursor: 'pointer' }}>
                        {artworks.map((item) => (
                            <CarouselItem>
                                <div className='d-flex' style={{
                                    padding: '10px 5px'
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <img src={`http://localhost:8001/uploads/${item.fileurl} `} alt='picture'
                                            width='450px' height='540px' style={{ filter: 'brightness(60%)' }} />
                                    </div>
                                    <div className='historyrightpart'
                                        style={{
                                            width: '550px', fontFamily: 'Playfair display', marginLeft: '22px'
                                        }}>
                                        <h1 style={{ fontFamily: 'Playfair display', fontSize: '36px' }}>{item.title} </h1>
                                        <p style={{ fontSize: '18px' }}>{item.history} </p>
                                        <div>
                                            <Link to={`/artworks-page/${item._id}`}>View more details
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </CarouselItem>
                        ))
                        }
                    </Carousel>
                </div>
            </motion.div>
        </div>
    )
}

export default Carouselhistory;