import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import shopartflist from '../../assets/images/shopartflist.png';
import herflower from '../../assets/images/herflower.png';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Artworklist from './artworklist';
import Artworkcard from './artworkcard';
import LoadingSpinner from '../../header/loadingSpinner';
import { DropdownItem } from 'react-bootstrap';
function Homeshop() {
    const [selectedcategory, setSelectedcategory] = useState('all');
    const [selectedprice, setSelectedprice] = useState('');
    const [collection, setCollection] = useState('');
    const [artworklist, setArtworklist] = useState([]);
    const [filteredlist, setFilteredlist] = useState([]);
    const [selectedPrice, setSelectedPrice] = useState([1, 10099]);
    const [loading, setLoading] = useState(false);
    const [sortbyitem, setSortbyitem] = useState('');
    const [test, SetTest] = useState('');
    const [activate, SetActivate] = useState(true);
    console.log('selected category', selectedcategory);
    const handlecategoryselect = (eventKey) => {
        setSelectedcategory(eventKey);
    }
    const fetchartwork = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:8001/api/getartwork', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                const data = await response.json();
                const list = data.data;
                setArtworklist(list);
                setLoading(false);
                console.log('llllllll', artworklist);
            }
            else {
                setLoading(false);
                console.log('fetch artworks error');
            }
        }
        catch (error) {
            console.log(error);
            setLoading(false);
        }
    }
    const handleSort = (eventKey) => {
        setSortbyitem(eventKey);
    }
    const handlePrice = (eventKey) => {
        setSelectedprice(eventKey);
        console.log('selected price', selectedprice);
    }
    const handleClick = () => {
        setSelectedPrice([selectedPrice[0], selectedPrice[1]]);
        console.log('priiiiice', selectedPrice);
    }
    useEffect(() => {
        fetchartwork();
    }, [])
    const filteredartwork = artworklist.filter((artwork) => {
        const categoryCondition = selectedcategory === 'all' || artwork.category === selectedcategory;
        const priceCondition = !selectedPrice ||
            (artwork.price >= selectedPrice[0] && artwork.price <= selectedPrice[1]);
        return categoryCondition && priceCondition;

    });
    const filteredlists = () => {
        const filteredartwork = artworklist.filter((artwork) => {
            return artwork.category === selectedcategory
        });
        setFilteredlist(filteredartwork);
        console.log('filtered list', filteredlist);
    }
    return (
        <div className="homeartshop" >
            <div className="dropdownButtons">
                <Dropdown>
                    <Dropdown.Toggle id="dropdown-price" >
                        Price
                    </Dropdown.Toggle>
                    <Dropdown.Menu
                        style={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center',
                            padding: '10px'
                        }}>
                        <div style={{ display: 'flex' }}>
                            <input type='number' value={selectedPrice[0]} placeholder='from'
                                onChange={(e) => {
                                    setSelectedPrice((prevSelectedPrice) =>
                                        [e.target.value, prevSelectedPrice[1]])
                                }}
                                style={{ width: '70px' }} />
                            <p>-</p>
                            <input type='number' value={selectedPrice[1]} placeholder='to'
                                onChange={(e) => {
                                    setSelectedPrice((prevSelectedPrice) =>
                                        [prevSelectedPrice[0], e.target.value])
                                }}
                                style={{ width: '70px' }} /></div>
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown onSelect={handlecategoryselect}>
                    <Dropdown.Toggle id="dropdown-price" >
                        Category
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item eventKey='all'
                            style={{ backgroundColor: selectedcategory === 'all' ? 'lightgrey' : '' }}>All</Dropdown.Item>
                        <Dropdown.Item eventKey='Prints'
                            style={{ backgroundColor: selectedcategory === 'Prints' ? 'lightgrey' : '' }}>
                            Prints</Dropdown.Item>
                        <Dropdown.Item eventKey='Originals'
                            style={{ backgroundColor: selectedcategory === 'Originals' ? 'lightgrey' : '' }}>
                            original painting</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown>
                    <Dropdown.Toggle id="dropdown-price">
                        Collection
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item eventKey=''
                        >Action</Dropdown.Item>
                        <Dropdown.Item eventKey=''
                            style={{ backgroundColor: collection === 'all' ? 'lightgrey' : '' }}>Another action</Dropdown.Item>
                        <Dropdown.Item eventKey=''>Something else</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown onSelect={handleSort}>
                    <Dropdown.Toggle id="dropdown-price" >
                        Sort
                    </Dropdown.Toggle>
                    <Dropdown.Menu >
                        <Dropdown.Item eventKey='lth'
                            style={{ backgroundColor: selectedprice === 'lth' ? 'lightgrey' : '' }}>
                            Price,Low To High</Dropdown.Item>
                        <Dropdown.Item eventKey='htl'
                            style={{ backgroundColor: selectedprice === 'htl' ? 'lightgrey' : '' }}>
                            Price,High To Low</Dropdown.Item>
                        <Dropdown.Item eventKey='otn'
                            style={{ backgroundColor: selectedprice === 'otn' ? 'lightgrey' : '' }}>
                            Date,Old To New</Dropdown.Item>
                        <Dropdown.Item eventKey='nto'
                            style={{ backgroundColor: selectedprice === 'nto' ? 'lightgrey' : '' }}>
                            Date,New To Old</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            <div>
                {loading ? <LoadingSpinner /> :
                    <div className='artfilteredlist'>
                        {filteredartwork.map((artwork) => (
                            <div key={artwork._id}>
                                <Artworkcard artpeice={artwork} cartstatus={true} />
                            </div>
                        ))}
                    </div>
                }
            </div>
        </div>
    );
}
export default Homeshop;