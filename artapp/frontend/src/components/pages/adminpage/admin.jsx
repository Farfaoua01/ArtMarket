import React from 'react';
import './admin.css';
import { useState, useEffect } from 'react';
import { Navbar } from 'react-bootstrap';
import Shop from '../shop/shop';
import Dashboard from './Dashboard';
import Artwork from './Artwork';
import Admintopbar from './admintopbar';
import Orders from './orders';
const Admin = () => {
    const [selectedMenuItem, setSelectedMenuItem] = useState('Dashboard');
    const [click, setClick] = useState(false);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <>
            <div className="container">
                <div className="content">
                    <div className="mainmenu">
                        <ul className='ulmainmenu'>
                            <li onClick={() => { setSelectedMenuItem('Dashboard'); setClick(!click) }}
                                className={click ? 'clicked' : ''}>Dashboard</li>
                            <li onClick={() => { setSelectedMenuItem('Artwork') }}
                            >Artworks</li>
                            <li onClick={() => { setSelectedMenuItem('Custumers') }}>Custumers</li>
                            <li onClick={() => { setSelectedMenuItem('Orders') }}>Orders</li>
                            <li onClick={() => { setSelectedMenuItem('Dashboard') }}>Setting</li>
                        </ul>
                    </div>
                    <div className="arightpart">
                        {selectedMenuItem === 'Dashboard' && <Dashboard />}
                        {selectedMenuItem === 'Artwork' && <Artwork />}
                        {selectedMenuItem === 'Orders' && <Orders />}
                    </div>
                </div>
            </div >
        </>
    )
}
export default Admin;