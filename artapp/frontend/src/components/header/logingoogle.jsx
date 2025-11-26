import React, { useEffect } from 'react'

function Logingoogle() {
    useEffect(async () => {
        const response = await fetch("http://localhost:8001/api/logingoogle");
        if (response.ok) {

        }
        else {
            console.log('response error');
        }
    }, [])
    return (
        <div><p>hhhdhd</p></div>
    )
}

export default Logingoogle;