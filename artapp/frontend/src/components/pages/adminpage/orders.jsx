import React, { useEffect, useState } from 'react';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Table } from 'react-bootstrap';
import './orders.css';

function Orders() {
    const [orders, setOrders] = useState([]);
    const [click, setClick] = useState(false);
    const [artworks, setArtworks] = useState([]);
    const [status, setStatus] = useState('all');
    const fetchorders = async () => {
        try {
            const response = await fetch('http://localhost:8001/api/admingetorders');
            if (response.ok) {
                const res = await response.json();
                setOrders(res.orders);
            }
            else {
                console.log('error in the response');
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        fetchorders();
    }, [])
    const handleStatus = (eventKey) => {
        setStatus(eventKey);
    }
    function formatDateAndTime(timestamp) {
        const dateObject = new Date(timestamp);
        return {
            date: dateObject.toLocaleDateString(), // e.g., '12/27/2023'
            time: dateObject.toLocaleTimeString(), // e.g., '2:52:47 PM'
        };
    }
    const [activeOrderId, setActiveOrderId] = useState(null);
    const toggleDetails = async (orderId) => {
        const orderIdStr = orderId.toString(); // Convert to string if it's an ObjectId
        if (activeOrderId === orderIdStr) {
            setActiveOrderId(null);
        } else {
            setActiveOrderId(orderIdStr);
            setArtworks(['']);
            try {
                const response = await fetch(`http://localhost:8001/api/getartworksorder?order=${orderId}`);
                if (response.ok) {
                    const res = await response.json();
                    setArtworks(res.artworks);
                }
                else {
                    console.log('error in the response');
                }
            }
            catch (e) {
                console.error(e);
            }
        }
    }
    return (
        <section style={{ display: 'flex', justifyContent: 'space-between' }} className='ordercontent'>
            <div className="ordercontainer">
                <div className="title">
                    <div>
                        <h1>Orders</h1>
                    </div>
                    <div className="dropdowns">
                        <Dropdown onSelect={handleStatus}>
                            <DropdownToggle className='toggledropdown'>Status :{status} </DropdownToggle>
                            <DropdownMenu className='menu' >
                                <DropdownItem eventKey='all'> All</DropdownItem>
                                <DropdownItem eventKey='pending'> Pending</DropdownItem>
                                <DropdownItem eventKey='pending'> All</DropdownItem>
                                <DropdownItem eventKey='pending'> All</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    <div className="dropdowns">
                        <Dropdown >
                            <DropdownToggle className='toggledropdown'>Date</DropdownToggle>
                            <DropdownMenu className='menu'>
                                <DropdownItem> Today</DropdownItem>
                                <DropdownItem> Yesturday</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
                <div className='displayorders'>
                    <Table>
                        <thead
                            style={{
                                fontFamily: 'montserrat', fontSize: '13px',
                                color: '', fontWeight: 'lighter'
                            }}>
                            <tr>
                                <th>Order ID</th>
                                <th> Created</th>
                                <th>Customer</th>
                                <th> Total</th>
                                <th> Status</th>
                                <th> </th>
                            </tr>
                        </thead>
                        <tbody style={{ fontSize: '14px' }}>
                            {orders.map(order => (
                                <React.Fragment key={order._id}>
                                    <tr key={order._id} >
                                        <td>{order._id}</td>
                                        <td>{(() => {
                                            const { date, time } = formatDateAndTime(order.orderDate);
                                            return <div>{date} - {time}</div>;
                                        })()}</td>
                                        <td>{order._id}</td>
                                        <td>{order._id}</td>
                                        <td><Dropdown>
                                            <DropdownToggle className='toggledorder'>{order.status} </DropdownToggle>
                                            <DropdownMenu className='menu'>
                                                <DropdownItem> Precessing</DropdownItem>
                                                <DropdownItem> Shipped</DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown>
                                        </td>
                                        <td>
                                            <Button onClick={() => toggleDetails(order._id)}

                                                style={{
                                                    width: '30px',
                                                    backgroundColor: 'gray', border: 'none'
                                                }}> D</Button>
                                        </td>
                                    </tr>
                                    {activeOrderId === order._id && (
                                        <tr>
                                            <td colSpan='8' style={{ marginLeft: '15px' }} >
                                                <Table style={{
                                                    backgroundColor: 'lightgrey',
                                                    fontSize: '13px'
                                                }}>
                                                    <thead>
                                                        <th>#</th>
                                                        <th>artwork ID</th>
                                                        <th>Title</th>
                                                        <th>Creation Date</th>
                                                    </thead>
                                                    <tbody>
                                                        {artworks.map(artwork => (
                                                            <tr>
                                                                <td><img src={`http://localhost:8001/uploads/${artwork.fileurl} `}
                                                                    width='40px' height='40px' /> </td>
                                                                <td>{artwork._id} </td>
                                                                <td>{artwork.title} </td>
                                                                <td>{(() => {
                                                                    const { date, time } = formatDateAndTime(artwork.created_at);
                                                                    return <div>{date} - {time}</div>;
                                                                })()} </td>
                                                            </tr>
                                                        ))
                                                        }
                                                    </tbody>
                                                </Table>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </Table>
                </div >
            </div >

        </section >
    )
}

export default Orders;