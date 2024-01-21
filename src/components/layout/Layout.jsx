import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import SearchBar from './SearchBar'
import Filter from './Filter'

const Layout = () => {

    return (
        <>
            <div className="flex">
                <Filter />
                <div className='w-full'>
                    <SearchBar />
                    <Outlet />
                    <Footer />
                </div>
            </div>
        </>
    )
}

export default Layout