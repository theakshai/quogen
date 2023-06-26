import React, { Fragment } from "react";
import arrow from "../assets/right-arrow.png"

const Button = ({action, url}) => {
    return (
        <Fragment>
            <div className='inline-flex gap-2'>
            <a href={url} className='font-euclidRegular text-qwhite hover:underline'> {action} </a>
                <img width="20" height="10" src={arrow} alt="long-arrow-right"/>
            </div>
        
        </Fragment>
    )

} 

export default Button;