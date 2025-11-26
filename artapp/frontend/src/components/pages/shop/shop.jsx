import React, { useEffect } from 'react';
import shoptoppicture from '../../assets/images/carouselImage.jpg';
import Card from 'react-bootstrap/Card';
import './shop.css';
import { useState } from 'react';
import Topnavbar from "../../header/navbar";
import Homeshop from '../home/shophome';
import Homefooter from '../home/footer';
import { motion } from 'framer-motion';
function Shop() {
    const [ishover, setIshover] = useState(false);
    const [selectedcategory, setSelectedcategory] = useState('');
    const [collection, setCollection] = useState('');
    const [artworklist, setArtworklist] = useState([]);
    const [filteredlist, setFilteredlist] = useState([]);
    const [test, SetTest] = useState('');
    const [activate, SetActivate] = useState(true);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <motion.div
            initial={{ opacity: 0, x: -100 }} // Initial animation state
            animate={{ opacity: 1, x: 0 }} // Animation to play on load
            transition={{ duration: 0.4 }} style={{ backgroundColor: 'rgb(240, 239, 239)' }}>
            <Topnavbar />
            <section>
                <div className="shoptoppicture">
                    <img src={shoptoppicture} />
                    <div className="underpicture">
                        <p style={{
                            fontSize: '15px', display: 'flex', alignItems: 'center',
                            marginLeft: '-1340px', fontFamily: 'Montserrat', marginTop: '10px'
                        }}> <b> Home </b>/ Shop</p>
                    </div>
                </div>
                <div style={{ marginTop: '40px' }}>
                    <Homeshop />
                </div>
            </section >
            <Homefooter />
        </motion.div>
    );
}
export default Shop;