import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import { Offcanvas, OffcanvasBody, OffcanvasHeader, OffcanvasTitle, Spinner } from 'react-bootstrap';
import Favoritsitem from './favoritsitem';
import LoadingSpinner from './loadingSpinner';

function Favoritsoffcanvas({ show, onHide, placement }) {
    const [logged, setLogged] = useState(false);
    const [favorits, setFavorits] = useState([]);
    const [loading, setLoading] = useState(true);
    console.log('favvvorits');
    const retreivefavorits = async () => {
        const token = localStorage.getItem('userToken');
        if (token) {
            const tokenid = jwtDecode(token).userid;
            console.log('lofgoggoog', tokenid);
            try {
                const response = await fetch(`http://localhost:8001/api/retreivefavorits?id=${tokenid}`);
                if (response.ok) {
                    const res = await response.json();
                    setFavorits(res.favorits);
                    console.log('favoooritts', favorits);
                    setLoading(false);
                }
                else {
                    console.log('error in the response');
                    setLoading(false);
                }
            }
            catch (e) {
                console.error(e);
            }
        }
        else {
            console.log("not logged");
        }

    }
    useEffect(() => {
        retreivefavorits();
    })
    return (
        <div>
            <Offcanvas show={show} onHide={onHide} placement={placement} >
                <OffcanvasHeader style={{
                    backgroundColor: '#2f2e2e', height: '100px',
                    color: '#ffffff', margin: '0px', fontFamily: 'montserrat'
                }}>
                    <OffcanvasTitle>Favorits</OffcanvasTitle>
                </OffcanvasHeader>
                <OffcanvasBody>
                    {loading ? <LoadingSpinner /> : favorits && favorits.map(item => (
                        <Favoritsitem artwork={item} />
                    ))}
                </OffcanvasBody>
            </Offcanvas>
        </div>
    )
}
export default Favoritsoffcanvas;