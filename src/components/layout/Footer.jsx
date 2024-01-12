import React from 'react'

const Footer = () => {

    const currYear = new Date().getFullYear()

    return (
        <footer className='py-4 border-t-2 border-[#332]'>
            <p className='text-center'>Made by <span className='font-bold'>Elsayed Kewan</span></p>
        </footer>
    )
}

export default Footer