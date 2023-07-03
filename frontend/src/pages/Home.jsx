import React, { Fragment } from "react";
import {motion} from 'framer-motion'
import Button from '../components/Button'


const Home = () => {
return (
    <Fragment>
        <div className='text-center mt-10'>
            <div className='font-lcSac text-qwhite text-9xl'>Quogen</div>
            <div className='pt-8'>
            <p className='font-euclidRegular text-qwhite'>Tired of Fancy Quotation generator?</p>
            <p className='font-euclidRegular text-qwhite'>Welcome to QuoGen an aesthetic quotation generator your company needs</p>
            </div>
            <div className='p-8'>
            <Button action="Let's start" url="https://github.com/"/>
            </div>
        </div>
    </Fragment>
)
}


export default Home;