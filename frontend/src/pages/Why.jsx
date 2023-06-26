import React, { Fragment } from 'react';
import Quotation from '../assets/Quotation.svg'
import WhyTitle from '../assets/WhyTitle.svg'

const Why = () => {
    return (
        <Fragment>
            <img src={WhyTitle} alt="QuotationDemo" className='w-82 h-82' />
            <div className='flex'>
                <div className='font-euclidRegular text-qwhite'>
                    <p className='p-2'>
                        Even tired of fancy online quotation with hundreds of features that are not required?
                    </p>
                    <p className='p-2'>
                        Ever want a minimal aesthetically good quotation that just solves your problem without even touching photoshop?
                    </p>
                    <p className='p-2'>
                        Ever want a tool to track all your generated quotation and converted quotation?
                    </p>
                    <p className='p-2'>
                        Quogen is a right tool for your company to get minimal quotation. QuoGen allows you to create simple quotation with a generice template.
                        It also allows you track the quotation that is being generated with automatic follow up and multi user enviroment.
                    </p>
                </div>
            <img src={Quotation} alt="QuotationDemo" className='w-82 h-82' />
            </div>
        </Fragment>
    )
}

export default Why;