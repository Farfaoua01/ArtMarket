import React from 'react';
import './home.css';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import shopartflist from '../../assets/images/shopartflist.png';
import herflower from '../../assets/images/herflower.png';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useState } from 'react';
function Artworklist({ artworklist }) {
    const [ishover, setIshover] = useState(false);
    return (
        <div className="" >
            <Link to='/product-page/13'>
                {artworklist.map((artwork) => {
                    <Card className='paintingcard' onMouseEnter={() => setIshover(true)}
                        onMouseLeave={() => setIshover(false)}
                        style={{
                            width: '19rem', borderRadius: '0px', margin: '8px 35px',
                            height: '504px', border: 'none'
                        }}>
                        <div className="pictureholder">
                            <Card.Img className='artpicture'
                                variant="top" src={shopartflist}
                                style={{ borderRadius: '0px', height: '350px' }} />
                        </div>
                        <Card.Body>
                            <Card.Title>{artwork.Title} </Card.Title>
                            <Card.Text>
                                <p> 100$</p>
                            </Card.Text>
                            {ishover &&
                                <Button
                                    style={{
                                        backgroundColor: 'white',
                                        width: '19rem', height: '50px', borderRadius: '0px',
                                        position: 'relative', top: '19px', left: '-16px'
                                    }}>
                                    Add to Cart</Button>}
                        </Card.Body>
                    </Card>
                })}

            </Link>
        </div>
    )
}

export default Artworklist;