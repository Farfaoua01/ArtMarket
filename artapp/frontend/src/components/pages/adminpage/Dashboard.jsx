import React from 'react'
import { Card, CardBody, CardTitle } from 'react-bootstrap';
import './dashboard.css';
function Dashboard() {
    return (
        <div style={{ padding: '10px 19px' }}>
            <div className='cardcontainer'>
                <div className='ocard'>
                    <div style={{
                        height: '60px', width: '4px', backgroundColor: '#3949cf'
                        , borderRadius: '10px', marginRight: '9px'
                    }}></div>
                    <div className='cardleftpart'>
                        <p>Custumers</p>
                        <h1>344353</h1>
                    </div>
                    <div className='cardrightpart'>
                        <p></p>
                    </div>
                </div>
                <div className='ocard'>
                    <div style={{
                        height: '60px', width: '4px', backgroundColor: '#3949cf'
                        , borderRadius: '10px', marginRight: '9px'
                    }}></div>
                    <div className='cardleftpart'>
                        <p>Custumers</p>
                        <h1>344353</h1>
                    </div>
                    <div className='cardrightpart'>
                        <p></p>
                    </div>
                </div>
                <div className='ocard'>
                    <div style={{
                        height: '60px', width: '4px', backgroundColor: '#3949cf'
                        , borderRadius: '10px', marginRight: '9px'
                    }}></div>
                    <div className='cardleftpart'>
                        <p>Custumers</p>
                        <h1>344353</h1>
                    </div>
                    <div className='cardrightpart'>
                        <p></p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Dashboard;