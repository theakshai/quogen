import React, { Fragment } from 'react';

const SenderReciver = () => {
    return (
        <Fragment>
            <div id="header" className='flex justify-around'>
               <div id="from" className='p-6'>
                    <p className='font-euclidMedium text-qblue'>To</p>
                    <p className='font-euclidRegular text-qblue'>Theakshai</p>
                    <p className='font-euclidRegular text-qblue'>theakshi@gmail.com</p>
                    <p className='font-euclidRegular text-qblue'>New York, USA</p>
               </div>
               <div id="from" className='p-6'>
                    <p className='font-euclidMedium text-qblue'>From</p>
                    <p className='font-euclidRegular text-qblue'>Akshai J</p>
                    <p className='font-euclidRegular text-qblue'>akshai@quogen.com</p>
                    <p className='font-euclidRegular text-qblue'>Thanjavur, Tamilnadu</p>
               </div>
               <div id="from" className='p-6'>
                    <p className='font-euclidMedium text-qblue'>Date</p>
                    <p className='font-euclidRegular text-qblue'>02nd July 2023</p>
               </div>
            </div>
        </Fragment>
    )
}

export default SenderReciver;