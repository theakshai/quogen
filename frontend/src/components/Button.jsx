import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import arrow from "../assets/right-arrow.png"

const Button = ({action, url}) => {
    return (
        <Fragment>
            <div className='inline-flex gap-2'>
                <Link to={'/login'} className="font-euclidRegular text-qwhite">{action}</Link>
                <img width="20" height="10" src={arrow} alt="long-arrow-right"/>
            </div>
        
        </Fragment>
    )

} 

export default Button;