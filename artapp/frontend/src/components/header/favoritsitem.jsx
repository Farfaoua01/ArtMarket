import React from 'react'
import { Link } from 'react-router-dom';

function Favoritsitem({ artwork }) {
    return (
        <div style={{ display: 'flex' }}>
            <div>
                <img src={`http://localhost:8001/uploads/${artwork?.fileurl}`} width='100px' />
            </div>
            <div>
                <p> {artwork?.title}</p>
                <p> {artwork?.category}</p>
                <Link to={`/artworks-page/${artwork?._id}`}> View Details</Link>
            </div>
        </div>
    )
}

export default Favoritsitem;