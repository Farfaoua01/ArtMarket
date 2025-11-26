import './dropdownmenu.css';
import { Link } from 'react-router-dom';
const Dropdownmenu = () => {
    return (
        <>
            <div className="dropdown">
                <ul>
                    <li className='nav-item'>
                        <Link to='/' className='nav-links'>
                            Home
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/' className='nav-links'>
                            Home
                        </Link>
                    </li>
                </ul>

            </div>
        </>

    )

}
export default Dropdownmenu;