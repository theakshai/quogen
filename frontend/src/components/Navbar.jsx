import React, { Fragment } from 'react';

const Navbar = () => {
    return(
    <Fragment>
        <div className='flex justify-around flex-wrap mt-8'>
        <div><a href="#" className='font-euclidRegular text-qwhite'>QG</a></div>
        <div className='flex'>
            <li className='list-none px-4'><a href="" className='font-euclidRegular text-qwhite'>Why?</a></li>
            <li className='list-none px-4'><a href="" className='font-euclidRegular text-qwhite'>Pricing</a></li>
            <li className='list-none px-4'><a href="" className='font-euclidRegular text-qwhite'>About & Contact</a></li>
        </div>
        </div>
    </Fragment>

    )
} 

export default Navbar;