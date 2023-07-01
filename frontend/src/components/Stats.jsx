import React, { Fragment } from 'react';

const Stats = () => {
    return(
        <Fragment>
                <div className='flex-col px-5 ml-8'>
                    <div className='flex-col mb-4'>
                        <p className='font-lcSac text-qwhite text-5xl'>500+</p>
                        <p className='font-lcSac text-qwhite'>Users Visited</p>
                    </div>
                    <div className='flex-col mb-4'>
                        <p className='font-lcSac text-qwhite text-5xl'>50+</p>
                        <p className='font-lcSac text-qwhite'>Business Partners</p>
                    </div>
                    <div className='flex-col mb-4'>
                        <p className='font-lcSac text-qwhite text-5xl'>10000+</p>
                        <p className='font-lcSac text-qwhite'>Quotation Generated</p>
                    </div>
                </div>
        </Fragment>
    )
}

export default Stats;