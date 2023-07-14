import React, { Fragment } from 'react';

const Hamburger = () => {
    return (
        <Fragment>
            <div className='mr-8 h-6 w-6 font-lcSac text-qwhite rounded-sm bg-qblue border border-qwhite cursor-pointer'>
                <span className='w-5 h-2 bg-qwhite block absolute m-2'></span>
                <span className='w-5 h-2 bg-qwhite block absolute m-2'></span>
                <span className='w-5 h-2 bg-qwhite block absolute m-2'></span>
                <span className='w-5 h-2 bg-qwhite block absolute m-2'></span>
            </div>

        </Fragment>
    )
}

export default Hamburger;