import React, { Fragment } from 'react';
import Stats from '../components/Stats';

const About = () => {
    return(
        <Fragment>
            <p className='font-lcSac text-qwhite text-9xl p-6 mt-8 ml-8'>About Us</p>
            <div className='flex justify-evenly'>
            <Stats/>
            <div> 
                <p className='font-eulcidRegular text-qwhite p-6 leading-8'>
At Quogen, we are dedicated to revolutionizing the way businesses generate quotations. Our innovative quotation generator software offers a seamless and efficient solution for creating professional quotes in no time.
With our user-friendly interface and customizable templates, you can easily personalize your quotations to reflect your brand's identity and leave a lasting impression on your clients. Our automation features eliminate tedious manual tasks, saving you valuable time and improving your overall productivity.
Rest assured that your data is secure with our robust encryption and privacy measures. Our dedicated customer support team is always ready to assist you, ensuring a smooth and successful experience with our software.
Join us today and transform your quoting process into a streamlined and hassle-free operation. Experience the power of efficient quotations with Quogen.

<span className='font-euclidMedium'>Note:</span> Please adjust the content to fit within the designated three paragraphs of your single page.
                </p>
            </div>
            </div>
        </Fragment>
    )
}

export default About