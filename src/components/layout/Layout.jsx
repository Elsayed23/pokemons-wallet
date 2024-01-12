import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import SearchBar from './SearchBar'
import Filter from './Filter'

const Layout = ({ setSearch, currType, setCurrType, }) => {



    return (
        <>
            <div className="flex">
                <Filter setCurrType={setCurrType} currType={currType} />
                <div className='w-full'>
                    <SearchBar setSearch={setSearch} />
                    <Outlet />
                    <Footer />
                </div>
            </div>
        </>
    )
}

export default Layout