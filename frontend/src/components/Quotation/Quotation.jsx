import React from 'react';
import { Fragment } from 'react';
import './quotation.css';
import SenderReciver from './SenderReciver';
import Header from './Header';
import Services from './Services';
import Footer from './Footer';
import TC from './TC';
import About from './About';
const Quotation = () => {
    return (

    <Fragment>
    <div className='container'>
         <div className='page'>
            <Header/>
            <hr />

            <SenderReciver/>
            <hr />

            <About/>
            <hr />

            <div className='mt-4 flex justify-around'>
                <p className='font-euclidMedium'>Service</p>
                <p className='font-euclidMedium'>Cost</p>
                <p className='font-euclidMedium'>Quantity</p>
                <p className='font-euclidMedium'>Amount</p>
            </div>
            <Services/>
            <Services/>
            <Services/>
            <Services/>

            <p className='text-right font-euclidSemibold text-xl text-qblue p-6 mr-10 '>The estimated Amount* is $1200</p>
            <TC/>
            <hr />
            <Footer/>
         </div>
    </div>
         </Fragment>
    )
}

export default Quotation;