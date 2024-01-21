import { faHeart, faHouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { MyContext } from '../../context/Context';

const Navbar = () => {

    const { setSearch } = useContext(MyContext)

    return (
        <nav className='pt-6 fixed w-full bg-white z-50 shadow-sm'>
            <div className="container mx-auto px-4">
                <div className="flex items-center gap-3 border-b pb-3">
                    <Link to='/'>
                        <FontAwesomeIcon icon={faHouse} />
                    </Link>
                    <Link to='/favourite'>
                        <FontAwesomeIcon icon={faHeart} />
                    </Link>
                </div>
                <div className="relative">
                    <input type="text" placeholder='Search Pokemons' onChange={(e) => { setSearch(e.target.value.toLocaleLowerCase()) }} className='w-full py-4 focus:outline-none' />
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 absolute top-3 right-0">
                        <path fill='#B0BEC5' fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
                    </svg>
                </div>
            </div>
        </nav>
    );
}

export default Navbar