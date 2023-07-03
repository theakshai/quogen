import React, { Fragment } from 'react';
import Hamburger from './Hamburger';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <Fragment>
    <div className='flex sm:justify-around flex-wrap mt-8 justify-between ml-8'>
      <div>
        <Link to={'/'} className='font-euclidRegular text-qwhite text-2xl sm:text-xl'>QG</Link>
      </div>
      <div className='hidden sm:flex'>
        <li className='list-none px-4'>
          <Link to={'/why'} className='font-euclidRegular text-qwhite'>Why?</Link>
        </li>
        <li className='list-none px-4'>
          <Link to={'/pricing'} className='font-euclidRegular text-qwhite'>Pricing</Link>
        </li>
        <li className='list-none px-4'>
          <Link to={'/about'} className='font-euclidRegular text-qwhite'>About</Link>
        </li>
        <li className='list-none px-4'>
          <Link to={'/contact'} className='font-euclidRegular text-qwhite'>Contact</Link>
        </li>
      </div>
      <div className='sm:hidden'>
        <Hamburger/>
      </div>
    </div>
    </Fragment>
  );
}

export default Navbar;
