import React, { useEffect } from 'react'

function Checkoutitem({ artwork }) {
    const fullFileUrl = `http://localhost:8001/uploads/${artwork.fileurl}`
    return (
        <>
            <div className='container' style={{
                display: 'flex',
                flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
            }}>
                <div style={{ display: 'flex' }}>
                    <div className='leftpartorder' style={{ marginRight: '8px' }}>
                        <img width='67px' height='67px' src={fullFileUrl} alt='picture' />
                    </div>
                    <div className='rightpartorder'>
                        <div style={{
                            display: 'flex', justifyContent: 'left',
                            flexDirection: 'column'
                        }}>
                            <h1>{artwork?.title}</h1>
                            <p style={{ fontSize: '13px', textAlign: 'left' }}>Qtity : {artwork?.quantity}</p>
                        </div>
                    </div>
                </div>
                <div>
                    <h1>C$ {artwork?.price}</h1>
                </div>
            </div>
        </>
    )
}

export default Checkoutitem;